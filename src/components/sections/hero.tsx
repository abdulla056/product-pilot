import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight } from "lucide-react"
import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center z-10">
        <div className="inline-flex items-center justify-center mb-6">
          <Rocket className="w-16 h-16 text-[var(--color-accent-primary)] mr-4 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--color-text-primary)]">
          Viz<span className="text-[var(--color-accent-primary)]">-I</span>
          <span className="block text-[var(--color-text-secondary)] text-2xl md:text-3xl mt-4 font-normal">
            Visualizing your success story
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto">
          AI-powered product development for content creators. Transform your YouTube insights into ready-to-launch products.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignInButton mode="modal">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SignInButton>
          <Link href="/onboarding/strategy">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Explore Features
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

