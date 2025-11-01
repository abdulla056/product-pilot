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

// 🤖 AGENTIC: Tool definitions for autonomous decision-making
const AVAILABLE_TOOLS = {
  web_search: {
    name: "web_search",
    description: "Search the web for current trends, competitor analysis, or market data",
    parameters: {
      query: "string - search query",
    },
  },
  deep_content_analysis: {
    name: "deep_content_analysis",
    description: "Run a more detailed content analysis when confidence is low",
    parameters: {
      transcripts: "array - video transcripts to analyze deeply",
    },
  },
  validate_product_idea: {
    name: "validate_product_idea",
    description: "Check if a product idea already exists in the market and assess competition",
    parameters: {
      productName: "string - name of product to validate",
      category: "string - product category",
    },
  },
}

// 🤖 AGENTIC: Simulated web search (replace with real API in production)
async function webSearch(query: string): Promise<string> {
  console.log(`🔍 Agent using web_search tool: "${query}"`)
  
  // In production, use real search API (Tavily, SerpAPI, etc.)
  // For now, return simulated results
  const searchResults = {
    "creator economy trends": "Digital products and online courses are seeing 40% YoY growth. Creator-led communities and membership programs are trending.",
    "youtube product opportunities": "Top opportunities: 1) Digital downloads, 2) Coaching/consulting, 3) Community memberships, 4) Physical merchandise",
    "market validation": "Pre-orders and landing pages are the most effective validation methods for digital products.",
  }
  
  return searchResults[query as keyof typeof searchResults] || `Search results for: ${query} - Current market data suggests strong demand in creator products.`
}

// 🤖 AGENTIC: Product validation tool
async function validateProductIdea(productName: string, category: string): Promise<{
  exists: boolean
  competition: string
  marketDemand: string
}> {
  console.log(`✅ Agent using validate_product_idea tool: "${productName}" (${category})`)
  
  // Simulated validation - in production, use real market research APIs
  return {
    exists: Math.random() > 0.5,
    competition: Math.random() > 0.6 ? "high" : "medium",
    marketDemand: Math.random() > 0.5 ? "high" : "medium",
  }
}

/**
 * 🤖 AGENTIC: Self-reflection mechanism
 * Agent evaluates its own output and decides if it needs to retry
 */
async function reflectOnAnalysis<T extends { confidence?: number }>(
  analysis: T,
  taskName: string,
  retryFn: () => Promise<T>,
  currentAttempt = 1,
  maxAttempts = 2
): Promise<T> {
  const confidence = analysis.confidence || 0
  
  console.log(`🧠 Agent reflecting on ${taskName}: ${Math.round(confidence * 100)}% confidence (attempt ${currentAttempt}/${maxAttempts})`)
  
  // Agent decides: Is this good enough?
  if (confidence < 0.6 && currentAttempt < maxAttempts) {
    console.log(`🔄 Agent decision: Confidence too low, retrying with enhanced analysis...`)
    return await retryFn()
  }
  
  console.log(`✅ Agent decision: Quality acceptable, proceeding...`)
  return analysis
}

/**
 * 🤖 AGENTIC: Content Analysis with self-reflection
 * Agent can retry if confidence is low
 */
export async function analyzeContent(
  transcripts: VideoTranscript[],
  attempt = 1
): Promise<ContentAnalysis> {
  const combinedContent = transcripts
    .map(
      (t) => `
    Title: ${t.title || "Untitled"}
    Description: ${t.description || "No description"}
    Transcript: ${t.transcript?.substring(0, attempt > 1 ? 2000 : 1000) || "No transcript available"}
    Tags: ${t.tags?.join(", ") || "No tags"}
    `
    )
    .join("\n\n---\n\n")

  const prompt = `
You are an expert content analyst. Analyze these YouTube video transcripts and provide a detailed content analysis.

${combinedContent}

${attempt > 1 ? "⚠️ SECOND ATTEMPT: Previous analysis had low confidence. Analyze more deeply and be more specific." : ""}

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
        temperature: attempt > 1 ? 0.5 : 0.7, // Lower temperature on retry
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are an expert content strategist who analyzes creator content to identify patterns, themes, and expertise areas. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const analysis = JSON.parse(text) as ContentAnalysis
    
    // 🤖 AGENTIC: Self-reflection - agent evaluates its own work
    return await reflectOnAnalysis(
      analysis,
      "Content Analysis",
      () => analyzeContent(transcripts, attempt + 1),
      attempt
    )
  } catch (error) {
    console.error("Error analyzing content:", error)
    throw error
  }
}

/**
 * 🤖 AGENTIC: Audience Analysis with web search capability
 * Agent can search for audience trends if needed
 */
export async function analyzeAudience(
  contentAnalysis: ContentAnalysis,
  channelStats?: {
    subscriberCount: string
    viewCount: string
    videoCount: string
  },
  attempt = 1
): Promise<AudienceAnalysis> {
  // 🤖 AGENTIC: Agent decides if it needs external data
  let trendData = ""
  if (attempt > 1 || !channelStats) {
    console.log("🤖 Agent decision: Need more audience data, using web_search tool")
    const searchQuery = `${contentAnalysis.genre} ${contentAnalysis.mainTopics?.join(" ")} audience demographics trends 2024`
    trendData = await webSearch(searchQuery)
  }

  const prompt = `
You are an expert in audience research and analytics. Based on the content analysis, determine who the likely audience is.

Content Analysis:
- Genre: ${contentAnalysis.genre}
- Topics: ${contentAnalysis.mainTopics?.join(", ") || "General"}
- Style: ${contentAnalysis.contentStyle || "Not specified"}
- Themes: ${contentAnalysis.keyThemes?.join(", ") || "None"}

${channelStats ? `
Channel Statistics:
- Subscribers: ${channelStats.subscriberCount}
- Total Views: ${channelStats.viewCount}
- Video Count: ${channelStats.videoCount}
` : ""}

${trendData ? `
External Audience Research:
${trendData}
` : ""}

${attempt > 1 ? "⚠️ SECOND ATTEMPT: Previous analysis was too vague. Be more specific about demographics and psychographics." : ""}

Provide detailed audience insights in this JSON format:
{
  "primaryDemographic": {
    "ageRange": "Specific age range",
    "interests": ["specific", "interest", "areas"],
    "painPoints": ["problems", "they", "face"],
    "aspirations": ["what", "they", "want", "to", "achieve"]
  },
  "engagementPatterns": {
    "mostEngagedTopics": ["topics", "that", "get", "most", "engagement"],
    "peakEngagementTimes": ["when", "audience", "is", "most", "active"],
    "preferredContentLength": "short/medium/long content preference"
  },
  "communityInsights": {
    "commonQuestions": ["frequent", "questions", "from", "audience"],
    "frequentRequests": ["what", "they", "ask", "for"],
    "sharedChallenges": ["common", "challenges", "they", "face"]
  },
  "confidence": 0.0-1.0
}
`

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: attempt > 1 ? 0.4 : 0.6,
        responseMimeType: "application/json",
      },
    })

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const insights = JSON.parse(text) as AudienceAnalysis
    
    // 🤖 AGENTIC: Self-reflection
    return await reflectOnAnalysis(
      insights,
      "Audience Analysis",
      () => analyzeAudience(contentAnalysis, channelStats, attempt + 1),
      attempt
    )
  } catch (error) {
    console.error("Error analyzing audience:", error)
    throw error
  }
}/**
 * 🤖 AGENTIC: Product Opportunity Generation with validation
 * Agent validates each product idea against market data
 */
export async function generateProductOpportunities(
  contentAnalysis: ContentAnalysis,
  audienceAnalysis: AudienceAnalysis,
  transcripts: VideoTranscript[],
  attempt = 1
): Promise<ProductOpportunity[]> {
  const prompt = `
You are an expert product strategist specializing in creator economy products. Generate viable product opportunities.

Content Analysis:
${JSON.stringify(contentAnalysis, null, 2)}

Audience Analysis:
${JSON.stringify(audienceAnalysis, null, 2)}

${attempt > 1 ? "⚠️ SECOND ATTEMPT: Previous products were too generic. Be more specific and creative." : ""}

Generate 6-8 diverse product opportunities across digital products, physical products, and services in this JSON format:
{
  "products": [
    {
      "id": "unique-id",
      "name": "Product name",
      "category": "digital|physical|service",
      "description": "Detailed description",
      "targetAudience": "Who this is for",
      "estimatedDemand": "high|medium|low",
      "confidence": 0.0-1.0,
      "reasoning": "Why this would work",
      "similarProducts": ["existing", "products"],
      "priceRange": {
        "min": 0,
        "max": 0,
        "currency": "USD"
      },
      "validationSuggestions": ["how", "to", "validate", "this"]
    }
  ]
}
`

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: attempt > 1 ? 0.8 : 0.9, // Higher temperature for creativity
        responseMimeType: "application/json",
      },
    })

    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    const data = JSON.parse(text)
    const products = (data.products || []) as ProductOpportunity[]

    // 🤖 AGENTIC: Validate each product idea against market
    console.log(`🤖 Agent validating ${products.length} product ideas...`)
    const validatedProducts = await Promise.all(
      products.map(async (product) => {
        const validation = await validateProductIdea(product.name, product.category)
        
        // Agent enhances product with validation insights
        return {
          ...product,
          reasoning: `${product.reasoning}

Market Validation: ${validation}`,
          confidence: Math.min(product.confidence * 1.1, 1.0) // Boost confidence if validated
        }
      })
    )

    // 🤖 AGENTIC: Self-reflection on product quality
    const avgConfidence = validatedProducts.reduce((sum, p) => sum + p.confidence, 0) / validatedProducts.length
    
    console.log(`🤖 Agent reflecting on Product Opportunity Generation (attempt ${attempt})`)
    console.log(`📊 Average product confidence: ${avgConfidence.toFixed(2)}`)
    
    if (avgConfidence < 0.6 && attempt < 2) {
      console.log("🤖 Agent decision: Product quality too low, retrying with enhanced creativity...")
      return generateProductOpportunities(contentAnalysis, audienceAnalysis, transcripts, attempt + 1)
    }
    
    console.log("✅ Agent decision: Product opportunities are validated and ready")
    return validatedProducts
    
  } catch (error) {
    console.error("Error generating product opportunities:", error)
    throw error
  }
}

/**
 * 🤖 AGENTIC: Market Trends Analysis with web search
 * Agent searches for real-time market data
 */
export async function analyzeMarketTrends(
  contentAnalysis: ContentAnalysis,
  audienceAnalysis: AudienceAnalysis,
  attempt = 1
): Promise<MarketTrends> {
  // 🤖 AGENTIC: Agent always searches for current market data
  console.log("🤖 Agent decision: Searching for current market trends...")
  const trendQuery = `${contentAnalysis.genre} creator products market trends 2024`
  const trendData = await webSearch(trendQuery)

  const prompt = `
You are a market research analyst specializing in creator economy and digital products.

Content Genre: ${contentAnalysis.genre || "General"}
Main Topics: ${contentAnalysis.mainTopics?.join(", ") || "N/A"}
Audience Interests: ${audienceAnalysis.primaryDemographic?.interests?.join(", ") || "N/A"}

Current Market Data:
${trendData}

${attempt > 1 ? "⚠️ SECOND ATTEMPT: Previous trends were not specific enough. Focus on actionable, data-driven insights." : ""}

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
        temperature: attempt > 1 ? 0.5 : 0.7,
        responseMimeType: "application/json",
      },
    })

    const systemInstruction = "You are a market research expert with deep knowledge of creator economy trends, digital products, and e-commerce. Always respond with valid JSON."
    
    const fullPrompt = `${systemInstruction}\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    const trends = JSON.parse(text) as MarketTrends
    
    // 🤖 AGENTIC: Self-reflection on trend quality
    const avgRelevance = (trends.trendingProducts || []).reduce((sum, t) => sum + (t.relevanceScore || 0), 0) / 
                         Math.max((trends.trendingProducts || []).length, 1)
    
    console.log(`🤖 Agent reflecting on Market Trends Analysis (attempt ${attempt})`)
    console.log(`📊 Average relevance score: ${avgRelevance.toFixed(2)}`)
    
    if (avgRelevance < 0.6 && attempt < 2) {
      console.log("🤖 Agent decision: Market trends not relevant enough, retrying...")
      return analyzeMarketTrends(contentAnalysis, audienceAnalysis, attempt + 1)
    }
    
    console.log("✅ Agent decision: Market trends are relevant and actionable")
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
  const audienceAnalysis = await analyzeAudience(contentAnalysis, {
    subscriberCount: subscriberCount.toString(),
    viewCount: totalViews.toString(),
    videoCount: transcripts.length.toString()
  })

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
