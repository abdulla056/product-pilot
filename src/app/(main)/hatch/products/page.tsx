"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ArrowRight, CheckCircle2, DollarSign, TrendingUp, Users } from "lucide-react"
import type { ProductRecommendation } from "@/lib/product-recommendations"

export default function ProductSelectionPage() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductRecommendation[]>([])
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [onboarding, setOnboarding] = useState<any>(null)

  useEffect(() => {
    // Get product recommendations from localStorage (set by processing page)
    const productsData = localStorage.getItem("hatch_products")
    const onboardingData = {
      strategy: localStorage.getItem("hatch_strategy"),
      model: localStorage.getItem("hatch_model"),
      budget: localStorage.getItem("hatch_budget"),
    }

    if (productsData) {
      try {
        setProducts(JSON.parse(productsData))
      } catch (e) {
        console.error("Error parsing products data:", e)
      }
    }

    setOnboarding(onboardingData)
    setLoading(false)
  }, [])

  const handleContinue = async () => {
    if (!selectedProduct) return

    // Store selected product
    localStorage.setItem("hatch_selected_product", selectedProduct)

    // Get vendor recommendations for the selected product
    const selectedProductData = products.find((p) => p.id === selectedProduct)
    if (!selectedProductData) {
      console.error("Selected product not found")
      return
    }

    try {
      const response = await fetch("/api/hatch/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: selectedProductData,
          model: onboarding?.model,
          budget: onboarding?.budget,
        }),
      })

      const data = await response.json()

      if (data.success && data.vendors) {
        localStorage.setItem("hatch_vendors", JSON.stringify(data.vendors))
        router.push("/hatch/vendors")
      } else {
        console.error("Failed to get vendors:", data.error)
        alert("Failed to get vendor recommendations. Please try again.")
      }
    } catch (error) {
      console.error("Error getting vendors:", error)
      alert("An error occurred. Please try again.")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="text-[var(--color-text-primary)]">Loading product recommendations...</div>
      </main>
    )
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-8">
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 px-8 text-center">
            <Package className="w-16 h-16 text-[var(--color-text-secondary)] mx-auto mb-4" />
            <p className="text-xl text-[var(--color-text-primary)] font-semibold mb-2">
              No Products Found
            </p>
            <p className="text-[var(--color-text-secondary)] mb-6">
              We couldn't generate product recommendations. Please try the hatch process again.
            </p>
            <Button onClick={() => router.push("/hatch/strategy")}>
              Start Over
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "digital":
        return "💻"
      case "physical":
        return "📦"
      case "service":
        return "🎯"
      default:
        return "✨"
    }
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case "high":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-orange-400"
      default:
        return "text-[var(--color-text-secondary)]"
    }
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 text-[var(--color-text-primary)]">
            Choose Your Product
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-4">
            Based on your YouTube content analysis, here are 3 product recommendations for you
          </p>
          {onboarding && (
            <div className="flex flex-wrap justify-center gap-2 text-sm text-[var(--color-text-secondary)]/80">
              <span className="px-3 py-1 bg-black/60 rounded-full border border-[var(--color-border-subtle)]">
                Goal: {onboarding.strategy}
              </span>
              <span className="px-3 py-1 bg-black/60 rounded-full border border-[var(--color-border-subtle)]">
                Model: {onboarding.model}
              </span>
              <span className="px-3 py-1 bg-black/60 rounded-full border border-[var(--color-border-subtle)]">
                Budget: {onboarding.budget}
              </span>
            </div>
          )}
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {products.map((product) => {
            const isSelected = selectedProduct === product.id

            return (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product.id)}
                className={`
                  text-left transition-all duration-200
                  ${isSelected 
                    ? "scale-105" 
                    : "hover:scale-[1.02]"
                  }
                `}
              >
                <Card
                  className={`
                    bg-black/80 backdrop-blur-lg border-2 transition-all
                    ${isSelected
                      ? "border-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)] shadow-xl"
                      : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 shadow-md"
                    }
                  `}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                        <CardTitle className="text-xl text-[var(--color-text-primary)]">
                          {product.name}
                        </CardTitle>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 text-[var(--color-accent-primary)] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-2 py-1 bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] rounded border border-[var(--color-accent-primary)]/30">
                        {product.category}
                      </span>
                      <span className={`px-2 py-1 rounded border ${getDemandColor(product.estimatedDemand)}`}>
                        {product.estimatedDemand} demand
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-[var(--color-text-secondary)]">
                      {product.description}
                    </CardDescription>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-[var(--color-text-secondary)]">
                          {product.targetAudience}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-[var(--color-text-secondary)]" />
                        <span className="text-[var(--color-text-primary)]">
                          ${product.priceRange.min}
                          {product.priceRange.max > product.priceRange.min &&
                            ` - $${product.priceRange.max}`}
                        </span>
                      </div>
                    </div>

                    {/* Key Features */}
                    {product.keyFeatures && product.keyFeatures.length > 0 && (
                      <div className="pt-3 border-t border-[var(--color-border-subtle)]/30">
                        <p className="text-xs text-[var(--color-text-secondary)]/70 mb-2">
                          Key Features:
                        </p>
                        <ul className="space-y-1">
                          {product.keyFeatures.slice(0, 3).map((feature, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2"
                            >
                              <span className="text-[var(--color-accent-primary)] mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Reasoning */}
                    <div className="pt-3 border-t border-[var(--color-border-subtle)]/30">
                      <p className="text-xs text-[var(--color-text-secondary)]/70 mb-1">
                        Why this works:
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {product.reasoning}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedProduct}
            size="lg"
            className={`
              text-lg px-8 py-6
              ${selectedProduct
                ? "bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] hover:opacity-90 cursor-pointer"
                : "bg-black/60 text-[var(--color-text-secondary)]/50 cursor-not-allowed opacity-50 border-2 border-[var(--color-border-subtle)]"
              }
            `}
          >
            Continue to Vendor Recommendations
            {selectedProduct && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </main>
  )
}

