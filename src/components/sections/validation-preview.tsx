import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, Shield } from "lucide-react"

export function ValidationPreview() {
  const validations = [
    {
      icon: Target,
      title: "Market Validation",
      description: "Our AI analyzes market trends and competition to ensure your product has real demand.",
    },
    {
      icon: TrendingUp,
      title: "Audience Fit",
      description: "We match product ideas with your specific audience preferences and engagement patterns.",
    },
    {
      icon: Shield,
      title: "Profitability Analysis",
      description: "Get detailed profitability projections and pricing recommendations for each product idea.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-primary)]">
          Built-In Validation
        </h2>
        <p className="text-xl text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto">
          Every product recommendation includes comprehensive validation metrics to reduce risk
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {validations.map((validation, index) => {
            const Icon = validation.icon
            const iconColors = [
              "text-green-400", // Target icon - green
              "text-yellow-400", // TrendingUp icon - yellow
              "text-blue-400", // Shield icon - blue
            ]
            return (
              <Card key={index} className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
                <CardHeader>
                  <Icon className={`w-10 h-10 ${iconColors[index]} mb-4`} />
                  <CardTitle className="text-xl text-[var(--color-text-primary)]">
                    {validation.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[var(--color-text-secondary)]">
                    {validation.description}
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

