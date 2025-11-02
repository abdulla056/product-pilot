import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Package, Users } from "lucide-react"

export function ProductTypes() {
  const productTypes = [
    {
      icon: Code,
      title: "Digital Products",
      description: "E-books, courses, templates, and software. High-margin, instant delivery, no inventory.",
      features: ["Unlimited scalability", "Instant delivery", "Low overhead"],
    },
    {
      icon: Package,
      title: "Physical Products",
      description: "Merchandise, apparel, equipment, and branded goods. Build a tangible brand presence.",
      features: ["Brand recognition", "Physical presence", "Collectible value"],
    },
    {
      icon: Users,
      title: "Service Products",
      description: "Coaching, consulting, memberships, and communities. Build ongoing relationships.",
      features: ["Recurring revenue", "Personal connection", "Scalable delivery"],
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-primary)]">
          Product Types We Support
        </h2>
        <p className="text-xl text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto">
          From digital downloads to physical merchandise, we help you find the perfect product for your audience
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {productTypes.map((product, index) => {
            const Icon = product.icon
            const iconColors = [
              "text-purple-400", // Code icon - purple
              "text-orange-400", // Package icon - orange
              "text-cyan-400", // Users icon - cyan
            ]
            return (
              <Card key={index} className="bg-black/80 backdrop-blur-lg border-2 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-primary)] transition-colors">
                <CardHeader>
                  <div className="mb-4">
                    <Icon className={`w-12 h-12 ${iconColors[index]}`} />
                  </div>
                  <CardTitle className="text-2xl text-[var(--color-text-primary)] mb-2">
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)] text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

