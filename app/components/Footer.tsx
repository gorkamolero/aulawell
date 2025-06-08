'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';
import { FadeIn } from './ui/fade-in';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <FadeIn>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:hello@aulawell.com"
                  className="flex items-center gap-3 hover:text-gold transition-colors group"
                >
                  <Mail size={18} className="text-gold/70 group-hover:text-gold transition-colors" />
                  <span className="text-gray-300 group-hover:text-white">hello@aulawell.com</span>
                </a>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
                  className="flex items-center gap-3 hover:text-gold transition-colors group"
                >
                  <Phone size={18} className="text-gold/70 group-hover:text-gold transition-colors" />
                  <span className="text-gray-300 group-hover:text-white">WhatsApp Available</span>
                </a>
                <p className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold/70" />
                  <span className="text-gray-300">Madrid, Spain</span>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <div>
              <h3 className="text-xl font-bold mb-6 text-gold">Quick Links</h3>
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
                      className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
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
              <h3 className="text-xl font-bold mb-6 text-gold">About Aulawell</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Expert British & American curriculum tutoring from a current AQA & Cambridge examiner. 
                Helping international students excel in KS3, GCSE, IGCSE, A-Level, and IB.
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/aulawell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://www.facebook.com/aulawell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/aulawell"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Badges Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <a 
                href="https://www.gov.uk/government/organisations/disclosure-and-barring-service/about"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/images/badges/dbs-checked.png"
                  alt="DBS Checked"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
              <a 
                href="https://www.thetutorsassociation.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <Image
                  src="/images/badges/tutors-association.avif"
                  alt="The Tutors' Association Individual Member 2024-2025"
                  width={100}
                  height={38}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <p className="text-sm text-gray-400">&copy; {currentYear} Aulawell. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}