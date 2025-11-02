"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, MapPin, Star, DollarSign, CheckCircle2, ArrowRight, Globe, Phone, Mail, Loader2 } from "lucide-react"
import type { Vendor } from "@/lib/vendor-recommendations"
import { VendorMap } from "@/components/vendor-map"
import { getUserCurrentLocation } from "@/lib/client-geolocation"

export default function VendorsPage() {
  const router = useRouter()
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [enrichingLocations, setEnrichingLocations] = useState(false)
  const [onboarding, setOnboarding] = useState<any>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Get data from localStorage (set by processing/product selection pages)
    const vendorsData = localStorage.getItem("hatch_vendors")
    const selectedProductData = localStorage.getItem("hatch_selected_product")
    const productsData = localStorage.getItem("hatch_products")
    
    const onboardingData = {
      strategy: localStorage.getItem("hatch_strategy"),
      model: localStorage.getItem("hatch_model"),
      budget: localStorage.getItem("hatch_budget"),
    }

    // Get the selected product details
    if (selectedProductData && productsData) {
      try {
        const products = JSON.parse(productsData)
        const product = products.find((p: any) => p.id === selectedProductData)
        if (product) {
          setSelectedProduct(product)
        }
      } catch (e) {
        console.error("Error parsing product data:", e)
      }
    }

    if (vendorsData) {
      try {
        setVendors(JSON.parse(vendorsData))
      } catch (e) {
        console.error("Error parsing vendors data:", e)
      }
    }

    setOnboarding(onboardingData)
    setLoading(false)
  }, [])

  useEffect(() => {
    // Get user location and enrich vendors with coordinates after initial load
    if (!loading && vendors.length > 0) {
      loadVendorLocations()
    }
  }, [loading])

  const loadVendorLocations = async () => {
    try {
      setEnrichingLocations(true)

      // Get current vendors from state or localStorage
      const currentVendors = vendors.length > 0 
        ? vendors 
        : JSON.parse(localStorage.getItem("hatch_vendors") || "[]")

      // Skip if no vendors
      if (currentVendors.length === 0) {
        setEnrichingLocations(false)
        return
      }

      // Try to get user's current location
      const location = await getUserCurrentLocation()
      setUserLocation(location)

      // Enrich vendors with location data from Google Maps
      const response = await fetch("/api/hatch/vendors/enrich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendors: currentVendors,
          userLocation: location,
        }),
      })

      const data = await response.json()

      if (data.success && data.vendors) {
        setVendors(data.vendors)
        // Update localStorage with enriched vendors
        localStorage.setItem("hatch_vendors", JSON.stringify(data.vendors))
      }
    } catch (error) {
      console.error("Error enriching vendor locations:", error)
    } finally {
      setEnrichingLocations(false)
    }
  }

  const handleFinish = () => {
    // Clear all hatch data
    localStorage.removeItem("hatch_strategy")
    localStorage.removeItem("hatch_model")
    localStorage.removeItem("hatch_budget")
    localStorage.removeItem("hatch_products")
    localStorage.removeItem("hatch_selected_product")
    localStorage.removeItem("hatch_vendors")
    document.cookie = "hatch_in_progress=; path=/; max-age=0"

    // Redirect to dashboard
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="text-[var(--color-text-primary)]">Loading vendors...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3 text-[var(--color-text-primary)]">
            Recommended Vendors & Suppliers
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-4">
            Here are vendors matched to your product requirements
          </p>
          {selectedProduct && (
            <div className="mt-4 p-4 bg-black/60 rounded-lg border border-[var(--color-border-subtle)] max-w-2xl mx-auto">
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">Selected Product:</p>
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">
                {selectedProduct.name}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                {selectedProduct.description}
              </p>
            </div>
          )}
        </div>

        {/* Vendor Map */}
        {vendors.length > 0 && (
          <div className="mb-8">
            {enrichingLocations ? (
              <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
                <CardContent className="pt-12 pb-12 px-8 text-center">
                  <Loader2 className="w-8 h-8 text-[var(--color-accent-primary)] animate-spin mx-auto mb-2" />
                  <p className="text-sm text-[var(--color-text-secondary)]">Loading vendor locations...</p>
                </CardContent>
              </Card>
            ) : (
              <VendorMap 
                vendors={vendors} 
                center={userLocation || undefined}
              />
            )}
          </div>
        )}

        {/* Vendors Grid */}
        {vendors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {vendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)]/50 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl text-[var(--color-text-primary)]">
                      {vendor.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {vendor.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-accent-primary)]">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mt-1">
                    <span className="text-xs bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] px-2 py-1 rounded">
                      {vendor.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Specialties */}
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)]/70 mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {vendor.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[var(--color-border-subtle)]/30 text-[var(--color-text-secondary)] px-2 py-1 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-[var(--color-text-secondary)]" />
                    <span className="text-[var(--color-text-secondary)]">
                      Min Order: <strong className="text-[var(--color-text-primary)]">{vendor.minOrder}</strong>
                    </span>
                  </div>

                  {/* Distance/Shipping */}
                  <div className="text-sm text-[var(--color-text-secondary)]">
                    📦 {vendor.distance}
                  </div>

                  {/* Contact */}
                  {vendor.contact && (
                    <div className="pt-3 border-t border-[var(--color-border-subtle)]/30 space-y-2">
                      {vendor.contact.website && (
                        <a
                          href={`https://${vendor.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--color-accent-primary)] hover:underline"
                        >
                          <Globe className="w-4 h-4" />
                          {vendor.contact.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {vendor.contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                          <Phone className="w-4 h-4" />
                          {vendor.contact.phone}
                        </div>
                      )}
                      {vendor.contact.email && (
                        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                          <Mail className="w-4 h-4" />
                          {vendor.contact.email}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-[var(--color-text-secondary)] mb-4">
                No vendors found. Please complete the hatch process again.
              </p>
              <Button onClick={() => router.push("/hatch/strategy")} variant="outline">
                Start Hatch Process
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Finish Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleFinish}
            size="lg"
            className="px-8 py-6 text-lg"
          >
            Finish & Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  )
}

