import { Card } from "@/components/ui/card"
import { Package, Laptop, Users } from "lucide-react"

export function ProductTypes() {
  const types = [
    {
      icon: Laptop,
      title: "Digital Products",
      description: "Courses, templates, guides, and downloadable resources",
      examples: ["Online courses", "E-books & guides", "Templates & presets", "Exclusive content"],
      color: "from-purple-500 to-blue-500"
    },
    {
      icon: Package,
      title: "Physical Products",
      description: "Merchandise, kits, and branded goods your audience wants",
      examples: ["Branded apparel", "Recipe/craft kits", "Limited editions", "Accessories"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Services",
      description: "Coaching, consulting, and personalized experiences",
      examples: ["1-on-1 coaching", "Group programs", "Consulting calls", "Workshops"],
      color: "from-cyan-500 to-purple-500"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <span className="text-sm font-semibold text-purple-600">Every Product Type</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Digital, Physical, or Service
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ProductPilot discovers opportunities across all product categories based on your unique creator graph
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {types.map((type, index) => {
            const Icon = type.icon
            return (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-transparent hover:border-purple-200">
                {/* Icon with gradient */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${type.color} opacity-10`} />
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {type.description}
                </p>

                {/* Examples list */}
                <ul className="space-y-2">
                  {type.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      {example}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        {/* Additional context */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-linear-to-br from-purple-50 to-blue-50 border-purple-200">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                From Idea to Fulfillment
              </h3>
              <p className="text-gray-700 leading-relaxed">
                ProductPilot doesn't just suggest products — it helps you validate demand with experiments, 
                generates complete go-to-market assets (landing pages, copy, visuals), and connects you with 
                fulfillment partners and tooling to actually launch.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
