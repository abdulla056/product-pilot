export type ProductStatus = "recommended" | "selected"

export interface Product {
  id: string
  name: string
  description: string
  profitability: number // 1-5
  viability: number // 1-5
  sustainability: number // 1-5
  opportunity: number // 1-5
  status: ProductStatus
  documentationUrl?: string
  fullDocumentation?: string
}

