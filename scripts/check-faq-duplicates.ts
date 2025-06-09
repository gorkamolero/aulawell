import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'b021mpru',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkFAQDuplicates() {
  console.log('🔍 Checking FAQ duplicates...')
  
  try {
    const faqs = await client.fetch('*[_type == "faq"] | order(category asc, question asc)')
    console.log(`\n📋 Found ${faqs.length} FAQs:`)
    
    const questionCounts: Record<string, number> = {}
    
    faqs.forEach((faq: any, i: number) => {
      console.log(`${i + 1}. [${faq.category}] ${faq.question}`)
      
      // Track duplicates
      if (questionCounts[faq.question]) {
        questionCounts[faq.question]++
      } else {
        questionCounts[faq.question] = 1
      }
    })
    
    // Show duplicates
    const duplicates = Object.entries(questionCounts).filter(([_, count]) => count > 1)
    if (duplicates.length > 0) {
      console.log('\n⚠️  DUPLICATES FOUND:')
      duplicates.forEach(([question, count]) => {
        console.log(`   "${question}" appears ${count} times`)
      })
    } else {
      console.log('\n✅ No duplicates found')
    }
    
    // Group by category
    const byCategory = faqs.reduce((acc: any, faq: any) => {
      const cat = faq.category || 'general'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(faq.question)
      return acc
    }, {})
    
    console.log('\n📁 By Category:')
    Object.entries(byCategory).forEach(([category, questions]) => {
      console.log(`   ${category}: ${(questions as string[]).length} FAQs`)
    })
    
  } catch (error) {
    console.error('Error checking FAQs:', error)
  }
}

checkFAQDuplicates()