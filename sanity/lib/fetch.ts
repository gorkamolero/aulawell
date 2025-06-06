import { client } from './client'
import {
  testimonialsQuery,
  featuredTestimonialsQuery,
  servicesQuery,
  serviceBySlugQuery,
  successStoriesQuery,
  featuredSuccessStoriesQuery,
  successStoryBySlugQuery,
  teamMembersQuery,
  faqsQuery,
  faqsByCategoryQuery,
  postsQuery,
  featuredPostsQuery,
  postBySlugQuery,
} from './queries'

// Testimonials
export async function getTestimonials() {
  return client.fetch(testimonialsQuery, {}, { next: { tags: ['testimonials'] } })
}

export async function getFeaturedTestimonials() {
  return client.fetch(featuredTestimonialsQuery, {}, { next: { tags: ['testimonials'] } })
}

// Services
export async function getServices() {
  return client.fetch(servicesQuery, {}, { next: { tags: ['services'] } })
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(serviceBySlugQuery, { slug }, { next: { tags: [`service:${slug}`] } })
}

// Success Stories
export async function getSuccessStories() {
  return client.fetch(successStoriesQuery, {}, { next: { tags: ['success-stories'] } })
}

export async function getFeaturedSuccessStories() {
  return client.fetch(featuredSuccessStoriesQuery, {}, { next: { tags: ['success-stories'] } })
}

export async function getSuccessStoryBySlug(slug: string) {
  return client.fetch(successStoryBySlugQuery, { slug }, { next: { tags: [`success-story:${slug}`] } })
}

// Team Members
export async function getTeamMembers() {
  return client.fetch(teamMembersQuery, {}, { next: { tags: ['team'] } })
}

// FAQs
export async function getFaqs() {
  return client.fetch(faqsQuery, {}, { next: { tags: ['faqs'] } })
}

export async function getFaqsByCategory(category: string) {
  return client.fetch(faqsByCategoryQuery, { category }, { next: { tags: ['faqs'] } })
}

// Blog Posts
export async function getPosts() {
  return client.fetch(postsQuery, {}, { next: { tags: ['posts'] } })
}

export async function getFeaturedPosts() {
  return client.fetch(featuredPostsQuery, {}, { next: { tags: ['posts'] } })
}

export async function getPostBySlug(slug: string) {
  return client.fetch(postBySlugQuery, { slug }, { next: { tags: [`post:${slug}`] } })
}