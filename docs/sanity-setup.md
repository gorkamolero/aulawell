# Sanity CMS Setup Guide

This guide will help you complete the Sanity CMS setup for the Aulawell website.

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- A Sanity account (sign up at https://sanity.io)

## 1. Create a Sanity Project

1. Visit https://sanity.io and sign up/log in
2. Create a new project:
   - Choose a project name (e.g., "Aulawell")
   - Select "Blog" or "Clean" template (we'll replace the schema)
   - Choose your preferred region for data hosting

## 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Sanity project details:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-from-sanity
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_REVALIDATE_SECRET=a-secure-random-string
   ```

## 3. Initialize Sanity in Your Project

Run the following command to initialize Sanity with your existing project:

```bash
npx sanity@latest init --project-id YOUR_PROJECT_ID --dataset production
```

When prompted:
- Choose to use TypeScript: Yes
- Choose to use an existing project: Yes
- Select your project from the list
- Use the default dataset name: production

## 4. Deploy Sanity Studio

To make your Sanity Studio accessible online:

```bash
npx sanity@latest deploy
```

Choose a studio hostname (e.g., `aulawell-cms`).

## 5. Access Sanity Studio

You can access your Sanity Studio in two ways:

### Local Development
Visit: http://localhost:3000/studio

### Production
Visit: https://your-studio-hostname.sanity.studio

## 6. Content Schemas Available

The following content types are set up and ready to use:

### Testimonials
- Customer testimonials with ratings
- Profile images and role information
- Featured testimonial functionality

### Services
- Service descriptions and features
- Rich text content support
- Service icons and images

### Success Stories
- Student success case studies
- Before/after score tracking
- Rich story content with images

### Team Members
- Staff profiles with bios
- Qualifications and specialties
- Contact information and social links

### FAQs
- Categorized frequently asked questions
- Rich text answers
- Ordering system

### Blog Posts (Future)
- Full blog functionality
- Author attribution
- Categories and tags
- SEO metadata

## 7. Set Up Webhooks (Optional)

To enable automatic revalidation when content changes:

1. Go to your Sanity project settings
2. Navigate to "API" → "Webhooks"
3. Create a new webhook:
   - Name: "Next.js Revalidation"
   - URL: `https://your-domain.com/api/sanity/revalidate`
   - Dataset: production
   - Trigger on: Create, Update, Delete
   - Secret: Use the same value as `SANITY_REVALIDATE_SECRET`

## 8. Content Management Best Practices

### Order Fields
Most content types include an "order" field to control display sequence. Lower numbers appear first.

### Featured Content
Testimonials and success stories can be marked as "featured" to appear prominently on the homepage.

### SEO
Blog posts include SEO metadata fields for search engine optimization.

### Images
Always add alt text to images for accessibility and SEO.

## 9. Integration with Next.js

The following utilities are available for fetching content:

```typescript
import { 
  getTestimonials, 
  getServices, 
  getTeamMembers 
} from '@/sanity/lib/fetch'

// In your components
const testimonials = await getTestimonials()
const services = await getServices()
```

## 10. Portable Text Rendering

For rich text content, use the PortableTextRenderer component:

```tsx
import { PortableTextRenderer } from '@/sanity/lib/portableText'

function MyComponent({ content }) {
  return <PortableTextRenderer content={content} />
}
```

## Troubleshooting

### Common Issues

1. **Studio not loading**: Check your environment variables are correct
2. **Content not updating**: Verify webhook configuration and secrets
3. **Images not displaying**: Ensure image URLs are generated with `urlFor()`

### Support

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://slack.sanity.io
- Next.js Integration: https://github.com/sanity-io/next-sanity

## Next Steps

1. Create your first content in each schema type
2. Update your Next.js pages to fetch and display Sanity content
3. Test the webhook revalidation functionality
4. Configure production deployment with proper environment variables