"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CircleDollarSign, Wallet, Landmark } from "lucide-react"
import { saveOnboardingPreferences, getOnboardingState } from "@/lib/onboarding-storage"
import type { BudgetPreference, StrategyPreference, ProductModelPreference } from "@/types/onboarding"

export default function BudgetPage() {
  const [selectedBudget, setSelectedBudget] = useState<BudgetPreference | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load saved preference if exists
    const state = getOnboardingState()
    if (state.preferences?.budget) {
      setSelectedBudget(state.preferences.budget)
    }
  }, [])

  const handleContinue = () => {
    if (selectedBudget) {
      // Get preferences from session storage
      const strategy = (typeof window !== "undefined" 
        ? sessionStorage.getItem("onboarding_strategy") 
        : null) as StrategyPreference | null
      
      const productModel = (typeof window !== "undefined" 
        ? sessionStorage.getItem("onboarding_model") 
        : null) as ProductModelPreference | null

      // Save all preferences to localStorage
      if (strategy && productModel) {
        saveOnboardingPreferences({
          strategy,
          productModel,
          budget: selectedBudget,
          completedAt: new Date().toISOString(),
        })
        
        // Clear session storage
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("onboarding_strategy")
          sessionStorage.removeItem("onboarding_model")
        }
      }

      // Redirect to dashboard
      router.push("/dashboard")
    }
  }

  const options = [
    {
      id: "zero" as const,
      icon: CircleDollarSign,
      title: "$0 (Zero Inventory)",
      description: "I only want to sell digital products or use print-on-demand.",
    },
    {
      id: "small" as const,
      icon: Wallet,
      title: "$$ (Small Batch)",
      description: "I&apos;m willing to invest a few hundred or thousand for a high-quality test batch.",
    },
    {
      id: "all" as const,
      icon: Landmark,
      title: "$$$ (All In)",
      description: "I&apos;m ready to invest in a large, custom-manufactured order.",
    },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl p-8 bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-[var(--color-text-primary)]">
            What&apos;s your starting budget?
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)]">
            This filters for $0-cost ideas (like print-on-demand) vs. custom-batch products.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedBudget === option.id

            return (
              <button
                key={option.id}
                onClick={() => setSelectedBudget(option.id)}
                className={`
                  bg-black/60 rounded-lg p-6 border-2 transition-all
                  cursor-pointer text-left hover:scale-105 hover:shadow-lg
                  ${isSelected
                    ? "border-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)] shadow-xl"
                    : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] shadow-md"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    mb-4 flex items-center justify-center w-12 h-12 rounded-lg transition-colors
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

                {/* Title */}
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-[var(--color-text-primary)]">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
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
            transition-all duration-200
            ${selectedBudget
              ? "bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] hover:scale-105 hover:shadow-xl cursor-pointer"
              : "bg-black/60 text-[var(--color-text-secondary)]/50 cursor-not-allowed opacity-50 border-2 border-[var(--color-border-subtle)]"
            }
          `}
        >
          Finish Setup & See My Report
        </button>
      </div>
    </main>
  )
}

