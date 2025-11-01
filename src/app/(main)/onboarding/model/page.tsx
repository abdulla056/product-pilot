"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Code, Package, Sparkles } from "lucide-react"

type ModelOption = "digital" | "physical" | "both" | null

export default function ModelPage() {
  const [selectedModel, setSelectedModel] = useState<ModelOption>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedModel) {
      router.push("/onboarding/budget")
    }
  }

  const options = [
    {
      id: "digital" as const,
      icon: Code,
      title: "Digital Products",
      description: "E-books, courses, presets. High-margin, no inventory.",
    },
    {
      id: "physical" as const,
      icon: Package,
      title: "Physical Products",
      description: "Apparel, equipment, merch. Builds a physical brand.",
    },
    {
      id: "both" as const,
      icon: Sparkles,
      title: "Show Me Both",
      description: "Show me the best opportunity, regardless of type.",
    },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl p-8 bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-[var(--color-text-primary)]">
            What&apos;s your product model?
          </h1>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)]">
            This helps us filter for digital-only ideas or products that require shipping.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {options.map((option) => {
            const Icon = option.icon
            const isSelected = selectedModel === option.id

            return (
              <button
                key={option.id}
                onClick={() => setSelectedModel(option.id)}
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
          disabled={!selectedModel}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-lg
            transition-all duration-200
            ${selectedModel
              ? "bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] hover:scale-105 hover:shadow-xl cursor-pointer"
              : "bg-black/60 text-[var(--color-text-secondary)]/50 cursor-not-allowed opacity-50 border-2 border-[var(--color-border-subtle)]"
            }
          `}
        >
          Continue
        </button>
      </div>
    </main>
  )
}

