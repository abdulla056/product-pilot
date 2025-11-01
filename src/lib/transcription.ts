import { composio } from "./composio"
import { VideoTranscript } from "@/types/analysis"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

/**
 * Get video captions/transcript from YouTube
 * @param entityId - Entity/User ID
 * @param videoId - YouTube video ID
 * @returns Transcript text or null
 */
export async function getVideoTranscript(
  entityId: string,
  videoId: string
): Promise<string | null> {
  try {
    console.log(`[transcription] Getting transcript for video: ${videoId}`)
    const entity = await composio.getEntity(entityId)

    // Step 1: List available captions for the video
    // Note: This may fail if you don't own the video
    const captionsListResult: any = await entity.execute({
      actionName: "YOUTUBE_LIST_CAPTIONS",
      params: {
        videoId: videoId,
        part: "snippet",
      },
    })

    console.log("[transcription] Captions list result:", JSON.stringify(captionsListResult, null, 2))

    // Check if there was an error (like 403 Forbidden for non-owned videos)
    if (captionsListResult?.error || !captionsListResult?.successful) {
      console.log("[transcription] Cannot access captions (likely not video owner):", captionsListResult?.error)
      return null
    }

    const captionItems = captionsListResult?.data?.items || 
                        captionsListResult?.data?.response_data?.items

    if (!captionItems || !Array.isArray(captionItems) || captionItems.length === 0) {
      console.log("[transcription] No captions found for video:", videoId)
      return null
    }

    // Step 2: Find the best caption track (prefer auto-generated English)
    // Priority: 1) English auto-generated, 2) English manual, 3) Any auto-generated, 4) First available
    let selectedCaption = captionItems.find(
      (caption: any) =>
        caption.snippet?.language === "en" &&
        caption.snippet?.trackKind === "asr" // auto-generated
    )

    if (!selectedCaption) {
      selectedCaption = captionItems.find(
        (caption: any) => caption.snippet?.language === "en"
      )
    }

    if (!selectedCaption) {
      selectedCaption = captionItems.find(
        (caption: any) => caption.snippet?.trackKind === "asr"
      )
    }

    if (!selectedCaption) {
      selectedCaption = captionItems[0]
    }

    console.log("[transcription] Selected caption:", selectedCaption.id, selectedCaption.snippet?.language)

    // Step 3: Load/Download the caption track using YOUTUBE_LOAD_CAPTIONS
    const captionDownloadResult: any = await entity.execute({
      actionName: "YOUTUBE_LOAD_CAPTIONS",
      params: {
        id: selectedCaption.id,  // Caption track ID
        tfmt: "srt", // SRT format (default)
      },
    })

    console.log("[transcription] Caption download result:", captionDownloadResult?.successful ? "Success" : "Failed")

    if (!captionDownloadResult?.successful || captionDownloadResult?.error) {
      console.log("[transcription] Failed to download caption:", captionDownloadResult?.error)
      return null
    }

    // Extract transcript text from the response
    const transcriptData = captionDownloadResult?.data?.message || 
                          captionDownloadResult?.data?.response_data || 
                          captionDownloadResult?.data
    
    if (typeof transcriptData === "string") {
      // Clean up SRT format to get plain text
      const cleanTranscript = cleanSRTTranscript(transcriptData)
      console.log("[transcription] Successfully retrieved transcript, length:", cleanTranscript.length)
      return cleanTranscript
    }

    console.log("[transcription] No transcript data in response")
    return null
  } catch (error: any) {
    console.error("[transcription] Error getting video transcript:", error?.message || error)
    return null
  }
}

/**
 * Clean SRT formatted transcript to plain text
 * @param srtText - SRT formatted transcript
 * @returns Clean plain text transcript
 */
function cleanSRTTranscript(srtText: string): string {
  // Remove SRT numbering and timestamps
  const lines = srtText.split("\n")
  const textLines: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines, numbers, and timestamp lines
    if (
      line === "" ||
      /^\d+$/.test(line) ||
      /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/.test(line)
    ) {
      continue
    }
    
    textLines.push(line)
  }
  
  return textLines.join(" ").trim()
}

/**
 * Get video details with enhanced metadata
 * @param entityId - Entity/User ID
 * @param videoId - YouTube video ID
 * @returns Video details
 */
export async function getVideoDetailsWithStats(
  entityId: string,
  videoId: string
): Promise<any> {
  try {
    console.log(`[transcription] Getting details for video: ${videoId}`)
    const entity = await composio.getEntity(entityId)

    const result: any = await entity.execute({
      actionName: "YOUTUBE_VIDEO_DETAILS",
      params: {
        id: videoId,
        part: "snippet,contentDetails,statistics",
      },
    })

    const items = result?.data?.response_data?.items || result?.data?.items

    if (items && Array.isArray(items) && items.length > 0) {
      return items[0]
    }

    return null
  } catch (error) {
    console.error("[transcription] Error getting video details:", error)
    return null
  }
}

/**
 * Transcribe multiple videos and return formatted VideoTranscript objects
 * @param entityId - Entity/User ID
 * @param videoIds - Array of YouTube video IDs
 * @returns Array of VideoTranscript objects
 */
export async function transcribeVideos(
  entityId: string,
  videoIds: string[]
): Promise<VideoTranscript[]> {
  console.log(`[transcription] Starting transcription for ${videoIds.length} videos`)
  
  const transcripts: VideoTranscript[] = []
  
  for (const videoId of videoIds) {
    try {
      console.log(`[transcription] Processing video ${videoId}...`)
      
      // Get video details
      const videoDetails = await getVideoDetailsWithStats(entityId, videoId)
      
      if (!videoDetails) {
        console.log(`[transcription] Could not fetch details for video ${videoId}, skipping...`)
        continue
      }
      
      // Try to get real transcript first
      let transcript = await getVideoTranscript(entityId, videoId)
      
      // If no transcript available, use AI fallback
      if (!transcript) {
        console.log(`[transcription] No captions available for video ${videoId}, using AI fallback...`)
        transcript = await generateAITranscriptFallback(videoDetails)
        
        if (!transcript) {
          console.log(`[transcription] AI fallback also failed for video ${videoId}, skipping...`)
          continue
        }
      }
      
      // Build VideoTranscript object
      const videoTranscript: VideoTranscript = {
        videoId,
        title: videoDetails.snippet?.title || "Untitled",
        description: videoDetails.snippet?.description || "",
        publishedAt: videoDetails.snippet?.publishedAt || new Date().toISOString(),
        transcript,
        duration: videoDetails.contentDetails?.duration || "PT0S",
        viewCount: parseInt(videoDetails.statistics?.viewCount || "0"),
        likeCount: parseInt(videoDetails.statistics?.likeCount || "0"),
        commentCount: parseInt(videoDetails.statistics?.commentCount || "0"),
        tags: videoDetails.snippet?.tags || [],
      }
      
      transcripts.push(videoTranscript)
      console.log(`[transcription] Successfully transcribed: "${videoTranscript.title}"`)
      
    } catch (error) {
      console.error(`[transcription] Error processing video ${videoId}:`, error)
      continue
    }
  }
  
  console.log(`[transcription] Completed: ${transcripts.length}/${videoIds.length} videos transcribed`)
  return transcripts
}

/**
 * Get channel videos and transcribe them
 * @param entityId - Entity/User ID
 * @param channelId - YouTube channel ID
 * @param maxVideos - Maximum number of videos to transcribe (default: 10)
 * @returns Array of VideoTranscript objects
 */
export async function getAndTranscribeChannelVideos(
  entityId: string,
  channelId: string,
  maxVideos: number = 10
): Promise<VideoTranscript[]> {
  try {
    console.log(`[transcription] Fetching videos for channel: ${channelId}`)
    const entity = await composio.getEntity(entityId)
    
    // Get channel videos
    const videosResult: any = await entity.execute({
      actionName: "YOUTUBE_LIST_CHANNEL_VIDEOS",
      params: {
        channelId,
        maxResults: maxVideos,
        part: "snippet",
        order: "date",
        type: "video",
      },
    })
    
    const videoItems = videosResult?.data?.response_data?.items || videosResult?.data?.items
    
    if (!videoItems || !Array.isArray(videoItems) || videoItems.length === 0) {
      console.log("[transcription] No videos found for channel")
      return []
    }
    
    // Extract video IDs
    const videoIds = videoItems.map((item: any) => item.id?.videoId || item.id).filter(Boolean)
    
    console.log(`[transcription] Found ${videoIds.length} videos to transcribe`)
    
    // Transcribe all videos
    const transcripts = await transcribeVideos(entityId, videoIds)
    
    return transcripts
  } catch (error) {
    console.error("[transcription] Error getting and transcribing channel videos:", error)
    return []
  }
}

/**
 * Fallback: Use AI to generate summary if no transcript available
 * (This is less accurate but works for videos without captions)
 * @param videoDetails - Video details object
 * @returns AI-generated summary as transcript
 */
export async function generateAITranscriptFallback(
  videoDetails: any
): Promise<string> {
  try {
    console.log("[transcription] Using AI fallback for video without captions")
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
    })
    
    const prompt = `
Based on the following YouTube video metadata, generate a detailed summary of what this video likely covers.
Be specific and use the title, description, and tags to infer the content.

Title: ${videoDetails.snippet?.title || "Untitled"}
Description: ${videoDetails.snippet?.description || "No description"}
Tags: ${videoDetails.snippet?.tags?.join(", ") || "No tags"}

Generate a 200-300 word summary of the likely video content in first person (as if the creator is speaking).
`
    
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    
    return text
  } catch (error) {
    console.error("[transcription] Error generating AI fallback:", error)
    return ""
  }
}
