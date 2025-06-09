import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'b021mpru',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function fixTestimonials() {
  console.log('🔄 Fixing testimonials...')
  
  try {
    // First, delete existing testimonials
    const existingTestimonials = await client.fetch('*[_type == "testimonial"]')
    console.log(`Found ${existingTestimonials.length} existing testimonials to update`)
    
    // Delete existing testimonials
    for (const testimonial of existingTestimonials) {
      await client.delete(testimonial._id)
      console.log(`✓ Deleted testimonial: ${testimonial.name}`)
    }
    
    // Create new testimonials with correct field name
    const testimonialsData = [
      {
        _type: 'testimonial',
        name: 'Sarah Mitchell',
        role: 'Parent of Year 11 Student',
        content: 'Amy transformed my daughter\'s approach to English Literature. She went from a Grade 5 to achieving a Grade 8 in her GCSEs. The examiner insights were invaluable!',
        rating: 5,
        course: 'GCSE English Literature',
        achievement: 'Grade 5 to Grade 8',
        featured: true,
      },
      {
        _type: 'testimonial',
        name: 'David Chen',
        role: 'IB Student',
        content: 'The academic writing support was exactly what I needed. Amy helped me develop a sophisticated writing style that impressed my teachers. I achieved a 7 in English!',
        rating: 5,
        course: 'IB English',
        achievement: 'Achieved Grade 7',
        featured: true,
      },
      {
        _type: 'testimonial',
        name: 'Maria González',
        role: 'Parent of International Student',
        content: 'Moving from Spain, my son struggled with academic English. Amy\'s patient approach and cultural understanding made all the difference. He\'s now thriving at university!',
        rating: 5,
        course: 'Academic English',
        achievement: 'University Success',
        featured: true,
      },
      {
        _type: 'testimonial',
        name: 'James Thompson',
        role: 'A-Level Student',
        content: 'The exam marking service was incredibly detailed. Getting feedback from a real examiner helped me understand exactly where I was losing marks. My grades improved dramatically!',
        rating: 5,
        course: 'A-Level English',
        achievement: 'Improved 2 grades',
        featured: false,
      },
      {
        _type: 'testimonial',
        name: 'Priya Patel',
        role: 'Parent of GCSE Student',
        content: 'Amy\'s tutoring gave my daughter the confidence she needed. The personalized approach and exam techniques made such a difference. We couldn\'t be happier with the results!',
        rating: 5,
        course: 'GCSE English',
        achievement: 'Target grades exceeded',
        featured: false,
      },
      {
        _type: 'testimonial',
        name: 'Robert Kim',
        role: 'University Applicant',
        content: 'The interview practice sessions were brilliant. Amy helped me articulate my thoughts clearly and confidently. I got into my first choice university!',
        rating: 5,
        course: 'University Interview Prep',
        achievement: 'First choice acceptance',
        featured: false,
      },
    ]
    
    // Create new testimonials
    for (const testimonial of testimonialsData) {
      try {
        const result = await client.create(testimonial)
        console.log(`✓ Created testimonial: ${testimonial.name} (${result._id})`)
      } catch (error) {
        console.error(`✗ Failed to create testimonial: ${testimonial.name}`, error)
      }
    }
    
    console.log('\n✅ Testimonials fixed!')
    
  } catch (error) {
    console.error('Error fixing testimonials:', error)
  }
}

fixTestimonials()