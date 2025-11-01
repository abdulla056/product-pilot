// ...existing code...
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { analyzeCreatorGraph } from "@/lib/ai-analysis";
import { mockVideoTranscripts, mockCreatorGraph } from "@/lib/mock-data";
import { getAndTranscribeChannelVideos } from "@/lib/transcription";
import { getMyYouTubeChannel } from "@/lib/composio-helpers";
import type { AnalysisRequest, AnalysisResponse } from "@/types/analysis";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/analyze
 * Analyze creator's YouTube content and generate product opportunities
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as AnalysisRequest;
    const { channelId, videoCount = 10, depth = "standard", useMockData = false } = body;

    const startTime = Date.now();

    let transcripts = mockVideoTranscripts.slice(0, videoCount);
    let channelName = "FitLife with Alex";
    let totalViews = 668000;
    let subscriberCount = 78000;
    let actualChannelId = channelId || "unknown";

    if (!useMockData) {
      console.log("[analyze] Using real YouTube data and transcription");

      // Get channel info
      const channelInfo = await getMyYouTubeChannel(userId);

      if (!channelInfo || !channelInfo.items || channelInfo.items.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Could not fetch YouTube channel. Please ensure your YouTube account is connected.",
          },
          { status: 400 }
        );
      }

      const channel = channelInfo.items[0];
      channelName = channel.snippet?.title || "Unknown Channel";
      totalViews = parseInt(channel.statistics?.viewCount || "0");
      subscriberCount = parseInt(channel.statistics?.subscriberCount || "0");
      actualChannelId = channelId || channel.id;

      console.log(`[analyze] Channel: ${channelName}, Subscribers: ${subscriberCount}`);

      // Get and transcribe videos
      transcripts = await getAndTranscribeChannelVideos(userId, actualChannelId, videoCount);

      if (transcripts.length === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "No videos with transcripts found. Videos must have captions/subtitles enabled.",
          },
          { status: 400 }
        );
      }

      console.log(`[analyze] Successfully transcribed ${transcripts.length} videos`);
    } else {
      console.log("[analyze] Using mock data for analysis");
    }

    console.log(`🤖 Running AI analysis on ${transcripts.length} videos...`);

    // Run AI analysis with either mock or real transcripts
    const creatorGraph = await analyzeCreatorGraph(
      userId,
      actualChannelId,
      channelName,
      transcripts,
      totalViews,
      subscriberCount
    );

    // Persist analysis result to MongoDB via Prisma
    let savedAnalysisId: string | null = null;
    try {
      const saved = await prisma.analysis.create({
        data: {
          userId,
          channelId: actualChannelId,
          channelName,
          videoCount: transcripts.length,
          depth,
          resultJson: creatorGraph as any,
        },
      });
      savedAnalysisId = saved.id;
    } catch (err) {
      console.error("Failed to persist analysis:", err);
      // proceed — still return analysis result even if persistence failed
    }

    const processingTime = Date.now() - startTime;

    const response: AnalysisResponse = {
      success: true,
      data: creatorGraph,
      processingTime,
    };

    // include analysisId when persisted
    const payload: any = { ...response };
    if (savedAnalysisId) payload.analysisId = savedAnalysisId;

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error in analysis endpoint:", error);

    const response: AnalysisResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Analysis failed",
    };

    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * GET /api/analyze?channelId=xxx
 * Get existing analysis or check status
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const channelId = searchParams.get("channelId");

    if (!channelId) {
      return NextResponse.json({ success: false, error: "Channel ID required" }, { status: 400 });
    }

    // Look up latest analysis for this user + channel
    const existing = await prisma.analysis.findFirst({
      where: { userId, channelId },
      orderBy: { createdAt: "desc" },
    });

    if (existing) {
      const response: AnalysisResponse = {
        success: true,
        data: existing.resultJson as any,
      };
      // include analysis id and timestamps if helpful
      return NextResponse.json({ ...response, analysisId: existing.id, createdAt: existing.createdAt });
    }

    // Fallback to mock data if nothing persisted yet
    const response: AnalysisResponse = {
      success: true,
      data: mockCreatorGraph,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching analysis:", error);

    const response: AnalysisResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch analysis",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
// ...existing code...