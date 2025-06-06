import { defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role/Grade',
      type: 'string',
      description: 'e.g., "Year 12 Student", "A-Level Graduate"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(50).max(500),
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'image',
      title: 'Student Photo (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'course',
      title: 'Course/Subject',
      type: 'string',
      description: 'e.g., "GCSE Biology", "A-Level Mathematics"',
    },
    {
      name: 'achievement',
      title: 'Achievement',
      type: 'string',
      description: 'e.g., "Improved from D to A*", "Accepted to Cambridge"',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});