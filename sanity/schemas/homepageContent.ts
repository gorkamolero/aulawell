import { defineType, defineField } from 'sanity'

export const homepageContent = defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
    defineField({
      name: 'heroFeatures',
      title: 'Hero Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Feature list shown in hero section',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero section image',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'servicesSubtitle',
      title: 'Services Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'testimonialsSubtitle',
      title: 'Testimonials Section Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      description: 'Title for the bottom call-to-action section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Section Subtitle',
      type: 'text',
      rows: 2,
      description: 'Subtitle for the bottom call-to-action section',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the CTA button',
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