import { Composio } from "composio-core"

// Initialize Composio client
export const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
})

// YouTube toolkit configuration
export const YOUTUBE_TOOLKIT = "YOUTUBE"
export const YOUTUBE_AUTH_CONFIG_ID = process.env.YOUTUBE_AUTH_CONFIG_ID || ""

/**
 * Initialize YouTube connection for a user
 * @param entityId - Entity/User ID
 * @param authConfigId - YouTube auth config ID from Composio dashboard
 * @param redirectUrl - URL to redirect after OAuth (optional)
 * @returns Connection details
 */
export async function initializeYouTubeConnection(
  entityId: string,
  authConfigId?: string,
  redirectUrl?: string
) {
  try {
    const configId = authConfigId || YOUTUBE_AUTH_CONFIG_ID

    if (!configId || configId === "ac_YOUR_YOUTUBE_CONFIG_ID") {
      throw new Error(
        "YouTube auth config ID not set. Please configure YOUTUBE_AUTH_CONFIG_ID in .env.local"
      )
    }

    const entity = await composio.getEntity(entityId)
    const connectionRequest = await entity.initiateConnection({
      appName: YOUTUBE_TOOLKIT,
      authMode: "OAUTH2",
      authConfig: {
        authConfigId: configId,
      },
      redirectUri: redirectUrl,
    })

    return {
      redirectUrl: connectionRequest.redirectUrl,
      connectionRequest,
    }
  } catch (error) {
    console.error("Error initializing YouTube connection:", error)
    throw error
  }
}

/**
 * Get connected account details
 * @param connectedAccountId - Connection ID
 * @returns Connected account details
 */
export async function getConnectedAccount(connectedAccountId: string) {
  try {
    const connectedAccount = await composio.connectedAccounts.get({
      connectedAccountId,
    })
    return connectedAccount
  } catch (error) {
    console.error("Error getting connected account:", error)
    throw error
  }
}

/**
 * Get user's YouTube channel statistics
 * @param entityId - Entity/User ID
 * @param channelId - YouTube channel ID
 * @returns Channel statistics
 */
export async function getChannelStatistics(entityId: string, channelId: string) {
  try {
    const entity = await composio.getEntity(entityId)
    const result = await entity.execute({
      actionName: "YOUTUBE_GET_CHANNEL_STATISTICS",
      params: {
        id: channelId,
        part: "statistics,snippet",
      },
    })
    return result
  } catch (error) {
    console.error("Error getting channel statistics:", error)
    throw error
  }
}

/**
 * List user's YouTube videos
 * @param entityId - Entity/User ID
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of results (default: 10)
 * @returns List of videos
 */
export async function listChannelVideos(
  entityId: string,
  channelId: string,
  maxResults: number = 10
) {
  try {
    const entity = await composio.getEntity(entityId)
    const result = await entity.execute({
      actionName: "YOUTUBE_LIST_CHANNEL_VIDEOS",
      params: {
        channelId,
        maxResults,
        part: "snippet,contentDetails,statistics",
      },
    })
    return result
  } catch (error) {
    console.error("Error listing channel videos:", error)
    throw error
  }
}

/**
 * Get video details
 * @param entityId - Entity/User ID
 * @param videoId - YouTube video ID
 * @returns Video details
 */
export async function getVideoDetails(entityId: string, videoId: string) {
  try {
    const entity = await composio.getEntity(entityId)
    const result = await entity.execute({
      actionName: "YOUTUBE_VIDEO_DETAILS",
      params: {
        id: videoId,
        part: "snippet,contentDetails,statistics",
      },
    })
    return result
  } catch (error) {
    console.error("Error getting video details:", error)
    throw error
  }
}

/**
 * Get channel activities
 * @param entityId - Entity/User ID
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of results (default: 25)
 * @returns Channel activities
 */
export async function getChannelActivities(
  entityId: string,
  channelId: string,
  maxResults: number = 25
) {
  try {
    const entity = await composio.getEntity(entityId)
    const result = await entity.execute({
      actionName: "YOUTUBE_GET_CHANNEL_ACTIVITIES",
      params: {
        channelId,
        maxResults,
        part: "snippet,contentDetails",
      },
    })
    return result
  } catch (error) {
    console.error("Error getting channel activities:", error)
    throw error
  }
}

/**
 * Get channel ID by handle
 * @param entityId - Entity/User ID
 * @param channelHandle - YouTube channel handle (e.g., @username)
 * @returns Channel ID
 */
export async function getChannelIdByHandle(
  entityId: string,
  channelHandle: string
) {
  try {
    const entity = await composio.getEntity(entityId)
    const result = await entity.execute({
      actionName: "YOUTUBE_GET_CHANNEL_ID_BY_HANDLE",
      params: {
        channel_handle: channelHandle,
      },
    })
    return result
  } catch (error) {
    console.error("Error getting channel ID by handle:", error)
    throw error
  }
}
