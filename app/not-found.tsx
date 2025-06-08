import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { FadeIn } from './components/ui/fade-in'
import { GridBackground } from './components/ui/grid-background'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative">
      <GridBackground />
      
      <div className="text-center px-4 relative z-10">
        <FadeIn>
          <h1 className="text-9xl font-bold text-navy mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            It seems the page you're looking for has moved or doesn't exist. 
            Let's get you back on track.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gold text-navy font-bold py-3 px-6 rounded-lg hover:bg-gold/90 transition-colors"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-navy text-white font-bold py-3 px-6 rounded-lg hover:bg-navy/90 transition-colors"
            >
              <ArrowLeft size={20} />
              Contact Amy
            </Link>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/services" className="text-gold hover:text-navy transition-colors">
                Services
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/about" className="text-gold hover:text-navy transition-colors">
                About Amy
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/success-stories" className="text-gold hover:text-navy transition-colors">
                Success Stories
              </Link>
              <span className="text-gray-400">•</span>
              <Link href="/blog" className="text-gold hover:text-navy transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}