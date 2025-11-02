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
import { getOnboardingPreferences } from "@/lib/onboarding-storage"
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
      // Get user preferences
      const preferences = getOnboardingPreferences()
      
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channelId,
          videoCount: 10,
          useMockData: true,
          preferences: preferences ? {
            strategy: preferences.strategy,
            productModel: preferences.productModel,
            budget: preferences.budget,
          } : undefined,
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
        
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
          <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-[var(--color-bg-glass)] rounded-full">
              <Sparkles className="h-8 w-8 text-[var(--color-accent-primary)]" />
            </div>
          </div>
          <CardTitle className="text-2xl text-[var(--color-text-primary)]">AI-Powered Product Discovery</CardTitle>
          <CardDescription className="text-base text-[var(--color-text-secondary)]">
            Analyze your YouTube content to discover viable product opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-4">
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">What You'll Get:</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-accent-primary)] mt-0.5" />
                <span><strong>Content Analysis:</strong> AI identifies your content genre, style, and expertise areas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-accent-secondary)] mt-0.5" />
                <span><strong>Audience Insights:</strong> Deep dive into demographics, pain points, and aspirations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-accent-tertiary)] mt-0.5" />
                <span><strong>Product Opportunities:</strong> 6-8 viable product ideas (digital, physical, service)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-accent-warning)] mt-0.5" />
                <span><strong>Market Trends:</strong> Current trends and competitor insights in your niche</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-accent-primary)] mt-0.5" />
                <span><strong>Validation Strategy:</strong> Step-by-step suggestions to test demand</span>
              </li>
            </ul>
          </div>

          <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-[var(--color-accent-primary)] mt-0.5" />
              <div>
                <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">Analysis Time & Requirements</h5>
                <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                  This process will:
                </p>
                <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
                  <li>Fetch your last 10 videos from YouTube</li>
                  <li>Download video transcripts/captions</li>
                  <li>Analyze content with AI (Gemini 2.0)</li>
                  <li>Takes 1-2 minutes depending on video length</li>
                </ul>
                <p className="text-xs text-[var(--color-text-secondary)] mt-2 font-semibold">
                  ⚠️ Your videos must have captions/subtitles enabled (auto-generated or manual)
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-[var(--color-bg-glass)] border border-[var(--color-accent-primary)] rounded-lg p-4">
              <p className="text-sm text-[var(--color-accent-primary)]">{error}</p>
            </div>
          )}

          <Button
            onClick={runAnalysis}
            disabled={loading}
            className="w-full bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-primary)]/80 text-[var(--color-text-dark)]"
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
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">Analysis Results</h2>
          <p className="text-[var(--color-text-secondary)] mt-1">
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
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Total Views</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">{analysis.totalViews.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Subscribers</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">{analysis.subscriberCount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Product Ideas</p>
              <p className="text-3xl font-bold text-[var(--color-primary)]">{analysis.productOpportunities.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Opportunities - Highlighted First */}
      <ProductOpportunitiesCard opportunities={analysis.productOpportunities} />

      {/* Analysis Cards - Full Width & Collapsible */}
      <div className="space-y-4">
        {/* Content Analysis */}
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[var(--color-bg-glass)] rounded-lg">
                  <Brain className="h-5 w-5 text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <CardTitle className="text-lg text-[var(--color-text-primary)]">Content Analysis</CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)]">AI-powered analysis of your content patterns</CardDescription>
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
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[var(--color-bg-glass)] rounded-lg">
                  <Users className="h-5 w-5 text-[var(--color-accent-tertiary)]" />
                </div>
                <div>
                  <CardTitle className="text-lg text-[var(--color-text-primary)]">Audience Insights</CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)]">Deep analysis of your audience demographics</CardDescription>
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
        <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)] hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-[var(--color-bg-glass)] rounded-lg">
                  <TrendingUp className="h-5 w-5 text-[var(--color-accent-warning)]" />
                </div>
                <div>
                  <CardTitle className="text-lg text-[var(--color-text-primary)]">Market Trends</CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)]">Current trends relevant to your niche</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-[var(--color-bg-glass)] text-[var(--color-accent-primary)] border border-[var(--color-border-subtle)]">
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
      <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-accent-primary)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-[var(--color-text-primary)]">🎯 Recommended Next Steps</CardTitle>
              <CardDescription className="text-[var(--color-text-secondary)]">Based on AI analysis, here's what to focus on</CardDescription>
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
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Top Priority Products</h4>
            <div className="space-y-2">
              {analysis.recommendations.topProducts.map((product) => (
                <div key={product.id} className="bg-[var(--color-bg-glass)] rounded-lg p-3 border border-[var(--color-border-subtle)]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[var(--color-text-primary)]">{product.name}</span>
                    <span className="text-sm text-[var(--color-accent-primary)]">{Math.round(product.confidence * 100)}% match</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{product.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Quick Wins (Start This Week)</h4>
            <div className="space-y-2">
              {analysis.recommendations.quickWins.map((product) => (
                <div key={product.id} className="bg-[var(--color-bg-glass)] rounded-lg p-3 border border-[var(--color-border-subtle)]">
                  <span className="font-medium text-[var(--color-text-primary)]">{product.name}</span>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">Low effort, high value - start validating today!</p>
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
