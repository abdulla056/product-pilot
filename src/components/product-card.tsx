import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { StarRating } from "@/components/ui/star-rating"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles } from "lucide-react"
import Link from "next/link"

export interface Product {
  id: string
  name: string
  description: string
  profitability: number // 1-5
  viability: number // 1-5
  sustainability: number // 1-5
  opportunity: number // 1-5
  status: "recommended" | "selected"
  documentationUrl?: string
  fullDocumentation?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const statusBadge = product.status === "selected" 
    ? "bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]/30"
    : "bg-[var(--color-border-subtle)]/20 text-[var(--color-text-secondary)] border-[var(--color-border-subtle)]"

  return (
    <Card className="hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{product.name}</h3>
              {product.status === "recommended" && (
                <Sparkles className="h-4 w-4 text-[var(--color-accent-primary)]" />
              )}
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusBadge}`}>
              {product.status === "selected" ? "Selected" : "Recommended"}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Rating Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Profitability</span>
              <StarRating rating={product.profitability} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Viability</span>
              <StarRating rating={product.viability} size="sm" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Sustainability</span>
              <StarRating rating={product.sustainability} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">Opportunity</span>
              <StarRating rating={product.opportunity} size="sm" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-2 border-t border-[var(--color-border-subtle)]">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{product.description}</p>
        </div>

        {/* Documentation Link */}
        <div className="pt-2">
          <Link href={`/product/${product.id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View Full Documentation
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

