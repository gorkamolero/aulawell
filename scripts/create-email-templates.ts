import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'b021mpru',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// This script creates default email templates in Sanity
// Run with: npx tsx scripts/create-email-templates.ts

const defaultTemplates: any[] = [
  {
    _type: 'emailTemplate',
    name: 'Contact Form - Admin Notification',
    slug: { current: 'contact-form-admin' },
    subject: 'New Contact Form Submission from {{parentName}}',
    preheader: 'New inquiry about {{services}}',
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'New Contact Form Submission', marks: ['strong'] }
        ],
        style: 'h2'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'You have received a new contact form submission with the following details:' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Parent Name: ', marks: ['strong'] },
          { _type: 'span', text: '{{parentName}}' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Student Name: ', marks: ['strong'] },
          { _type: 'span', text: '{{studentName}}' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Email: ', marks: ['strong'] },
          { _type: 'span', text: '{{email}}' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Phone: ', marks: ['strong'] },
          { _type: 'span', text: '{{phone}}' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Services Requested: ', marks: ['strong'] },
          { _type: 'span', text: '{{services}}' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Message:', marks: ['strong'] }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '{{message}}' }
        ]
      }
    ],
    category: 'contact',
    isActive: true,
    variables: ['parentName', 'studentName', 'email', 'phone', 'services', 'message']
  },
  {
    _type: 'emailTemplate',
    name: 'Contact Form - Thank You',
    slug: { current: 'contact-form-thank-you' },
    subject: 'Thank you for contacting Aulawell',
    preheader: 'We\'ll be in touch within 24 hours',
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Thank You for Contacting Aulawell', marks: ['strong'] }
        ],
        style: 'h2'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Dear {{parentName}},' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Thank you for reaching out about tutoring support for {{studentName}}. I\'m excited to learn more about their educational journey and how I can help them achieve their academic goals.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'I typically respond to all inquiries within 24 hours. In the meantime, here\'s what you can expect:' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '• A personalized response addressing {{studentName}}\'s specific needs' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '• Information about my trial session package' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '• Scheduling options that work for your timezone' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '• Answers to any questions you\'ve raised' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'If you have any urgent questions, please don\'t hesitate to WhatsApp me.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Looking forward to speaking with you soon!' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Best regards,' },
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Amy' },
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Founder & Lead Tutor, Aulawell' }
        ]
      }
    ],
    category: 'contact',
    isActive: true,
    variables: ['parentName', 'studentName']
  },
  {
    _type: 'emailTemplate',
    name: 'Welcome Email - Immediate',
    slug: { current: 'welcome-immediate' },
    subject: 'Welcome to Aulawell, {{parentName}}!',
    preheader: 'Your journey to academic excellence starts here',
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Welcome to the Aulawell Family!', marks: ['strong'] }
        ],
        style: 'h2'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Dear {{parentName}},' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'I\'m thrilled to welcome you and {{studentName}} to Aulawell! Your trial sessions have been confirmed, and I\'m excited to begin this educational journey together.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'What happens next:', marks: ['strong'] }
        ],
        style: 'h3'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '1. You\'ll receive a calendar invitation for our first session' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '2. I\'ll send you a brief assessment to understand {{studentName}}\'s current level' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '3. We\'ll have our first session where I\'ll create a personalized learning plan' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'If you have any questions before our first session, please don\'t hesitate to reach out via email or WhatsApp.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Looking forward to working with {{studentName}}!' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Warm regards,' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Amy' }
        ]
      }
    ],
    category: 'welcome',
    isActive: true,
    variables: ['parentName', 'studentName'],
    sendDelay: 0
  },
  {
    _type: 'emailTemplate',
    name: 'Welcome Email - Day 3 Tips',
    slug: { current: 'welcome-day-3-tips' },
    subject: '3 Tips to Maximize {{studentName}}\'s Tutoring Success',
    preheader: 'Simple strategies for academic excellence',
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '3 Tips for Tutoring Success', marks: ['strong'] }
        ],
        style: 'h2'
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Hi {{parentName}},' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'As we prepare for {{studentName}}\'s upcoming sessions, I wanted to share three simple tips that help my most successful students:' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '1. Create a Dedicated Study Space', marks: ['strong'] }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'A quiet, organized area with good lighting makes a huge difference in focus and retention.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '2. Review Notes Within 24 Hours', marks: ['strong'] }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Encourage {{studentName}} to spend just 10 minutes reviewing session notes the next day. This simple habit dramatically improves long-term retention.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: '3. Celebrate Small Wins', marks: ['strong'] }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Acknowledge progress, no matter how small. Building confidence is just as important as building knowledge.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'See you in our upcoming session!' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Best,' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Amy' }
        ]
      }
    ],
    category: 'welcome',
    isActive: true,
    variables: ['parentName', 'studentName'],
    sendDelay: 72 // 3 days
  }
]

async function createTemplates() {
  console.log('Creating email templates...')
  
  for (const template of defaultTemplates) {
    try {
      // Check if template already exists
      const existing = await client.fetch(
        `*[_type == "emailTemplate" && slug.current == $slug][0]`,
        { slug: template.slug.current }
      )
      
      if (existing) {
        console.log(`Template "${template.name}" already exists, skipping...`)
        continue
      }
      
      // Create the template
      const result = await client.create(template)
      console.log(`Created template: ${template.name}`)
    } catch (error) {
      console.error(`Error creating template "${template.name}":`, error)
    }
  }
  
  console.log('Done!')
}

createTemplates().catch(console.error)