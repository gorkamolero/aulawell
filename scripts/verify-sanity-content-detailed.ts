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

async function verifyContentDetailed() {
  console.log('🔍 Detailed Sanity Content Verification\n')
  console.log('=' .repeat(80))

  // Email Templates
  console.log('\n📧 EMAIL TEMPLATES')
  console.log('-' .repeat(40))
  const emailTemplates = await client.fetch(`*[_type == "emailTemplate"] | order(name) {
    name,
    subject,
    category,
    "hasContent": defined(content),
    isActive
  }`)
  
  if (emailTemplates.length > 0) {
    emailTemplates.forEach((template: any) => {
      console.log(`  • ${template.name}`)
      console.log(`    - Subject: "${template.subject}"`)
      console.log(`    - Category: ${template.category || 'none'}`)
      console.log(`    - Status: ${template.isActive ? '✅ Active' : '❌ Inactive'}`)
      console.log(`    - Has content: ${template.hasContent ? 'Yes' : 'No'}`)
    })
  }

  // Email Flows
  console.log('\n\n📮 EMAIL FLOWS')
  console.log('-' .repeat(40))
  const emailFlows = await client.fetch(`*[_type == "emailFlow"] | order(name) {
    name,
    description,
    trigger,
    isActive,
    "stepCount": count(steps),
    steps[]{
      stepName,
      "templateName": emailTemplate->name,
      delayValue,
      delayUnit
    }
  }`)
  
  if (emailFlows.length > 0) {
    emailFlows.forEach((flow: any) => {
      console.log(`  • ${flow.name}`)
      console.log(`    - Description: ${flow.description || 'No description'}`)
      console.log(`    - Trigger: ${flow.trigger}`)
      console.log(`    - Status: ${flow.isActive ? '✅ Active' : '❌ Inactive'}`)
      console.log(`    - Steps (${flow.stepCount}):`)
      if (flow.steps && flow.steps.length > 0) {
        flow.steps.forEach((step: any, index: number) => {
          console.log(`      ${index + 1}. ${step.stepName} - Uses: ${step.templateName || 'No template'} - Delay: ${step.delayValue} ${step.delayUnit}`)
        })
      }
    })
  }

  // FAQs
  console.log('\n\n❓ FAQs')
  console.log('-' .repeat(40))
  const faqs = await client.fetch(`*[_type == "faq"] | order(category, order) {
    question,
    category,
    order
  }`)
  
  const faqsByCategory = faqs.reduce((acc: any, faq: any) => {
    if (!acc[faq.category]) acc[faq.category] = []
    acc[faq.category].push(faq)
    return acc
  }, {})
  
  Object.entries(faqsByCategory).forEach(([category, questions]: [string, any]) => {
    console.log(`  Category: ${category}`)
    questions.forEach((faq: any) => {
      console.log(`    • ${faq.question}`)
    })
  })

  // Services
  console.log('\n\n🎓 SERVICES')
  console.log('-' .repeat(40))
  const services = await client.fetch(`*[_type == "service"] | order(featured desc, title) {
    title,
    slug,
    featured,
    "summary": pt::text(description)[0..100] + "..."
  }`)
  
  services.forEach((service: any) => {
    console.log(`  • ${service.title} ${service.featured ? '⭐ (Featured)' : ''}`)
    console.log(`    - Slug: /${service.slug.current}`)
    console.log(`    - Summary: ${service.summary}`)
  })

  // Testimonials
  console.log('\n\n💬 TESTIMONIALS')
  console.log('-' .repeat(40))
  const testimonials = await client.fetch(`*[_type == "testimonial"] | order(featured desc, rating desc) {
    name,
    role,
    company,
    rating,
    featured,
    "excerpt": content[0..50] + "..."
  }`)
  
  testimonials.forEach((testimonial: any) => {
    console.log(`  • ${testimonial.name} - ${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ''}`)
    console.log(`    - Rating: ${'⭐'.repeat(testimonial.rating)}`)
    console.log(`    - Featured: ${testimonial.featured ? 'Yes' : 'No'}`)
  })

  // Success Stories
  console.log('\n\n🏆 SUCCESS STORIES')
  console.log('-' .repeat(40))
  const successStories = await client.fetch(`*[_type == "successStory"] | order(featured desc, _createdAt desc) {
    title,
    slug,
    studentName,
    achievement,
    featured
  }`)
  
  successStories.forEach((story: any) => {
    console.log(`  • ${story.title} ${story.featured ? '⭐ (Featured)' : ''}`)
    console.log(`    - Student: ${story.studentName}`)
    console.log(`    - Achievement: ${story.achievement}`)
    console.log(`    - URL: /success-stories/${story.slug.current}`)
  })

  // About Content
  console.log('\n\n📖 ABOUT CONTENT')
  console.log('-' .repeat(40))
  const aboutContent = await client.fetch(`*[_type == "aboutContent"] | order(section) {
    title,
    section,
    "hasContent": defined(content)
  }`)
  
  aboutContent.forEach((content: any) => {
    console.log(`  • ${content.title || 'Untitled'} - Section: ${content.section || 'none'}`)
    console.log(`    - Has content: ${content.hasContent ? 'Yes' : 'No'}`)
  })

  // Team Members
  console.log('\n\n👥 TEAM MEMBERS')
  console.log('-' .repeat(40))
  const teamMembers = await client.fetch(`*[_type == "teamMember"] | order(order) {
    name,
    role,
    "qualificationCount": count(qualifications),
    "specialtyCount": count(specialties),
    "hasImage": defined(image)
  }`)
  
  teamMembers.forEach((member: any) => {
    console.log(`  • ${member.name} - ${member.role}`)
    console.log(`    - Qualifications: ${member.qualificationCount}`)
    console.log(`    - Specialties: ${member.specialtyCount}`)
    console.log(`    - Has image: ${member.hasImage ? 'Yes' : 'No'}`)
  })

  // Summary
  console.log('\n\n📊 SUMMARY')
  console.log('=' .repeat(80))
  console.log(`Total Email Templates: ${emailTemplates.length}`)
  console.log(`Total Email Flows: ${emailFlows.length}`)
  console.log(`Total FAQs: ${faqs.length}`)
  console.log(`Total Services: ${services.length}`)
  console.log(`Total Testimonials: ${testimonials.length}`)
  console.log(`Total Success Stories: ${successStories.length}`)
  console.log(`Total About Content: ${aboutContent.length}`)
  console.log(`Total Team Members: ${teamMembers.length}`)
  console.log(`\nGrand Total: ${emailTemplates.length + emailFlows.length + faqs.length + services.length + testimonials.length + successStories.length + aboutContent.length + teamMembers.length} documents`)
}

// Run verification
verifyContentDetailed()
  .then(() => {
    console.log('\n✅ Detailed verification complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Verification failed:', error)
    process.exit(1)
  })