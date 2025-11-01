import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProductOpportunity } from "@/types/analysis"
import { Package, DollarSign, Target, TrendingUp, Lightbulb } from "lucide-react"

interface ProductOpportunitiesProps {
  opportunities: ProductOpportunity[]
}

export function ProductOpportunitiesCard({ opportunities }: ProductOpportunitiesProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "digital":
        return "💻"
      case "physical":
        return "📦"
      case "service":
        return "🤝"
      default:
        return "💡"
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

  const sortedOpportunities = [...opportunities].sort((a, b) => b.confidence - a.confidence)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Product Opportunities</h3>
          <p className="text-gray-600">AI-generated product ideas based on your content and audience</p>
        </div>
        <Badge className="bg-purple-600 text-white">
          {opportunities.length} opportunities found
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sortedOpportunities.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{getCategoryIcon(product.category)}</span>
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="mt-1">{product.targetAudience}</CardDescription>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="capitalize">
                  {product.category}
                </Badge>
                <Badge className={getDemandColor(product.estimatedDemand)}>
                  {product.estimatedDemand} demand
                </Badge>
                <Badge variant="secondary">
                  {Math.round(product.confidence * 100)}% match
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-gray-600">{product.description}</p>

              {/* Price Range */}
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-gray-700">
                  ${product.priceRange.min} - ${product.priceRange.max} {product.priceRange.currency}
                </span>
              </div>

              {/* Reasoning */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-blue-900 mb-1">Why this works</h5>
                    <p className="text-xs text-blue-700">{product.reasoning}</p>
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
                    {product.validationSuggestions.slice(0, 2).map((suggestion, index) => (
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
                    {product.similarProducts.slice(0, 3).map((similar, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {similar}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <Button className="w-full bg-purple-600 hover:bg-purple-700" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Start Validation
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
