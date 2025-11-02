/**
 * Client-side storage for onboarding preferences
 * Uses localStorage for persistence
 */

import { OnboardingPreferences, OnboardingState } from "@/types/onboarding"

const STORAGE_KEY = "hatch_onboarding"

export function saveOnboardingPreferences(preferences: OnboardingPreferences): void {
  if (typeof window === "undefined") return
  
  const state: OnboardingState = {
    hasCompleted: true,
    preferences,
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getOnboardingState(): OnboardingState {
  if (typeof window === "undefined") {
    return { hasCompleted: false }
  }
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return { hasCompleted: false }
  }
  
  try {
    return JSON.parse(stored) as OnboardingState
  } catch {
    return { hasCompleted: false }
  }
}

export function clearOnboardingState(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}

export function hasCompletedOnboarding(): boolean {
  return getOnboardingState().hasCompleted
}

export function getOnboardingPreferences(): OnboardingPreferences | null {
  const state = getOnboardingState()
  return state.preferences || null
}
