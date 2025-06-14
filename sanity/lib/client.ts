import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  stega: {
    enabled: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ? true : false,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '',
  },
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}