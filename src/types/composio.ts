/**
 * Composio YouTube API Types
 */

export interface YouTubeChannelStatistics {
  viewCount: string
  subscriberCount: string
  hiddenSubscriberCount: boolean
  videoCount: string
}

export interface YouTubeChannelSnippet {
  title: string
  description: string
  customUrl: string
  publishedAt: string
  thumbnails: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
  }
  localized: {
    title: string
    description: string
  }
  country?: string
}

export interface YouTubeVideoStatistics {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

export interface YouTubeVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
    high: { url: string; width: number; height: number }
    standard?: { url: string; width: number; height: number }
    maxres?: { url: string; width: number; height: number }
  }
  channelTitle: string
  tags?: string[]
  categoryId: string
  liveBroadcastContent: string
  localized: {
    title: string
    description: string
  }
}

export interface YouTubeContentDetails {
  duration: string
  dimension: string
  definition: string
  caption: string
  licensedContent: boolean
  projection: string
}

export interface YouTubeVideo {
  kind: string
  etag: string
  id: string
  snippet: YouTubeVideoSnippet
  contentDetails?: YouTubeContentDetails
  statistics?: YouTubeVideoStatistics
}

export interface YouTubeChannel {
  kind: string
  etag: string
  id: string
  snippet: YouTubeChannelSnippet
  statistics?: YouTubeChannelStatistics
}

export interface ComposioResponse<T = any> {
  data?: T
  error?: string
  successful: boolean
}

export interface ConnectionRequest {
  redirectUrl: string
  connectionStatus?: string
}
