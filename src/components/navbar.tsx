"use client"

import { SignedIn, UserButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, TrendingUp, Home, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { ConnectYouTubeButton } from "./connect-youtube-button"

export function Navbar() {
  const { isSignedIn, isLoaded } = useUser()
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkYouTubeConnection = async () => {
      if (!isLoaded || !isSignedIn) {
        setIsChecking(false)
        return
      }

      try {
        const response = await fetch("/api/youtube/check")
        const data = await response.json()
        setIsYouTubeConnected(data.connected || false)
      } catch (error) {
        console.error("Error checking YouTube connection:", error)
        setIsYouTubeConnected(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkYouTubeConnection()
  }, [isLoaded, isSignedIn])

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-bg-glass)] backdrop-blur-lg border-b border-[var(--color-border-subtle)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="Hatch Logo"
              width={120}
              height={30}
              priority={true}
              className="transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] group-hover:brightness-110"
            />
          </Link>

          {/* Navigation Links - Only show when signed in */}
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/home">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              {/* Only show Hatch and Hatched if YouTube is connected */}
              {!isChecking && isYouTubeConnected && (
                <>
                  <Link href="/hatch/strategy">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Hatch
                    </Button>
                  </Link>
                  <Link href="/analytics">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Hatched
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SignedIn>

          {/* User Button and Connect YouTube */}
          <SignedIn>
            <div className="flex items-center gap-3">
              {!isChecking && !isYouTubeConnected && (
                <ConnectYouTubeButton size="sm" />
              )}
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-[var(--color-border-subtle)]",
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
