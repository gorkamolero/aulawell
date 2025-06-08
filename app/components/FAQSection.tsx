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
    'academic-support': 'Academic Support'
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center text-navy mb-12">{title}</h2>
        </FadeIn>

        {Object.entries(groupedFaqs).map(([category, categoryFaqs], categoryIndex) => (
          <FadeIn key={category} delay={categoryIndex * 0.1}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-navy mb-4">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </h3>
              <div className="space-y-4">
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq._id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openItems.includes(faq._id) ? (
                        <ChevronUp className="text-gold w-5 h-5 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="text-gold w-5 h-5 flex-shrink-0" />
                      )}
                    </button>
                    {openItems.includes(faq._id) && (
                      <div className="px-6 pb-4">
                        <div className="prose prose-sm max-w-none text-gray-700">
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
              <p className="text-gray-600">No FAQs available at the moment.</p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

// Static FAQ data for fallback
export const staticFAQs: FAQ[] = [
  {
    _id: '1',
    question: 'How do online tutoring sessions work?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'We use Zoom for interactive online sessions. Students need a computer/tablet, stable internet, and a quiet space. I provide all materials digitally, use screen sharing for collaborative work, and sessions can be recorded for review.'
      }]
    }],
    category: 'general',
    order: 1
  },
  {
    _id: '2',
    question: 'What makes you different from other tutors?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'As a current examiner for AQA and Cambridge, I provide insider knowledge that transforms good students into exceptional ones. I know exactly what examiners look for and can teach the specific techniques that earn top marks.'
      }]
    }],
    category: 'general',
    order: 2
  },
  {
    _id: '3',
    question: 'Which exam boards do you cover?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'I specialize in all major UK exam boards including AQA, Edexcel, OCR, and Cambridge (CIE). I also support International Baccalaureate (IB) students. My examiner experience with AQA and Cambridge gives particular insight into these specifications.'
      }]
    }],
    category: 'services',
    order: 1
  },
  {
    _id: '4',
    question: 'What is your cancellation policy?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: '24-hour notice is required for cancellations with no charge. I understand international families have complex schedules and handle emergencies flexibly. Sessions cancelled with less notice may be charged at 50% of the session rate.'
      }]
    }],
    category: 'scheduling',
    order: 1
  },
  {
    _id: '5',
    question: 'Do you offer trial sessions?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Yes! I offer a trial package of 3 sessions at 50% off the regular rate. This allows us to ensure we\'re a good fit and for me to assess your child\'s specific needs before committing to regular sessions.'
      }]
    }],
    category: 'pricing',
    order: 1
  },
  {
    _id: '6',
    question: 'How much homework do you set?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Homework is tailored to each student\'s needs and schedule. Typically, I set 1-2 hours of work between sessions, focusing on exam practice, essay writing, or specific skill development. The amount can be adjusted based on your child\'s other commitments.'
      }]
    }],
    category: 'academic-support',
    order: 1
  }
]