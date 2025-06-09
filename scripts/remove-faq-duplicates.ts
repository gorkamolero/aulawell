import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'b021mpru',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function removeFAQDuplicates() {
  console.log('🧹 Removing FAQ duplicates...')
  
  try {
    const faqs = await client.fetch('*[_type == "faq"] | order(category asc, question asc, _createdAt asc)')
    console.log(`Found ${faqs.length} FAQs`)
    
    const seen = new Set<string>()
    const toDelete: string[] = []
    
    faqs.forEach((faq: any) => {
      const key = `${faq.category}-${faq.question}`
      if (seen.has(key)) {
        toDelete.push(faq._id)
        console.log(`🗑️  Marking duplicate for deletion: "${faq.question}" in ${faq.category}`)
      } else {
        seen.add(key)
        console.log(`✅ Keeping: "${faq.question}" in ${faq.category}`)
      }
    })
    
    console.log(`\n🧹 Deleting ${toDelete.length} duplicates...`)
    
    for (const id of toDelete) {
      try {
        await client.delete(id)
        console.log(`✓ Deleted: ${id}`)
      } catch (error) {
        console.error(`✗ Failed to delete ${id}:`, error)
      }
    }
    
    console.log('\n✅ FAQ duplicates removed!')
    
  } catch (error) {
    console.error('Error removing duplicates:', error)
  }
}

removeFAQDuplicates()