"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, Loader2, AlertCircle } from "lucide-react"
import { ConnectYouTubeButton } from "./connect-youtube-button"

interface YouTubeConnectionGuardProps {
  children: React.ReactNode
}

export function YouTubeConnectionGuard({ children }: YouTubeConnectionGuardProps) {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      if (!isLoaded) {
        return
      }

      if (!isSignedIn) {
        router.push("/")
        return
      }

      try {
        setIsChecking(true)
        const response = await fetch("/api/youtube/check")
        const data = await response.json()

        if (data.connected) {
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      } catch (error) {
        console.error("Error checking YouTube connection:", error)
        setIsConnected(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkConnection()
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-text-primary)]">Checking connection...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null // Will redirect
  }

  if (!isConnected) {
    // Check if we're in the hatch section
    const isHatchSection = pathname?.startsWith("/hatch") || false
    
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500/30">
              <Youtube className="w-10 h-10 text-red-500" />
            </div>
            <CardTitle className="text-3xl text-[var(--color-text-primary)] mb-2">
              {isHatchSection ? "Connect YouTube to Start Hatching" : "YouTube Connection Required"}
            </CardTitle>
            <CardDescription className="text-lg text-[var(--color-text-secondary)]">
              {isHatchSection 
                ? "Connect your YouTube account to analyze your videos and generate product ideas"
                : "Please connect your YouTube account to access Hatch features"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[var(--color-bg-glass)] rounded-lg p-4 border border-[var(--color-border-subtle)]">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[var(--color-accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">
                    {isHatchSection ? "How it works:" : "Why do we need this?"}
                  </h5>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {isHatchSection 
                      ? "Once connected, we'll analyze your YouTube videos, understand your audience, and generate personalized product recommendations based on your content and engagement patterns."
                      : "We need access to your YouTube account to analyze your content and audience, which helps us generate personalized product recommendations for you."
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <ConnectYouTubeButton size="lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

