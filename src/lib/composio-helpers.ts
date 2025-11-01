import { composio } from "./composio"

/**
 * Get user's connected accounts
 * @param entityId - Entity/User ID
 * @returns List of connected accounts
 */
export async function getUserConnections(entityId: string) {
  try {
    console.log("[composio-helpers] Getting connections for entity:", entityId)
    const entity = await composio.getEntity(entityId)
    const connections = await entity.getConnections()
    console.log("[composio-helpers] Found connections:", connections)
    return connections
  } catch (error) {
    console.error("Error getting user connections:", error)
    return []
  }
}

/**
 * Check if user has YouTube connected
 * @param entityId - Entity/User ID
 * @returns YouTube connection or null
 */
export async function getYouTubeConnection(entityId: string) {
  try {
    console.log("[composio-helpers] Checking YouTube connection for:", entityId)
    const connections = await getUserConnections(entityId)
    console.log("[composio-helpers] All connections details:", JSON.stringify(connections, null, 2))
    
    // Check for YouTube connection with different possible statuses
    const youtubeConnection = connections.find(
      (conn: any) => {
        console.log("[composio-helpers] Checking connection:", conn.appName, conn.status)
        return conn.appName === "YOUTUBE" || conn.appUniqueId?.includes("youtube")
      }
    )
    console.log("[composio-helpers] YouTube connection found:", youtubeConnection)
    return youtubeConnection || null
  } catch (error) {
    console.error("Error checking YouTube connection:", error)
    return null
  }
}

/**
 * Get user's YouTube channel data
 * This fetches the authenticated user's own channel
 * @param entityId - Entity/User ID
 * @returns Channel data or null
 */
export async function getMyYouTubeChannel(entityId: string) {
  try {
    console.log("[composio-helpers] Getting YouTube channel for:", entityId)
    const entity = await composio.getEntity(entityId)
    
    // Step 1: Get user's playlists to extract channel ID
    console.log("[composio-helpers] Fetching user playlists to get channel ID...")
    const playlistResult: any = await entity.execute({
      actionName: "YOUTUBE_LIST_USER_PLAYLISTS",
      params: {
        part: "snippet",
        maxResults: 1,
      },
    })

    console.log("[composio-helpers] Playlist result:", JSON.stringify(playlistResult, null, 2))

    // Check if we got playlists - handle both response structures
    const playlistItems = playlistResult?.data?.response_data?.items || playlistResult?.data?.items
    
    if (!playlistItems || !Array.isArray(playlistItems) || playlistItems.length === 0) {
      console.log("[composio-helpers] No playlists found - user might not have any playlists")
      return null
    }

    // Extract channel ID from playlist
    const channelId = playlistItems[0].snippet?.channelId
    if (!channelId) {
      console.log("[composio-helpers] No channel ID found in playlist response")
      return null
    }
    
    console.log("[composio-helpers] Found channel ID:", channelId)
    
    // Step 2: Get full channel statistics and details
    console.log("[composio-helpers] Fetching channel statistics...")
    const channelResult: any = await entity.execute({
      actionName: "YOUTUBE_GET_CHANNEL_STATISTICS",
      params: {
        id: channelId,
        part: "statistics,snippet,contentDetails",
      },
    })
    
    console.log("[composio-helpers] Channel result:", JSON.stringify(channelResult, null, 2))

    // Check if we got channel data - handle both response structures
    const channelItems = channelResult?.data?.response_data?.items || channelResult?.data?.items
    
    if (!channelItems || !Array.isArray(channelItems) || channelItems.length === 0) {
      console.log("[composio-helpers] No channel data found in response")
      return null
    }

    const channelData = channelItems[0]
    console.log("[composio-helpers] Successfully retrieved channel data for:", channelData.snippet?.title)
    
    return {
      items: channelItems,
      channelId: channelData.id,
    }
  } catch (error: any) {
    console.error("[composio-helpers] Error getting YouTube channel:", error?.message || error)
    if (error?.response) {
      console.error("[composio-helpers] Error response:", JSON.stringify(error.response, null, 2))
    }
    return null
  }
}

/**
 * Get user's YouTube playlists
 * @param entityId - Entity/User ID
 * @param maxResults - Maximum number of playlists to fetch (default: 25)
 * @returns Playlists data or null
 */
export async function getUserPlaylists(entityId: string, maxResults: number = 25) {
  try {
    console.log("[composio-helpers] Getting YouTube playlists for:", entityId)
    const entity = await composio.getEntity(entityId)
    
    const result: any = await entity.execute({
      actionName: "YOUTUBE_LIST_USER_PLAYLISTS",
      params: {
        part: "snippet,contentDetails,status",
        maxResults,
        mine: true, // Explicitly request user's own playlists
      },
    })

    console.log("[composio-helpers] Playlists result (full):", JSON.stringify(result, null, 2))

    // Check for different response structures
    // Composio wraps the response in data.response_data
    const items = result?.data?.response_data?.items || result?.data?.items
    
    if (items && Array.isArray(items) && items.length > 0) {
      console.log("[composio-helpers] Successfully retrieved", items.length, "playlists")
      
      return {
        items: items,
        totalResults: result?.data?.response_data?.pageInfo?.totalResults || 
                     result?.data?.pageInfo?.totalResults || 
                     items.length,
        nextPageToken: result?.data?.response_data?.nextPageToken || 
                      result?.data?.nextPageToken,
      }
    }

    // Check if there's an error in the response
    if (result?.error) {
      console.error("[composio-helpers] API returned error:", result.error)
    }

    // Check if data exists but is empty
    if (result?.data) {
      console.log("[composio-helpers] Data exists but no items:", result.data)
    }

    console.log("[composio-helpers] No playlists found or empty response")
    return null
  } catch (error: any) {
    console.error("[composio-helpers] Error getting YouTube playlists:", error?.message || error)
    if (error?.response) {
      console.error("[composio-helpers] Error response:", JSON.stringify(error.response, null, 2))
    }
    if (error?.data) {
      console.error("[composio-helpers] Error data:", JSON.stringify(error.data, null, 2))
    }
    return null
  }
}

/**
 * Get user's uploaded YouTube videos
 * @param entityId - Entity/User ID
 * @param channelId - YouTube channel ID
 * @param maxResults - Maximum number of videos to fetch (default: 12)
 * @returns Videos data or null
 */
export async function getChannelVideos(
  entityId: string,
  channelId: string,
  maxResults: number = 12
) {
  try {
    console.log("[composio-helpers] Getting YouTube videos for channel:", channelId)
    const entity = await composio.getEntity(entityId)
    
    // YOUTUBE_LIST_CHANNEL_VIDEOS uses YouTube Search API
    // Search API only supports 'snippet' part (NOT contentDetails or statistics)
    const result: any = await entity.execute({
      actionName: "YOUTUBE_LIST_CHANNEL_VIDEOS",
      params: {
        channelId,
        maxResults,
        part: "snippet", // Search API only supports snippet
        order: "date", // Get newest videos first
        type: "video", // Only get videos (not playlists or channels)
      },
    })

    console.log("[composio-helpers] Videos result (full):", JSON.stringify(result, null, 2))

    // Check for different response structures
    const items = result?.data?.response_data?.items || result?.data?.items
    
    if (items && Array.isArray(items) && items.length > 0) {
      console.log("[composio-helpers] Successfully retrieved", items.length, "videos")
      
      // Transform search results to match expected video format
      // Search API returns: { id: { videoId: "..." }, snippet: {...} }
      // We need: { id: "...", snippet: {...} }
      const transformedItems = items.map((item: any) => ({
        ...item,
        id: item.id?.videoId || item.id, // Extract videoId from search result
      }))
      
      return {
        items: transformedItems,
        totalResults: result?.data?.response_data?.pageInfo?.totalResults || 
                     result?.data?.pageInfo?.totalResults || 
                     items.length,
        nextPageToken: result?.data?.response_data?.nextPageToken || 
                      result?.data?.nextPageToken,
      }
    }

    console.log("[composio-helpers] No videos found or empty response")
    return null
  } catch (error: any) {
    console.error("[composio-helpers] Error getting YouTube videos:", error?.message || error)
    if (error?.response) {
      console.error("[composio-helpers] Error response:", JSON.stringify(error.response, null, 2))
    }
    if (error?.data) {
      console.error("[composio-helpers] Error data:", JSON.stringify(error.data, null, 2))
    }
    return null
  }
}
