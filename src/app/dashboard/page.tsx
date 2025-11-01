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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section with YouTube Connection */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user.firstName || "Creator"}!
              </h1>
              <p className="text-lg text-gray-600">
                Your creator product development hub
              </p>
            </div>
            
            {/* YouTube Connection Status */}
            <div className="shrink-0">
              {youtubeConnection ? (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border-2 border-green-200 rounded-lg">
                  <Youtube className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">YouTube Connected</span>
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
