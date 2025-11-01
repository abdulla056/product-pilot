/**
 * Test script for YouTube video transcription using Composio
 * 
 * This script demonstrates how to:
 * 1. Fetch your YouTube channel videos using Composio
 * 2. Get transcripts/captions for each video
 * 3. Prepare the data for AI analysis
 * 
 * Run with: npx tsx scripts/test-transcription.ts
 */

import { 
  getAndTranscribeChannelVideos,
  transcribeVideos,
  getVideoTranscript 
} from "../src/lib/transcription"

async function main() {
  console.log("🎬 YouTube Video Transcription Test\n")
  console.log("=" .repeat(60))
  
  // Replace with your actual values
  const ENTITY_ID = "your-clerk-user-id" // Your Clerk user ID
  const CHANNEL_ID = "your-youtube-channel-id" // Your YouTube channel ID
  const MAX_VIDEOS = 3 // Number of videos to transcribe
  
  console.log("\nConfiguration:")
  console.log(`- Entity ID: ${ENTITY_ID}`)
  console.log(`- Channel ID: ${CHANNEL_ID}`)
  console.log(`- Max Videos: ${MAX_VIDEOS}\n`)
  
  try {
    console.log("📹 Fetching and transcribing channel videos...\n")
    
    const transcripts = await getAndTranscribeChannelVideos(
      ENTITY_ID,
      CHANNEL_ID,
      MAX_VIDEOS
    )
    
    console.log("\n" + "=".repeat(60))
    console.log(`\n✅ Successfully transcribed ${transcripts.length} videos!\n`)
    
    // Display results
    transcripts.forEach((video, index) => {
      console.log(`\n📹 Video ${index + 1}: ${video.title}`)
      console.log(`   ID: ${video.videoId}`)
      console.log(`   Published: ${new Date(video.publishedAt).toLocaleDateString()}`)
      console.log(`   Views: ${video.viewCount.toLocaleString()}`)
      console.log(`   Likes: ${video.likeCount.toLocaleString()}`)
      console.log(`   Duration: ${video.duration}`)
      console.log(`   Transcript length: ${video.transcript.length} characters`)
      console.log(`   Preview: ${video.transcript.substring(0, 200)}...`)
    })
    
    console.log("\n" + "=".repeat(60))
    console.log("\n✨ These transcripts are now ready for AI analysis!")
    console.log("   You can pass them to analyzeCreatorGraph() for product opportunities.\n")
    
  } catch (error) {
    console.error("\n❌ Error during transcription:", error)
    console.error("\nTroubleshooting:")
    console.error("1. Make sure your YouTube account is connected via Composio")
    console.error("2. Ensure your videos have captions/subtitles enabled")
    console.error("3. Check that COMPOSIO_API_KEY is set in .env.local")
    console.error("4. Verify your Clerk user ID and YouTube channel ID\n")
  }
}

// Run the test
main().catch(console.error)
