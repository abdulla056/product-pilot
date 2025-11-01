"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, Sparkles, CheckCircle2, LogIn, Rocket } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
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

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-primary)]">Loading...</div>
      </main>
    )
  }

  if (isSignedIn) {
    return null // Will redirect
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <Rocket className="w-12 h-12 text-[var(--color-accent-primary)] mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-text-primary)]">
              Welcome to <span className="text-[var(--color-accent-primary)]">Viz-I</span>
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
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-[var(--color-accent-primary)]/20 flex items-center justify-center border-2 border-[var(--color-accent-primary)]/30">
              <Youtube className="w-10 h-10 text-[var(--color-accent-primary)]" />
            </div>
            <CardTitle className="text-3xl text-[var(--color-text-primary)] mb-2">
              Get Started
            </CardTitle>
            <CardDescription className="text-lg text-[var(--color-text-secondary)]">
              Sign in and connect your YouTube account to begin discovering product opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Action Buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full text-lg py-6 h-auto"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              
              <Button
                onClick={handleConnectYouTube}
                size="lg"
                className="w-full text-lg py-6 h-auto"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Connect YouTube
              </Button>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 pt-6 border-t border-[var(--color-border-subtle)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-text-primary)] font-medium">AI-Powered Content Analysis</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">We analyze your videos, titles, and engagement metrics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--color-text-primary)] font-medium">Audience Insights</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">Discover what your viewers want and need most</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-primary)] mt-0.5 flex-shrink-0" />
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
              <Sparkles className="w-8 h-8 text-[var(--color-accent-primary)] mx-auto mb-2" />
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
              <CheckCircle2 className="w-8 h-8 text-[var(--color-accent-primary)] mx-auto mb-2" />
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
              <Youtube className="w-8 h-8 text-[var(--color-accent-primary)] mx-auto mb-2" />
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
