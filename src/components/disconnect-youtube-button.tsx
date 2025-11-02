"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Youtube, Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface DisconnectYouTubeButtonProps {
  size?: "sm" | "lg" | "default"
  className?: string
  fullWidth?: boolean
  onDisconnected?: () => void
}

export function DisconnectYouTubeButton({ 
  size = "sm", 
  className = "",
  fullWidth = false,
  onDisconnected
}: DisconnectYouTubeButtonProps) {
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const router = useRouter()

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your YouTube account? You'll need to reconnect to use Hatch features.")) {
      return
    }

    try {
      setIsDisconnecting(true)

      const response = await fetch("/api/youtube/disconnect", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        // Call callback if provided
        if (onDisconnected) {
          onDisconnected()
        }
        // Refresh the page to update connection status everywhere
        window.location.reload()
      } else {
        console.error("Failed to disconnect:", data.error)
        alert(data.error || "Failed to disconnect YouTube. Please try again.")
        setIsDisconnecting(false)
      }
    } catch (error) {
      console.error("Error disconnecting YouTube:", error)
      alert("An error occurred. Please try again.")
      setIsDisconnecting(false)
    }
  }

  return (
    <Button
      size={size}
      onClick={handleDisconnect}
      disabled={isDisconnecting}
      variant="secondary"
      className={`gap-2 ${fullWidth ? "w-full" : ""} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isDisconnecting ? (
        <>
          <Loader2 className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} animate-spin`} />
          Disconnecting...
        </>
      ) : (
        <>
          <LogOut className={`${size === "lg" ? "h-5 w-5" : "h-4 w-4"} flex-shrink-0`} />
          <span>{size === "lg" ? "Disconnect YouTube" : "Disconnect"}</span>
        </>
      )}
    </Button>
  )
}

