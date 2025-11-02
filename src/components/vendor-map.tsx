"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Loader2 } from "lucide-react"
import type { Vendor } from "@/lib/vendor-recommendations"

interface VendorMapProps {
  vendors: Vendor[]
  center?: { lat: number; lng: number }
  zoom?: number
}

export function VendorMap({ vendors, center, zoom = 12 }: VendorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])

  // Filter vendors: Only show vendors with physical locations (coordinates)
  // This ensures only AI-recommended vendors with physical locations are displayed
  const vendorsWithPhysicalLocations = vendors.filter((vendor) => {
    // Exclude online/global vendors that don't have coordinates
    if (vendor.location === "Global" || vendor.location.toLowerCase().includes("global")) {
      return false
    }
    // Only include vendors that have coordinates (physical locations)
    return vendor.coordinates && vendor.coordinates.lat && vendor.coordinates.lng
  })

  // Load Google Maps script
  useEffect(() => {
    if (typeof window === "undefined" || mapLoaded) return

    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      setMapError(
        "Google Maps API key not configured. " +
        "Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file. " +
        "See docs/GOOGLE_MAPS_SETUP.md for setup instructions."
      )
      return
    }

    // Check if Google Maps is already loaded globally
    if ((window as any).google && (window as any).google.maps) {
      setMapLoaded(true)
      return
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
    if (existingScript) {
      // Wait for script to load
      const checkLoaded = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          clearInterval(checkLoaded)
          setMapLoaded(true)
        }
      }, 100)
      
      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkLoaded)
        if (!(window as any).google || !(window as any).google.maps) {
          setMapError("Google Maps script loaded but API not available. Check your API key permissions.")
        }
      }, 5000)
      
      return
    }

    // Add callback to catch Google Maps initialization errors
    const callbackName = `initGoogleMaps_${Date.now()}`
    ;(window as any)[callbackName] = () => {
      if ((window as any).google && (window as any).google.maps) {
        setMapLoaded(true)
      } else {
        setMapError("Google Maps callback fired but API not available.")
      }
      delete (window as any)[callbackName]
    }

    // Create and load the script with callback
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`
    script.async = true
    script.defer = true

    script.onerror = (error) => {
      console.error("Google Maps script error:", error)
      delete (window as any)[callbackName]
      setMapError(
        "Failed to load Google Maps. Possible reasons:\n" +
        "1. API key is invalid or expired\n" +
        "2. Maps JavaScript API is not enabled in Google Cloud Console\n" +
        "3. API key restrictions are blocking this domain\n" +
        "4. Network connection issue\n\n" +
        "Check the browser console (F12) for detailed error messages."
      )
    }

    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if ((window as any)[callbackName]) {
        delete (window as any)[callbackName]
      }
    }
  }, [mapLoaded])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map) return

    try {
      // Determine center (use provided center or first vendor with physical location, or default)
      let mapCenter: google.maps.LatLngLiteral = center || { lat: 37.7749, lng: -122.4194 } // Default: San Francisco

      if (!center && vendorsWithPhysicalLocations.length > 0) {
        const firstVendor = vendorsWithPhysicalLocations[0]
        if (firstVendor.coordinates) {
          mapCenter = {
            lat: firstVendor.coordinates.lat,
            lng: firstVendor.coordinates.lng,
          }
        }
      }

      const mapInstance = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: zoom,
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#1a1a1a" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#000000" }, { visibility: "off" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#0a1a1a" }],
          },
        ],
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
      })

      setMap(mapInstance)
    } catch (error) {
      console.error("[VendorMap] Error initializing map:", error)
      setMapError("Failed to initialize map")
    }
  }, [mapLoaded, map, center, zoom, vendorsWithPhysicalLocations])

  // Add markers for vendors with physical locations only
  useEffect(() => {
    if (!map || vendorsWithPhysicalLocations.length === 0) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))
    const newMarkers: google.maps.Marker[] = []

    // Only show vendors with physical locations (already filtered above)
    vendorsWithPhysicalLocations.forEach((vendor) => {
      if (!vendor.coordinates) return

      const marker = new google.maps.Marker({
        position: {
          lat: vendor.coordinates.lat,
          lng: vendor.coordinates.lng,
        },
        map: map,
        title: vendor.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#00ff9d",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      })

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="color: #000; padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-weight: 600;">${vendor.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${vendor.category}</p>
            <p style="margin: 0; font-size: 12px; color: #666;">${vendor.location}</p>
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    // Fit bounds to show all markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach((marker) => {
        const position = marker.getPosition()
        if (position) bounds.extend(position)
      })
      map.fitBounds(bounds)

      // Don't zoom in too much if there's only one marker
      if (newMarkers.length === 1) {
        google.maps.event.addListenerOnce(map, "bounds_changed", () => {
          if (map.getZoom() && map.getZoom()! > 15) {
            map.setZoom(15)
          }
        })
      }
    }
  }, [map, vendorsWithPhysicalLocations])

  if (mapError) {
    return (
      <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
        <CardContent className="pt-12 pb-12 px-8">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Map Loading Error
            </h3>
            <p className="text-[var(--color-text-secondary)] whitespace-pre-line mb-4">
              {mapError}
            </p>
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
              <p className="text-sm font-semibold text-red-400 mb-2">Quick Fix Checklist:</p>
              <ul className="text-xs text-[var(--color-text-secondary)] space-y-1 list-disc list-inside">
                <li>Check that NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is in .env.local</li>
                <li>Restart your dev server after adding the key</li>
                <li>Verify Maps JavaScript API is enabled in Google Cloud Console</li>
                <li>Check API key restrictions allow your domain</li>
                <li>Open browser console (F12) for detailed error messages</li>
              </ul>
            </div>
            <a
              href="/docs/GOOGLE_MAPS_SETUP.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-accent-primary)] hover:underline mt-4 inline-block"
            >
              View Setup Guide →
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  const vendorsWithoutPhysicalLocations = vendors.filter((v) => 
    !v.coordinates || 
    v.location === "Global" || 
    v.location.toLowerCase().includes("global")
  )

  return (
    <div className="space-y-4">
      <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
        <CardHeader>
          <CardTitle className="text-xl text-[var(--color-text-primary)] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[var(--color-accent-primary)]" />
            Recommended Vendor Locations
            {vendorsWithPhysicalLocations.length > 0 && (
              <span className="text-sm font-normal text-[var(--color-text-secondary)] ml-2">
                ({vendorsWithPhysicalLocations.length} {vendorsWithPhysicalLocations.length === 1 ? "location" : "locations"} shown)
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Showing only vendors with physical locations recommended for your selected product
          </p>
        </CardHeader>
        <CardContent>
          {!mapLoaded ? (
            <div className="h-96 flex items-center justify-center bg-[var(--color-bg-glass)] rounded-lg">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin mx-auto mb-2" />
                <p className="text-sm text-[var(--color-text-secondary)]">Loading map...</p>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="h-96 w-full rounded-lg overflow-hidden" />
          )}
        </CardContent>
      </Card>

      {vendorsWithoutPhysicalLocations.length > 0 && (
        <Card className="bg-black/60 backdrop-blur-lg border border-[var(--color-border-subtle)]">
          <CardContent className="pt-4 pb-4 px-6">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">
                {vendorsWithoutPhysicalLocations.length} vendor{vendorsWithoutPhysicalLocations.length !== 1 ? "s" : ""}
              </strong>{" "}
              {vendorsWithoutPhysicalLocations.length === 1 ? "is" : "are"} online/global and {vendorsWithoutPhysicalLocations.length === 1 ? "is" : "are"} shown in the vendor list below instead
            </p>
          </CardContent>
        </Card>
      )}

      {vendorsWithPhysicalLocations.length === 0 && vendors.length > 0 && (
        <Card className="bg-black/60 backdrop-blur-lg border border-[var(--color-border-subtle)]">
          <CardContent className="pt-4 pb-4 px-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              All recommended vendors are online/global. Check the vendor list below for details.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

