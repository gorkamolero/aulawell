import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function createHomepageContent() {
  try {
    // Check if homepage content already exists
    const existing = await client.fetch(`*[_type == "homepageContent"][0]`)
    
    if (existing) {
      console.log('Homepage content already exists')
      return
    }

    // Create homepage content
    const homepage = await client.create({
      _type: 'homepageContent',
      title: 'Homepage',
      heroTitle: 'Expert British & American Curriculum Tutoring',
      heroSubtitle: 'Helping students aged 11-18 excel in KS3, GCSE, IGCSE, A-Level, and IB from Madrid and worldwide',
      heroButtonText: 'Book Your Free Consultation',
      heroFeatures: [
        'Current AQA & Cambridge Examiner',
        'UK Leading Independent School Teacher',
        '100% of Students Exceed Target Grades'
      ],
      servicesTitle: 'Expert Support for Every Academic Journey',
      servicesSubtitle: 'From building foundations to achieving top grades, I provide personalized tutoring tailored to each student\'s needs',
      testimonialsTitle: 'What Parents & Students Say',
      testimonialsSubtitle: 'Join hundreds of successful students who have achieved their academic goals',
      ctaTitle: 'Ready to Excel in Your Studies?',
      ctaSubtitle: 'Book your free consultation today and take the first step towards academic success',
      ctaButtonText: 'Get Started Today'
    })

    console.log('Homepage content created successfully:', homepage._id)
  } catch (error) {
    console.error('Error creating homepage content:', error)
  }
}

createHomepageContent()