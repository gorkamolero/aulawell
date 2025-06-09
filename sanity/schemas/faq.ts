import { defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Scheduling', value: 'scheduling' },
          { title: 'Academic Support', value: 'academic-support' },
          { title: 'Curriculum', value: 'curriculum' },
          { title: 'Online Learning', value: 'online' },
          { title: 'Exam Preparation', value: 'exams' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower numbers first)',
    },
    {
      name: 'featured',
      title: 'Featured FAQ',
      type: 'boolean',
      initialValue: false,
      description: 'Show in homepage FAQ section',
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
      title: 'Category & Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: subtitle ? `${subtitle} category` : 'FAQ',
      };
    },
  },
});