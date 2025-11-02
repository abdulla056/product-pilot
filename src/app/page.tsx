"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, Sparkles, CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ConnectYouTubeButton } from "@/components/connect-youtube-button"

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [isCheckingConnection, setIsCheckingConnection] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      if (!isLoaded || !isSignedIn) {
        return
      }

      try {
        setIsCheckingConnection(true)
        const response = await fetch("/api/youtube/check")
        const data = await response.json()

        if (data.connected) {
          setIsConnected(true)
          router.push("/home")
        } else {
          setIsConnected(false)
        }
      } catch (error) {
        console.error("Error checking YouTube connection:", error)
        setIsConnected(false)
      } finally {
        setIsCheckingConnection(false)
      }
    }

    checkConnection()
  }, [isLoaded, isSignedIn, router])

  const handleConnectYouTube = () => {
    // TODO: Implement YouTube OAuth connection
    console.log("Connecting YouTube...")
    // Redirect to sign-in if not authenticated, then proceed with OAuth
    if (!isLoaded || !isSignedIn) {
      router.push("/sign-in")
    } else {
      // TODO: Open YouTube OAuth flow
    }
  }

  if (!isLoaded || isCheckingConnection) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin mx-auto mb-4" />
          <div className="text-[var(--color-text-primary)]">Loading...</div>
        </div>
      </main>
    )
  }

  if (isSignedIn && isConnected) {
    return null // Will redirect
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex flex-col items-center justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Hatch Logo"
              width={200}
              height={50}
              priority={true}
              className="mb-4"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
              Welcome to <span className="text-[var(--color-accent-primary)]">Hatch</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-2">
            Visualizing your success story
          </p>
          <p className="text-lg text-[var(--color-text-secondary)]/80 max-w-xl mx-auto">
            Transform your YouTube audience insights into ready-to-launch product ideas
          </p>
        </div>

        {/* Main Action Card */}
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] mb-12">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500/30">
              <Youtube className="w-10 h-10 text-red-500" />
            </div>
            <CardTitle className="text-3xl text-[var(--color-text-primary)] mb-2">
              Get Started
            </CardTitle>
            <CardDescription className="text-lg text-[var(--color-text-secondary)]">
              {isSignedIn 
                ? "Connect your YouTube account to begin discovering product opportunities"
                : "Sign in and connect your YouTube account to begin discovering product opportunities"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Action Buttons */}
            <div className="flex justify-center">
              {isSignedIn ? (
                <div className="w-full">
                  <ConnectYouTubeButton size="lg" fullWidth className="text-lg py-6 h-auto" />
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    className="w-full text-lg py-6 h-auto"
                  >
                    Sign In to Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Benefits List */}
            <div className="space-y-3 pt-6 border-t border-[var(--color-border-subtle)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-text-primary)] font-medium">AI-Powered Content Analysis</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">We analyze your videos, titles, and engagement metrics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-text-primary)] font-medium">Audience Insights</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Discover what your viewers want and need most</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-text-primary)] font-medium">Personalized Product Ideas</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Receive AI-powered recommendations tailored to your niche</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-black/60 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] text-center">
            <CardHeader>
              <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-xl text-[var(--color-text-primary)]">
                AI-Powered Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Advanced algorithms analyze your content and audience to identify opportunities
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] text-center">
            <CardHeader>
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <CardTitle className="text-xl text-[var(--color-text-primary)]">
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Get product ideas specifically tailored to your audience and niche
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/60 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] text-center">
            <CardHeader>
              <Youtube className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <CardTitle className="text-xl text-[var(--color-text-primary)]">
                Secure Connection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Your data is secure and we only access what we need for analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
