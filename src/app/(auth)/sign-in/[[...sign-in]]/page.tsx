import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
            Viz<span className="text-[var(--color-accent-primary)]">-I</span>
          </h1>
          <p className="text-[var(--color-text-secondary)]">Visualizing your success story</p>
        </div>

        {/* Clerk Sign-In Component */}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border-2 border-[var(--color-border-subtle)] bg-[var(--color-bg-glass)] backdrop-blur-lg",
              headerTitle: "text-2xl font-bold text-[var(--color-text-primary)]",
              headerSubtitle: "text-[var(--color-text-secondary)]",
              socialButtonsBlockButton: "border-2 border-[var(--color-border-subtle)] hover:bg-[var(--color-accent-glow)] hover:border-[var(--color-accent-primary)]",
              formButtonPrimary: "bg-[var(--color-accent-primary)] hover:shadow-lg text-[var(--color-text-dark)]",
              footerActionLink: "text-[var(--color-accent-primary)] hover:text-[var(--color-accent-glow)]",
            }
          }}
        />

        <p className="text-center text-xs text-[var(--color-text-secondary)]/70 mt-6">
          By continuing, you agree to Viz-I's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

