import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Tech YouTuber",
      content: "Viz-I helped me identify a digital course idea that my audience was already asking for. Launched it in 2 weeks!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Fitness Creator",
      content: "The AI analysis was spot-on. Found a product gap I never noticed, and it's now my best-selling item.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Lifestyle Vlogger",
      content: "Saved me months of market research. The product recommendations came with everything I needed to launch successfully.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-primary)]">
          Creator Success Stories
        </h2>
        <p className="text-xl text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto">
          See how creators are using Viz-I to launch successful products
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[var(--color-accent-primary)] text-[var(--color-accent-primary)]"
                    />
                  ))}
                </div>
                <p className="text-[var(--color-text-secondary)] mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

