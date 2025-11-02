/**
 * Client-side geolocation helper
 * This file should only be imported in client components
 */

/**
 * Get user's current location (browser geolocation)
 * @returns Promise with lat/lng coordinates
 */
export function getUserCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      console.warn("[geolocation] Geolocation not supported")
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.error("[geolocation] Geolocation error:", error)
        resolve(null)
      },
      {
        timeout: 5000,
        maximumAge: 300000, // 5 minutes
      }
    )
  })
}

