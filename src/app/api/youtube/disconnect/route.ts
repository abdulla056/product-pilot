import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { disconnectYouTubeConnection } from "@/lib/composio"

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entityId = user.id
    const result = await disconnectYouTubeConnection(entityId)

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error: any) {
    console.error("Error disconnecting YouTube:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error?.message || "Failed to disconnect YouTube connection" 
      },
      { status: 500 }
    )
  }
}

