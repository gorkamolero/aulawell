import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

async function checkBlogPosts() {
  console.log('Checking blog posts in Sanity...\n')
  
  const posts = await client.fetch(`
    *[_type == "blogPost"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      _createdAt
    }
  `)
  
  console.log(`Found ${posts.length} blog posts:\n`)
  
  posts.forEach((post: any, index: number) => {
    console.log(`${index + 1}. ${post.title}`)
    console.log(`   ID: ${post._id}`)
    console.log(`   Slug: ${post.slug || 'UNDEFINED'}`)
    console.log(`   Created: ${new Date(post._createdAt).toLocaleDateString()}\n`)
  })
  
  // Check for duplicates
  const titles = posts.map((p: any) => p.title)
  const duplicates = titles.filter((title: string, index: number) => titles.indexOf(title) !== index)
  
  if (duplicates.length > 0) {
    console.log('\n⚠️  DUPLICATE TITLES FOUND:')
    duplicates.forEach((title: string) => {
      console.log(`   - ${title}`)
    })
  }
  
  // Check for missing slugs
  const missingSlugPosts = posts.filter((p: any) => !p.slug)
  if (missingSlugPosts.length > 0) {
    console.log('\n⚠️  POSTS WITH MISSING SLUGS:')
    missingSlugPosts.forEach((post: any) => {
      console.log(`   - ${post.title} (ID: ${post._id})`)
    })
  }
}

checkBlogPosts().catch(console.error)