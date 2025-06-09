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
  },
  {
    _type: 'blogPost',
    title: 'Last-Minute Revision Panic: 48-Hour Exam Rescue Plan',
    slug: { current: 'last-minute-exam-rescue-plan' },
    excerpt: 'It\'s Sunday night. The exam is Tuesday morning. Your child just admitted they "don\'t understand any of it." Here\'s your 48-hour emergency plan from an examiner who\'s seen it all.',
    categories: ['exam-preparation', 'crisis-support', 'study-techniques'],
    tags: ['last-minute-revision', 'exam-panic', 'emergency-tutoring', '48-hour-plan'],
    publishedAt: new Date('2024-03-10').toISOString(),
    featured: false,
    readingTime: 18,
    seo: {
      metaTitle: 'Last-Minute GCSE Revision: 48-Hour Emergency Exam Rescue Plan',
      metaDescription: 'Exam in 48 hours and your child is panicking? Current examiner shares the exact emergency plan that can mean the difference between failure and passing grades.',
      focusKeyword: 'last minute exam revision'
    }
  },
  {
    _type: 'blogPost',
    title: 'When WhatsApp Parent Groups Become Toxic: Handling Academic Competition',
    slug: { current: 'toxic-whatsapp-parent-groups' },
    excerpt: 'Those school WhatsApp groups meant to help have become competitive arenas where Grade 9 humble-brags destroy your peace. Here\'s how to protect your family from the toxicity.',
    categories: ['parent-guidance', 'wellbeing', 'school-culture'],
    tags: ['whatsapp-groups', 'parent-competition', 'school-community', 'mental-health'],
    publishedAt: new Date('2024-03-03').toISOString(),
    featured: false,
    readingTime: 14,
    seo: {
      metaTitle: 'Toxic School WhatsApp Groups: Protecting Your Family from Academic Competition',
      metaDescription: 'When parent WhatsApp groups become sources of anxiety and competition, your family suffers. Learn how to handle toxic academic comparisons and protect your peace.',
      focusKeyword: 'toxic parent whatsapp groups'
    }
  },
  {
    _type: 'blogPost',
    title: 'November Academic Emergency: Why This Month Determines Your Child\'s Future',
    slug: { current: 'november-academic-emergency' },
    excerpt: 'Most parents think January mocks are the critical moment. They\'re wrong. November is when academic trajectories are truly set. Here\'s why this month matters more than any other.',
    categories: ['academic-planning', 'crisis-prevention', 'parent-guidance'],
    tags: ['november-intervention', 'academic-planning', 'early-intervention', 'exam-preparation'],
    publishedAt: new Date('2024-02-25').toISOString(),
    featured: true,
    readingTime: 16,
    seo: {
      metaTitle: 'November Academic Crisis: Why This Month Determines GCSE Success',
      metaDescription: 'November is the hidden turning point in academic success. Examiner reveals why intervention this month prevents January crisis and ensures May success.',
      focusKeyword: 'november academic intervention'
    }
  },
  {
    _type: 'blogPost',
    title: 'From Predicted Fails to A*s: Real Parent Success Stories',
    slug: { current: 'predicted-fails-to-success-stories' },
    excerpt: 'Six months ago, these parents were researching vocational courses. Yesterday, their children opened A* results. Here are the real stories of families who refused to accept failure.',
    categories: ['success-stories', 'inspiration', 'case-studies'],
    tags: ['success-stories', 'grade-transformation', 'parent-testimonials', 'academic-recovery'],
    publishedAt: new Date('2024-02-18').toISOString(),
    featured: true,
    readingTime: 20,
    seo: {
      metaTitle: 'From Predicted Fails to A*s: Real GCSE Transformation Stories',
      metaDescription: 'Inspiring true stories of students who went from predicted failures to top grades. Learn how these families turned academic crisis into celebrated success.',
      focusKeyword: 'gcse success stories'
    }
  },
  {
    _type: 'blogPost',
    title: 'The January Mock Exam Crisis: Your 4-Month Rescue Plan Before Finals',
    slug: { current: 'january-mock-crisis-rescue-plan' },
    excerpt: 'January mock results just arrived and they\'re worse than feared. You have 16 weeks until finals. Here\'s your strategic rescue plan from an examiner who\'s guided hundreds through this exact crisis.',
    categories: ['exam-preparation', 'crisis-support', 'mock-exams'],
    tags: ['january-mocks', 'exam-recovery', '4-month-plan', 'crisis-intervention'],
    publishedAt: new Date('2024-01-20').toISOString(),
    featured: true,
    readingTime: 22,
    seo: {
      metaTitle: 'January Mock Exam Crisis: 16-Week Rescue Plan Before GCSEs',
      metaDescription: 'Failed January mocks? You have 16 weeks to transform results. Current examiner shares the exact rescue plan that turns mock failures into final exam success.',
      focusKeyword: 'january mock exam crisis'
    }
  },
  {
    _type: 'blogPost',
    title: 'Why the "Best" Tutor on Paper Might Be Wrong for Your Child',
    slug: { current: 'choosing-right-tutor-not-best' },
    excerpt: 'Oxford graduate, 100% A* rate, 15 years experience - and they made your child cry. Here\'s why the "best" tutor might be the worst choice and how to find your child\'s perfect match.',
    categories: ['tutoring', 'parent-guidance', 'education-choices'],
    tags: ['choosing-tutors', 'tutor-matching', 'education-support', 'parent-advice'],
    publishedAt: new Date('2024-03-15').toISOString(),
    featured: false,
    readingTime: 19,
    seo: {
      metaTitle: 'Why the Best Tutor on Paper Might Be Wrong for Your Child',
      metaDescription: 'Credentials don\'t predict tutoring success. Learn why the "perfect" tutor might fail your child and how to find the right match for real transformation.',
      focusKeyword: 'choosing right tutor'
    }
  },
  {
    _type: 'blogPost',
    title: 'Holiday Learning Loss: How Family Trips Sabotage Exam Success',
    slug: { current: 'holiday-learning-loss-exam-impact' },
    excerpt: 'That two-week ski trip sounds harmless. But in the British exam system, holiday absence creates academic gaps that compound into May exam disasters. Here\'s the mathematics of holiday learning loss.',
    categories: ['exam-preparation', 'parent-guidance', 'academic-planning'],
    tags: ['holiday-learning', 'exam-impact', 'family-trips', 'academic-disruption'],
    publishedAt: new Date('2024-02-22').toISOString(),
    featured: false,
    readingTime: 17,
    seo: {
      metaTitle: 'Holiday Learning Loss: How Family Trips Impact Exam Success',
      metaDescription: 'Two-week holidays create 8-10 weeks of academic disruption. Learn the hidden mathematics of learning loss and how to protect exam success during family trips.',
      focusKeyword: 'holiday learning loss'
    }
  },
  {
    _type: 'blogPost',
    title: 'IB vs A-Levels vs AP: Emergency Decision Guide When Your Child is Struggling',
    slug: { current: 'ib-alevels-ap-struggling-student-guide' },
    excerpt: 'Your child is drowning in IB. Should you switch to A-Levels? When does changing curriculum save students versus destroy them? Critical guidance for families facing curriculum crisis.',
    categories: ['curriculum-choice', 'crisis-support', 'international-education'],
    tags: ['ib-diploma', 'a-levels', 'ap-courses', 'curriculum-crisis', 'education-decisions'],
    publishedAt: new Date('2024-03-08').toISOString(),
    featured: true,
    readingTime: 21,
    seo: {
      metaTitle: 'IB vs A-Levels vs AP: Which Curriculum When Your Child is Struggling?',
      metaDescription: 'Emergency guide for families considering curriculum change. Learn when switching from IB to A-Levels saves students and when it destroys academic futures.',
      focusKeyword: 'ib vs a-levels curriculum choice'
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
    '/Users/gorkolas/Downloads/american-parents-gcse-guide-blog.md',
    '/Users/gorkolas/Downloads/post-1.md',
    '/Users/gorkolas/Downloads/post-2.md',
    '/Users/gorkolas/Downloads/post-3.md',
    '/Users/gorkolas/Downloads/post-4.md',
    '/Users/gorkolas/Downloads/post-5.md',
    '/Users/gorkolas/Downloads/post-6.md',
    '/Users/gorkolas/Downloads/post-7.md',
    '/Users/gorkolas/Downloads/post-8.md'
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