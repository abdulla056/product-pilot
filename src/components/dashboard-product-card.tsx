import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"

export interface DashboardProduct {
  id: string
  name: string
  summary: string
  profitability: number // 1-5
  viability: number // 1-5
  sustainability: number // 1-5
}

interface DashboardProductCardProps {
  product: DashboardProduct
}

export function DashboardProductCard({ product }: DashboardProductCardProps) {
  return (
    <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{product.name}</h3>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Rating Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Profitability</span>
            <StarRating rating={product.profitability} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Viability</span>
            <StarRating rating={product.viability} size="sm" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">Sustainability</span>
            <StarRating rating={product.sustainability} size="sm" />
          </div>
        </div>

        {/* Brief Summary */}
        <div className="pt-3 border-t border-[var(--color-border-subtle)]">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{product.summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}

