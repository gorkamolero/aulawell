import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@aulawell.com"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Mail size={18} />
                hello@aulawell.com
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone size={18} />
                WhatsApp Available
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                Madrid, Spain
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-gold transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Aulawell</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Expert British & American curriculum tutoring from a current AQA & Cambridge examiner. 
              Helping international students excel in KS3, GCSE, IGCSE, A-Level, and IB.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-sm text-gray-300">
          <p>&copy; {currentYear} Aulawell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}