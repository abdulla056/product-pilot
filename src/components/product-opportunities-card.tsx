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

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "bg-green-100 text-green-700 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-100"
    if (score >= 60) return "bg-yellow-100"
    return "bg-red-100"
  }

  const sortedOpportunities = [...opportunities].sort((a, b) => (b.overallRating || 0) - (a.overallRating || 0))

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Product Opportunities</h3>
          <p className="text-gray-600">AI-generated product ideas based on your content and audience</p>
        </div>
        <Badge className="bg-purple-600 text-white">
          {opportunities.length} opportunities found
        </Badge>
      </div>

      <Tabs defaultValue={sortedOpportunities[0]?.id} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-gray-100 p-2">
          {sortedOpportunities.map((product) => {
            const Icon = getCategoryIcon(product.category)
            return (
            <TabsTrigger 
              key={product.id} 
              value={product.id}
              className="flex items-center gap-2 data-[state=active]:bg-white"
            >
              <Icon className="h-4 w-4" />
              <span className="truncate max-w-[150px]">{product.name}</span>
              <Badge 
                variant="secondary" 
                className={`${getScoreBgColor(product.overallRating || 0)} ${getScoreColor(product.overallRating || 0)} border-0 font-bold ml-1`}
              >
                {product.overallRating || 0}
              </Badge>
            </TabsTrigger>
            )
          })}
        </TabsList>

        {sortedOpportunities.map((product) => {
          const Icon = getCategoryIcon(product.category)
          return (
          <TabsContent key={product.id} value={product.id} className="mt-4">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Icon className="h-10 w-10 text-purple-600" />
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="mt-2 text-base">{product.targetAudience}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                  <Badge className={getDemandColor(product.estimatedDemand)}>
                    {product.estimatedDemand} demand
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${getScoreBgColor(product.overallRating || 0)} ${getScoreColor(product.overallRating || 0)} border-0 font-bold`}
                  >
                    ⭐ {product.overallRating || 0}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-sm text-gray-600">{product.description}</p>

                {/* Business Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Profitability */}
                  <div className={`${getScoreBgColor(product.profitability?.score || 0)} rounded-lg p-3 border-2 border-gray-100`}>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className={`h-4 w-4 ${getScoreColor(product.profitability?.score || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Profitability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.profitability?.score || 0)}`}>
                      {product.profitability?.score || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {product.profitability?.estimatedMargin || "N/A"}
                    </div>
                  </div>

                  {/* Viability */}
                  <div className={`${getScoreBgColor(product.viability?.score || 0)} rounded-lg p-3 border-2 border-gray-100`}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className={`h-4 w-4 ${getScoreColor(product.viability?.score || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Viability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.viability?.score || 0)}`}>
                      {product.viability?.score || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {product.viability?.timeToMarket || "N/A"}
                    </div>
                  </div>

                  {/* Sustainability */}
                  <div className={`${getScoreBgColor(product.sustainability?.score || 0)} rounded-lg p-3 border-2 border-gray-100`}>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className={`h-4 w-4 ${getScoreColor(product.sustainability?.score || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Sustainability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.sustainability?.score || 0)}`}>
                      {product.sustainability?.score || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {product.sustainability?.longTermPotential?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Opportunity */}
                  <div className={`${getScoreBgColor(product.opportunity?.score || 0)} rounded-lg p-3 border-2 border-gray-100`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className={`h-4 w-4 ${getScoreColor(product.opportunity?.score || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Opportunity</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.opportunity?.score || 0)}`}>
                      {product.opportunity?.score || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {product.opportunity?.marketGap?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Impact */}
                  <div className={`${getScoreBgColor(product.impact?.score || 0)} rounded-lg p-3 border-2 border-gray-100`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className={`h-4 w-4 ${getScoreColor(product.impact?.score || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Impact</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.impact?.score || 0)}`}>
                      {product.impact?.score || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      {product.impact?.audienceValue?.substring(0, 20) || "N/A"}...
                    </div>
                  </div>

                  {/* Overall Rating */}
                  <div className={`${getScoreBgColor(product.overallRating || 0)} rounded-lg p-3 border-2 border-purple-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className={`h-4 w-4 ${getScoreColor(product.overallRating || 0)}`} />
                      <span className="text-xs font-semibold text-gray-700">Overall</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(product.overallRating || 0)}`}>
                      {product.overallRating || 0}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Weighted average
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-gray-700">
                    Price Range: ${product.priceRange.min} - ${product.priceRange.max} {product.priceRange.currency}
                  </span>
                </div>

                {/* Detailed Analysis Sections */}
                <div className="space-y-3">
                  {/* Profitability Analysis */}
                  {product.profitability?.analysis && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                      <div className="flex items-start gap-2">
                        <DollarSign className="h-4 w-4 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-green-900 mb-1">Profitability Analysis</h5>
                          <p className="text-xs text-green-700">{product.profitability.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Viability Analysis */}
                  {product.viability?.analysis && (
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-blue-900 mb-1">Viability Analysis</h5>
                          <p className="text-xs text-blue-700">{product.viability.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Opportunity Analysis */}
                  {product.opportunity?.analysis && (
                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                      <div className="flex items-start gap-2">
                        <Zap className="h-4 w-4 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="text-xs font-semibold text-purple-900 mb-1">Market Opportunity</h5>
                          <p className="text-xs text-purple-700">{product.opportunity.analysis}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Reasoning */}
                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-amber-900 mb-1">Why this works</h5>
                      <p className="text-xs text-amber-700">{product.reasoning}</p>
                    </div>
                  </div>
                </div>

                {/* Validation Suggestions */}
                {product.validationSuggestions && product.validationSuggestions.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Validation Steps:
                    </h5>
                    <ul className="space-y-1">
                      {product.validationSuggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start">
                          <span className="text-purple-400 mr-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Similar Products */}
                {product.similarProducts && product.similarProducts.length > 0 && (
                  <div>
                    <h5 className="text-xs font-semibold text-gray-700 mb-2">Similar Products:</h5>
                    <div className="flex flex-wrap gap-1">
                      {product.similarProducts.slice(0, 4).map((similar, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
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
