/**
 * Types for user onboarding preferences
 */

export type StrategyPreference = "audience-first" | "market-first" | "balanced"
export type ProductModelPreference = "digital" | "physical" | "both"
export type BudgetPreference = "zero" | "small" | "all"

export interface OnboardingPreferences {
  strategy: StrategyPreference
  productModel: ProductModelPreference
  budget: BudgetPreference
  completedAt: string
}

export interface OnboardingState {
  hasCompleted: boolean
  preferences?: OnboardingPreferences
}
