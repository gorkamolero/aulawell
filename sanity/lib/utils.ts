import { urlFor } from './client'

/**
 * Generate optimized image URL with default dimensions
 */
export function getImageUrl(source: any, width = 800, height = 600) {
  if (!source) return null
  return urlFor(source).width(width).height(height).url()
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(source: any) {
  if (!source) return null
  
  return {
    mobile: urlFor(source).width(400).height(300).url(),
    tablet: urlFor(source).width(600).height(450).url(),
    desktop: urlFor(source).width(800).height(600).url(),
    large: urlFor(source).width(1200).height(900).url(),
  }
}

/**
 * Format date for display
 */
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Generate SEO-friendly excerpt from portable text
 */
export function generateExcerpt(content: any[], maxLength = 160) {
  if (!content || !Array.isArray(content)) return ''
  
  let text = ''
  
  for (const block of content) {
    if (block._type === 'block' && block.children) {
      for (const child of block.children) {
        if (child.text) {
          text += child.text + ' '
        }
      }
    }
  }
  
  const trimmed = text.trim()
  if (trimmed.length <= maxLength) return trimmed
  
  return trimmed.substring(0, maxLength).split(' ').slice(0, -1).join(' ') + '...'
}

/**
 * Check if content has any blocks with text
 */
export function hasContent(content: any[]) {
  if (!content || !Array.isArray(content)) return false
  
  return content.some(block => 
    block._type === 'block' && 
    block.children && 
    block.children.some((child: any) => child.text?.trim())
  )
}

/**
 * Get plain text from portable text content
 */
export function getPlainText(content: any[]) {
  if (!content || !Array.isArray(content)) return ''
  
  return content
    .filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.map((child: any) => child.text)
        .join('') || ''
    )
    .join(' ')
    .trim()
}