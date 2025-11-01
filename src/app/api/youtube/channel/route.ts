import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getChannelStatistics, listChannelVideos } from "@/lib/composio"

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

    // Get channel statistics and recent videos
    const [stats, videos] = await Promise.all([
      getChannelStatistics(entityId, channelId),
      listChannelVideos(entityId, channelId, 10),
    ])

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
