import { defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'Brief description for service cards',
      validation: (Rule) => Rule.required().max(150),
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Detailed description with rich text',
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name (e.g., "BookOpen", "Users", "Trophy")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Starting Price',
      type: 'string',
      description: 'e.g., "€50/hour", "From €200"',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "60 minutes", "90 minutes"',
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or benefits',
    },
    {
      name: 'subjects',
      title: 'Subjects Covered',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of subjects this service covers',
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which services are displayed (lower numbers first)',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'shortDescription',
    },
  },
});