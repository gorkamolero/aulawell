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

async function deleteDuplicates() {
  console.log('Deleting duplicate blog posts...\n')
  
  // IDs of the duplicate posts (keeping the first one of each)
  const duplicateIds = [
    'UYE0SW6APqb7XO6WYXhFWg', // American Parents duplicate
    'gHc5VFxSdXUqS5vckBTxXg', // My Child Got 2s duplicate
    'RXIkZJ4jjjPSfh3Imu7VH4', // Protecting Your €30,000 duplicate
  ]
  
  for (const id of duplicateIds) {
    try {
      await client.delete(id)
      console.log(`✓ Deleted duplicate post with ID: ${id}`)
    } catch (error) {
      console.error(`✗ Failed to delete post ${id}:`, error)
    }
  }
  
  console.log('\n✅ Duplicate cleanup complete!')
}

deleteDuplicates().catch(console.error)