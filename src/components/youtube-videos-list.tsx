'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Youtube, AlertCircle, Loader2, Eye, Calendar } from 'lucide-react'

interface Video {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium?: { url: string }
      default?: { url: string }
    }
    publishedAt: string
  }
}

interface VideosResponse {
  success: boolean
  data?: {
    videos: Video[]
    totalResults: number
    channelInfo: {
      id: string
      title: string
      subscriberCount: string
      videoCount: string
      viewCount: string
    }
  }
  error?: string
  details?: string
  rawData?: any
  channelInfo?: any
}

export function YouTubeVideosList() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<any>(null)
  const [channelInfo, setChannelInfo] = useState<any>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true)
        setError(null)
        
        console.log
        const response = await fetch('/api/youtube/videos?maxResults=12')
        const data: VideosResponse = await response.json()
        
        console.log('[YouTubeVideosList] Response:', JSON.stringify(data, null, 2))
        
        if (data.success && data.data) {
          setVideos(data.data.videos)
          setChannelInfo(data.data.channelInfo)
          console.log(`[YouTubeVideosList] Successfully loaded ${data.data.videos.length} videos`)
        } else {
          setError(data.error || 'Failed to fetch videos')
          setErrorDetails(data)
          console.error('[YouTubeVideosList] Error:', JSON.stringify(data, null, 2))
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred')
        setErrorDetails({ error: err.toString(), message: err.message })
        console.error('[YouTubeVideosList] Exception:', err)
        console.error('[YouTubeVideosList] Error details:', JSON.stringify(err, null, 2))
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <Youtube className="h-5 w-5 text-[var(--color-accent-primary)]" />
            Your YouTube Videos
          </CardTitle>
          <CardDescription className="text-[var(--color-text-secondary)]">Loading your latest videos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent-primary)]" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-[var(--color-accent-primary)] bg-[var(--color-bg-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <AlertCircle className="h-5 w-5 text-[var(--color-accent-primary)]" />
            Error Loading Videos
          </CardTitle>
          <CardDescription className="text-[var(--color-accent-primary)]">{error}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorDetails && (
            <div className="bg-[var(--color-bg-glass)] border border-[var(--color-border-subtle)] rounded-lg p-4">
              <h4 className="font-semibold text-sm text-[var(--color-text-primary)] mb-2">Error Details:</h4>
              <pre className="text-xs text-[var(--color-text-secondary)] overflow-auto max-h-64 bg-[var(--color-bg-base)] p-3 rounded">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            </div>
          )}
          <div className="text-sm text-[var(--color-text-secondary)]">
            <p className="font-semibold mb-2 text-[var(--color-text-primary)]">Troubleshooting steps:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Make sure your YouTube account is connected</li>
              <li>Check that your channel has videos</li>
              <li>Verify the videos are public or unlisted (not private)</li>
              <li>Check the browser console for more details</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (videos.length === 0) {
    return (
      <Card className="border-2 border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[var(--color-text-primary)]">
            <Youtube className="h-5 w-5 text-[var(--color-accent-primary)]" />
            No Videos Found
          </CardTitle>
          <CardDescription className="text-[var(--color-text-secondary)]">
            We couldn't find any videos on your channel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-text-secondary)]">
            This could mean your channel doesn't have any public videos yet, or there was an issue retrieving them.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[var(--color-bg-card)] border-2 border-[var(--color-border-subtle)] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[var(--color-text-primary)]">
          Your YouTube Videos
        </CardTitle>
        <CardDescription className="text-[var(--color-text-secondary)]">
          Recent uploads from your channel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group border-2 border-[var(--color-border-subtle)] rounded-lg overflow-hidden hover:shadow-lg hover:border-[var(--color-accent-primary)] transition-all bg-[var(--color-bg-card)]"
            >
              <div className="relative aspect-video bg-[var(--color-bg-base)]">
                <img
                  src={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url}
                  alt={video.snippet.title}
                  className="w-full h-full object-cover"
                />
                <a
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
                >
                  <div className="bg-[var(--color-accent-primary)] rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Youtube className="h-6 w-6 text-[var(--color-text-dark)]" />
                  </div>
                </a>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                  {video.snippet.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                  <Calendar className="h-3 w-3" />
                  {new Date(video.snippet.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
