import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ProductTypes } from "@/components/sections/product-types"
import { ValidationPreview } from "@/components/sections/validation-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { CTAFooter } from "@/components/sections/cta-footer"
import { BackgroundVideo } from "@/components/shared/BackgroundVideo"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <BackgroundVideo />
      <div className="relative z-10">
        <Hero />
        <HowItWorks />
        <ProductTypes />
        <ValidationPreview />
        <Testimonials />
        <CTAFooter />
      </div>
    </div>
  )
}

