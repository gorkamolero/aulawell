import { defineType, defineField } from 'sanity'

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main headline in the hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
      description: 'Supporting text under the hero title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroButtonText',
      title: 'Hero Button Text',
      type: 'string',
      description: 'Text for the main CTA button',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Homepage Content',
        subtitle: 'Edit homepage sections',
      }
    },
  },
})