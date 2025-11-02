import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getYouTubeConnection } from "@/lib/composio-helpers"

export async function GET() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ connected: false, error: "Unauthorized" }, { status: 401 })
    }

    const entityId = user.id
    const youtubeConnection = await getYouTubeConnection(entityId)

    return NextResponse.json({
      connected: !!youtubeConnection,
      connection: youtubeConnection || null,
    })
  } catch (error) {
    console.error("Error checking YouTube connection:", error)
    return NextResponse.json(
      { connected: false, error: "Failed to check connection" },
      { status: 500 }
    )
  }
}

