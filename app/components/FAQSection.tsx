'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FadeIn } from './ui/fade-in'
import { FAQ } from '@/sanity/lib/types'
import { PortableTextRenderer } from '@/sanity/lib/portableText'

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'general'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(faq)
    return acc
  }, {} as Record<string, FAQ[]>)

  const categoryLabels = {
    general: 'General',
    services: 'Services',
    pricing: 'Pricing',
    scheduling: 'Scheduling',
    'academic-support': 'Academic Support',
    curriculum: 'Curriculum',
    online: 'Online Learning',
    exams: 'Exam Preparation'
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-navy mb-12">{title}</h2>
        </FadeIn>

        {Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => (
          <FadeIn key={category} delay={categoryIndex * 0.1}>
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-navy mb-6 border-b border-gray-200 pb-2">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </h3>
              <div className="space-y-3">
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq._id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      onClick={() => toggleItem(faq._id)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <div className="flex-shrink-0">
                        {openItems.includes(faq._id) ? (
                          <ChevronUp className="text-gold w-5 h-5 transform transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="text-gold w-5 h-5 transform transition-transform duration-200" />
                        )}
                      </div>
                    </button>
                    {openItems.includes(faq._id) && (
                      <div className="px-6 pb-5 border-t border-gray-100 bg-gray-50">
                        <div className="pt-4 prose prose-sm max-w-none text-gray-700 leading-relaxed">
                          <PortableTextRenderer content={faq.answer} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}

        {faqs.length === 0 && (
          <FadeIn>
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8">
                <p className="text-gray-600 text-lg">No FAQs available at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Please check back later or contact us directly.</p>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

