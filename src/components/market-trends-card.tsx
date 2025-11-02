import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { MarketTrends } from "@/types/analysis"
import { TrendingUp, Sparkles, Calendar, Users } from "lucide-react"

interface MarketTrendsCardProps {
  trends: MarketTrends
}

export function MarketTrendsCard({ trends }: MarketTrendsCardProps) {
  return (
    <div className="space-y-6">
      {/* Trending Products */}
        {trends.trendingProducts && trends.trendingProducts.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--color-accent-primary)]" />
              Trending Products
            </h4>
            <div className="space-y-3">
              {trends.trendingProducts.slice(0, 4).map((product, index) => (
                <div key={index} className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-[var(--color-text-primary)] text-sm">{product.name}</h5>
                      <p className="text-xs text-[var(--color-text-secondary)]">{product.category}</p>
                    </div>
                    <Badge className="bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]">
                      {product.growthRate}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">{product.description}</p>
                  <div className="mt-2">
                    <span className="text-xs font-medium text-[var(--color-accent-primary)]">
                      Relevance: {Math.round((product.relevanceScore || 0) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emerging Niches */}
        {trends.emergingNiches && trends.emergingNiches.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Emerging Niches</h4>
            <div className="flex flex-wrap gap-2">
              {trends.emergingNiches.map((niche, index) => (
                <Badge key={index} variant="secondary" className="bg-[var(--color-bg-glass)] text-[var(--color-accent-primary)] border border-[var(--color-border-subtle)]">
                  {niche}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Seasonal Opportunities */}
        {trends.seasonalOpportunities && trends.seasonalOpportunities.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--color-accent-primary)]" />
              Seasonal Opportunities
            </h4>
            <div className="space-y-2">
              {trends.seasonalOpportunities.map((season, index) => (
                <div key={index} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-glass)] rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">{season.season}</h5>
                  <div className="flex flex-wrap gap-1">
                    {season.products && season.products.map((product, pIndex) => (
                      <Badge key={pIndex} variant="outline" className="text-xs border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competitor Insights */}
        {trends.competitorInsights && trends.competitorInsights.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--color-accent-primary)]" />
              Successful Creators
            </h4>
            <div className="space-y-2">
              {trends.competitorInsights.slice(0, 3).map((competitor, index) => (
                <div key={index} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-glass)] rounded-lg p-3">
                  <h5 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">{competitor.creator}</h5>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2">{competitor.successMetrics}</p>
                  <div className="flex flex-wrap gap-1">
                    {competitor.products && competitor.products.map((product, pIndex) => (
                      <Badge key={pIndex} variant="outline" className="text-xs border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}
