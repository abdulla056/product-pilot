"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Youtube, Loader2 } from "lucide-react"

interface ConnectYouTubeButtonProps {
  size?: "sm" | "lg" | "default"
  className?: string
  fullWidth?: boolean
}

export function ConnectYouTubeButton({ 
  size = "sm", 
  className = "",
  fullWidth = false 
}: ConnectYouTubeButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    try {
      setIsConnecting(true)

      const response = await fetch("/api/youtube/connect", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success && data.redirectUrl) {
        // Redirect to Composio OAuth flow
        window.location.href = data.redirectUrl
      } else {
        console.error("Failed to get redirect URL:", data.error)
        alert("Failed to connect YouTube. Please try again.")
        setIsConnecting(false)
      }
    } catch (error) {
      console.error("Error connecting YouTube:", error)
      alert("An error occurred. Please try again.")
      setIsConnecting(false)
    }
  }

  return (
    <Button
      size={size}
      onClick={handleConnect}
      disabled={isConnecting}
      className={`gap-2 ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {isConnecting ? (
        <>
          <Loader2 className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} animate-spin`} />
          Connecting...
        </>
      ) : (
        <>
          <Youtube className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
          {size === "lg" ? "Connect YouTube Account" : "Connect YouTube"}
        </>
      )}
    </Button>
  )
}
