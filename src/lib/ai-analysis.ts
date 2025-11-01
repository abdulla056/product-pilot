import { GoogleGenerativeAI } from "@google/generative-ai"
import {
  VideoTranscript,
  ContentAnalysis,
  AudienceAnalysis,
  ProductOpportunity,
  MarketTrends,
  CreatorGraph,
} from "@/types/analysis"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

/**
 * Analyze video transcripts to determine content genre and style
 */
export async function analyzeContent(
  transcripts: VideoTranscript[]
): Promise<ContentAnalysis> {
  const combinedContent = transcripts
    .map(
      (t) => `
    Title: ${t.title || "Untitled"}
    Description: ${t.description || "No description"}
    Transcript: ${t.transcript?.substring(0, 1000) || "No transcript available"}
    Tags: ${t.tags?.join(", ") || "No tags"}
    `
    )
    .join("\n\n---\n\n")

  const prompt = `
You are an expert content analyst. Analyze these YouTube video transcripts and provide a detailed content analysis.

${combinedContent}

Provide a comprehensive analysis in the following JSON format:
{
  "genre": "Primary content genre",
  "subGenres": ["array", "of", "sub-genres"],
  "mainTopics": ["array", "of", "main", "topics"],
  "contentStyle": "Description of content style",
  "contentTone": "Description of tone (friendly, professional, etc)",
  "keyThemes": ["recurring", "themes", "across", "content"],
  "expertise": ["areas", "of", "demonstrated", "expertise"],
  "confidence": 0.0-1.0
}

Be specific and insightful. The confidence score should reflect how clear the content patterns are.
`

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are an expert content strategist who analyzes creator content to identify patterns, themes, and expertise areas. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const analysis = JSON.parse(text) as ContentAnalysis
    return analysis
  } catch (error) {
    console.error("Error analyzing content:", error)
    throw error
  }
}

/**
 * Analyze audience based on content, engagement, and comments
 */
export async function analyzeAudience(
  transcripts: VideoTranscript[],
  contentAnalysis: ContentAnalysis
): Promise<AudienceAnalysis> {
  const engagementData = transcripts.map((t) => ({
    title: t.title || "Untitled",
    views: t.viewCount || 0,
    likes: t.likeCount || 0,
    comments: t.commentCount || 0,
    engagementRate: t.viewCount 
      ? (((t.likeCount || 0) + (t.commentCount || 0)) / t.viewCount) * 100 
      : 0,
  }))

  const prompt = `
You are an expert audience analyst. Based on this creator's content and engagement data, provide detailed audience insights.

Content Analysis:
${JSON.stringify(contentAnalysis, null, 2)}

Engagement Data:
${JSON.stringify(engagementData, null, 2)}

Sample Content Excerpts:
${transcripts
  .slice(0, 3)
  .map((t) => `${t.title || "Untitled"}: ${t.transcript?.substring(0, 500) || "No transcript"}`)
  .join("\n\n")}

Provide analysis in this JSON format:
{
  "primaryDemographic": {
    "ageRange": "age range",
    "interests": ["list", "of", "interests"],
    "painPoints": ["problems", "they", "face"],
    "aspirations": ["what", "they", "want", "to", "achieve"]
  },
  "engagementPatterns": {
    "mostEngagedTopics": ["topics", "with", "high", "engagement"],
    "peakEngagementTimes": ["when", "audience", "is", "active"],
    "preferredContentLength": "content length preference"
  },
  "communityInsights": {
    "commonQuestions": ["questions", "audience", "asks"],
    "frequentRequests": ["what", "they", "request"],
    "sharedChallenges": ["common", "challenges"]
  },
  "confidence": 0.0-1.0
}
`

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are an expert in audience psychology and community analysis. Provide deep insights based on content patterns and engagement metrics. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const analysis = JSON.parse(text) as AudienceAnalysis
    return analysis
  } catch (error) {
    console.error("Error analyzing audience:", error)
    throw error
  }
}

/**
 * Generate product opportunities based on content and audience analysis
 */
export async function generateProductOpportunities(
  contentAnalysis: ContentAnalysis,
  audienceAnalysis: AudienceAnalysis,
  transcripts: VideoTranscript[]
): Promise<ProductOpportunity[]> {
  const prompt = `
You are an expert product strategist specializing in creator economy products. Generate viable product opportunities.

Content Analysis:
${JSON.stringify(contentAnalysis, null, 2)}

Audience Analysis:
${JSON.stringify(audienceAnalysis, null, 2)}

Based on this data, generate 6-8 diverse product opportunities across digital products, physical products, and services.

Respond with a JSON object containing a "products" array. For each product in the array, provide:
{
  "products": [
    {
      "id": "prod_001",
      "name": "Product Name",
      "category": "digital" | "physical" | "service",
      "description": "Detailed description",
      "targetAudience": "Who this is for",
      "estimatedDemand": "high" | "medium" | "low",
      "confidence": 0.0-1.0,
      "reasoning": "Why this product makes sense",
      "similarProducts": ["existing", "similar", "products"],
      "priceRange": {
        "min": number,
        "max": number,
        "currency": "USD"
      },
      "validationSuggestions": ["how", "to", "validate", "demand"]
    }
  ]
}

Prioritize products with high confidence and clear market demand.
`

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are a product strategy expert who helps creators monetize their audience through well-researched product opportunities. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const responseData = JSON.parse(text)
    const products = (responseData.products || []) as ProductOpportunity[]
    return products
  } catch (error) {
    console.error("Error generating product opportunities:", error)
    throw error
  }
}

/**
 * Research market trends relevant to the creator's niche
 */
export async function analyzeMarketTrends(
  contentAnalysis: ContentAnalysis,
  audienceAnalysis: AudienceAnalysis
): Promise<MarketTrends> {
  const prompt = `
You are a market research analyst specializing in creator economy and digital products.

Content Genre: ${contentAnalysis.genre || "General"}
Main Topics: ${contentAnalysis.mainTopics?.join(", ") || "N/A"}
Audience Interests: ${audienceAnalysis.primaryDemographic?.interests?.join(", ") || "N/A"}

Research and provide current market trends in this JSON format:
{
  "trendingProducts": [
    {
      "name": "Product name",
      "category": "Category",
      "growthRate": "Growth percentage",
      "relevanceScore": 0.0-1.0,
      "description": "Why it's trending"
    }
  ],
  "emergingNiches": ["niche1", "niche2"],
  "seasonalOpportunities": [
    {
      "season": "Q1, Q2, etc",
      "products": ["seasonal", "products"]
    }
  ],
  "competitorInsights": [
    {
      "creator": "Creator name",
      "products": ["their", "products"],
      "successMetrics": "What makes them successful"
    }
  ]
}

Focus on current 2024-2025 trends. Be specific and data-driven where possible.
`

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are a market research expert with deep knowledge of creator economy trends, digital products, and e-commerce. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const trends = JSON.parse(text) as MarketTrends
    return trends
  } catch (error) {
    console.error("Error analyzing market trends:", error)
    throw error
  }
}

/**
 * Main orchestrator function that runs all AI agents
 */
export async function analyzeCreatorGraph(
  userId: string,
  channelId: string,
  channelName: string,
  transcripts: VideoTranscript[],
  totalViews: number,
  subscriberCount: number
): Promise<CreatorGraph> {
  console.log("🤖 Starting AI analysis with multiple agents...")

  // Agent 1: Content Analysis
  console.log("📊 Agent 1: Analyzing content patterns...")
  const contentAnalysis = await analyzeContent(transcripts)

  // Agent 2: Audience Analysis
  console.log("👥 Agent 2: Analyzing audience insights...")
  const audienceAnalysis = await analyzeAudience(transcripts, contentAnalysis)

  // Agent 3: Market Trends Research
  console.log("📈 Agent 3: Researching market trends...")
  const marketTrends = await analyzeMarketTrends(
    contentAnalysis,
    audienceAnalysis
  )

  // Agent 4: Product Opportunity Generation
  console.log("💡 Agent 4: Generating product opportunities...")
  const productOpportunities = await generateProductOpportunities(
    contentAnalysis,
    audienceAnalysis,
    transcripts
  )

  // Sort and categorize recommendations
  const sortedProducts = [...productOpportunities].sort(
    (a, b) => b.confidence - a.confidence
  )

  const creatorGraph: CreatorGraph = {
    creatorId: userId,
    channelId,
    channelName,
    totalVideos: transcripts.length,
    totalViews,
    subscriberCount,
    analysisDate: new Date().toISOString(),
    transcripts,
    contentAnalysis,
    audienceAnalysis,
    productOpportunities,
    marketTrends,
    recommendations: {
      topProducts: sortedProducts.slice(0, 2),
      quickWins: sortedProducts
        .filter((p) => p.category === "digital")
        .slice(0, 2),
      longTermBets: sortedProducts
        .filter((p) => p.category === "service" || p.estimatedDemand !== "low")
        .slice(0, 2),
    },
  }

  console.log("✅ Analysis complete!")
  return creatorGraph
}
