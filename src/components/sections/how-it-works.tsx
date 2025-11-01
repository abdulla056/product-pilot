import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Youtube, Sparkles, Package } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Youtube,
      title: "Connect Your YouTube",
      description: "Link your YouTube account and let our AI analyze your content, audience, and engagement patterns.",
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Our advanced algorithms process your data to identify product opportunities tailored to your audience.",
    },
    {
      icon: Package,
      title: "Get Recommendations",
      description: "Receive personalized product ideas with full documentation and launch strategies.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-primary)]">
          How It Works
        </h2>
        <p className="text-xl text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto">
          Three simple steps to transform your creator insights into profitable products
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card key={index} className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-[var(--color-accent-primary)]/20 flex items-center justify-center border-2 border-[var(--color-accent-primary)]/30">
                    <Icon className="w-8 h-8 text-[var(--color-accent-primary)]" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] text-sm font-semibold mb-2">
                    Step {index + 1}
                  </div>
                  <CardTitle className="text-2xl text-[var(--color-text-primary)]">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--color-text-secondary)] text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

