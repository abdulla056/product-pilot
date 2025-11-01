"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Youtube, Loader2 } from "lucide-react"

export function ConnectYouTubeButton() {
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
      size="sm"
      onClick={handleConnect}
      disabled={isConnecting}
      className="gap-2"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Youtube className="h-4 w-4" />
          Connect YouTube
        </>
      )}
    </Button>
  )
}
