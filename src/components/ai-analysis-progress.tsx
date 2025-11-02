"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Sparkles, CheckCircle2, Brain, Users, TrendingUp, Package } from "lucide-react"

interface AIAnalysisProgressProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ANALYSIS_STEPS = [
  {
    id: 1,
    label: "Analyzing content patterns",
    icon: Brain,
    duration: 60,
  },
  {
    id: 2,
    label: "Understanding your audience",
    icon: Users,
    duration: 60,
  },
  {
    id: 3,
    label: "Researching market trends",
    icon: TrendingUp,
    duration: 60,
  },
  {
    id: 4,
    label: "Generating product opportunities",
    icon: Package,
    duration: 60,
  },
]

export function AIAnalysisProgress({ open, onOpenChange }: AIAnalysisProgressProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!open) {
      setProgress(0)
      setCurrentStep(0)
      return
    }

    // Simulate progress through steps
    const totalDuration = ANALYSIS_STEPS.reduce((sum, step) => sum + step.duration, 0)
    let elapsed = 0
    
    const interval = setInterval(() => {
      elapsed += 1
      const newProgress = Math.min((elapsed / totalDuration) * 100, 99)
      setProgress(newProgress)

      // Update current step based on progress
      let cumulativeDuration = 0
      for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
        cumulativeDuration += ANALYSIS_STEPS[i].duration
        if (elapsed <= cumulativeDuration) {
          setCurrentStep(i)
          break
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-[var(--color-bg-glass)] rounded-full">
              <Sparkles className="h-8 w-8 text-[var(--color-accent-primary)] animate-pulse" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl text-[var(--color-text-primary)]">AI Analysis in Progress</DialogTitle>
          <DialogDescription className="text-center text-[var(--color-text-secondary)]">
            Our AI agents are analyzing your creator graph. This may take 1-2 minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center text-[var(--color-text-secondary)]">
              {Math.round(progress)}% complete
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {ANALYSIS_STEPS.map((step, index) => {
              const isComplete = index < currentStep
              const isCurrent = index === currentStep
              const Icon = step.icon

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-[var(--color-bg-glass)] border-2 border-[var(--color-accent-primary)]"
                      : isComplete
                      ? "bg-[var(--color-bg-glass)] border border-[var(--color-accent-primary)]/50"
                      : "bg-[var(--color-bg-base)] border border-[var(--color-border-subtle)]"
                  }`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isComplete
                        ? "bg-[var(--color-accent-primary)]"
                        : isCurrent
                        ? "bg-[var(--color-accent-primary)] animate-pulse"
                        : "bg-[var(--color-bg-glass)]"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="h-5 w-5 text-[var(--color-text-dark)]" />
                    ) : (
                      <Icon className={`h-5 w-5 ${isCurrent ? "text-[var(--color-text-dark)]" : "text-[var(--color-text-secondary)]"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        isCurrent
                          ? "text-[var(--color-text-primary)]"
                          : isComplete
                          ? "text-[var(--color-accent-primary)]"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {isCurrent && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-[var(--color-accent-primary)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-3">
            <p className="text-xs text-[var(--color-text-secondary)] text-center">
              💡 <strong className="text-[var(--color-accent-primary)]">Tip:</strong> The AI is analyzing your videos, audience engagement, and market data to find the best product opportunities for you.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
