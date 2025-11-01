import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Package } from "lucide-react"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName || "Creator"}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Your creator product development hub
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Product Ideas Generated
              </CardTitle>
              <Sparkles className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">Connect your socials to start</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Validation Tests
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">No active tests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Products Launched
              </CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">Launch your first product</p>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="border-2 border-purple-200 bg-linear-to-br from-purple-50 to-blue-50">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 Get Started with ProductPilot</CardTitle>
            <CardDescription>
              Follow these steps to discover your first product opportunity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Connect Your Creator Platforms</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Link your YouTube, TikTok, Instagram, and other social accounts
                </p>
                <Button size="sm">
                  Connect Platforms
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-600 mb-1">AI Analyzes Your Creator Graph</h3>
                <p className="text-sm text-gray-500">
                  Our AI reads your content, audience, and engagement patterns
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-600 mb-1">Get Product Recommendations</h3>
                <p className="text-sm text-gray-500">
                  Receive viable digital, physical, and service product ideas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
