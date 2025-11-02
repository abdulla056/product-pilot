"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CircleDollarSign, Wallet, Landmark, DollarSign, TrendingUp } from "lucide-react"

type BudgetOption = "zero" | "small" | "medium" | "large" | null

interface BudgetOptionData {
  id: BudgetOption
  icon: any
  title: string
  amount: string
  description: string
  helpText: string
  compatibleWith: {
    model?: string[]
    strategy?: string[]
  }
}

export default function BudgetPage() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetOption>(null)
  const [strategy, setStrategy] = useState<string | null>(null)
  const [model, setModel] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get previous selections
    const storedStrategy = localStorage.getItem("hatch_strategy")
    const storedModel = localStorage.getItem("hatch_model")
    setStrategy(storedStrategy)
    setModel(storedModel)
  }, [])

  const handleContinue = () => {
    if (selectedBudget) {
      // Store budget
      localStorage.setItem("hatch_budget", selectedBudget)
      
      // Set cookie to indicate hatch is in progress (for callback redirect)
      document.cookie = "hatch_in_progress=true; path=/; max-age=3600" // 1 hour
      
      // Redirect to processing page (transcription)
      router.push("/hatch/processing")
    }
  }

  const allBudgetOptions: BudgetOptionData[] = [
    {
      id: "zero",
      icon: CircleDollarSign,
      title: "$0 - Zero Investment",
      amount: "$0",
      description: model === "digital" 
        ? "Create and sell immediately."
        : model === "physical"
        ? "Print-on-demand. Made when ordered."
        : "Digital products or print-on-demand.",
      helpText: "No upfront costs. Perfect for getting started with minimal risk.",
      compatibleWith: {
        model: ["digital", "both"],
        strategy: ["audience-first", "market-first", "balanced"],
      },
    },
    {
      id: "small",
      icon: Wallet,
      title: "$100 - $500",
      amount: "$100-$500",
      description: "Test the market with small batches or platform subscriptions.",
      helpText: "Ideal for validating your product idea before scaling up.",
      compatibleWith: {
        model: ["digital", "physical", "both"],
        strategy: ["audience-first", "balanced"],
      },
    },
    {
      id: "medium",
      icon: DollarSign,
      title: "$500 - $2,000",
      amount: "$500-$2,000",
      description: "Professional-grade products or advanced digital platforms.",
      helpText: "Invest in quality and features to stand out in the market.",
      compatibleWith: {
        model: ["physical", "both"],
        strategy: ["audience-first", "market-first", "balanced"],
      },
    },
    {
      id: "large",
      icon: Landmark,
      title: "$2,000+",
      amount: "$2,000+",
      description: "Large-scale production. Best for proven product-market fit.",
      helpText: "Scale production when you've validated demand and are ready to grow.",
      compatibleWith: {
        model: ["physical", "both"],
        strategy: ["market-first", "balanced"],
      },
    },
  ]

  // Filter options based on previous selections
  const availableOptions = allBudgetOptions.filter((option) => {
    // Check model compatibility
    if (model && option.compatibleWith.model && !option.compatibleWith.model.includes(model)) {
      return false
    }
    // Check strategy compatibility
    if (strategy && option.compatibleWith.strategy && !option.compatibleWith.strategy.includes(strategy)) {
      return false
    }
    return true
  })

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="rounded-2xl p-8 sm:p-10 shadow-2xl bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-primary)]">
              What&apos;s your starting budget?
            </h1>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {availableOptions.map((option) => {
              const Icon = option.icon
              const isSelected = selectedBudget === option.id

              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedBudget(option.id)}
                  className={`
                    relative p-6 rounded-xl transition-all duration-200 text-left
                    hover:scale-[1.02] hover:shadow-lg
                    ${isSelected ? "shadow-xl" : "shadow-md"}
                    bg-black/60 border-2
                    ${isSelected
                      ? "border-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)]"
                      : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]"
                    }
                  `}
                >
                  {/* Icon and Amount */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`
                        flex items-center justify-center w-12 h-12 rounded-lg transition-colors
                        ${isSelected
                          ? "bg-[var(--color-accent-primary)]"
                          : "bg-[var(--color-border-subtle)]/30"
                        }
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 ${isSelected ? "text-[var(--color-text-dark)]" : "text-[var(--color-text-secondary)]"}`}
                      />
                    </div>
                    <span className="text-lg font-bold text-[var(--color-accent-primary)]">
                      {option.amount}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-2 text-[var(--color-text-primary)]">
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {option.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedBudget}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-lg
              transition-all duration-200 flex items-center justify-center gap-2
              ${selectedBudget
                ? "bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] hover:scale-105 hover:shadow-xl cursor-pointer"
                : "bg-black/60 text-[var(--color-text-secondary)]/50 cursor-not-allowed opacity-50 border-2 border-[var(--color-border-subtle)]"
              }
            `}
          >
            Continue to Video Analysis
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
}
