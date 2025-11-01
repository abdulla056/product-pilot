import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Youtube } from "lucide-react"
import { ConnectYouTubeButton } from "@/components/connect-youtube-button"
import { AnalysisDashboard } from "@/components/analysis-dashboard"
import { YouTubeVideosList } from "@/components/youtube-videos-list"
import { getYouTubeConnection, getMyYouTubeChannel} from "@/lib/composio-helpers"

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Check if user has YouTube connected and fetch data
  const youtubeConnection = await getYouTubeConnection(user.id)
  const youtubeChannel = youtubeConnection ? await getMyYouTubeChannel(user.id) : null
  
  // Get videos if we have channel data
  const channelId = (youtubeChannel as any)?.channelId

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section with YouTube Connection */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                Welcome back, {user.firstName || "Creator"}!
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)]">
                Your creator product development hub
              </p>
            </div>
            
            {/* YouTube Connection Status */}
            <div className="shrink-0">
              {youtubeConnection ? (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-bg-glass)] border-2 border-[var(--color-border-subtle)] rounded-lg">
                  <Youtube className="h-5 w-5 text-[var(--color-accent-primary)]" />
                  <span className="text-sm font-semibold text-[var(--color-accent-primary)]">YouTube Connected</span>
                </div>
              ) : (
                <ConnectYouTubeButton />
              )}
            </div>
          </div>
        </div>

        {/* AI Analysis Dashboard - Show if YouTube connected */}
        {/* {youtubeConnection && channelId && ( */}
          <div className="mb-12">
            <AnalysisDashboard 
              channelId={channelId} 
              channelName={(youtubeChannel as any)?.items?.[0]?.snippet?.title || "Your Channel"}
            />
          </div>
        {/* )} */}

        {/* YouTube Videos List - Show if YouTube connected */}
        {youtubeConnection && (
          <div className="mb-12">
            <YouTubeVideosList />
          </div>
        )}
      </div>
    </div>
  )
}



// import { currentUser } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ProductCard, Product } from "@/components/product-card"
// import { Sparkles, TrendingUp, Package } from "lucide-react"

// // Mock product data - Replace with actual data from your database/API
// const mockProducts: Product[] = [
//   {
//     id: "1",
//     name: "Creator's Video Editing Masterclass",
//     description: "A comprehensive online course teaching video editing techniques specifically tailored for content creators. Includes advanced transitions, color grading, and storytelling methods that have proven to engage audiences.",
//     profitability: 5,
//     viability: 4,
//     sustainability: 5,
//     opportunity: 4,
//     status: "selected",
//     fullDocumentation: "Full course outline, pricing strategy, marketing plan, and content delivery platform recommendations."
//   },
//   {
//     id: "2",
//     name: "Custom Branded Merchandise Line",
//     description: "A line of physical products including t-shirts, hoodies, and accessories featuring your unique brand identity. Designed based on audience preferences and trending styles in your niche.",
//     profitability: 3,
//     viability: 5,
//     sustainability: 3,
//     opportunity: 5,
//     status: "recommended",
//     fullDocumentation: "Supplier recommendations, pricing structure, fulfillment options, and marketing strategy for physical products."
//   },
//   {
//     id: "3",
//     name: "1-on-1 Creator Coaching Program",
//     description: "Personalized coaching sessions helping emerging creators build their audience and monetize their content. Includes strategy sessions, content review, and growth planning.",
//     profitability: 4,
//     viability: 5,
//     sustainability: 5,
//     opportunity: 4,
//     status: "recommended",
//     fullDocumentation: "Service structure, pricing tiers, booking system setup, and client onboarding process."
//   },
//   {
//     id: "4",
//     name: "Digital Asset Template Library",
//     description: "A subscription-based library of video templates, graphics, presets, and tools that creators can use to speed up their content creation process.",
//     profitability: 5,
//     viability: 4,
//     sustainability: 4,
//     opportunity: 5,
//     status: "selected",
//     fullDocumentation: "Platform selection, content creation roadmap, subscription pricing model, and customer retention strategies."
//   }
// ]

// export default async function DashboardPage() {
//   const user = await currentUser()

//   if (!user) {
//     redirect("/sign-in")
//   }

//   const selectedProducts = mockProducts.filter(p => p.status === "selected")
//   const recommendedProducts = mockProducts.filter(p => p.status === "recommended")

//   return (
//     <div className="min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
//             Welcome back, {user.firstName || "Creator"}! 👋
//           </h1>
//           <p className="text-lg text-[var(--color-text-secondary)]">
//             Your creator product development hub
//           </p>
//         </div>

//         {/* Quick Stats */}
//         <div className="grid md:grid-cols-3 gap-6 mb-12">
//           <Card className="bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-[var(--color-text-secondary)]">
//                 Product Ideas Generated
//               </CardTitle>
//               <Sparkles className="h-4 w-4 text-[var(--color-accent-primary)]" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-[var(--color-text-primary)]">{mockProducts.length}</div>
//               <p className="text-xs text-[var(--color-text-secondary)] mt-1">{recommendedProducts.length} recommended, {selectedProducts.length} selected</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-[var(--color-text-secondary)]">
//                 Validation Tests
//               </CardTitle>
//               <TrendingUp className="h-4 w-4 text-[var(--color-accent-primary)]" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-[var(--color-text-primary)]">0</div>
//               <p className="text-xs text-[var(--color-text-secondary)] mt-1">No active tests</p>
//             </CardContent>
//           </Card>

//           <Card className="bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-[var(--color-text-secondary)]">
//                 Products Launched
//               </CardTitle>
//               <Package className="h-4 w-4 text-[var(--color-accent-primary)]" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-[var(--color-text-primary)]">0</div>
//               <p className="text-xs text-[var(--color-text-secondary)] mt-1">Launch your first product</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Selected Products */}
//         {selectedProducts.length > 0 && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Your Selected Products</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {selectedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Recommended Products */}
//         {recommendedProducts.length > 0 && (
//           <div className="mb-12">
//             <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Recommended for You</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedProducts.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Getting Started */}
//         <Card className="bg-[var(--color-bg-glass)] backdrop-blur-lg border-2 border-[var(--color-border-subtle)]">
//           <CardHeader>
//             <CardTitle className="text-2xl text-[var(--color-text-primary)]">🚀 Get Started with Viz-I</CardTitle>
//             <CardDescription className="text-[var(--color-text-secondary)]">
//               Follow these steps to discover your first product opportunity
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-start gap-4">
//               <div className="shrink-0 w-8 h-8 bg-[var(--color-accent-primary)] rounded-full flex items-center justify-center text-[var(--color-text-dark)] font-bold">
//                 1
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">Connect Your Creator Platforms</h3>
//                 <p className="text-sm text-[var(--color-text-secondary)] mb-3">
//                   Link your YouTube, TikTok, Instagram, and other social accounts
//                 </p>
//                 <Button size="sm">
//                   Connect Platforms
//                 </Button>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="shrink-0 w-8 h-8 bg-[var(--color-border-subtle)]/50 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] font-bold">
//                 2
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-[var(--color-text-secondary)] mb-1">AI Analyzes Your Creator Graph</h3>
//                 <p className="text-sm text-[var(--color-text-secondary)]/70">
//                   Our AI reads your content, audience, and engagement patterns
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-4">
//               <div className="shrink-0 w-8 h-8 bg-[var(--color-border-subtle)]/50 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] font-bold">
//                 3
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-semibold text-[var(--color-text-secondary)] mb-1">Get Product Recommendations</h3>
//                 <p className="text-sm text-[var(--color-text-secondary)]/70">
//                   Receive viable digital, physical, and service product ideas
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

