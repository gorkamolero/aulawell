import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { basename } from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b021mpru',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadLogo() {
  try {
    const logoPath = './public/images/aulawell-logo.png'
    const filename = basename(logoPath)
    
    console.log('Uploading logo to Sanity...')
    
    const asset = await client.assets.upload('image', createReadStream(logoPath), {
      filename,
      description: 'Aulawell logo for email templates and website'
    })
    
    console.log('Logo uploaded successfully!')
    console.log('Asset ID:', asset._id)
    console.log('Asset URL:', asset.url)
    
    // Create a permanent URL using Sanity's image pipeline
    const imageUrl = `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${asset._id.replace('image-', '').replace('-png', '.png')}`
    
    console.log('\nUse this URL in email templates:')
    console.log(imageUrl)
    
    return imageUrl
  } catch (error) {
    console.error('Error uploading logo:', error)
    process.exit(1)
  }
}

uploadLogo()