"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Package } from "lucide-react"
import { DashboardProductCard, DashboardProduct } from "@/components/dashboard-product-card"

// Dummy data for Products Generated
const generatedProducts: DashboardProduct[] = [
  {
    id: "1",
    name: "Video Editing Masterclass",
    summary: "Comprehensive online course teaching advanced video editing techniques for content creators.",
    profitability: 5,
    viability: 4,
    sustainability: 5,
  },
  {
    id: "2",
    name: "Digital Asset Template Library",
    summary: "Subscription-based library of video templates, graphics, and presets for creators.",
    profitability: 5,
    viability: 4,
    sustainability: 4,
  },
  {
    id: "3",
    name: "Branded Merchandise Line",
    summary: "Custom t-shirts, hoodies, and accessories featuring your unique brand identity.",
    profitability: 3,
    viability: 5,
    sustainability: 3,
  },
  {
    id: "4",
    name: "Creator Coaching Program",
    summary: "Personalized 1-on-1 coaching sessions helping creators build audience and monetize content.",
    profitability: 4,
    viability: 5,
    sustainability: 5,
  },
]

// Dummy data for Products Launched
const launchedProducts: DashboardProduct[] = [
  {
    id: "5",
    name: "YouTube Growth Toolkit",
    summary: "Complete toolkit with templates, checklists, and guides for growing YouTube channels.",
    profitability: 5,
    viability: 5,
    sustainability: 4,
  },
  {
    id: "6",
    name: "Creator Brand Logo Pack",
    summary: "Professional logo templates and brand assets tailored for content creators.",
    profitability: 4,
    viability: 4,
    sustainability: 5,
  },
]

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"generated" | "launched">("generated")

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in")
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-primary)]">Loading...</div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
            Dashboard
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Track your product ideas and launches
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[var(--color-text-secondary)]">
                Products Generated
              </CardTitle>
              <Sparkles className="h-4 w-4 text-[var(--color-accent-primary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">{generatedProducts.length}</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Total ideas created</p>
            </CardContent>
          </Card>

          <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[var(--color-text-secondary)]">
                Products Launched
              </CardTitle>
              <Package className="h-4 w-4 text-[var(--color-accent-primary)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[var(--color-text-primary)]">{launchedProducts.length}</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">Successfully launched</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-[var(--color-border-subtle)]">
            <button
              onClick={() => setActiveTab("generated")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === "generated"
                  ? "border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]"
                  : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Products Generated ({generatedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab("launched")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === "launched"
                  ? "border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]"
                  : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              Products Launched ({launchedProducts.length})
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "generated" && generatedProducts.map((product) => (
            <DashboardProductCard key={product.id} product={product} />
          ))}
          {activeTab === "launched" && launchedProducts.map((product) => (
            <DashboardProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
