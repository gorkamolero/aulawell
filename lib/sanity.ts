import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-12-01',
  useCdn: true,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});

// Keep the old export for backwards compatibility
export const sanityClient = client;

// Helper function to get image URL
export function getImageUrl(source: unknown) {
  if (!source || typeof source !== 'object' || !('asset' in source) || !source.asset || typeof source.asset !== 'object' || !('_ref' in source.asset)) return null;
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  const [, id, extension] = (source.asset as { _ref: string })._ref.split('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${extension}`;
}

// GROQ queries
export const queries = {
  // Get featured testimonials for homepage
  featuredTestimonials: `*[_type == "testimonial" && featured == true] | order(_createdAt desc)[0...3] {
    _id,
    name,
    role,
    content,
    rating,
    image,
    course,
    achievement
  }`,

  // Get all testimonials
  allTestimonials: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    image,
    course,
    achievement
  }`,

  // Get services ordered by display order
  services: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    fullDescription,
    icon,
    price,
    duration,
    features,
    subjects,
    featured
  }`,

  // Get featured services
  featuredServices: `*[_type == "service" && featured == true] | order(order asc)[0...3] {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    price,
    duration
  }`,

  // Get success stories
  successStories: `*[_type == "successStory"] | order(publishedDate desc) {
    _id,
    title,
    slug,
    studentName,
    initialGrade,
    finalGrade,
    subject,
    examBoard,
    duration,
    challenge,
    solution,
    result,
    quote,
    image,
    featured,
    publishedDate
  }`,

  // Get featured success stories
  featuredSuccessStories: `*[_type == "successStory" && featured == true] | order(publishedDate desc)[0...3] {
    _id,
    title,
    slug,
    studentName,
    finalGrade,
    subject,
    result,
    image
  }`,

  // Get about page content
  aboutContent: `*[_type == "aboutContent" && published == true] | order(order asc) {
    _id,
    title,
    section,
    content,
    image,
    highlights,
    order
  }`,

  // Get FAQs by category
  faqsByCategory: `*[_type == "faq" && published == true] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    featured
  }`,

  // Get featured FAQs
  featuredFaqs: `*[_type == "faq" && featured == true && published == true] | order(order asc)[0...6] {
    _id,
    question,
    answer,
    category
  }`,

  // Get blog posts
  blogPosts: `*[_type == "blogPost" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    publishedAt,
    categories,
    tags,
    featured
  }`,

  // Get featured blog posts
  featuredBlogPosts: `*[_type == "blogPost" && featured == true && published == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt
  }`,
};