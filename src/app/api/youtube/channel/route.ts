import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getChannelVideos } from "@/lib/composio-helpers"
import { composio } from "@/lib/composio"

export async function GET(request: Request) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const channelId = searchParams.get("channelId")

    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID is required" },
        { status: 400 }
      )
    }

    const entityId = user.id

    // Get channel statistics using composio
    const entity = await composio.getEntity(entityId)
    const statsResult: any = await entity.execute({
      actionName: "YOUTUBE_GET_CHANNEL_STATISTICS",
      params: {
        id: channelId,
        part: "statistics,snippet,contentDetails",
      },
    })

    const stats = statsResult?.data?.channels?.[0] || statsResult?.data?.items?.[0]

    // Get recent videos
    const videos = await getChannelVideos(entityId, channelId, 10)

    return NextResponse.json({
      success: true,
      data: {
        statistics: stats,
        recentVideos: videos,
      },
    })
  } catch (error) {
    console.error("Error fetching channel data:", error)
    return NextResponse.json(
      { error: "Failed to fetch channel data" },
      { status: 500 }
    )
  }
}
