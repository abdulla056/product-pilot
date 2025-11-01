import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { initializeYouTubeConnection } from "@/lib/composio"

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Use Clerk user ID as entity ID
    const entityId = user.id

    const result = await initializeYouTubeConnection(entityId)

    return NextResponse.json({
      success: true,
      redirectUrl: result.redirectUrl,
    })
  } catch (error) {
    console.error("Error initiating YouTube connection:", error)
    return NextResponse.json(
      { error: "Failed to initiate YouTube connection" },
      { status: 500 }
    )
  }
}
