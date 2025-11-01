import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Product<span className="text-purple-600">Pilot</span>
          </h1>
          <p className="text-gray-600">The Creator's Product Copilot</p>
        </div>

        {/* Clerk Sign-In Component */}
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-xl border-2 border-purple-100",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border-2 border-purple-200 hover:bg-purple-50",
              formButtonPrimary: "bg-linear-to-r from-purple-600 to-blue-500 hover:shadow-lg",
              footerActionLink: "text-purple-600 hover:text-purple-700",
            }
          }}
        />

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to ProductPilot's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
