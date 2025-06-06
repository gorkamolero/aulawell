import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';

import { testimonial } from './sanity/schemas/testimonial';
import { service } from './sanity/schemas/service';
import { successStory } from './sanity/schemas/successStory';
import { aboutContent } from './sanity/schemas/aboutContent';
import { faq } from './sanity/schemas/faq';
import { blogPost } from './sanity/schemas/blogPost';

export default defineConfig({
  name: 'aulawell',
  title: 'Aulawell Content Management',
  basePath: '/studio',
  
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  
  schema: {
    types: [
      testimonial,
      service,
      successStory,
      aboutContent,
      faq,
      blogPost,
    ],
  },
  
  studio: {
    components: {
      navbar: () => null,
    },
  },
});