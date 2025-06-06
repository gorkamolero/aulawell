import { defineType } from 'sanity';

export const aboutContent = defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
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
      name: 'section',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Biography', value: 'biography' },
          { title: 'Qualifications', value: 'qualifications' },
          { title: 'Experience', value: 'experience' },
          { title: 'Philosophy', value: 'philosophy' },
          { title: 'Achievements', value: 'achievements' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Rich text content for this section',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image for this section',
    },
    {
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Highlight Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name',
            },
          ],
        },
      ],
      description: 'Key points or achievements to highlight',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which sections appear on the page',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Section Type',
      name: 'sectionAsc',
      by: [{ field: 'section', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'section',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: subtitle ? `${subtitle} section` : 'About section',
        media: selection.media,
      };
    },
  },
});