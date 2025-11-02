import { GoogleGenerativeAI } from "@google/generative-ai"
import { VideoTranscript } from "@/types/analysis"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "")

export interface ProductRecommendation {
  id: string
  name: string
  category: "digital" | "physical" | "service"
  description: string
  targetAudience: string
  estimatedDemand: "high" | "medium" | "low"
  confidence: number
  reasoning: string
  priceRange: {
    min: number
    max: number
    currency: string
  }
  keyFeatures: string[]
}

/**
 * Generate 3 product recommendations based on YouTube video transcripts
 * @param transcripts - Array of video transcripts
 * @param strategy - User's strategy (audience-first, market-first, balanced)
 * @param model - User's product model preference (digital, physical, both)
 * @param budget - User's budget range
 * @returns Array of 3 product recommendations
 */
export async function generateProductRecommendations(
  transcripts: VideoTranscript[],
  strategy: string,
  model: string,
  budget: string
): Promise<ProductRecommendation[]> {
  try {
    // Combine all transcripts into a single text for analysis
    const combinedContent = transcripts
      .map(
        (t) => `
Title: ${t.title || "Untitled"}
Description: ${t.description || "No description"}
Transcript: ${t.transcript?.substring(0, 1500) || "No transcript available"}
Tags: ${t.tags?.join(", ") || "No tags"}
View Count: ${t.viewCount || 0}
Like Count: ${t.likeCount || 0}
`
      )
      .join("\n\n---\n\n")

    // Budget mapping for context
    const budgetContext: Record<string, string> = {
      zero: "$0 - Perfect for digital products or print-on-demand",
      small: "$100-$500 - Small batch production or course platforms",
      medium: "$500-$2,000 - Quality test batches or professional setups",
      large: "$2,000+ - Large-scale production",
    }

    const strategyContext: Record<string, string> = {
      "audience-first": "Focus on products that serve the existing community and address their specific needs",
      "market-first": "Focus on trending products and high-growth opportunities in the broader market",
      balanced: "Balance between audience needs and trending market opportunities",
    }

    const modelContext: Record<string, string> = {
      digital: "Generate only digital products (e-books, courses, software, presets, etc.)",
      physical: "Generate only physical products (apparel, equipment, merchandise, etc.)",
      both: "Generate a mix of digital and physical products",
    }

    const prompt = `
You are an expert product strategist specializing in creator economy products. Analyze the YouTube video transcripts below and generate exactly 3 product recommendations that align with the creator's content, audience, and preferences.

VIDEO TRANSCRIPTS:
${combinedContent}

USER PREFERENCES:
- Strategy: ${strategyContext[strategy] || strategy}
- Product Model: ${modelContext[model] || model}
- Budget: ${budgetContext[budget] || budget}

INSTRUCTIONS:
1. Analyze the content themes, topics, and audience interests from the transcripts
2. Consider the creator's expertise areas and content style
3. Generate exactly 3 distinct product recommendations that match their preferences
4. Make products specific, actionable, and aligned with the content niche
5. Consider the budget constraints when suggesting products
6. Be creative but realistic

Return a JSON array with exactly 3 products in this format:
[
  {
    "id": "product-1",
    "name": "Specific Product Name",
    "category": "digital|physical|service",
    "description": "Detailed description of what this product is and why it works",
    "targetAudience": "Who this product is for",
    "estimatedDemand": "high|medium|low",
    "confidence": 0.85,
    "reasoning": "Why this product is a good fit based on the content analysis",
    "priceRange": {
      "min": 0,
      "max": 0,
      "currency": "USD"
    },
    "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"]
  }
]

Make sure each product is:
- Specific and unique (not generic)
- Aligned with the content niche
- Feasible within the budget constraints
- Clearly explained with reasoning
- Distinct from the other recommendations
`

    const genModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json",
      },
    })

    const result = await genModel.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Parse JSON response
    let products: ProductRecommendation[]
    try {
      products = JSON.parse(text)
      
      // Ensure it's an array
      if (!Array.isArray(products)) {
        products = products.products || [products]
      }
      
      // Limit to exactly 3 products
      products = products.slice(0, 3)
      
      // Add IDs if missing
      products = products.map((product, index) => ({
        ...product,
        id: product.id || `product-${index + 1}`,
      }))
      
    } catch (parseError) {
      console.error("Error parsing product recommendations:", parseError)
      // Fallback to dummy products if parsing fails
      products = generateFallbackProducts(strategy, model, budget)
    }

    return products
  } catch (error) {
    console.error("Error generating product recommendations:", error)
    // Return fallback products on error
    return generateFallbackProducts(strategy, model, budget)
  }
}

/**
 * Generate fallback product recommendations if AI fails
 */
function generateFallbackProducts(
  strategy: string,
  model: string,
  budget: string
): ProductRecommendation[] {
  const products: ProductRecommendation[] = [
    {
      id: "product-1",
      name: "Premium Content Creator Course",
      category: model === "physical" ? "physical" : "digital",
      description: "A comprehensive online course teaching content creation strategies based on your successful YouTube channel",
      targetAudience: "Aspiring content creators in your niche",
      estimatedDemand: "high",
      confidence: 0.85,
      reasoning: "Your content shows expertise that can be packaged into a teachable course",
      priceRange: {
        min: budget === "zero" ? 0 : budget === "small" ? 49 : 99,
        max: budget === "large" ? 497 : 197,
        currency: "USD",
      },
      keyFeatures: ["Video lessons", "Downloadable resources", "Community access"],
    },
    {
      id: "product-2",
      name: "Custom Branded Merchandise Line",
      category: "physical",
      description: "A line of branded merchandise featuring your unique designs and catchphrases from your videos",
      targetAudience: "Your loyal audience members who want to support you",
      estimatedDemand: "medium",
      confidence: 0.75,
      reasoning: "Your engaged audience would likely purchase merchandise to show support",
      priceRange: {
        min: budget === "zero" ? 0 : 20,
        max: budget === "large" ? 100 : 50,
        currency: "USD",
      },
      keyFeatures: ["Print-on-demand", "Multiple products", "Branded design"],
    },
    {
      id: "product-3",
      name: "Content Creator Tool or Template Pack",
      category: "digital",
      description: "A collection of templates, presets, or tools that help creators produce content faster",
      targetAudience: "Content creators who want to improve their workflow",
      estimatedDemand: "high",
      confidence: 0.80,
      reasoning: "Based on your content creation process, you can package your tools for others",
      priceRange: {
        min: budget === "zero" ? 0 : 29,
        max: 149,
        currency: "USD",
      },
      keyFeatures: ["Ready-to-use templates", "Professional quality", "Easy customization"],
    },
  ]

  // Filter by model preference if specified
  if (model === "digital") {
    return products.filter((p) => p.category === "digital").slice(0, 3)
  } else if (model === "physical") {
    return products.filter((p) => p.category === "physical").slice(0, 3)
  }

  return products.slice(0, 3)
}

