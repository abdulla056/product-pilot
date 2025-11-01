import { Card } from "@/components/ui/card"
import { Star, Youtube, Instagram } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "YouTube Creator",
      followers: "250K",
      platform: "YouTube",
      platformIcon: Youtube,
      platformColor: "text-red-500",
      image: "SC",
      quote: "ProductPilot analyzed my audience and suggested a course I never considered. Launched in 2 weeks, made $5K in pre-orders!",
      rating: 5
    },
    {
      name: "Marcus Rivera",
      role: "TikTok Creator",
      followers: "1.2M",
      platform: "TikTok",
      platformIcon: "🎵",
      platformColor: "text-gray-700",
      image: "MR",
      quote: "It suggested a physical product based on my audience comments. Validated demand before production. Now it's my main revenue stream!",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Instagram Creator",
      followers: "180K",
      platform: "Instagram",
      platformIcon: Instagram,
      platformColor: "text-pink-500",
      image: "EW",
      quote: "I tested a coaching service, digital guide, and merch line. The data showed exactly which one to launch first. Saved months!",
      rating: 5
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved by Creators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of creators who turned their audience into revenue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all hover:-translate-y-1">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{testimonial.followers} followers</span>
                    <span>•</span>
                    {typeof testimonial.platformIcon === 'string' ? (
                      <span>{testimonial.platformIcon}</span>
                    ) : (
                      <testimonial.platformIcon className={`w-4 h-4 ${testimonial.platformColor}`} />
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <p className="text-gray-600">Creators</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              25K+
            </div>
            <p className="text-gray-600">Products Validated</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              $2M+
            </div>
            <p className="text-gray-600">Revenue Generated</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              92%
            </div>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
