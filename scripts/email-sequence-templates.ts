// Email sequence templates to be added to Sanity
// These follow the insights from Reddit research about TCKs, cultural gaps, and parent frustrations

export const emailSequenceTemplates = [
  // IMMEDIATE WELCOME SEQUENCE
  {
    name: 'Welcome 1 - Hidden Reasons',
    slug: 'welcome-hidden-reasons',
    subject: 'The 3 Hidden Reasons Your Child Isn\'t Reaching Their Potential (and how to fix them)',
    category: 'welcome',
    sendDelay: 0,
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Welcome 2 - Smart Kids Fail',
    slug: 'welcome-smart-kids-fail',
    subject: 'Why smart kids fail British exams (it\'s not what you think)',
    category: 'welcome',
    sendDelay: 24, // 1 day
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Welcome 3 - Success Story',
    slug: 'welcome-success-story',
    subject: 'From predicted 5 to achieved 8: Maria\'s story (and what it means for {{studentName}})',
    category: 'welcome',
    sendDelay: 96, // 4 days
    variables: ['parentName', 'studentName'],
  },

  // NURTURE SEQUENCE (after welcome)
  {
    name: 'Nurture 1 - Examiner Secrets',
    slug: 'nurture-examiner-secrets',
    subject: 'What I learned marking 500 papers last week',
    category: 'followup',
    sendDelay: 168, // 7 days
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Nurture 2 - Parent Mistakes',
    slug: 'nurture-parent-mistakes',
    subject: 'The well-meaning mistake that\'s hurting {{studentName}}\'s grades',
    category: 'followup',
    sendDelay: 336, // 14 days
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Nurture 3 - Mock Exam Prep',
    slug: 'nurture-mock-prep',
    subject: 'Mock exams in 6 weeks: Are you ready?',
    category: 'followup',
    sendDelay: 504, // 21 days
    variables: ['parentName', 'studentName'],
  },

  // CONVERSION SEQUENCE
  {
    name: 'Convert 1 - Last Chance',
    slug: 'convert-last-chance',
    subject: '{{parentName}}, I\'m closing enrollment soon',
    category: 'followup',
    sendDelay: 672, // 28 days
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Convert 2 - Final Offer',
    slug: 'convert-final-offer',
    subject: 'Final: {{studentName}}\'s personalized improvement plan inside',
    category: 'followup',
    sendDelay: 720, // 30 days
    variables: ['parentName', 'studentName'],
  },

  // ONBOARDING SEQUENCE (after they sign up)
  {
    name: 'Onboard 1 - Welcome Package',
    slug: 'onboard-welcome',
    subject: 'Welcome to Aulawell! Here\'s everything you need',
    category: 'onboarding',
    sendDelay: 0,
    variables: ['parentName', 'studentName', 'firstSessionDate', 'zoomLink'],
  },
  {
    name: 'Onboard 2 - Pre-Session',
    slug: 'onboard-pre-session',
    subject: 'Tomorrow\'s session: Quick prep for {{studentName}}',
    category: 'onboarding',
    sendDelay: -24, // Negative means before first session
    variables: ['parentName', 'studentName', 'sessionTime'],
  },
  {
    name: 'Onboard 3 - Post First Session',
    slug: 'onboard-post-first',
    subject: '{{studentName}}\'s first session report + homework',
    category: 'onboarding',
    sendDelay: 2, // 2 hours after first session
    variables: ['parentName', 'studentName', 'sessionNotes', 'homework'],
  },

  // RE-ENGAGEMENT SEQUENCE (for past clients)
  {
    name: 'Re-engage 1 - Check In',
    slug: 'reengage-check-in',
    subject: 'How did {{studentName}}\'s exams go?',
    category: 'followup',
    sendDelay: 2160, // 90 days
    variables: ['parentName', 'studentName'],
  },
  {
    name: 'Re-engage 2 - New Year',
    slug: 'reengage-new-year',
    subject: 'New year, new grades: Special offer for past families',
    category: 'followup',
    sendDelay: 0, // Triggered by date
    variables: ['parentName', 'studentName'],
  },
]

// Email content structure for reference
export const emailContentStructure = {
  welcomeEmails: {
    tone: 'Empathetic, authoritative, urgent but not pushy',
    structure: [
      'Personal connection/pain point',
      'Authority establishment (examiner insight)',
      'Specific, actionable value',
      'Clear next step',
      'P.S. with social proof or scarcity'
    ],
    keyPhrases: [
      'Third Culture Kid',
      'Lost in translation',
      'Cultural code gap',
      'Examiner insight',
      'Hidden mark scheme rules',
      'British academic voice'
    ]
  },
  conversionTriggers: [
    'Mock exams approaching',
    'Limited spots available',
    'Other international families succeeding',
    'Specific grade improvements',
    'Examiner secrets revealed'
  ]
}