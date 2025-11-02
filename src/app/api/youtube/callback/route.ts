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
        new URL("/home?error=connection_failed", request.url)
      )
    }

    if (status === "success") {
      // Check if user was in hatch flow (check for hatch data in session/cookie)
      // If hatch data exists, redirect to processing page
      // Otherwise redirect to home
      const hasHatchData = request.cookies.get("hatch_in_progress")
      
      if (hasHatchData) {
        return NextResponse.redirect(
          new URL("/hatch/processing", request.url)
        )
      }
      
      // Redirect back to home with success message
      return NextResponse.redirect(
        new URL("/home?connected=youtube", request.url)
      )
    }

    // Default redirect
    return NextResponse.redirect(new URL("/home", request.url))
  } catch (error) {
    console.error("Error in YouTube callback:", error)
    return NextResponse.redirect(
      new URL("/home?error=callback_failed", request.url)
    )
  }
}
