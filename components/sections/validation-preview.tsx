import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, MessageCircle } from "lucide-react"

export function ValidationPreview() {
  return (
    <section className="py-20 md:py-32 bg-linear-to-br from-gray-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Validate Before You Build
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get real feedback from your audience with auto-generated landing pages
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Mock Landing Page Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-500 rounded-3xl blur-2xl opacity-20" />
            <Card className="relative bg-white p-8 md:p-12 border-2 border-purple-200">
              {/* Mock Product Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full mb-4">
                  <span className="text-sm font-semibold text-purple-600">New Product Idea</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  AI Content Templates Pack
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                  50+ proven templates based on your top-performing content. 
                  Save hours of brainstorming and create viral posts faster.
                </p>
                
                {/* Price tag */}
                <div className="inline-flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    $29
                  </span>
                  <span className="text-gray-500 line-through text-xl">$49</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    Early Bird
                  </span>
                </div>
              </div>

              {/* Mock Preview Image */}
              <div className="bg-linear-to-br from-purple-100 to-blue-100 rounded-2xl p-12 mb-8 flex items-center justify-center border-2 border-dashed border-purple-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-600">Product Preview / Screenshots</p>
                </div>
              </div>

              {/* Validation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Button size="lg" className="flex-1 text-base h-14">
                  <Flame className="w-5 h-5" />
                  I'd buy this!
                </Button>
                <Button size="lg" variant="secondary" className="flex-1 text-base h-14">
                  <MessageCircle className="w-5 h-5" />
                  Maybe later
                </Button>
              </div>

              {/* Social proof counter */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-purple-600">247 creators</span> already showed interest
                </p>
              </div>
            </Card>
          </div>

          {/* Feature callouts */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-1">Instant Setup</h4>
              <p className="text-sm text-gray-600">Landing page ready in 60 seconds</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold text-gray-900 mb-1">Real Analytics</h4>
              <p className="text-sm text-gray-600">Track interest & conversion rates</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-900 mb-1">Smart Insights</h4>
              <p className="text-sm text-gray-600">AI suggests pricing & positioning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
