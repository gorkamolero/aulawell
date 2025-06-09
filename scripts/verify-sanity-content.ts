import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function verifyContent() {
  console.log('🔍 Verifying Sanity Content...\n')

  const contentTypes = [
    { type: 'emailTemplate', name: 'Email Templates' },
    { type: 'emailFlow', name: 'Email Flows' },
    { type: 'faq', name: 'FAQs' },
    { type: 'service', name: 'Services' },
    { type: 'testimonial', name: 'Testimonials' },
    { type: 'successStory', name: 'Success Stories' },
    { type: 'aboutContent', name: 'About Content' },
    { type: 'teamMember', name: 'Team Members' },
    { type: 'blogPost', name: 'Blog Posts' },
  ]

  let totalDocuments = 0

  for (const contentType of contentTypes) {
    try {
      // Get count
      const countQuery = `count(*[_type == "${contentType.type}"])`
      const count = await client.fetch(countQuery)
      
      // Get documents with selected fields
      const query = `*[_type == "${contentType.type}"] | order(_createdAt desc) {
        _id,
        _createdAt,
        _updatedAt,
        ${contentType.type === 'emailTemplate' ? 'name, subject, "hasContent": defined(content)' : ''}
        ${contentType.type === 'emailFlow' ? 'name, description, "templateCount": count(templates)' : ''}
        ${contentType.type === 'faq' ? 'question, category' : ''}
        ${contentType.type === 'service' ? 'title, slug, featured' : ''}
        ${contentType.type === 'testimonial' ? 'name, role, company, rating' : ''}
        ${contentType.type === 'successStory' ? 'title, slug, studentName, achievement' : ''}
        ${contentType.type === 'aboutContent' ? 'title, section' : ''}
        ${contentType.type === 'teamMember' ? 'name, role, order' : ''}
        ${contentType.type === 'blogPost' ? 'title, slug, publishedAt' : ''}
      }`
      
      const documents = await client.fetch(query)
      
      console.log(`📋 ${contentType.name}: ${count} document(s)`)
      
      if (documents.length > 0) {
        console.log('   Recent items:')
        documents.slice(0, 3).forEach((doc: any) => {
          const info = []
          
          // Add relevant info based on type
          if (doc.name) info.push(doc.name)
          if (doc.title) info.push(doc.title)
          if (doc.question) info.push(doc.question.substring(0, 50) + '...')
          if (doc.role) info.push(`(${doc.role})`)
          if (doc.company) info.push(`at ${doc.company}`)
          if (doc.category) info.push(`[${doc.category}]`)
          if (doc.rating) info.push(`⭐ ${doc.rating}`)
          if (doc.templateCount !== undefined) info.push(`${doc.templateCount} templates`)
          
          console.log(`   - ${info.join(' ')}`)
        })
        
        if (documents.length > 3) {
          console.log(`   ... and ${documents.length - 3} more`)
        }
      }
      
      console.log()
      totalDocuments += count
      
    } catch (error) {
      console.error(`❌ Error fetching ${contentType.name}:`, error.message)
      console.log()
    }
  }

  console.log(`📊 Total documents in Sanity: ${totalDocuments}`)
  
  // Check for any orphaned document types
  console.log('\n🔍 Checking for other document types...')
  try {
    const allTypesQuery = `array::unique(*[]._type)`
    const allTypes = await client.fetch(allTypesQuery)
    const knownTypes = contentTypes.map(ct => ct.type)
    const unknownTypes = allTypes.filter((type: string) => !knownTypes.includes(type) && !type.startsWith('sanity.'))
    
    if (unknownTypes.length > 0) {
      console.log('Found additional document types:')
      for (const type of unknownTypes) {
        const count = await client.fetch(`count(*[_type == "${type}"])`)
        console.log(`   - ${type}: ${count} document(s)`)
      }
    } else {
      console.log('No additional document types found.')
    }
  } catch (error) {
    console.error('Error checking for other types:', error.message)
  }
}

// Run verification
verifyContent()
  .then(() => {
    console.log('\n✅ Verification complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Verification failed:', error)
    process.exit(1)
  })