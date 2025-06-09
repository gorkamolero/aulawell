export interface Testimonial {
  _id: string
  name: string
  role: string
  content: string
  rating: number
  featured: boolean
  order: number
  image?: string
}

export interface Service {
  _id: string
  title: string
  slug: string
  description: string
  fullDescription?: any[]
  icon?: string
  features?: string[]
  order: number
  image?: string
}

export interface SuccessStory {
  _id: string
  title: string
  slug: string
  studentName: string
  grade: string
  summary: string
  story?: any[]
  challenges?: string[]
  improvements?: string[]
  featured: boolean
  order: number
  beforeAfterScores?: {
    before: string
    after: string
    subject: string
  }
  image?: string
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  qualifications?: string[]
  specialties?: string[]
  email?: string
  linkedin?: string
  order: number
  image: string
}

export interface FAQ {
  _id: string
  question: string
  answer: any[]
  category: 'general' | 'services' | 'pricing' | 'scheduling' | 'academic-support' | 'curriculum' | 'online' | 'exams'
  order: number
}

export interface Author {
  name: string
  role: string
  bio?: string
  image?: string
}

export interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  content?: any[]
  publishedAt: string
  categories?: string[]
  tags?: string[]
  featured: boolean
  featuredImage?: string
  author?: Author
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface BlogPost {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  body?: any[]
  publishedAt?: string
  categories?: string[]
  readingTime?: number
  featured?: boolean
  mainImage?: any
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface EmailTemplate {
  _id: string
  name: string
  slug: { current: string }
  subject: string
  preheader?: string
  body: any[]
  category: 'contact' | 'welcome' | 'followup' | 'onboarding' | 'notification'
  variables?: string[]
  sendDelay?: number
  isActive: boolean
  followUpTemplate?: {
    _id: string
    slug: { current: string }
  }
}

export interface HomepageContent {
  _id: string
  _type: 'homepageContent'
  title: string
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
}