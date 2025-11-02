"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, CheckCircle2, AlertCircle, Youtube, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type ProcessingStatus = "connecting" | "scraping" | "transcribing" | "finding_vendors" | "complete" | "error" | "needs_connection"

export default function ProcessingPage() {
  const router = useRouter()
  const [status, setStatus] = useState<ProcessingStatus>("connecting")
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [transcribedVideos, setTranscribedVideos] = useState<string[]>([])
  const [totalVideos, setTotalVideos] = useState(10)

  // Get onboarding data from localStorage
  useEffect(() => {
    const processHatch = async () => {
      try {
        // Get onboarding data from localStorage
        const strategy = localStorage.getItem("hatch_strategy")
        const model = localStorage.getItem("hatch_model")
        const budget = localStorage.getItem("hatch_budget")

        if (!strategy || !model || !budget) {
          setError("Missing onboarding data. Please start the process again.")
          setStatus("error")
          return
        }

        setStatus("scraping")

        // Call the complete API
        const response = await fetch("/api/hatch/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            strategy,
            model,
            budget,
          }),
        })

        // Update progress during transcription
        setStatus("transcribing")
        
        // Simulate video transcription checkmarks
        const videoCheckInterval = setInterval(() => {
          setTranscribedVideos((prev) => {
            const currentCount = prev.length
            if (currentCount < totalVideos) {
              // Add a new video checkmark every 3 seconds
              return [...prev, `video-${currentCount + 1}`]
            }
            return prev
          })
        }, 3000) // Add a checkmark every 3 seconds

        const result = await response.json()
        
        clearInterval(videoCheckInterval)
        
        // Update total videos from response
        if (result.videoCount) {
          setTotalVideos(result.videoCount)
        }

        if (!response.ok) {
          if (result.requiresConnection) {
            setStatus("needs_connection")
            return
          }
          throw new Error(result.error || "Failed to complete process")
        }

        if (result.success) {
          // Set all videos as transcribed
          setTranscribedVideos(Array.from({ length: result.videoCount || 0 }, (_, i) => `video-${i + 1}`))
          
          // Move to finding vendors step
          setStatus("finding_vendors")
          
          // Store vendors data in localStorage for vendors page
          if (result.vendors) {
            localStorage.setItem("hatch_vendors", JSON.stringify(result.vendors))
          }
          
          // After a moment, mark as complete and redirect to vendors page
          setTimeout(() => {
            setStatus("complete")
            setData(result)
            
            // Redirect to vendors page (Step 5)
            setTimeout(() => {
              router.push("/hatch/vendors")
            }, 1500)
          }, 1500)
        }
      } catch (err: any) {
        console.error("Error processing hatch:", err)
        setError(err.message || "An error occurred")
        setStatus("error")
      }
    }

    processHatch()
  }, [router])

  const handleConnectYouTube = async () => {
    try {
      const response = await fetch("/api/youtube/connect", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl
      }
    } catch (error) {
      console.error("Error connecting YouTube:", error)
      setError("Failed to connect YouTube. Please try again.")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] max-w-2xl w-full">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="text-center">
            {/* Icon */}
            <div className="mb-6 flex justify-center">
              {status === "complete" ? (
                <CheckCircle2 className="w-16 h-16 text-[var(--color-accent-primary)]" />
              ) : status === "error" || status === "needs_connection" ? (
                <AlertCircle className="w-16 h-16 text-red-500" />
              ) : (
                <Loader2 className="w-16 h-16 text-[var(--color-accent-primary)] animate-spin" />
              )}
            </div>

            {/* Status Message */}
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              {status === "connecting" && "Checking YouTube Connection..."}
              {status === "scraping" && "Scraping Your YouTube Videos..."}
              {status === "transcribing" && "Transcribing Video Content..."}
              {status === "finding_vendors" && "Finding Recommended Vendors..."}
              {status === "complete" && "Processing Complete!"}
              {status === "needs_connection" && "YouTube Connection Required"}
              {status === "error" && "Error Processing"}
            </h1>

            {/* Description */}
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              {status === "connecting" && "Verifying your YouTube account connection..."}
              {status === "scraping" && "Fetching your recent videos for analysis..."}
              {status === "transcribing" && `Processing ${transcribedVideos.length} of ${totalVideos} videos...`}
              {status === "finding_vendors" && "Finding vendors and suppliers based on your product requirements..."}
              {status === "complete" && (
                <>
                  Successfully processed <strong>{data?.videoCount || 0}</strong> videos and found <strong>{data?.vendors?.length || 0}</strong> recommended vendors!
                  <br />
                  Redirecting to vendor recommendations...
                </>
              )}
              {status === "needs_connection" && (
                "You need to connect your YouTube account to continue."
              )}
              {status === "error" && (error || "Something went wrong. Please try again.")}
            </p>

            {/* Step-based Progress Indicator */}
            {status !== "complete" && status !== "error" && status !== "needs_connection" && (
              <div className="mb-8 space-y-4">
                {/* Progress Steps */}
                <div className="flex flex-col gap-4">
                  {/* Step 1: Checking Connection */}
                  <div className="flex items-center gap-3">
                    {status === "connecting" ? (
                      <Loader2 className="w-5 h-5 text-[var(--color-accent-primary)] animate-spin flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      status === "connecting" 
                        ? "text-[var(--color-accent-primary)] font-medium" 
                        : status === "complete" || (status !== "connecting" && status !== "error")
                        ? "text-[var(--color-text-secondary)]"
                        : "text-[var(--color-text-secondary)]/50"
                    }`}>
                      Checking YouTube connection
                    </span>
                  </div>

                  {/* Step 2: Fetching Videos */}
                  <div className="flex items-center gap-3">
                    {status === "scraping" ? (
                      <Loader2 className="w-5 h-5 text-[var(--color-accent-primary)] animate-spin flex-shrink-0" />
                    ) : status === "transcribing" || status === "complete" ? (
                      <CheckCircle className="w-5 h-5 text-[var(--color-accent-primary)] flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border-subtle)]/30 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${
                      status === "scraping" 
                        ? "text-[var(--color-accent-primary)] font-medium" 
                        : status === "transcribing" || status === "complete"
                        ? "text-[var(--color-text-secondary)]"
                        : "text-[var(--color-text-secondary)]/50"
                    }`}>
                      Fetching your recent videos
                    </span>
                  </div>

                  {/* Step 3: Transcribing Videos */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      {status === "transcribing" ? (
                        <Loader2 className="w-5 h-5 text-[#10b981] animate-spin flex-shrink-0" />
                      ) : status === "complete" || status === "finding_vendors" ? (
                        <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border-subtle)]/30 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <span className={`text-sm block ${
                          status === "transcribing" 
                            ? "text-[#10b981] font-medium" 
                            : status === "complete" || status === "finding_vendors"
                            ? "text-[var(--color-text-secondary)]"
                            : "text-[var(--color-text-secondary)]/50"
                        }`}>
                          Transcribing video content
                        </span>
                      </div>
                    </div>
                    
                    {/* Video Checkmarks */}
                    {status === "transcribing" && (
                      <div className="ml-8 grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Array.from({ length: totalVideos }).map((_, index) => {
                          const videoId = `video-${index + 1}`
                          const isTranscribed = transcribedVideos.includes(videoId)
                          return (
                            <div key={videoId} className="flex items-center gap-2">
                              {isTranscribed ? (
                                <CheckCircle className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-[var(--color-border-subtle)]/30 flex-shrink-0" />
                              )}
                              <span className="text-xs text-[var(--color-text-secondary)] truncate">
                                Video {index + 1}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Step 4: Finding Vendors */}
                  {(status === "finding_vendors" || status === "complete") && (
                    <div className="flex items-center gap-3">
                      {status === "finding_vendors" ? (
                        <Loader2 className="w-5 h-5 text-[#10b981] animate-spin flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                      )}
                      <span className={`text-sm ${
                        status === "finding_vendors" 
                          ? "text-[#10b981] font-medium" 
                          : "text-[var(--color-text-secondary)]"
                      }`}>
                        Finding recommended vendors
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Connect YouTube Button */}
            {status === "needs_connection" && (
              <button
                onClick={handleConnectYouTube}
                className="px-6 py-3 bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
              >
                <Youtube className="w-5 h-5" />
                Connect YouTube Account
              </button>
            )}

            {/* Error Retry */}
            {status === "error" && (
              <button
                onClick={() => router.push("/hatch/budget")}
                className="px-6 py-3 bg-[var(--color-accent-primary)] text-[var(--color-text-dark)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

