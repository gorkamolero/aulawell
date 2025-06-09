import { groq } from 'next-sanity'

// Testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    featured,
    order,
    "image": image.asset->url
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    content,
    rating,
    "image": image.asset->url
  }
`

// Services
export const servicesQuery = groq`
  *[_type == "service"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon,
    features,
    order,
    "image": image.asset->url
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    fullDescription,
    icon,
    features,
    "image": image.asset->url
  }
`

// Success Stories
export const successStoriesQuery = groq`
  *[_type == "successStory"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    studentName,
    grade,
    summary,
    challenges,
    improvements,
    featured,
    order,
    beforeAfterScores,
    "image": image.asset->url
  }
`

export const featuredSuccessStoriesQuery = groq`
  *[_type == "successStory" && featured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    studentName,
    grade,
    summary,
    improvements,
    beforeAfterScores,
    "image": image.asset->url
  }
`

export const successStoryBySlugQuery = groq`
  *[_type == "successStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    studentName,
    grade,
    summary,
    story,
    challenges,
    improvements,
    beforeAfterScores,
    "image": image.asset->url
  }
`

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, _createdAt desc) {
    _id,
    name,
    role,
    bio,
    qualifications,
    specialties,
    email,
    linkedin,
    order,
    "image": image.asset->url
  }
`

// FAQs
export const faqsQuery = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`

// Blog Posts
export const blogPostsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc, _createdAt desc) [0...9] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    categories,
    readingTime,
    featured,
    "mainImage": mainImage.asset->url
  }
`

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readingTime,
    "mainImage": mainImage.asset->url
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    body,
    publishedAt,
    categories,
    readingTime,
    seo,
    "mainImage": mainImage.asset->url
  }
`

// Legacy post queries (keep for backward compatibility)
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    categories,
    tags,
    featured,
    "featuredImage": featuredImage.asset->url,
    "author": author->{
      name,
      role,
      "image": image.asset->url
    }
  }
`

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset->url,
    "author": author->{
      name,
      role,
      "image": image.asset->url
    }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    publishedAt,
    categories,
    tags,
    seo,
    "featuredImage": featuredImage.asset->url,
    "author": author->{
      name,
      role,
      bio,
      "image": image.asset->url
    }
  }
`

// Email Templates
export const emailTemplateQuery = groq`
  *[_type == "emailTemplate" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    subject,
    preheader,
    body,
    category,
    variables,
    sendDelay,
    followUpTemplate->{
      _id,
      slug
    }
  }
`

export const emailTemplatesByCategoryQuery = groq`
  *[_type == "emailTemplate" && category == $category && isActive == true] | order(sendDelay asc) {
    _id,
    name,
    slug,
    subject,
    preheader,
    body,
    variables,
    sendDelay,
    followUpTemplate->{
      _id,
      slug
    }
  }
`