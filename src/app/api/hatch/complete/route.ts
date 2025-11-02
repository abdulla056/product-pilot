import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { getYouTubeConnection, getMyYouTubeChannel } from "@/lib/composio-helpers"
import { getChannelVideos } from "@/lib/composio-helpers"
import { getAndTranscribeChannelVideos } from "@/lib/transcription"
import { recommendVendors } from "@/lib/vendor-recommendations"

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { strategy, model, budget } = body

    // Validate onboarding data
    if (!strategy || !model || !budget) {
      return NextResponse.json(
        { error: "Missing onboarding data" },
        { status: 400 }
      )
    }

    const entityId = user.id

    // Step 1: Check if YouTube is connected
    console.log(`[hatch/complete] Checking YouTube connection for user: ${entityId}`)
    const youtubeConnection = await getYouTubeConnection(entityId)

    if (!youtubeConnection) {
      return NextResponse.json({
        success: false,
        requiresConnection: true,
        message: "YouTube connection required",
      })
    }

    // Step 2: Get YouTube channel
    console.log(`[hatch/complete] Getting YouTube channel for user: ${entityId}`)
    const youtubeChannel = await getMyYouTubeChannel(entityId)

    if (!youtubeChannel || !youtubeChannel.channelId) {
      return NextResponse.json({
        success: false,
        error: "Could not fetch YouTube channel",
      })
    }

    const channelId = youtubeChannel.channelId
    console.log(`[hatch/complete] Found channel ID: ${channelId}`)

    // Step 3: Fetch and transcribe videos (limited to 5 for speed)
    console.log(`[hatch/complete] Starting video scraping and transcription...`)
    const transcripts = await getAndTranscribeChannelVideos(entityId, channelId, 5)

    console.log(`[hatch/complete] Successfully processed ${transcripts.length} videos`)

    // Step 4: Get video list for display
    const videosResult = await getChannelVideos(entityId, channelId, 10)

    // Step 5: Get vendor recommendations based on product type and budget
    console.log(`[hatch/complete] Fetching vendor recommendations...`)
    const vendors = await recommendVendors(model, budget)

    return NextResponse.json({
      success: true,
      channelId,
      channelName: youtubeChannel.items?.[0]?.snippet?.title || "Your Channel",
      videoCount: transcripts.length,
      transcripts: transcripts.map((t) => ({
        videoId: t.videoId,
        title: t.title,
        hasTranscript: !!t.transcript,
        transcriptLength: t.transcript?.length || 0,
      })),
      videos: videosResult?.items || [],
      vendors: vendors,
      onboarding: {
        strategy,
        model,
        budget,
      },
    })
  } catch (error: any) {
    console.error("[hatch/complete] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to complete hatch process",
      },
      { status: 500 }
    )
  }
}

