import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { blogPostsQuery } from '../sanity/lib/queries'

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

async function debugBlogQuery() {
  console.log('Debugging blog posts query...\n')
  console.log('Query:', blogPostsQuery)
  console.log('\n')
  
  const posts = await client.fetch(blogPostsQuery)
  
  console.log(`Found ${posts.length} posts:\n`)
  
  posts.forEach((post: any, index: number) => {
    console.log(`Post ${index + 1}:`)
    console.log(`  Title: ${post.title}`)
    console.log(`  Slug type: ${typeof post.slug}`)
    console.log(`  Slug value:`, post.slug)
    console.log(`  Slug.current:`, post.slug?.current)
    console.log('')
  })
}

debugBlogQuery().catch(console.error)