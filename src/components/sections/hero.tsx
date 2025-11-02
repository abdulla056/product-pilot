import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center z-10">
        <div className="inline-flex flex-col items-center justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Hatch Logo"
            width={400}
            height={100}
            priority={true}
            className="mb-6 animate-pulse"
          />
          <p className="text-[var(--color-text-secondary)] text-2xl md:text-3xl font-normal">
            Visualizing your success story
          </p>
        </div>
        <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto">
          AI-powered product development for content creators. Transform your YouTube insights into ready-to-launch products.
        </p>
        <div className="flex justify-center">
          <Link href="/hatch/strategy">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Hatching
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

