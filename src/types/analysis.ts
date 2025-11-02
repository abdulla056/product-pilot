/**
 * Types for AI-powered creator analysis and product recommendation system
 */

export interface VideoTranscript {
  videoId: string
  title: string
  description: string
  publishedAt: string
  transcript: string
  duration: string
  viewCount: number
  likeCount: number
  commentCount: number
  tags?: string[]
}

export interface ContentAnalysis {
  genre: string
  subGenres: string[]
  mainTopics: string[]
  contentStyle: string
  contentTone: string
  keyThemes: string[]
  expertise: string[]
  confidence: number
}

export interface AudienceAnalysis {
  primaryDemographic: {
    ageRange: string
    interests: string[]
    painPoints: string[]
    aspirations: string[]
  }
  engagementPatterns: {
    mostEngagedTopics: string[]
    peakEngagementTimes: string[]
    preferredContentLength: string
  }
  communityInsights: {
    commonQuestions: string[]
    frequentRequests: string[]
    sharedChallenges: string[]
  }
  confidence: number
}

export interface ProductOpportunity {
  id: string
  name: string
  category: "digital" | "physical" | "service"
  description: string
  targetAudience: string
  estimatedDemand: "high" | "medium" | "low"
  confidence: number
  reasoning: string
  similarProducts: string[]
  priceRange: {
    min: number
    max: number
    currency: string
  }
  validationSuggestions: string[]
  // Business metrics (optional for backwards compatibility)
  profitability?: {
    score: number // 0-100
    analysis: string
    estimatedMargin: string // e.g., "40-60%"
  }
  viability?: {
    score: number // 0-100
    analysis: string
    timeToMarket: string // e.g., "2-4 weeks"
  }
  sustainability?: {
    score: number // 0-100
    analysis: string
    longTermPotential: string
  }
  opportunity?: {
    score: number // 0-100
    analysis: string
    marketGap: string
  }
  impact?: {
    score: number // 0-100
    analysis: string
    audienceValue: string
  }
  overallRating?: number // 0-100 (weighted average of all scores)
}

export interface MarketTrends {
  trendingProducts: Array<{
    name: string
    category: string
    growthRate: string
    relevanceScore: number
    description: string
  }>
  emergingNiches: string[]
  seasonalOpportunities: Array<{
    season: string
    products: string[]
  }>
  competitorInsights: Array<{
    creator: string
    products: string[]
    successMetrics: string
  }>
}

export interface CreatorGraph {
  creatorId: string
  channelId: string
  channelName: string
  totalVideos: number
  totalViews: number
  subscriberCount: number
  analysisDate: string
  transcripts: VideoTranscript[]
  contentAnalysis: ContentAnalysis
  audienceAnalysis: AudienceAnalysis
  productOpportunities: ProductOpportunity[]
  marketTrends: MarketTrends
  recommendations: {
    topProducts: ProductOpportunity[]
    quickWins: ProductOpportunity[]
    longTermBets: ProductOpportunity[]
  }
}

export interface AnalysisRequest {
  userId: string
  channelId?: string
  videoCount?: number
  depth?: "quick" | "standard" | "deep"
  useMockData?: boolean
  preferences?: {
    strategy?: "audience-first" | "market-first" | "balanced"
    productModel?: "digital" | "physical" | "both"
    budget?: "zero" | "small" | "all"
  }
}

export interface AnalysisResponse {
  success: boolean
  data?: CreatorGraph
  error?: string
  processingTime?: number
}
