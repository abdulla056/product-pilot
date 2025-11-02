import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { enrichVendorsWithLocations } from "@/lib/google-maps-helpers"
import type { Vendor } from "@/lib/vendor-recommendations"

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { vendors, userLocation } = body

    if (!vendors || !Array.isArray(vendors)) {
      return NextResponse.json(
        { error: "Vendors array required" },
        { status: 400 }
      )
    }

    const entityId = user.id

    // Enrich vendors with location coordinates
    const enrichedVendors = await enrichVendorsWithLocations(
      entityId,
      vendors as Vendor[],
      userLocation
    )

    return NextResponse.json({
      success: true,
      vendors: enrichedVendors,
    })
  } catch (error: any) {
    console.error("[hatch/vendors/enrich] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to enrich vendor locations",
      },
      { status: 500 }
    )
  }
}

