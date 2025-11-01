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
        
        console.log('[YouTubeVideosList] Fetching videos...')
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-600" />
            Your YouTube Videos
          </CardTitle>
          <CardDescription>Loading your latest videos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertCircle className="h-5 w-5" />
            Error Loading Videos
          </CardTitle>
          <CardDescription className="text-red-700">{error}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorDetails && (
            <div className="bg-white border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-red-900 mb-2">Error Details:</h4>
              <pre className="text-xs text-red-800 overflow-auto max-h-64 bg-red-50 p-3 rounded">
                {JSON.stringify(errorDetails, null, 2)}
              </pre>
            </div>
          )}
          <div className="text-sm text-red-700">
            <p className="font-semibold mb-2">Troubleshooting steps:</p>
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
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <Youtube className="h-5 w-5" />
            No Videos Found
          </CardTitle>
          <CardDescription className="text-yellow-700">
            We couldn't find any videos on your channel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-yellow-800">
            This could mean your channel doesn't have any public videos yet, or there was an issue retrieving them.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-600" />
              Your YouTube Videos
            </CardTitle>
            <CardDescription>
              {channelInfo?.title && `${channelInfo.title} • `}
              {videos.length} of {channelInfo?.videoCount || videos.length} videos
            </CardDescription>
          </div>
          {channelInfo && (
            <div className="flex gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">{parseInt(channelInfo.subscriberCount).toLocaleString()}</span>
                <span className="ml-1">subscribers</span>
              </div>
              <div>
                <span className="font-semibold">{parseInt(channelInfo.viewCount).toLocaleString()}</span>
                <span className="ml-1">views</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.default?.url}
                  alt={video.snippet.title}
                  className="w-full h-full object-cover"
                />
                <a
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center"
                >
                  <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Youtube className="h-6 w-6 text-white" />
                  </div>
                </a>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                  {video.snippet.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
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
