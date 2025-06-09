import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './sanity/schemas';

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
        origin: process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_ORIGIN || 'http://localhost:8500',
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  studio: {
    components: {
      navbar: () => null,
    },
  },
});