"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Users, TrendingUp, Scale, ArrowRight } from "lucide-react"
import { getOnboardingState } from "@/lib/onboarding-storage"
import type { StrategyPreference } from "@/types/onboarding"

export default function OnboardingPage() {
  const [selectedOption, setSelectedOption] = useState<StrategyPreference | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Load saved preference if exists
    const state = getOnboardingState()
    if (state.preferences?.strategy) {
      setSelectedOption(state.preferences.strategy)
    }
  }, [])

  const handleContinue = () => {
    if (selectedOption) {
      // Save to session storage for use in next step
      if (typeof window !== "undefined") {
        sessionStorage.setItem("onboarding_strategy", selectedOption)
      }
      router.push("/onboarding/model")
    }
  }

  const options = [
    {
      id: "audience-first" as const,
      icon: Users,
      title: "Serve My Existing Community",
      description: "Analyzes video comments and engagement to find what your audience wants.",
    },
    {
      id: "market-first" as const,
      icon: TrendingUp,
      title: "Find a New, High-Growth Opportunity",
      description: "Identifies trending products and opportunities in the broader market.",
    },
    {
      id: "balanced" as const,
      icon: Scale,
      title: "Show Me a Balance of Both",
      description: "Combines audience needs with trending opportunities.",
    },
  ]

  return (
    <main 
      className="min-h-screen flex items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-2xl">
        {/* Card Container */}
        <div 
          className="rounded-2xl p-8 sm:p-10 shadow-2xl bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 
              className="text-3xl sm:text-4xl font-bold mb-4 text-[var(--color-text-primary)]"
            >
              What is your primary goal?
            </h1>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {options.map((option) => {
              const Icon = option.icon
              const isSelected = selectedOption === option.id
              
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`
                    relative p-6 rounded-xl transition-all duration-200 text-left
                    hover:scale-105 hover:shadow-lg
                    ${isSelected ? "shadow-xl" : "shadow-md"}
                    bg-black/60 border-2
                    ${isSelected 
                      ? "border-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)]" 
                      : "border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]"
                    }
                  `}
                >
                  {/* Icon */}
                  <div 
                    className={`
                      mb-4 flex items-center justify-center w-12 h-12 rounded-lg
                      ${isSelected 
                        ? "bg-[var(--color-accent-primary)]" 
                        : "bg-[var(--color-border-subtle)]/30"
                      }
                    `}
                  >
                    <Icon 
                      className={`
                        w-6 h-6
                        ${isSelected 
                          ? "text-[var(--color-text-dark)]" 
                          : "text-[var(--color-text-secondary)]"
                        }
                      `}
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-semibold text-base sm:text-lg mb-2 text-[var(--color-text-primary)]"
                  >
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
                  >
                    {option.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`
              w-full py-4 px-6 rounded-xl font-semibold text-lg
              transition-all duration-200 flex items-center justify-center gap-2
              ${selectedOption 
                ? "hover:scale-105 hover:shadow-xl cursor-pointer bg-[var(--color-accent-primary)] text-[var(--color-text-dark)]" 
                : "cursor-not-allowed opacity-50 bg-black/60 text-[var(--color-text-secondary)]/50 border-2 border-[var(--color-border-subtle)]"
              }
            `}
          >
            Continue
            {selectedOption && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </main>
  )
}

