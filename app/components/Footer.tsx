'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from './ui/fade-in';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <FadeIn>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@aulawell.com"
                  className="flex items-center gap-2 hover:text-gold transition-colors group"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  hello@aulawell.com
                </a>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
                  className="flex items-center gap-2 hover:text-gold transition-colors group"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                  WhatsApp Available
                </a>
                <p className="flex items-center gap-2">
                  <MapPin size={18} />
                  Madrid, Spain
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/services', label: 'Services' },
                  { href: '/success-stories', label: 'Success Stories' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="hover:text-gold transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* About */}
          <FadeIn delay={0.2}>
            <div>
              <h3 className="text-xl font-bold mb-4">About Aulawell</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Expert British & American curriculum tutoring from a current AQA & Cambridge examiner. 
                Helping international students excel in KS3, GCSE, IGCSE, A-Level, and IB.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-300">
          <p>&copy; {currentYear} Aulawell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}