import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getMyYouTubeChannel } from "@/lib/composio-helpers"
import { getChannelVideos } from "@/lib/composio-helpers"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const maxResults = parseInt(searchParams.get("maxResults") || "12")
    
    console.log("[youtube/videos] Fetching videos for user:", userId)

    // Get channel info first
    const channelInfo = await getMyYouTubeChannel(userId)
    
    if (!channelInfo || !channelInfo.items || channelInfo.items.length === 0) {
      const errorResponse = {
        success: false,
        error: "Could not fetch YouTube channel. Please ensure your YouTube account is connected.",
        details: "No channel information found",
        rawData: channelInfo
      }
      console.error("[youtube/videos] Error response:", JSON.stringify(errorResponse, null, 2))
      return NextResponse.json(errorResponse, { status: 400 })
    }

    const channelId = channelInfo.channelId
    console.log("[youtube/videos] Channel ID:", channelId)

    // Get videos
    const videosData = await getChannelVideos(userId, channelId, maxResults)
    
    if (!videosData || !videosData.items || videosData.items.length === 0) {
      const errorResponse = {
        success: false,
        error: "No videos found for this channel",
        details: "Channel exists but no videos were retrieved",
        rawData: videosData,
        channelInfo: channelInfo.items[0]
      }
      console.error("[youtube/videos] Error response:", JSON.stringify(errorResponse, null, 2))
      return NextResponse.json(errorResponse, { status: 404 })
    }

    const response = {
      success: true,
      data: {
        videos: videosData.items,
        totalResults: videosData.totalResults,
        channelInfo: {
          id: channelId,
          title: channelInfo.items[0].snippet?.title,
          subscriberCount: channelInfo.items[0].statistics?.subscriberCount,
          videoCount: channelInfo.items[0].statistics?.videoCount,
          viewCount: channelInfo.items[0].statistics?.viewCount,
        }
      }
    }

    console.log("[youtube/videos] Success! Retrieved", videosData.items.length, "videos")
    return NextResponse.json(response)

  } catch (error: any) {
    const errorResponse = {
      success: false,
      error: error.message || "Failed to fetch YouTube videos",
      details: error.toString(),
      stack: error.stack
    }
    console.error("[youtube/videos] Exception:", JSON.stringify(errorResponse, null, 2))
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
