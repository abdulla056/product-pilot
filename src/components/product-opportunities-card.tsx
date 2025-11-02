import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ProductOpportunity } from "@/types/analysis"
import { 
  Package, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Lightbulb,
  CheckCircle,
  Clock,
  Zap,
  Heart,
  BarChart3,
  Monitor,
  Box,
  Handshake
} from "lucide-react"

interface ProductOpportunitiesProps {
  opportunities: ProductOpportunity[]
}

export function ProductOpportunitiesCard({ opportunities }: ProductOpportunitiesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "digital":
        return Monitor
      case "physical":
        return Box
      case "service":
        return Handshake
      default:
        return Lightbulb
    }
  }

  const getCategoryIconColor = (category: string) => {
    switch (category) {
      case "digital":
        return "text-[var(--color-accent-secondary)]" // Neon Cyan for digital
      case "physical":
        return "text-[var(--color-accent-warning)]" // Neon Orange for physical
      case "service":
        return "text-[var(--color-accent-tertiary)]" // Neon Magenta for service
      default:
        return "text-[var(--color-accent-primary)]" // Neon Green default
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]"
      case "medium":
        return "bg-[var(--color-bg-glass)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]"
      case "low":
        return "bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]"
      default:
        return "bg-[var(--color-bg-base)] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-[var(--color-accent-primary)]"
    if (score >= 60) return "text-[var(--color-text-secondary)]"
    return "text-[var(--color-text-secondary)]/50"
  }
  const sortedOpportunities = [...opportunities].sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0))

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between bg-[var(--color-bg-card)] rounded-lg shadow-sm p-4 border-2 border-[var(--color-border-subtle)]">
        <div>
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Product Opportunities</h3>
          <p className="text-[var(--color-text-secondary)]">AI-generated product ideas based on your content and audience</p>
        </div>
        <Badge className="bg-[var(--color-accent-primary)] text-[var(--color-text-dark)]">
          {opportunities.length} opportunities found
        </Badge>
      </div>

      <Tabs defaultValue={sortedOpportunities[0]?.id} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-2">
          {sortedOpportunities.map((product) => {
            const Icon = getCategoryIcon(product.category)
            const iconColor = getCategoryIconColor(product.category)
            return (
            <TabsTrigger 
              key={product.id} 
              value={product.id}
              className="flex items-center gap-2 data-[state=active]:bg-[var(--color-bg-glass)] data-[state=active]:border-[var(--color-accent-primary)] data-[state=active]:text-[var(--color-text-primary)]"
            >
              <Icon className={`h-4 w-4 ${iconColor}`} />
              <span className="truncate max-w-[150px]">{product.name}</span>
              <Badge 
                variant="secondary" 
                className={`${getScoreColor(product.overallRating || 0)} border-0 font-bold ml-1`}
              >
                {product.overallRating || 0}
              </Badge>
            </TabsTrigger>
            )
          })}
        </TabsList>

        {sortedOpportunities.map((product) => {
          const Icon = getCategoryIcon(product.category)
          const iconColor = getCategoryIconColor(product.category)
          return (
          <TabsContent key={product.id} value={product.id} className="mt-4">
            <Card className="shadow-lg bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon className={`h-10 w-10 ${iconColor}`} />
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-[var(--color-text-primary)]">{product.name}</CardTitle>
                    <CardDescription className="mt-2 text-base text-[var(--color-text-secondary)]">{product.targetAudience}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className="capitalize border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                    {product.category}
                  </Badge>
                  <Badge className={getDemandColor(product.estimatedDemand)}>
                    {product.estimatedDemand} demand
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${getScoreColor(product.overallRating || 0)} border-0 font-bold`}
                  >
                    ⭐ {product.overallRating || 0}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)]">{product.description}</p>

                {/* Business Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Profitability */}
                  <div className={` rounded-lg p-3 border-2 border-[var(--color-border-subtle)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-[var(--color-accent-primary)]" />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Profitability</span>
                    </div>
                    <div className={`text-2xl font-bold`}>
                      {product.profitability?.score || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                      {product.profitability?.estimatedMargin || "N/A"}
                    </div>
                  </div>

                  {/* Viability */}
                  <div className={`rounded-lg p-3 border-2 border-[var(--color-border-subtle)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-[var(--color-accent-secondary)]" />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Viability</span>
                    </div>
                    <div className={`text-2xl font-bold`}>
                      {product.viability?.score || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {product.viability?.timeToMarket || "N/A"}
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div className={`rounded-lg p-3 border-2 border-[var(--color-border-subtle)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-[var(--color-accent-tertiary)]" />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Sustainability</span>
                    </div>
                    <div className={`text-2xl font-bold `}>
                      {product.sustainability?.score || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 truncate">
                      {product.sustainability?.longTermPotential?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Opportunity */}
                  <div className={` rounded-lg p-3 border-2 border-[var(--color-border-subtle)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4 text-[var(--color-accent-warning)]" />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Opportunity</span>
                    </div>
                    <div className={`text-2xl font-bold `}>
                      {product.opportunity?.score || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 truncate">
                      {product.opportunity?.marketGap?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Impact */}
                  <div className={`rounded-lg p-3 border-2 border-[var(--color-border-subtle)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="h-4 w-4 text-[var(--color-accent-tertiary)]" />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Impact</span>
                    </div>
                    <div className={`text-2xl font-bold`}>
                      {product.impact?.score || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1 truncate">
                      {product.impact?.audienceValue?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Overall Rating */}
                  <div className={`rounded-lg p-3 border-2 border-[var(--color-accent-primary)]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className={`h-4 w-4 `} />
                      <span className="text-xs font-semibold text-[var(--color-text-secondary)]">Overall</span>
                    </div>
                    <div className={`text-2xl font-bold `}>
                      {product.overallRating || 0}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                      Weighted average
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex items-center gap-2 text-sm bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] p-3 rounded-lg">
                  <DollarSign className="h-4 w-4 text-[var(--color-accent-primary)]" />
                  <span className="font-semibold text-[var(--color-text-primary)]">
                    Price Range: ${product.priceRange.min} - ${product.priceRange.max} {product.priceRange.currency}
                  </span>
                </div>

                {/* Detailed Analysis Sections */}
                <div className="space-y-3">
                  {/* Profitability Analysis */}
                  {product.profitability?.analysis && (
                    <div className="bg-[var(--color-bg-glass)] rounded-lg p-3 border border-[var(--color-accent-primary)]">
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-[var(--color-accent-primary)] mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Profitability Analysis</h5>
                          <p className="text-xs text-[var(--color-text-secondary)]">{product.profitability.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Viability Analysis */}
                  {product.viability?.analysis && (
                    <div className="bg-[var(--color-bg-glass)] rounded-lg p-3 border border-[var(--color-border-subtle)]">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[var(--color-accent-secondary)] mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Viability Analysis</h5>
                          <p className="text-xs text-[var(--color-text-secondary)]">{product.viability.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Opportunity Analysis */}
                  {product.opportunity?.analysis && (
                    <div className="bg-[var(--color-bg-glass)] rounded-lg p-3 border border-[var(--color-border-subtle)]">
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-[var(--color-accent-warning)] mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Market Opportunity</h5>
                          <p className="text-xs text-[var(--color-text-secondary)]">{product.opportunity.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reasoning */}
                <div className="bg-[var(--color-accent-glow)] rounded-lg p-3 border border-[var(--color-accent-primary)]">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-[var(--color-accent-primary)] mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">Why this works</h5>
                      <p className="text-xs text-[var(--color-text-secondary)]">{product.reasoning}</p>
                    </div>
                  </div>
                </div>

                {/* Validation Suggestions */}
                {product.validationSuggestions && product.validationSuggestions.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-1">
                      <Target className="h-3 w-3 text-[var(--color-accent-secondary)]" />
                      Validation Steps:
                    </h5>
                    <ul className="space-y-1">
                      {product.validationSuggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={index} className="text-xs text-[var(--color-text-secondary)] flex items-start">
                          <span className="text-[var(--color-accent-primary)] mr-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Similar Products */}
                {product.similarProducts && product.similarProducts.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-[var(--color-text-primary)] mb-2">Similar Products:</h5>
                    <div className="flex flex-wrap gap-1">
                      {product.similarProducts.slice(0, 4).map((similar, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]">
                          {similar}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
