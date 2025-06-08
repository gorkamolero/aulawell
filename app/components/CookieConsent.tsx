'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted')
    if (!hasAccepted) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
  }

  // Auto-accept cookies after user navigates/scrolls
  useEffect(() => {
    if (!showBanner) return

    const handleInteraction = () => {
      acceptCookies()
    }

    // Accept on scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleInteraction()
      }
    }

    // Accept on navigation (clicking any link)
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.closest('a')) {
        handleInteraction()
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick)
    }
  }, [showBanner])

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy text-white p-4 shadow-lg z-50 transition-transform duration-300 ease-out">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing to browse, you accept our use of cookies.
        </p>
        <button
          onClick={acceptCookies}
          className="text-white hover:text-gold transition-colors flex-shrink-0"
          aria-label="Close cookie banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  )
}