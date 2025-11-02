/**
 * Vendor/Supplier Recommendation Service
 * Finds nearby vendors based on user location and product requirements
 */

export interface Vendor {
  id: string
  name: string
  category: string
  location: string
  distance: string
  rating: number
  minOrder: string
  specialties: string[]
  coordinates?: {
    lat: number
    lng: number
  }
  placeId?: string
  contact?: {
    website?: string
    phone?: string
    email?: string
  }
}

/**
 * Get user location (simplified - in production, use geolocation API or user profile)
 */
export async function getUserLocation(): Promise<{ city: string; country: string } | null> {
  try {
    // TODO: Get from user profile or geolocation API
    // For now, return a default location (could be from Clerk user metadata)
    return {
      city: "San Francisco",
      country: "USA",
    }
  } catch (error) {
    console.error("[vendor] Error getting user location:", error)
    return null
  }
}

/**
 * Recommend vendors based on product requirements and location
 * @param productType - Type of product (digital, physical, both)
 * @param budget - Budget level (zero, small, all)
 * @param location - User location
 * @returns Array of recommended vendors
 */
export async function recommendVendors(
  productType: string,
  budget: string,
  location?: { city: string; country: string } | null
): Promise<Vendor[]> {
  // If no location, try to get it
  const userLocation = location || (await getUserLocation())

  // Mock vendor data - In production, this would query a database or external API
  // Categories: print-on-demand, manufacturing, digital services, fulfillment
  const mockVendors: Vendor[] = [
    // Print-on-Demand (for zero/low budget)
    {
      id: "1",
      name: "Printful",
      category: "Print-on-Demand",
      location: "Global",
      distance: "0-2 days shipping",
      rating: 4.8,
      minOrder: "$0",
      specialties: ["Apparel", "Accessories", "Home Goods"],
      contact: {
        website: "printful.com",
      },
    },
    {
      id: "2",
      name: "Redbubble",
      category: "Print-on-Demand",
      location: "Global",
      distance: "5-7 days shipping",
      rating: 4.5,
      minOrder: "$0",
      specialties: ["Art Prints", "Stickers", "Apparel"],
      contact: {
        website: "redbubble.com",
      },
    },
    // Manufacturing (for small/all-in budget)
    ...(budget !== "zero"
      ? [
          {
            id: "3",
            name: "Alibaba Manufacturing",
            category: "Manufacturing",
            location: "Shenzhen, China",
            distance: "10-15 days",
            rating: 4.3,
            minOrder: "$500",
            specialties: ["Electronics", "Accessories", "Custom Products"],
            contact: {
              website: "alibaba.com",
            },
          } as Vendor,
          {
            id: "4",
            name: "Local Custom Manufacturing Co.",
            category: "Manufacturing",
            location: userLocation ? `${userLocation.city}, ${userLocation.country}` : "Your Area",
            distance: "< 10 miles",
            rating: 4.7,
            minOrder: "$1000",
            specialties: ["Small Batch", "Custom Design", "Rapid Prototyping"],
            contact: {
              website: "localmfg.example.com",
              phone: "+1 (555) 123-4567",
            },
          } as Vendor,
        ]
      : []),
    // Digital Services
    ...(productType === "digital" || productType === "both"
      ? [
          {
            id: "5",
            name: "Gumroad",
            category: "Digital Platform",
            location: "Global",
            distance: "Instant",
            rating: 4.6,
            minOrder: "$0",
            specialties: ["Digital Products", "Courses", "Downloads"],
            contact: {
              website: "gumroad.com",
            },
          } as Vendor,
          {
            id: "6",
            name: "Teachable",
            category: "Digital Platform",
            location: "Global",
            distance: "Instant",
            rating: 4.7,
            minOrder: "$39/month",
            specialties: ["Online Courses", "Memberships", "Coaching"],
            contact: {
              website: "teachable.com",
            },
          } as Vendor,
        ]
      : []),
    // Fulfillment Services
    {
      id: "7",
      name: "ShipBob",
      category: "Fulfillment",
      location: "Multiple US Locations",
      distance: "Same-day processing",
      rating: 4.5,
      minOrder: "$100/month",
      specialties: ["Warehousing", "Shipping", "Returns"],
      contact: {
        website: "shipbob.com",
      },
    },
  ]

  // Filter vendors based on product type and budget
  let filteredVendors = mockVendors

  if (budget === "zero") {
    filteredVendors = filteredVendors.filter(
      (v) => v.category === "Print-on-Demand" || v.category === "Digital Platform" || v.minOrder === "$0"
    )
  } else if (budget === "small") {
    filteredVendors = filteredVendors.filter((v) => {
      const minOrderNum = parseInt(v.minOrder.replace(/[^0-9]/g, "")) || 0
      return minOrderNum <= 1000
    })
  }

  // Sort by relevance (rating, then distance)
  filteredVendors.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating
    // Prefer local vendors if location is known
    if (userLocation && a.location.includes(userLocation.city)) return -1
    if (userLocation && b.location.includes(userLocation.city)) return 1
    return 0
  })

  // Return top 6 vendors
  return filteredVendors.slice(0, 6)
}

