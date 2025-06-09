import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Create a client specifically for this script
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

// Helper function to convert markdown to portable text blocks
function markdownToPortableText(markdown: string) {
  const lines = markdown.split('\n')
  const blocks = []
  let currentBlock: any = null
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Skip empty lines
    if (!trimmed && currentBlock) {
      blocks.push(currentBlock)
      currentBlock = null
      continue
    }
    
    // Headers
    if (trimmed.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: trimmed.slice(4) }]
      })
      currentBlock = null
    } else if (trimmed.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: trimmed.slice(3) }]
      })
      currentBlock = null
    } else if (trimmed.startsWith('# ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: trimmed.slice(2) }]
      })
      currentBlock = null
    }
    // Bold text (simple version)
    else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ 
          _type: 'span', 
          text: trimmed.slice(2, -2),
          marks: ['strong']
        }]
      })
      currentBlock = null
    }
    // List items
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: '• ' + trimmed.slice(2) }]
      })
      currentBlock = null
    }
    // Numbered lists
    else if (/^\d+\.\s/.test(trimmed)) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: trimmed }]
      })
      currentBlock = null
    }
    // Regular paragraphs
    else if (trimmed) {
      if (currentBlock) blocks.push(currentBlock)
      // Handle italic text in markdown
      let text = trimmed
      const children = []
      
      // Simple italic handling
      if (text.startsWith('*') && text.endsWith('*') && !text.startsWith('**')) {
        children.push({
          _type: 'span',
          text: text.slice(1, -1),
          marks: ['em']
        })
      } else {
        children.push({ _type: 'span', text })
      }
      
      currentBlock = {
        _type: 'block',
        style: 'normal',
        children
      }
    }
  }
  
  if (currentBlock) blocks.push(currentBlock)
  return blocks
}

// Blog post data
const blogPosts = [
  {
    _type: 'blogPost',
    title: 'My Child Got 2s and 3s in Mock Exams - Emergency Plan to Reach Grade 5s',
    slug: { current: 'mock-exam-crisis-recovery-plan' },
    excerpt: 'When mock results arrive showing Grade 2s and 3s, panic sets in. As a current examiner, I can tell you with certainty: recovery is possible. Here\'s your 4-month emergency plan to reach those crucial Grade 5s.',
    categories: ['exam-preparation', 'gcse', 'crisis-support'],
    tags: ['mock-exams', 'grade-improvement', 'exam-technique', 'gcse-recovery'],
    publishedAt: new Date('2024-02-15').toISOString(),
    featured: true,
    readingTime: 12,
    seo: {
      metaTitle: 'GCSE Mock Exam Crisis: From Grade 2-3 to Grade 5+ Recovery Plan',
      metaDescription: 'Expert examiner reveals the exact 4-month plan to recover from poor mock results. Transform Grade 2s and 3s into passing Grade 5s with strategic intervention.',
      focusKeyword: 'mock exam recovery'
    }
  },
  {
    _type: 'blogPost',
    title: 'Protecting Your €30,000 School Investment When Your Child is Failing',
    slug: { current: 'protecting-school-investment-failing-grades' },
    excerpt: 'You\'re investing €25,000-35,000 annually in premium education, yet your child is failing. Here\'s how to protect your investment and secure the outcomes you\'re paying for.',
    categories: ['international-schools', 'investment', 'parent-guidance'],
    tags: ['school-fees', 'roi', 'premium-schools', 'academic-investment'],
    publishedAt: new Date('2024-02-08').toISOString(),
    featured: true,
    readingTime: 10,
    seo: {
      metaTitle: 'Premium School Fees vs Poor Grades: Protecting Your €30k Education Investment',
      metaDescription: 'When your child is failing despite €30,000 annual school fees, you need strategic intervention. Learn how to protect your investment and secure results.',
      focusKeyword: 'school investment protection'
    }
  },
  {
    _type: 'blogPost',
    title: 'American Parents\' Complete Guide to British GCSEs: What You\'re Missing',
    slug: { current: 'american-parents-guide-british-gcses' },
    excerpt: 'The British GCSE system is nothing like American high school. If you\'re applying American assumptions to British exams, you\'re setting your child up for preventable failure. Here\'s what you need to know.',
    categories: ['gcse', 'international-families', 'parent-guidance'],
    tags: ['american-families', 'gcse-guide', 'british-education', 'cultural-differences'],
    publishedAt: new Date('2024-02-01').toISOString(),
    featured: true,
    readingTime: 15,
    seo: {
      metaTitle: 'American Parents Guide to GCSEs: Critical Differences You Must Know',
      metaDescription: 'Essential guide for American families navigating British GCSEs. Understand grade systems, exam differences, and avoid costly mistakes in the UK education system.',
      focusKeyword: 'american parents gcse guide'
    }
  }
]

// Read and process each blog post file
async function processBlogPost(postData: any, filePath: string) {
  try {
    // Read the markdown file
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Skip the title (first line) and author bio (last 3 lines)
    const lines = content.split('\n')
    const bodyLines = lines.slice(2, -4) // Remove title and author bio
    const bodyMarkdown = bodyLines.join('\n')
    
    // Convert to portable text
    const body = markdownToPortableText(bodyMarkdown)
    
    // Create the blog post
    const blogPost = {
      ...postData,
      body
    }
    
    const result = await client.create(blogPost)
    console.log(`✓ Created blog post: ${postData.title}`)
    return result
  } catch (error) {
    console.error(`✗ Failed to create blog post: ${postData.title}`, error)
    return null
  }
}

async function main() {
  console.log('Adding blog posts to Sanity...\n')
  
  const filePaths = [
    '/Users/gorkolas/Downloads/mock-exam-crisis-blog.md',
    '/Users/gorkolas/Downloads/protecting-school-investment-blog.md',
    '/Users/gorkolas/Downloads/american-parents-gcse-guide-blog.md'
  ]
  
  for (let i = 0; i < blogPosts.length; i++) {
    await processBlogPost(blogPosts[i], filePaths[i])
  }
  
  console.log('\n✅ Blog posts added successfully!')
  console.log('\nYou can now:')
  console.log('1. View and edit blog posts in Sanity Studio under "Blog Posts"')
  console.log('2. Add featured images for each post')
  console.log('3. Adjust categories and tags as needed')
  console.log('4. Preview posts on the website at /blog')
}

main().catch(console.error)