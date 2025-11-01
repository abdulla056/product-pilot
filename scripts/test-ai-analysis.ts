/**
 * Test script to verify AI analysis works correctly
 * 
 * Usage:
 * 1. Make sure GOOGLE_AI_API_KEY is set in .env.local
 * 2. Run: npm run test:ai
 */

import { analyzeCreatorGraph } from "../src/lib/ai-analysis"
import { mockVideoTranscripts } from "../src/lib/mock-data"

async function testAIAnalysis() {
  console.log("🧪 Testing AI Analysis System\n")
  
  // Check for API key
  if (!process.env.GOOGLE_AI_API_KEY) {
    console.error("❌ Error: GOOGLE_AI_API_KEY not found in .env.local")
    console.log("\nPlease add your Google AI API key to .env.local:")
    console.log("GOOGLE_AI_API_KEY=your-api-key-here\n")
    console.log("Get your API key from: https://aistudio.google.com/app/apikey\n")
    process.exit(1)
  }
  
  console.log("✅ Google AI API key found")
  console.log(`📊 Testing with ${mockVideoTranscripts.length} mock videos\n`)
  
  try {
    const startTime = Date.now()
    
    // Run the AI analysis
    const result = await analyzeCreatorGraph(
      "test_user_123",
      "test_channel_456",
      "FitLife with Alex",
      mockVideoTranscripts,
      668000,
      78000
    )
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    
    console.log("\n✅ AI Analysis Complete!\n")
    console.log("📈 Results Summary:")
    console.log("─────────────────────────────────────────────")
    console.log(`⏱️  Processing Time: ${duration}s`)
    console.log(`📺 Videos Analyzed: ${result.transcripts.length}`)
    console.log(`🎯 Content Genre: ${result.contentAnalysis.genre}`)
    console.log(`👥 Target Age Range: ${result.audienceAnalysis.primaryDemographic.ageRange}`)
    console.log(`💡 Products Generated: ${result.productOpportunities.length}`)
    console.log(`📊 Market Trends Found: ${result.marketTrends.trendingProducts.length}`)
    console.log("─────────────────────────────────────────────\n")
    
    console.log("🎯 Top Product Opportunities:")
    result.productOpportunities.slice(0, 3).forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`)
      console.log(`   Category: ${product.category}`)
      console.log(`   Demand: ${product.estimatedDemand}`)
      console.log(`   Confidence: ${(product.confidence * 100).toFixed(0)}%`)
      console.log(`   Price Range: $${product.priceRange.min}-$${product.priceRange.max}`)
      console.log(`   Reasoning: ${product.reasoning.substring(0, 100)}...`)
    })
    
    console.log("\n\n🎉 Test Successful! AI analysis is working correctly.\n")
    
  } catch (error) {
    console.error("\n❌ Test Failed!\n")
    console.error("Error:", error instanceof Error ? error.message : error)
    
    if (error instanceof Error && error.message.includes("API key")) {
      console.log("\n💡 Tip: Make sure your Google AI API key is valid")
      console.log("Get your API key from: https://aistudio.google.com/app/apikey")
    }
    
    process.exit(1)
  }
}

// Run the test
testAIAnalysis()
