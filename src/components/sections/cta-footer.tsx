import { Button } from "@/components/ui/button"
import { Sparkles, Twitter, Youtube, Instagram } from "lucide-react"

export function CTAFooter() {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-linear-to-br from-purple-600 via-blue-600 to-purple-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Free Beta Access</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready to launch your next big product?
            </h2>
            
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join the waitlist and turn your creator graph into digital, service, and physical products that sell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 text-base h-14 px-10">
                <Sparkles className="w-5 h-5" />
                Try ProductPilot (Free Beta)
              </Button>
              <Button size="lg" variant="secondary" className="border-2 border-white text-white bg-transparent hover:bg-white/10 text-base h-14 px-10">
                Schedule a Demo
              </Button>
            </div>

            <p className="text-sm text-purple-200">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo & Tagline */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Product<span className="text-purple-400">Pilot</span>
              </h3>
              <p className="text-gray-400 text-sm">Built for Creators 💜</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2025 ProductPilot. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
