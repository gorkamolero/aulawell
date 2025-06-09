import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'b021mpru',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkTestimonials() {
  console.log('🔍 Checking testimonials...')
  
  try {
    // Get all testimonials
    const allTestimonials = await client.fetch('*[_type == "testimonial"]')
    console.log('\n📋 All testimonials:')
    allTestimonials.forEach((t: any, i: number) => {
      console.log(`${i + 1}. ${t.name} (${t.role})`)
      console.log(`   Content: "${t.content || 'EMPTY'}"`)
      console.log(`   Featured: ${t.featured}`)
      console.log(`   Rating: ${t.rating}`)
      console.log('---')
    })
    
    // Get featured testimonials
    const featuredTestimonials = await client.fetch('*[_type == "testimonial" && featured == true]')
    console.log(`\n⭐ Featured testimonials (${featuredTestimonials.length}):`)
    featuredTestimonials.forEach((t: any, i: number) => {
      console.log(`${i + 1}. ${t.name}: "${t.content || 'EMPTY'}"`)
    })
    
  } catch (error) {
    console.error('Error checking testimonials:', error)
  }
}

checkTestimonials()