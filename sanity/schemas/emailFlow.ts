import { defineType, defineField } from 'sanity'

export const emailFlow = defineType({
  name: 'emailFlow',
  title: 'Email Flows',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Flow Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of this email flow (e.g., "Welcome Sequence", "Contact Form Follow-up")'
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
      description: 'Unique identifier for this flow'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Describe the purpose and trigger for this email flow'
    }),
    defineField({
      name: 'trigger',
      title: 'Trigger Type',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form Submission', value: 'contact_form' },
          { title: 'Welcome Series', value: 'welcome_series' },
          { title: 'Manual Trigger', value: 'manual' },
          { title: 'Schedule-based', value: 'scheduled' },
          { title: 'Event-based', value: 'event' }
        ]
      },
      validation: (Rule) => Rule.required(),
      description: 'What initiates this email flow'
    }),
    defineField({
      name: 'steps',
      title: 'Email Steps',
      type: 'array',
      of: [{
        type: 'object',
        name: 'emailStep',
        title: 'Email Step',
        fields: [
          defineField({
            name: 'stepName',
            title: 'Step Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
            description: 'Name for this step (e.g., "Welcome Email", "Day 3 Follow-up")'
          }),
          defineField({
            name: 'emailTemplate',
            title: 'Email Template',
            type: 'reference',
            to: [{ type: 'emailTemplate' }],
            validation: (Rule) => Rule.required(),
            description: 'Select the email template to use for this step'
          }),
          defineField({
            name: 'delayValue',
            title: 'Delay Value',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
            initialValue: 0,
            description: 'How long to wait before sending this email'
          }),
          defineField({
            name: 'delayUnit',
            title: 'Delay Unit',
            type: 'string',
            options: {
              list: [
                { title: 'Minutes', value: 'minutes' },
                { title: 'Hours', value: 'hours' },
                { title: 'Days', value: 'days' },
                { title: 'Weeks', value: 'weeks' }
              ]
            },
            initialValue: 'hours',
            validation: (Rule) => Rule.required()
          }),
          defineField({
            name: 'conditions',
            title: 'Send Conditions',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({
                  name: 'type',
                  title: 'Condition Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Always Send', value: 'always' },
                      { title: 'If Previous Email Opened', value: 'if_opened' },
                      { title: 'If Previous Email Not Opened', value: 'if_not_opened' },
                      { title: 'If Link Clicked', value: 'if_clicked' },
                      { title: 'Custom', value: 'custom' }
                    ]
                  },
                  initialValue: 'always'
                }),
                defineField({
                  name: 'value',
                  title: 'Condition Value',
                  type: 'string',
                  description: 'Additional condition details (if applicable)'
                })
              ]
            }],
            description: 'Conditions that must be met to send this email'
          })
        ],
        preview: {
          select: {
            title: 'stepName',
            templateName: 'emailTemplate.name',
            delay: 'delayValue',
            unit: 'delayUnit'
          },
          prepare({ title, templateName, delay, unit }) {
            return {
              title: title || 'Unnamed Step',
              subtitle: `${templateName || 'No template'} - ${delay} ${unit}`
            }
          }
        }
      }],
      validation: (Rule) => Rule.required().min(1),
      description: 'Define the sequence of emails in this flow'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      description: 'Enable or disable this entire flow'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Tags for organizing and filtering flows'
    }),
    defineField({
      name: 'settings',
      title: 'Flow Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'stopOnUnsubscribe',
          title: 'Stop on Unsubscribe',
          type: 'boolean',
          initialValue: true,
          description: 'Stop sending emails if recipient unsubscribes'
        }),
        defineField({
          name: 'skipWeekends',
          title: 'Skip Weekends',
          type: 'boolean',
          initialValue: false,
          description: 'Delay emails that would send on weekends to Monday'
        }),
        defineField({
          name: 'timezone',
          title: 'Timezone',
          type: 'string',
          options: {
            list: [
              { title: 'UTC', value: 'UTC' },
              { title: 'Europe/London', value: 'Europe/London' },
              { title: 'Europe/Madrid', value: 'Europe/Madrid' },
              { title: 'America/New_York', value: 'America/New_York' }
            ]
          },
          initialValue: 'Europe/Madrid',
          description: 'Timezone for scheduling emails'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      trigger: 'trigger',
      active: 'isActive',
      stepCount: 'steps'
    },
    prepare({ title, trigger, active, stepCount }) {
      const steps = stepCount ? stepCount.length : 0
      return {
        title,
        subtitle: `${trigger} - ${steps} steps ${active ? '✓' : '✗'}`,
      }
    }
  }
})