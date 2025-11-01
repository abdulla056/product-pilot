import { Card } from "@/components/ui/card"
import { Brain, Link2, Rocket, Youtube, Instagram, BarChart3, Package, Zap } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Link2,
      title: "Read your creator graph",
      description: "Connect socials, content, audience feedback, and sales history for deep analysis",
      platforms: [
        { name: "YouTube", icon: Youtube, color: "text-red-500" },
        { name: "Instagram", icon: Instagram, color: "text-pink-500" },
        { name: "TikTok", icon: "🎵", color: "text-gray-700" },
      ]
    },
    {
      icon: Brain,
      title: "Discover product opportunities",
      description: "AI infers viable digital, service, and physical product ideas from your data",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Validate with experiments",
      description: "Test demand with auto-generated landing pages and real audience feedback",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Launch with GTM assets",
      description: "Get marketing materials, fulfillment setup, and tooling recommendations",
      gradient: "from-cyan-500 to-purple-600"
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From creator insights to validated products ready to launch
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-purple-300 to-blue-300" />
                )}
                
                <Card className="relative p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-linear-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl mb-6">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>

                  {/* Platform icons for step 1 */}
                  {step.platforms && (
                    <div className="flex justify-center gap-4 pt-4">
                      {step.platforms.map((platform, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                          {typeof platform.icon === 'string' ? (
                            <span className="text-2xl">{platform.icon}</span>
                          ) : (
                            <platform.icon className={`w-6 h-6 ${platform.color}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gradient animation for steps 2 & 3 */}
                  {step.gradient && (
                    <div className={`mt-4 h-2 rounded-full bg-linear-to-r ${step.gradient} opacity-50`} />
                  )}
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
