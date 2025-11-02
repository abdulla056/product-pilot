import { Navbar } from "@/components/navbar"
import { YouTubeConnectionGuard } from "@/components/youtube-connection-guard"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <YouTubeConnectionGuard>
        {children}
      </YouTubeConnectionGuard>
    </>
  )
}

