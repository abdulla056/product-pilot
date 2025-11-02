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

    // Check if there was an error (like 403 Forbidden for non-owned videos)
    if (captionsListResult?.error || !captionsListResult?.successful) {
      const errorDetails = captionsListResult?.error || "Unknown error"
      const errorMessage = typeof errorDetails === "string" ? errorDetails : JSON.stringify(errorDetails)
      console.log(`[transcription] Cannot access captions for video ${videoId}. Error:`, errorMessage)
      console.log(`[transcription] This usually means the video doesn't belong to your YouTube account.`)
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
    const errorMessage = error?.message || error?.toString() || "Unknown error"
    console.error(`[transcription] Error getting video transcript for ${videoId}:`, errorMessage)
    if (error?.stack) {
      console.error("[transcription] Stack trace:", error.stack)
    }
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
 * Process a single video (optimized helper)
 * Fetches transcript first, then details only if transcript is available
 */
async function processVideo(
  entityId: string,
  videoId: string,
  useAIFallback: boolean = false
): Promise<VideoTranscript | null> {
  try {
    // Step 1: Try to get transcript first (lighter operation)
    let transcript = await getVideoTranscript(entityId, videoId)
    
    // Step 2: Only fetch video details if we have a transcript (or if using AI fallback)
    if (!transcript && !useAIFallback) {
      console.log(`[transcription] No transcript available for ${videoId}, skipping...`)
      return null // Skip immediately - don't waste time fetching details
    }
    
    // Fetch video details in parallel with transcript (if transcript exists)
    // OR fetch only if we need it for AI fallback
    const videoDetailsPromise = getVideoDetailsWithStats(entityId, videoId)
    
    // If we already have transcript, we can fetch details while processing
    // Otherwise wait for details first (needed for AI fallback)
    const videoDetails = await videoDetailsPromise
    
    if (!videoDetails) {
      console.log(`[transcription] Could not fetch details for video ${videoId}`)
      return null
    }
    
    // If no transcript and AI fallback is enabled, generate one
    if (!transcript && useAIFallback) {
      console.log(`[transcription] No captions available for video ${videoId}. Using AI fallback based on metadata...`)
      try {
        transcript = await generateAITranscriptFallback(videoDetails)
        
        if (!transcript) {
          console.warn(`[transcription] AI fallback failed for video ${videoId}`)
          return null
        }
        
        console.log(`[transcription] ✓ AI fallback successful for video ${videoId} (${transcript.length} chars)`)
      } catch (error: any) {
        console.error(`[transcription] AI fallback error for video ${videoId}:`, error?.message || error)
        return null
      }
    }
    
    if (!transcript) {
      return null
    }
    
    // Build VideoTranscript object
    return {
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
  } catch (error) {
    console.error(`[transcription] Error processing video ${videoId}:`, error)
    return null
  }
}

/**
 * Process videos in batches with controlled concurrency
 * @param entityId - Entity/User ID
 * @param videoIds - Array of YouTube video IDs
 * @param batchSize - Number of videos to process concurrently (default: 3)
 * @param useAIFallback - Whether to use AI fallback for videos without captions (default: false)
 * @returns Array of VideoTranscript objects
 */
async function processBatch(
  entityId: string,
  videoIds: string[],
  batchSize: number = 3,
  useAIFallback: boolean = false
): Promise<VideoTranscript[]> {
  const transcripts: VideoTranscript[] = []
  
  // Process videos in batches to avoid rate limits
  for (let i = 0; i < videoIds.length; i += batchSize) {
    const batch = videoIds.slice(i, i + batchSize)
    console.log(`[transcription] Processing batch ${Math.floor(i / batchSize) + 1}: ${batch.length} videos`)
    
    // Process batch in parallel
    const batchResults = await Promise.allSettled(
      batch.map(videoId => processVideo(entityId, videoId, useAIFallback))
    )
    
    // Collect successful results and log failures
    for (const result of batchResults) {
      if (result.status === "fulfilled" && result.value) {
        transcripts.push(result.value)
        console.log(`[transcription] ✓ Successfully processed: "${result.value.title}"`)
      } else if (result.status === "rejected") {
        console.error(`[transcription] ✗ Failed to process video:`, result.reason)
      } else if (result.status === "fulfilled" && !result.value) {
        console.warn(`[transcription] ⚠ Video processed but no transcript available`)
      }
    }
  }
  
  return transcripts
}

/**
 * Transcribe multiple videos and return formatted VideoTranscript objects
 * OPTIMIZED VERSION: Processes videos in parallel batches for better performance
 * @param entityId - Entity/User ID
 * @param videoIds - Array of YouTube video IDs
 * @param options - Optional configuration
 * @returns Array of VideoTranscript objects
 */
export async function transcribeVideos(
  entityId: string,
  videoIds: string[],
  options?: {
    batchSize?: number // Number of videos to process concurrently (default: 3)
    useAIFallback?: boolean // Use AI fallback for videos without captions (default: false)
  }
): Promise<VideoTranscript[]> {
  const batchSize = options?.batchSize || 3
  const useAIFallback = options?.useAIFallback || false
  
  console.log(`[transcription] Starting transcription for ${videoIds.length} videos`)
  console.log(`[transcription] Settings: Batch size=${batchSize}, AI Fallback=${useAIFallback ? "enabled" : "disabled"}`)
  
  const startTime = Date.now()
  const transcripts = await processBatch(entityId, videoIds, batchSize, useAIFallback)
  const duration = ((Date.now() - startTime) / 1000).toFixed(1)
  
  const successCount = transcripts.length
  const failureCount = videoIds.length - successCount
  console.log(`[transcription] ========================================`)
  console.log(`[transcription] SUMMARY: ${successCount}/${videoIds.length} videos processed successfully`)
  if (failureCount > 0) {
    console.log(`[transcription] WARNING: ${failureCount} video(s) could not be transcribed`)
    console.log(`[transcription] Possible reasons:`)
    console.log(`[transcription]   - Videos don't belong to your YouTube account`)
    console.log(`[transcription]   - Videos have no captions enabled`)
    console.log(`[transcription]   - API errors or network issues`)
  }
  console.log(`[transcription] Total time: ${duration}s`)
  console.log(`[transcription] ========================================`)
  
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
    
    // Transcribe all videos with optimized parallel processing
    // Process fewer videos and in smaller batches for speed
    const videosToProcess = videoIds.slice(0, 5) // Only process first 5 videos for speed
    console.log(`[transcription] Processing ${videosToProcess.length} videos (limited for speed)`)
    
    const transcripts = await transcribeVideos(entityId, videosToProcess, {
      batchSize: 5, // Process all 5 videos concurrently (faster)
      useAIFallback: true, // Enable AI fallback to process videos without accessible captions
    })
    
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
