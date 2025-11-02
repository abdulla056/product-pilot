import { SignedIn, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LayoutDashboard, TrendingUp, Home } from "lucide-react"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-bg-glass)] backdrop-blur-lg border-b border-[var(--color-border-subtle)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-accent-primary)]">
              Viz<span className="text-[var(--color-accent-primary)]">-I</span>
            </span>
          </Link>

          {/* Navigation Links - Only show when signed in */}
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/home">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/analytics">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-accent-glow)] border-transparent hover:border-[var(--color-border-subtle)]"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
            </div>
          </SignedIn>

          {/* User Button */}
          <SignedIn>
            <div className="flex items-center gap-3">
              <UserButton 
                afterSignOutUrl="/sign-in"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-[var(--color-border-subtle)]",
                  }
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}
