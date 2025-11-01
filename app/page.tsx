import { Hero } from "@/components/sections/hero"
import { HowItWorks } from "@/components/sections/how-it-works"
import { ValidationPreview } from "@/components/sections/validation-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { CTAFooter } from "@/components/sections/cta-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <ValidationPreview />
      <Testimonials />
      <CTAFooter />
    </div>
  )
}
