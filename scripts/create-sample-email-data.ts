import { client } from '../sanity/lib/client'

const sampleEmailTemplates = [
  {
    _type: 'emailTemplate',
    name: 'Welcome to Aulawell',
    slug: { current: 'welcome-to-aulawell' },
    subject: 'Welcome to Aulawell, {{parentName}}!',
    preheader: 'Thank you for choosing Aulawell for your tutoring needs',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [{ _type: 'span', text: 'Welcome to Aulawell!' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Dear {{parentName}},' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Thank you for contacting Aulawell! We\'re thrilled to have the opportunity to support {{studentName}}\'s educational journey.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Our team of expert tutors, including current AQA & Cambridge examiners, is ready to help {{studentName}} excel in their studies. We\'ll be in touch within 24 hours to discuss your specific needs and create a personalized learning plan.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'In the meantime, here\'s what you can expect from Aulawell:' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Expert tutors with proven track records' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Personalized learning plans tailored to {{studentName}}\'s needs' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Regular progress updates and feedback' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Flexible scheduling to fit your family\'s routine' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Best regards,' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Amy and the Aulawell Team' },
        ],
      },
    ],
    category: 'welcome',
    isActive: true,
    variables: ['parentName', 'studentName'],
  },
  {
    _type: 'emailTemplate',
    name: 'Day 3 Follow-up',
    slug: { current: 'day-3-followup' },
    subject: 'Quick check-in: How can we help {{studentName}}?',
    preheader: 'We\'d love to learn more about your tutoring needs',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Hi {{parentName}},' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'I hope this email finds you well. I wanted to follow up on your recent inquiry about tutoring for {{studentName}}.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'I understand that finding the right tutor can feel overwhelming, and I\'m here to make the process as smooth as possible. To help us match {{studentName}} with the perfect tutor, I\'d love to learn more about:' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Which subjects {{studentName}} needs support with' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Any specific exam boards or curricula you\'re following' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Your preferred schedule for tutoring sessions' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '• Any particular learning goals or challenges' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Would you prefer a quick phone call to discuss these details? I\'m available this week at your convenience.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Looking forward to hearing from you!' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Warm regards,' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Amy' },
        ],
      },
    ],
    category: 'followup',
    isActive: true,
    variables: ['parentName', 'studentName'],
    sendDelay: 72, // 3 days
  },
  {
    _type: 'emailTemplate',
    name: 'Week 1 Success Tips',
    slug: { current: 'week-1-tips' },
    subject: '5 tips to help {{studentName}} succeed',
    preheader: 'Setting up for tutoring success',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Hello {{parentName}},' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'As you consider tutoring options for {{studentName}}, I wanted to share some tips that have helped our most successful students:' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: '1. Create a Dedicated Study Space' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'A quiet, organized area helps students focus during online sessions.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: '2. Set Clear Goals Together' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Whether it\'s improving grades or building confidence, having clear objectives helps track progress.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: '3. Regular Sessions Work Best' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Consistency is key - weekly sessions at the same time help establish a routine.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: '4. Celebrate Small Wins' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Acknowledging progress, no matter how small, boosts motivation.' },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: '5. Open Communication' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Regular check-ins between parents, students, and tutors ensure everyone\'s aligned.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Ready to get started? Simply reply to this email or book a free consultation call.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Best wishes,' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'The Aulawell Team' },
        ],
      },
    ],
    category: 'welcome',
    isActive: true,
    variables: ['parentName', 'studentName'],
    sendDelay: 168, // 7 days
  },
  {
    _type: 'emailTemplate',
    name: 'Contact Form Admin Alert',
    slug: { current: 'contact-form-admin' },
    subject: 'New Contact Form: {{subject}}',
    preheader: 'New inquiry from {{parentName}}',
    body: [
      {
        _type: 'block',
        style: 'h1',
        children: [
          { _type: 'span', text: 'New Contact Form Submission' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'You have received a new inquiry from the website:' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Parent Name:** {{parentName}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Student Name:** {{studentName}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Email:** {{email}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Phone:** {{phone}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Services Requested:** {{services}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: '**Message:**' },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          { _type: 'span', text: '{{message}}' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Please respond within 24 hours to maintain our excellent service standards.' },
        ],
      },
    ],
    category: 'notification',
    isActive: true,
    variables: ['parentName', 'studentName', 'email', 'phone', 'subject', 'services', 'message'],
  },
  {
    _type: 'emailTemplate',
    name: 'Contact Form Thank You',
    slug: { current: 'contact-form-thank-you' },
    subject: 'Thank you for contacting Aulawell',
    preheader: 'We\'ll be in touch within 24 hours',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Dear {{parentName}},' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Thank you for reaching out to Aulawell! We\'ve received your inquiry and are excited about the opportunity to support {{studentName}}\'s educational journey.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'One of our education specialists will review your requirements and contact you within 24 hours to discuss how we can best help {{studentName}} achieve their academic goals.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'In the meantime, feel free to explore our website to learn more about our tutors and success stories.' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'We look forward to speaking with you soon!' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Warm regards,' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          { _type: 'span', text: 'Amy and the Aulawell Team' },
        ],
      },
    ],
    category: 'contact',
    isActive: true,
    variables: ['parentName', 'studentName'],
  },
]

async function createSampleEmailTemplates() {
  console.log('Creating sample email templates...')
  
  for (const template of sampleEmailTemplates) {
    try {
      const result = await client.create(template)
      console.log(`✓ Created template: ${template.name} (${result._id})`)
    } catch (error) {
      console.error(`✗ Failed to create template: ${template.name}`, error)
    }
  }
}

async function createSampleEmailFlows() {
  console.log('\nCreating sample email flows...')
  
  // Get the created templates
  const templates = await client.fetch(`*[_type == "emailTemplate"]{ _id, slug }`)
  const templateMap = templates.reduce((acc: any, t: any) => {
    acc[t.slug.current] = t._id
    return acc
  }, {})
  
  const sampleFlows = [
    {
      _type: 'emailFlow',
      name: 'Welcome Series',
      slug: { current: 'welcome-series' },
      description: 'Automated welcome sequence for new contacts with educational tips and follow-ups',
      trigger: 'contact_form',
      steps: [
        {
          _key: 'step1',
          stepName: 'Immediate Welcome',
          emailTemplate: { _ref: templateMap['welcome-to-aulawell'], _type: 'reference' },
          delayValue: 0,
          delayUnit: 'minutes',
          conditions: [{ _key: 'cond1', type: 'always' }],
        },
        {
          _key: 'step2',
          stepName: 'Day 3 Follow-up',
          emailTemplate: { _ref: templateMap['day-3-followup'], _type: 'reference' },
          delayValue: 3,
          delayUnit: 'days',
          conditions: [{ _key: 'cond2', type: 'always' }],
        },
        {
          _key: 'step3',
          stepName: 'Week 1 Tips',
          emailTemplate: { _ref: templateMap['week-1-tips'], _type: 'reference' },
          delayValue: 7,
          delayUnit: 'days',
          conditions: [{ _key: 'cond3', type: 'if_not_opened', value: 'step2' }],
        },
      ],
      isActive: true,
      tags: ['onboarding', 'nurture'],
      settings: {
        stopOnUnsubscribe: true,
        skipWeekends: true,
        timezone: 'Europe/Madrid',
      },
    },
    {
      _type: 'emailFlow',
      name: 'Quick Response Flow',
      slug: { current: 'quick-response' },
      description: 'Immediate acknowledgment for contact form submissions',
      trigger: 'contact_form',
      steps: [
        {
          _key: 'step1',
          stepName: 'Thank You Email',
          emailTemplate: { _ref: templateMap['contact-form-thank-you'], _type: 'reference' },
          delayValue: 0,
          delayUnit: 'minutes',
          conditions: [{ _key: 'cond1', type: 'always' }],
        },
      ],
      isActive: true,
      tags: ['contact', 'immediate'],
      settings: {
        stopOnUnsubscribe: true,
        skipWeekends: false,
        timezone: 'Europe/Madrid',
      },
    },
  ]
  
  for (const flow of sampleFlows) {
    try {
      const result = await client.create(flow)
      console.log(`✓ Created flow: ${flow.name} (${result._id})`)
    } catch (error) {
      console.error(`✗ Failed to create flow: ${flow.name}`, error)
    }
  }
}

async function main() {
  console.log('Setting up sample email templates and flows...\n')
  
  try {
    await createSampleEmailTemplates()
    await createSampleEmailFlows()
    
    console.log('\n✅ Sample data created successfully!')
    console.log('\nYou can now:')
    console.log('1. View and edit templates in Sanity Studio under "Email System → Email Templates"')
    console.log('2. View and edit flows in Sanity Studio under "Email System → Email Flows"')
    console.log('3. Test the flows from the admin panel at /admin/emails')
  } catch (error) {
    console.error('Error creating sample data:', error)
  }
}

main()