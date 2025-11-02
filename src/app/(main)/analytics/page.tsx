"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, TrendingDown, Zap } from "lucide-react"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

// Generate 12-month projection data
const generateProjectionData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const marketSize = []
  const userProjection = []
  let currentMarket = 50000
  let currentUsers = 1000

  for (let i = 0; i < 12; i++) {
    // Market projection with growth
    currentMarket += currentMarket * (0.08 + Math.random() * 0.04)
    marketSize.push(Math.round(currentMarket))

    // User projection
    currentUsers += currentUsers * (0.12 + Math.random() * 0.06)
    userProjection.push(Math.round(currentUsers))
  }

  return { months, marketSize, userProjection }
}

export default function AnalyticsPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [projectionData, setProjectionData] = useState(generateProjectionData())

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-primary)]">Loading...</div>
      </div>
    )
  }

  const maxMarket = Math.max(...projectionData.marketSize)
  const maxUsers = Math.max(...projectionData.userProjection)

  // Calculate growth metrics
  const marketGrowth = ((projectionData.marketSize[11] - projectionData.marketSize[0]) / projectionData.marketSize[0] * 100).toFixed(1)
  const userGrowth = ((projectionData.userProjection[11] - projectionData.userProjection[0]) / projectionData.userProjection[0] * 100).toFixed(1)

  // Mock market growth rate
  const marketGrowthRate = 8.5 + Math.random() * 2

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Product Growth Projections
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Insights and recommendations to grow your product over the next year
          </p>
        </div>

        {/* 1. Product Market Projection */}
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <Target className="w-5 h-5 text-[var(--color-accent-primary)] flex-shrink-0" />
              <CardTitle className="text-2xl text-[var(--color-text-primary)]">
                1. Product Market Projection (12 Months)
              </CardTitle>
            </div>
            <CardDescription className="text-[var(--color-text-secondary)] mt-1">
              Projected market size growth for your product category over the next year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 relative mb-4">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((percent) => (
                  <line
                    key={percent}
                    x1="0"
                    y1={`${percent}%`}
                    x2="100%"
                    y2={`${percent}%`}
                    stroke="rgba(0, 255, 157, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area under the line */}
                <defs>
                  <linearGradient id="marketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00ff9f" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#00ff9f" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area path */}
                <path
                  d={`M 0,${300 - (projectionData.marketSize[0] / maxMarket) * 300} ${projectionData.marketSize
                    .map(
                      (value, index) =>
                        `L ${(index / (projectionData.months.length - 1)) * 1000},${300 - (value / maxMarket) * 300}`
                    )
                    .join(" ")} L ${1000},300 L 0,300 Z`}
                  fill="url(#marketGradient)"
                />
                
                {/* Line path */}
                <path
                  d={`M 0,${300 - (projectionData.marketSize[0] / maxMarket) * 300} ${projectionData.marketSize
                    .map(
                      (value, index) =>
                        `L ${(index / (projectionData.months.length - 1)) * 1000},${300 - (value / maxMarket) * 300}`
                    )
                    .join(" ")}`}
                  fill="none"
                  stroke="#00ff9f"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {projectionData.marketSize.map((value, index) => {
                  const x = (index / (projectionData.months.length - 1)) * 1000
                  const y = 300 - (value / maxMarket) * 300
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#00ff9f"
                      stroke="#0a0e0f"
                      strokeWidth="2"
                      className="hover:r-6 transition-all"
                    >
                      <title>{`${projectionData.months[index]}: $${value.toLocaleString()}`}</title>
                    </circle>
                  )
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pt-2" style={{ height: "40px" }}>
                {projectionData.months.map((month, index) => {
                  const position = (index / (projectionData.months.length - 1)) * 100
                  return (
                    <span
                      key={index}
                      className="text-xs text-[var(--color-text-secondary)] absolute"
                      style={{
                        left: `${position}%`,
                        transform: "translateX(-50%) rotate(-45deg)",
                        transformOrigin: "top left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {month}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--color-border-subtle)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-border-subtle)] hover:border-green-700/50 transition-all hover:shadow-lg hover:shadow-green-700/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-700/20 rounded-lg border border-green-700/30">
                      <DollarSign className="h-5 w-5 text-green-700" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Current Market Size
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    ${projectionData.marketSize[0].toLocaleString()}
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-border-subtle)] hover:border-green-700/50 transition-all hover:shadow-lg hover:shadow-green-700/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-700/20 rounded-lg border border-green-700/30">
                      <DollarSign className="h-5 w-5 text-green-700" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Projected in 12 Months
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    ${projectionData.marketSize[11].toLocaleString()}
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-accent-primary)]/30 hover:border-[var(--color-accent-primary)]/50 transition-all hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[var(--color-accent-primary)]/20 rounded-lg border border-[var(--color-accent-primary)]/30">
                      <ArrowUpRight className="h-5 w-5 text-[var(--color-accent-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Projected Growth
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-[var(--color-accent-primary)]">
                    +{marketGrowth}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Active Users Projection */}
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-5 h-5 text-[var(--color-accent-primary)] flex-shrink-0" />
              <CardTitle className="text-2xl text-[var(--color-text-primary)]">
                2. Active Users Projection (12 Months)
              </CardTitle>
            </div>
            <CardDescription className="text-[var(--color-text-secondary)] mt-1">
              Expected growth in active users based on market trends and product adoption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end justify-between gap-2 mb-4">
              {projectionData.months.map((month, index) => {
                const height = (projectionData.userProjection[index] / maxUsers) * 100
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="relative w-full flex items-end justify-center">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[var(--color-accent-primary)]/80 to-[var(--color-accent-primary)]/40 transition-all duration-500 hover:opacity-80"
                        style={{ height: `${height}%`, minHeight: "20px" }}
                        title={`${projectionData.userProjection[index].toLocaleString()} users`}
                      />
                    </div>
                    <span className="text-xs text-[var(--color-text-secondary)] transform -rotate-45 origin-top-left whitespace-nowrap">
                      {month}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="pt-4 border-t border-[var(--color-border-subtle)]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 transition-all hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[var(--color-accent-primary)]/20 rounded-lg border border-[var(--color-accent-primary)]/30">
                      <Users className="h-5 w-5 text-[var(--color-accent-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Current Active Users
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                    {projectionData.userProjection[0].toLocaleString()}
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 transition-all hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[var(--color-accent-primary)]/20 rounded-lg border border-[var(--color-accent-primary)]/30">
                      <Users className="h-5 w-5 text-[var(--color-accent-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Projected in 12 Months
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-[var(--color-accent-primary)]">
                    {projectionData.userProjection[11].toLocaleString()}
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-black/60 backdrop-blur-sm border-2 border-[var(--color-accent-primary)]/30 hover:border-[var(--color-accent-primary)]/50 transition-all hover:shadow-lg hover:shadow-[var(--color-accent-primary)]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[var(--color-accent-primary)]/20 rounded-lg border border-[var(--color-accent-primary)]/30">
                      <ArrowUpRight className="h-5 w-5 text-[var(--color-accent-primary)]" />
                    </div>
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                      Projected Growth
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-[var(--color-accent-primary)]">
                    +{userGrowth}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. User Growth in Market */}
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-1">
              <TrendingUp className="w-5 h-5 text-[var(--color-accent-primary)] flex-shrink-0" />
              <CardTitle className="text-2xl text-[var(--color-text-primary)]">
                3. User Growth in Market
              </CardTitle>
            </div>
            <CardDescription className="text-[var(--color-text-secondary)] mt-1">
              Market share analysis and competitive positioning for user acquisition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-black/40 border border-[var(--color-border-subtle)] flex flex-col">
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Market Growth Rate
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {marketGrowthRate.toFixed(1)}%
                  </p>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-auto">
                  Annual compound growth
                </p>
              </div>
              <div className="p-4 rounded-lg bg-black/40 border border-[var(--color-border-subtle)] flex flex-col">
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Target Market Share
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    2.5%
                  </p>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-auto">
                  Expected by year-end
                </p>
              </div>
              <div className="p-4 rounded-lg bg-black/40 border border-[var(--color-border-subtle)] flex flex-col">
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  Acquisition Rate
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {userGrowth}%
                  </p>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-auto">
                  Projected user growth
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[var(--color-accent-glow)]/20 border border-[var(--color-accent-primary)]/30">
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                💡 Growth Recommendation
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Focus on content marketing and social media engagement to capture the projected {userGrowth}% user growth. 
                The market is growing at {marketGrowthRate.toFixed(1)}% annually, indicating strong potential for market penetration.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Recent Trends */}
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-[var(--color-accent-primary)]" />
              <CardTitle className="text-2xl text-[var(--color-text-primary)]">
                4. Recent Trends
              </CardTitle>
            </div>
            <CardDescription className="text-[var(--color-text-secondary)]">
              Emerging trends and opportunities in your product category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  trend: "Video Content Demand",
                  description: "Consumer demand for video-based products increased 35% this quarter",
                  impact: "High",
                  category: "Content Format",
                  recommendation: "Consider expanding video product offerings",
                },
                {
                  trend: "Mobile-First Products",
                  description: "Mobile-optimized products show 28% higher engagement rates",
                  impact: "Medium",
                  category: "Platform",
                  recommendation: "Prioritize mobile experience optimization",
                },
                {
                  trend: "Subscription Model Growth",
                  description: "Subscription-based products grew 42% faster than one-time purchases",
                  impact: "High",
                  category: "Business Model",
                  recommendation: "Evaluate subscription pricing options",
                },
                {
                  trend: "AI-Enhanced Features",
                  description: "Products with AI features show 52% higher retention rates",
                  impact: "High",
                  category: "Technology",
                  recommendation: "Integrate AI-powered features into your product",
                },
                {
                  trend: "Community Building",
                  description: "Products with community features have 67% more active users",
                  impact: "Medium",
                  category: "Engagement",
                  recommendation: "Add community forums or discussion groups",
                },
              ].map((trend, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-black/40 border border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-[var(--color-accent-primary)]" />
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {trend.trend}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30">
                          {trend.category}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                        {trend.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--color-text-secondary)]">
                          Impact:
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            trend.impact === "High"
                              ? "text-[var(--color-accent-primary)]"
                              : "text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {trend.impact}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
                    <p className="text-xs text-[var(--color-text-secondary)] mb-1">
                      💡 Recommendation:
                    </p>
                    <p className="text-sm text-[var(--color-text-primary)]">
                      {trend.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

