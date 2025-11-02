import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function CTAFooter() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-accent-primary)]">
          <CardContent className="pt-12 pb-12 px-8 text-center">
            <Image
              src="/logo.png"
              alt="Hatch Logo"
              width={200}
              height={50}
              priority={true}
              className="mx-auto mb-6"
            />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
              Ready to Launch Your Product?
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are turning their audience insights into profitable products
            </p>
            <div className="flex justify-center">
              <Link href="/hatch/strategy">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Hatching
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

