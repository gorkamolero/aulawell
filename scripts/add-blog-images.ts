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

// Unsplash URLs for each blog post topic
const blogImages = [
  {
    slug: 'mock-exam-crisis-recovery-plan',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop',
    alt: 'Student studying with determination'
  },
  {
    slug: 'protecting-school-investment-failing-grades',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
    alt: 'Premium school building exterior'
  },
  {
    slug: 'american-parents-guide-british-gcses',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
    alt: 'British and American flags in education setting'
  },
  {
    slug: 'last-minute-exam-rescue-plan',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop',
    alt: 'Clock showing urgency with study materials'
  },
  {
    slug: 'toxic-whatsapp-parent-groups',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop',
    alt: 'Phone showing WhatsApp notifications'
  },
  {
    slug: 'november-academic-emergency',
    imageUrl: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?w=1200&h=800&fit=crop',
    alt: 'November calendar with academic planning'
  },
  {
    slug: 'predicted-fails-to-success-stories',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop',
    alt: 'Students celebrating success'
  },
  {
    slug: 'january-mock-crisis-rescue-plan',
    imageUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=800&fit=crop',
    alt: 'January study planning with calendar'
  },
  {
    slug: 'choosing-right-tutor-not-best',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
    alt: 'Tutor working with student in comfortable setting'
  },
  {
    slug: 'holiday-learning-loss-exam-impact',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
    alt: 'Family on vacation with study materials left behind'
  },
  {
    slug: 'ib-alevels-ap-struggling-student-guide',
    imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=800&fit=crop',
    alt: 'Different curriculum textbooks comparison'
  }
]

// Helper function to upload image from URL
async function uploadImageFromUrl(imageUrl: string, filename: string) {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.arrayBuffer()
    
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: filename,
      contentType: 'image/jpeg'
    })
    
    return asset
  } catch (error) {
    console.error('Failed to upload image:', error)
    return null
  }
}

async function addImagesToBlogs() {
  console.log('Adding images to blog posts...\n')
  
  for (const imageData of blogImages) {
    try {
      // Find the blog post by slug
      const post = await client.fetch(
        `*[_type == "blogPost" && slug.current == $slug][0]`,
        { slug: imageData.slug }
      )
      
      if (!post) {
        console.log(`✗ Blog post not found: ${imageData.slug}`)
        continue
      }
      
      console.log(`Processing: ${post.title}`)
      
      // Upload image
      const asset = await uploadImageFromUrl(
        imageData.imageUrl,
        `blog-${imageData.slug}.jpg`
      )
      
      if (!asset) {
        console.log(`✗ Failed to upload image for: ${imageData.slug}`)
        continue
      }
      
      // Update the blog post with the image
      await client
        .patch(post._id)
        .set({
          mainImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id
            },
            alt: imageData.alt
          }
        })
        .commit()
      
      console.log(`✓ Added image to: ${post.title}`)
      
    } catch (error) {
      console.error(`✗ Error processing ${imageData.slug}:`, error)
    }
  }
  
  console.log('\n✅ Finished adding images to blog posts!')
}

addImagesToBlogs().catch(console.error)