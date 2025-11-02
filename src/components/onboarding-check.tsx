"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { hasCompletedOnboarding } from "@/lib/onboarding-storage"

export function OnboardingCheck() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has completed onboarding
    if (!hasCompletedOnboarding()) {
      router.push("/onboarding/strategy")
    }
  }, [router])

  return null
}
