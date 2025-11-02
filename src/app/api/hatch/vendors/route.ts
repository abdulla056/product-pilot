import { currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { recommendVendors } from "@/lib/vendor-recommendations"
import type { ProductRecommendation } from "@/lib/product-recommendations"

export async function POST(request: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { product, model, budget } = body

    if (!product) {
      return NextResponse.json(
        { error: "Product selection required" },
        { status: 400 }
      )
    }

    // Use the product's category and other info to recommend vendors
    const productCategory = product.category || model || "both"
    const vendors = await recommendVendors(productCategory, budget)

    // Filter vendors based on product category if needed
    let filteredVendors = vendors

    if (productCategory === "digital") {
      filteredVendors = vendors.filter(
        (v) => v.category === "Digital Platform" || v.category === "Print-on-Demand"
      )
    } else if (productCategory === "physical") {
      filteredVendors = vendors.filter(
        (v) => v.category === "Manufacturing" || v.category === "Print-on-Demand" || v.category === "Fulfillment"
      )
    }

    return NextResponse.json({
      success: true,
      vendors: filteredVendors.length > 0 ? filteredVendors : vendors,
      product: product,
    })
  } catch (error: any) {
    console.error("[hatch/vendors] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to get vendor recommendations",
      },
      { status: 500 }
    )
  }
}

