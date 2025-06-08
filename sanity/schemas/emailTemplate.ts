import { defineType, defineField } from 'sanity'

export const emailTemplate = defineType({
  name: 'emailTemplate',
  title: 'Email Templates',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal name for this template (e.g., "Contact Form Response")'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier for this template'
    }),
    defineField({
      name: 'subject',
      title: 'Email Subject',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Subject line for the email. You can use variables like {{parentName}}'
    }),
    defineField({
      name: 'preheader',
      title: 'Preheader Text',
      type: 'string',
      description: 'Preview text shown in email clients (optional)'
    }),
    defineField({
      name: 'body',
      title: 'Email Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' }
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        }
      ],
      validation: (Rule) => Rule.required(),
      description: 'Email content. Use variables like {{parentName}}, {{studentName}}, {{subject}}, {{message}}'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact' },
          { title: 'Welcome Series', value: 'welcome' },
          { title: 'Follow Up', value: 'followup' },
          { title: 'Onboarding', value: 'onboarding' },
          { title: 'Notification', value: 'notification' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Enable or disable this template'
    }),
    defineField({
      name: 'variables',
      title: 'Available Variables',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of variables available in this template',
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'sendDelay',
      title: 'Send Delay (hours)',
      type: 'number',
      description: 'Delay in hours before sending (for automated sequences)',
      validation: (Rule) => Rule.min(0)
    }),
    defineField({
      name: 'followUpTemplate',
      title: 'Follow-up Template',
      type: 'reference',
      to: [{ type: 'emailTemplate' }],
      description: 'Next email in the sequence (if applicable)'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      active: 'isActive'
    },
    prepare(selection) {
      const { title, subtitle, active } = selection
      return {
        title,
        subtitle: `${subtitle} ${active ? '✓' : '✗'}`,
      }
    }
  }
})