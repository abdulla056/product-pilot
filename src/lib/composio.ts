// Server-side only module - DO NOT import in client components
// Composio requires server-side environment variables

// Mark this file as server-only to prevent client-side bundling
if (typeof window !== "undefined") {
  throw new Error(
    "This module cannot be imported in client components. " +
    "Composio can only be used in server-side code (API routes, Server Components)."
  )
}

// Use dynamic require at runtime to prevent bundling issues
// This ensures Composio is only loaded when actually needed

// Initialize Composio client only on server side
// This prevents client-side initialization errors when COMPOSIO_API_KEY is not available
let composioInstance: InstanceType<typeof import("composio-core").Composio> | null = null

function getComposioClient() {
  // Ensure this only runs on the server
  if (typeof window !== "undefined") {
    throw new Error(
      "Composio client can only be used on the server side. " +
      "Make sure you're not importing composio.ts in client components. " +
      "If you need Composio functionality, use it through API routes."
    )
  }

  // Synchronous initialization for backward compatibility
  // Note: This will throw if called on client side (checked above)
  if (!composioInstance) {
    // Use dynamic require at runtime to avoid bundling issues
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Composio } = require("composio-core")
    
    const apiKey = process.env.COMPOSIO_API_KEY
    if (!apiKey) {
      throw new Error(
        "COMPOSIO_API_KEY is not set in environment variables. " +
        "Please add it to your .env.local file: COMPOSIO_API_KEY=comp_your_key_here"
      )
    }
    
    composioInstance = new Composio({
      apiKey: apiKey,
    })
  }

  return composioInstance
}

// Export a function that ensures server-side only usage
export { getComposioClient }

// For backward compatibility, export composio as a lazy getter
// This prevents immediate initialization during module load
// WARNING: This will throw if accessed on client side
export const composio = new Proxy({} as any, {
  get(_target, prop) {
    try {
      const client = getComposioClient()
      const value = (client as any)[prop]
      
      // If it's a function, bind it to maintain 'this' context
      if (typeof value === "function") {
        return value.bind(client)
      }
      
      return value
    } catch (error: any) {
      // Provide helpful error message
      if (error.message.includes("window")) {
        throw new Error(
          "Cannot use Composio on the client side. " +
          "This module was imported in a client component. " +
          "Move the Composio usage to an API route or server component."
        )
      }
      throw error
    }
  }
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
 * Disconnect YouTube connection for a user
 * @param entityId - Entity/User ID
 * @returns Success status
 */
export async function disconnectYouTubeConnection(entityId: string) {
  try {
    const entity = await composio.getEntity(entityId)
    
    // Get all connections to find YouTube connection ID
    const connections = await entity.getConnections()
    const youtubeConnection = connections.find(
      (conn: any) => conn.appName === "YOUTUBE" || conn.appUniqueId?.includes("youtube")
    )

    if (!youtubeConnection || !youtubeConnection.id) {
      throw new Error("No YouTube connection found")
    }

    // Delete the connection using connectedAccounts.delete
    await composio.connectedAccounts.delete({
      connectedAccountId: youtubeConnection.id,
    })

    return {
      success: true,
      message: "YouTube connection disconnected successfully",
    }
  } catch (error: any) {
    console.error("Error disconnecting YouTube connection:", error)
    throw new Error(error?.message || "Failed to disconnect YouTube connection")
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
