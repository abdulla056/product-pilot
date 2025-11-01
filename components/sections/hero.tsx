"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, TrendingUp, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-purple-50 via-blue-50 to-white py-20 md:py-32">
      {/* Background gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[120px] opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-300 rounded-full blur-[120px] opacity-20 -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-purple-200 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-600">AI-Powered Product Intelligence</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 max-w-4xl">
            Your AI Copilot for{" "}
            <span className="bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Product Development
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
            Turn your audience insights into ready-to-launch product ideas — in minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="text-base">
              <Zap className="w-5 h-5" />
              Generate My Product Idea
            </Button>
            <Button size="lg" variant="secondary" className="text-base">
              Watch Demo
            </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-6xl mt-16 relative">
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-500 rounded-3xl blur-2xl opacity-20" />
            <Card className="relative p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Product Card 1 */}
                <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="px-3 py-1 bg-green-100 rounded-full">
                      <span className="text-sm font-semibold text-green-700">92%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    AI Content Templates
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Pre-made templates for viral content creation based on your top posts
                  </p>
                  <Button size="sm" className="w-full">
                    Generate Landing Page
                  </Button>
                </div>

                {/* Product Card 2 */}
                <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="px-3 py-1 bg-green-100 rounded-full">
                      <span className="text-sm font-semibold text-green-700">88%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Creator Toolkit Bundle
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete digital asset pack with editing presets and scripts
                  </p>
                  <Button size="sm" className="w-full">
                    Generate Landing Page
                  </Button>
                </div>

                {/* Product Card 3 */}
                <div className="bg-linear-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200 hover:shadow-xl transition-all hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="px-3 py-1 bg-green-100 rounded-full">
                      <span className="text-sm font-semibold text-green-700">85%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    1-on-1 Coaching Call
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Personalized strategy session to scale your creator business
                  </p>
                  <Button size="sm" className="w-full">
                    Generate Landing Page
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
