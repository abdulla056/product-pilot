"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ContentAnalysisCard } from "@/components/content-analysis-card"
import { AudienceAnalysisCard } from "@/components/audience-analysis-card"
import { ProductOpportunitiesCard } from "@/components/product-opportunities-card"
import { MarketTrendsCard } from "@/components/market-trends-card"
import { AIAnalysisProgress } from "@/components/ai-analysis-progress"
import type { CreatorGraph } from "@/types/analysis"
import { Sparkles, Loader2, CheckCircle, AlertCircle, Brain, Users, TrendingUp, Package, ChevronDown, ChevronUp } from "lucide-react"

interface AnalysisDashboardProps {
  channelId: string
  channelName: string
}

export function AnalysisDashboard({ channelId, channelName }: AnalysisDashboardProps) {
  const [analysis, setAnalysis] = useState<CreatorGraph | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showProgress, setShowProgress] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['content', 'audience', 'market', 'recommendations'])
  )

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const runAnalysis = async () => {
    setLoading(true)
    setShowProgress(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelId,
          videoCount: 10,
          depth: "standard",
          useMockData: true,  // Use real YouTube data and transcription
        }),
      })

      const data = await response.json()

      if (data.success) {
        setAnalysis(data.data)
      } else {
        setError(data.error || "Analysis failed")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run analysis")
    } finally {
      setLoading(false)
      // Keep the dialog open for a moment to show completion
      setTimeout(() => setShowProgress(false), 500)
    }
  }

  if (!analysis) {
    return (
      <>
        <AIAnalysisProgress open={showProgress} onOpenChange={setShowProgress} />
        
        <Card className="border-2 border-purple-200">
          <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 rounded-full">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">AI-Powered Product Discovery</CardTitle>
          <CardDescription className="text-base">
            Analyze your YouTube content to discover viable product opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">What You'll Get:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span><strong>Content Analysis:</strong> AI identifies your content genre, style, and expertise areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span><strong>Audience Insights:</strong> Deep dive into demographics, pain points, and aspirations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span><strong>Product Opportunities:</strong> 6-8 viable product ideas (digital, physical, service)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span><strong>Market Trends:</strong> Current trends and competitor insights in your niche</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span><strong>Validation Strategy:</strong> Step-by-step suggestions to test demand</span>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h5 className="font-semibold text-yellow-900 text-sm mb-1">Analysis Time & Requirements</h5>
                <p className="text-xs text-yellow-700 mb-2">
                  This process will:
                </p>
                <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                  <li>Fetch your last 10 videos from YouTube</li>
                  <li>Download video transcripts/captions</li>
                  <li>Analyze content with AI (Gemini 2.0)</li>
                  <li>Takes 1-2 minutes depending on video length</li>
                </ul>
                <p className="text-xs text-yellow-700 mt-2 font-semibold">
                  ⚠️ Your videos must have captions/subtitles enabled (auto-generated or manual)
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Your Content...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze My YouTube Videos
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            ✨ Using real YouTube transcription + AI analysis
          </p>
        </CardContent>
      </Card>
      </>
    )
  }

  return (
    <>
      <AIAnalysisProgress open={showProgress} onOpenChange={setShowProgress} />
      
      <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
          <p className="text-gray-600 mt-1">
            For {channelName} • {analysis.totalVideos} videos analyzed • {new Date(analysis.analysisDate).toLocaleDateString()}
          </p>
        </div>
        <Button onClick={runAnalysis} variant="secondary" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Refresh Analysis
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">{analysis.totalViews.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Subscribers</p>
              <p className="text-3xl font-bold text-blue-600">{analysis.subscriberCount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Product Ideas</p>
              <p className="text-3xl font-bold text-green-600">{analysis.productOpportunities.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Opportunities - Highlighted First */}
      <ProductOpportunitiesCard opportunities={analysis.productOpportunities} />

      {/* Analysis Cards - Full Width & Collapsible */}
      <div className="space-y-4">
        {/* Content Analysis */}
        <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Content Analysis</CardTitle>
                  <CardDescription>AI-powered analysis of your content patterns</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={(analysis.contentAnalysis.confidence || 0) > 0.8 ? "default" : "secondary"}>
                  {Math.round((analysis.contentAnalysis.confidence || 0) * 100)}%
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('content')}
                  className="flex items-center gap-2"
                >
                  {expandedSections.has('content') ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          {expandedSections.has('content') && (
            <CardContent>
              <ContentAnalysisCard analysis={analysis.contentAnalysis} />
            </CardContent>
          )}
        </Card>

        {/* Audience Insights */}
        <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Audience Insights</CardTitle>
                  <CardDescription>Deep analysis of your audience demographics</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={(analysis.audienceAnalysis.confidence || 0) > 0.8 ? "default" : "secondary"}>
                  {Math.round((analysis.audienceAnalysis.confidence || 0) * 100)}%
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('audience')}
                  className="flex items-center gap-2"
                >
                  {expandedSections.has('audience') ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          {expandedSections.has('audience') && (
            <CardContent>
              <AudienceAnalysisCard analysis={analysis.audienceAnalysis} />
            </CardContent>
          )}
        </Card>

        {/* Market Trends */}
        <Card className="border-2 border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Market Trends</CardTitle>
                  <CardDescription>Current trends relevant to your niche</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {analysis.marketTrends.trendingProducts?.length || 0} trends
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('market')}
                  className="flex items-center gap-2"
                >
                  {expandedSections.has('market') ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          {expandedSections.has('market') && (
            <CardContent>
              <MarketTrendsCard trends={analysis.marketTrends} />
            </CardContent>
          )}
        </Card>
      </div>

      {/* Recommendations Summary */}
      <Card className="border-2 border-green-200 bg-linear-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">🎯 Recommended Next Steps</CardTitle>
              <CardDescription>Based on AI analysis, here's what to focus on</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection('recommendations')}
              className="flex items-center gap-2"
            >
              {expandedSections.has('recommendations') ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        {expandedSections.has('recommendations') && (
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Top Priority Products</h4>
            <div className="space-y-2">
              {analysis.recommendations.topProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <span className="text-sm text-green-700">{Math.round(product.confidence * 100)}% match</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quick Wins (Start This Week)</h4>
            <div className="space-y-2">
              {analysis.recommendations.quickWins.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-3 border border-blue-200">
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <p className="text-sm text-gray-600 mt-1">Low effort, high value - start validating today!</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        )}
      </Card>
      </div>
    </>
  )
}
