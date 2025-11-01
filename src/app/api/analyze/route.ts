import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { analyzeCreatorGraph } from "@/lib/ai-analysis"
import { mockVideoTranscripts, mockCreatorGraph } from "@/lib/mock-data"
import type { AnalysisRequest, AnalysisResponse } from "@/types/analysis"

/**
 * POST /api/analyze
 * Analyze creator's YouTube content and generate product opportunities
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = (await request.json()) as AnalysisRequest
    const { channelId, videoCount = 10, depth = "standard" } = body

    // For now, we'll use mock transcripts but run real AI analysis
    // In production, you would fetch real transcripts here
    const useMockData = true // Set to false when real transcription is ready

    const startTime = Date.now()

    let transcripts = mockVideoTranscripts.slice(0, videoCount)
    let channelName = "FitLife with Alex"
    let totalViews = 668000
    let subscriberCount = 78000

    if (!useMockData) {
      // TODO: Fetch real video transcripts
      // transcripts = await getVideoTranscripts(userId, channelId, videoCount)

      // TODO: Get channel info
      // const channelInfo = await getChannelInfo(userId, channelId)
      // channelName = channelInfo.name
      // totalViews = channelInfo.totalViews
      // subscriberCount = channelInfo.subscriberCount
    }

    console.log(`🤖 Running AI analysis on ${transcripts.length} videos...`)

    // Run AI analysis with either mock or real transcripts
    const creatorGraph = await analyzeCreatorGraph(
      userId,
      channelId,
      channelName,
      transcripts,
      totalViews,
      subscriberCount
    )

    const processingTime = Date.now() - startTime

    const response: AnalysisResponse = {
      success: true,
      data: creatorGraph,
      processingTime,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in analysis endpoint:", error)

    const response: AnalysisResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Analysis failed",
    }

    return NextResponse.json(response, { status: 500 })
  }
}

/**
 * GET /api/analyze?channelId=xxx
 * Get existing analysis or check status
 */
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
    const channelId = searchParams.get("channelId")

    if (!channelId) {
      return NextResponse.json(
        { success: false, error: "Channel ID required" },
        { status: 400 }
      )
    }

    // TODO: Implement database lookup for existing analysis
    // For now, return mock data
    const response: AnalysisResponse = {
      success: true,
      data: mockCreatorGraph,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error fetching analysis:", error)

    const response: AnalysisResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch analysis",
    }

    return NextResponse.json(response, { status: 500 })
  }
}
