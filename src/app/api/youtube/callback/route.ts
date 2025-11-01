import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // Get the callback parameters from Composio
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const error = searchParams.get("error")

    if (error) {
      console.error("YouTube connection error:", error)
      return NextResponse.redirect(
        new URL("/dashboard?error=connection_failed", request.url)
      )
    }

    if (status === "success") {
      // Redirect back to dashboard with success message
      return NextResponse.redirect(
        new URL("/dashboard?connected=youtube", request.url)
      )
    }

    // Default redirect
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error in YouTube callback:", error)
    return NextResponse.redirect(
      new URL("/dashboard?error=callback_failed", request.url)
    )
  }
}
