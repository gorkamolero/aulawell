import ContactForm from '../components/ContactForm';
import { Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { FadeIn } from '../components/ui/fade-in';
import FAQSection, { staticFAQs } from '../components/FAQSection';
import { client } from '@/sanity/lib/client';
import { faqsQuery } from '@/sanity/lib/queries';
import { FAQ } from '@/sanity/lib/types';

export const metadata: Metadata = {
  title: 'Contact Aulawell - Book Your Free Consultation',
  description: 'Get in touch for expert tutoring services. Book a free consultation for GCSE, A-Level, IB tutoring. Available online worldwide and in-person in Madrid.',
};

export default async function ContactPage() {
  // Fetch FAQs from Sanity, fallback to static if none
  let faqs: FAQ[] = []
  try {
    faqs = await client.fetch<FAQ[]>(faqsQuery)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
  }
  
  // Use static FAQs if no CMS content
  if (!faqs || faqs.length === 0) {
    faqs = staticFAQs
  }
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold text-navy mb-6">Let's Discuss Your Child's Success</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-gray-700">
              Getting started is simple. Complete the form below with your needs, and I'll respond 
              with personalized recommendations within 24 hours.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <ContactForm />
                </div>
              </FadeIn>
            </div>
            
            {/* Direct Contact Options */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-navy mb-4">Prefer to reach out directly?</h3>
                
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle className="text-green-600 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-green-800">WhatsApp</p>
                      <p className="text-sm text-green-700">For quick questions</p>
                    </div>
                  </a>
                  
                  <a
                    href="mailto:hello@aulawell.com"
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Mail className="text-blue-600 w-6 h-6" />
                    <div>
                      <p className="font-semibold text-blue-800">Email</p>
                      <p className="text-sm text-blue-700">hello@aulawell.com</p>
                    </div>
                  </a>
                </div>
                
                <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  I respond within 24 hours
                </p>
              </div>
              
              {/* What Happens Next */}
              <div className="bg-navy text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="bg-gold text-navy w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                    <p className="text-sm">You submit the form with your requirements</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-gold text-navy w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm">I respond within 24 hours with:</p>
                      <ul className="list-disc list-inside text-xs mt-1 ml-2">
                        <li>Initial assessment of how I can help</li>
                        <li>Recommended lesson frequency</li>
                        <li>Available time slots</li>
                        <li>Investment details</li>
                      </ul>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-gold text-navy w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                    <p className="text-sm">We arrange a trial lesson to ensure perfect fit</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-gold text-navy w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                    <p className="text-sm">Your child begins their journey to academic excellence</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50">
        <FAQSection faqs={faqs} />
      </section>

      {/* Location Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">For In-Person Sessions in Madrid</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-navy mb-4">Available Areas</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Central Madrid</li>
                <li>La Moraleja</li>
                <li>Pozuelo de Alarcón</li>
                <li>Las Rozas</li>
                <li>Majadahonda</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-navy mb-4">Travel Policy</h3>
              <p className="text-gray-700 mb-2">
                Travel included for central areas. Small supplement for outer suburbs.
              </p>
              <p className="text-gray-700">
                Contact me to confirm availability in your specific area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Don't let another term pass by. Take the first step towards your child's academic success today.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 bg-gold text-navy px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200"
          >
            Complete the Form Above <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </>
  );
}