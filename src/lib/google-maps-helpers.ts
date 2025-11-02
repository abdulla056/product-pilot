import { composio } from "./composio"

/**
 * Search for nearby places using Google Maps API via Composio
 * @param entityId - Entity/User ID
 * @param query - Search query (e.g., "manufacturing", "suppliers", "wholesale")
 * @param location - Location object with lat/lng or address
 * @param radius - Search radius in meters (default: 5000 = 5km)
 * @param maxResults - Maximum number of results (default: 10)
 * @returns Array of place results
 */
export async function searchNearbyPlaces(
  entityId: string,
  query: string,
  location?: { lat: number; lng: number } | { address: string },
  radius: number = 5000,
  maxResults: number = 10
): Promise<any[]> {
  try {
    console.log(`[google-maps] Searching for nearby places: ${query}`)
    const entity = await composio.getEntity(entityId)

    // Determine search parameters
    let searchParams: any = {
      textQuery: query,
      maxResultCount: maxResults,
    }

    // Add location if provided
    if (location) {
      if ("lat" in location && "lng" in location) {
        searchParams.locationBias = {
          circle: {
            center: {
              latitude: location.lat,
              longitude: location.lng,
            },
            radius: radius,
          },
        }
      } else if ("address" in location) {
        searchParams.locationBias = {
          regionCode: "US", // Can be made dynamic
        }
        searchParams.textQuery = `${query} in ${location.address}`
      }
    }

    // Execute Google Places search via Composio
    // Try different possible action names in case Composio uses different naming
    let result: any
    try {
      result = await entity.execute({
        actionName: "GOOGLE_PLACES_TEXT_SEARCH",
        params: searchParams,
      })
    } catch (error) {
      // Fallback: try alternative action names
      try {
        result = await entity.execute({
          actionName: "GOOGLEMAPS_TEXT_SEARCH",
          params: searchParams,
        })
      } catch (error2) {
        console.error("[google-maps] Both action names failed, trying without Composio")
        // Return empty array if Composio integration isn't set up
        return []
      }
    }

    if (!result?.successful || result?.error) {
      console.error("[google-maps] Search error:", result?.error)
      return []
    }

    const places = result?.data?.places || result?.data?.response_data?.places || []

    console.log(`[google-maps] Found ${places.length} places`)
    return places
  } catch (error: any) {
    console.error("[google-maps] Error searching places:", error)
    // Fallback: return empty array if Composio/Google Maps fails
    return []
  }
}

/**
 * Get place details including coordinates
 * @param entityId - Entity/User ID
 * @param placeId - Google Places place_id
 * @returns Place details with coordinates
 */
export async function getPlaceDetails(
  entityId: string,
  placeId: string
): Promise<any | null> {
  try {
    const entity = await composio.getEntity(entityId)

    // Try different possible action names
    let result: any
    try {
      result = await entity.execute({
        actionName: "GOOGLE_PLACES_GET_PLACE",
        params: {
          placeId: placeId,
          fields: ["id", "displayName", "formattedAddress", "location", "rating", "websiteUri", "nationalPhoneNumber"],
        },
      })
    } catch (error) {
      try {
        result = await entity.execute({
          actionName: "GOOGLEMAPS_GET_PLACE",
          params: {
            placeId: placeId,
          },
        })
      } catch (error2) {
        console.error("[google-maps] Get place failed")
        return null
      }
    }

    if (!result?.successful || result?.error) {
      console.error("[google-maps] Get place error:", result?.error)
      return null
    }

    return result?.data?.place || result?.data?.response_data || null
  } catch (error) {
    console.error("[google-maps] Error getting place details:", error)
    return null
  }
}

/**
 * Convert vendor data to include coordinates from Google Places search
 * @param entityId - Entity/User ID
 * @param vendors - Array of vendors
 * @param userLocation - User's location for nearby search
 * @returns Vendors with coordinates added
 */
export async function enrichVendorsWithLocations(
  entityId: string,
  vendors: any[],
  userLocation?: { lat: number; lng: number } | { address: string }
): Promise<any[]> {
  try {
    const enrichedVendors = await Promise.all(
      vendors.map(async (vendor) => {
        // Skip if already has coordinates
        if (vendor.coordinates) {
          return vendor
        }

        // Skip if location is "Global" (online services)
        if (vendor.location === "Global" || vendor.location.includes("Global")) {
          return vendor
        }

        // Search for the vendor's location using Google Places
        const query = `${vendor.category} ${vendor.location}`
        const places = await searchNearbyPlaces(entityId, query, userLocation, 10000, 1)

        if (places.length > 0) {
          const place = places[0]
          const location = place.location

          return {
            ...vendor,
            coordinates: location
              ? {
                  lat: location.latitude || 0,
                  lng: location.longitude || 0,
                }
              : undefined,
            placeId: place.id,
          }
        }

        return vendor
      })
    )

    return enrichedVendors
  } catch (error) {
    console.error("[google-maps] Error enriching vendors:", error)
    return vendors
  }
}

// Note: getUserCurrentLocation has been moved to src/lib/client-geolocation.ts
// to avoid importing Composio on the client side

