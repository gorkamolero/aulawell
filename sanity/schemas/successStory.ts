import { defineType } from 'sanity';

export const successStory = defineType({
  name: 'successStory',
  title: 'Success Stories',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Story Title',
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
      name: 'studentName',
      title: 'Student Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'initialGrade',
      title: 'Initial Grade/Score',
      type: 'string',
      description: 'Starting grade or performance level',
    },
    {
      name: 'finalGrade',
      title: 'Final Grade/Achievement',
      type: 'string',
      description: 'Final grade or achievement',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      description: 'e.g., "GCSE Biology", "A-Level Mathematics"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'examBoard',
      title: 'Exam Board',
      type: 'string',
      options: {
        list: [
          { title: 'AQA', value: 'aqa' },
          { title: 'Cambridge IGCSE', value: 'cambridge' },
          { title: 'Edexcel', value: 'edexcel' },
          { title: 'OCR', value: 'ocr' },
          { title: 'IB', value: 'ib' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'duration',
      title: 'Tutoring Duration',
      type: 'string',
      description: 'e.g., "6 months", "1 year"',
    },
    {
      name: 'challenge',
      title: 'Challenge/Problem',
      type: 'text',
      rows: 3,
      description: 'What was the student struggling with?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'solution',
      title: 'Solution/Approach',
      type: 'text',
      rows: 3,
      description: 'How did Amy help solve the problem?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'result',
      title: 'Result/Outcome',
      type: 'text',
      rows: 3,
      description: 'What was achieved?',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fullStory',
      title: 'Full Story',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      description: 'Detailed story with rich text formatting',
    },
    {
      name: 'quote',
      title: 'Student Quote',
      type: 'text',
      rows: 3,
      description: 'Optional quote from the student or parent',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Achievement certificate, student photo, or related image',
    },
    {
      name: 'featured',
      title: 'Featured Story',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Published Date (Newest First)',
      name: 'publishedDateDesc',
      by: [{ field: 'publishedDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'studentName',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title,
        subtitle: `${subtitle}'s Success Story`,
        media: selection.media,
      };
    },
  },
});