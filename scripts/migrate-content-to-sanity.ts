import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

// Create a client specifically for this script
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

// FAQ Data
const faqData = [
  {
    _type: 'faq',
    question: 'How do online tutoring sessions work?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'We use Zoom for interactive online sessions. Students need a computer/tablet, stable internet, and a quiet space. I provide all materials digitally, use screen sharing for collaborative work, and sessions can be recorded for review.'
      }]
    }],
    category: 'general',
    order: 1,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'What makes you different from other tutors?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'As a current examiner for AQA and Cambridge, I provide insider knowledge that transforms good students into exceptional ones. I know exactly what examiners look for and can teach the specific techniques that earn top marks.'
      }]
    }],
    category: 'general',
    order: 2,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'Which exam boards do you cover?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'I specialize in all major UK exam boards including AQA, Edexcel, OCR, and Cambridge (CIE). I also support International Baccalaureate (IB) students. My examiner experience with AQA and Cambridge gives particular insight into these specifications.'
      }]
    }],
    category: 'services',
    order: 1,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'What is your cancellation policy?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: '24-hour notice is required for cancellations with no charge. I understand international families have complex schedules and handle emergencies flexibly. Sessions cancelled with less notice may be charged at 50% of the session rate.'
      }]
    }],
    category: 'scheduling',
    order: 1,
    featured: false,
  },
  {
    _type: 'faq',
    question: 'Do you offer trial sessions?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Yes! I offer a trial package of 3 sessions at 50% off the regular rate. This allows us to ensure we\'re a good fit and for me to assess your child\'s specific needs before committing to regular sessions.'
      }]
    }],
    category: 'pricing',
    order: 1,
    featured: true,
  },
  {
    _type: 'faq',
    question: 'How much homework do you set?',
    answer: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Homework is tailored to each student\'s needs and schedule. Typically, I set 1-2 hours of work between sessions, focusing on exam practice, essay writing, or specific skill development. The amount can be adjusted based on your child\'s other commitments.'
      }]
    }],
    category: 'academic-support',
    order: 1,
    featured: false,
  },
]

// Service Data
const servicesData = [
  {
    _type: 'service',
    title: 'Academic Tutoring',
    slug: { current: 'academic-tutoring' },
    shortDescription: 'Expert tutoring for British & American curricula including KS3, GCSE, IGCSE, A-Level, and IB.',
    fullDescription: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Comprehensive support for students following British and American curricula. As a current examiner for AQA and Cambridge, I provide insider knowledge that helps students excel. My approach focuses on building deep understanding, exam technique mastery, and confidence development.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Whether your child needs support with specific subjects or overall academic development, I create personalized learning plans that deliver results. Students typically see a 2-grade improvement within 6 months.'
      }]
    }],
    icon: 'BookOpen',
    price: 'From £50/hour',
    duration: '60-90 minutes',
    features: [
      'KS3, GCSE, IGCSE coverage',
      'A-Level & IB preparation',
      'University application support',
      'Examiner insight and techniques',
      'Personalized learning plans',
      'Regular progress reports'
    ],
    subjects: ['English Literature', 'English Language', 'History', 'Psychology', 'Sociology'],
    order: 1,
    featured: true,
  },
  {
    _type: 'service',
    title: 'English as a Foreign Language',
    slug: { current: 'english-foreign-language' },
    shortDescription: 'Comprehensive English language learning for all ages and levels, from beginners to advanced speakers.',
    fullDescription: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Transform your English skills with engaging, practical lessons tailored to your goals. Whether you\'re starting from scratch or polishing advanced skills, I create a supportive environment where confidence grows naturally.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'My approach combines conversational practice with structured learning, ensuring rapid progress. Students gain real-world communication skills while mastering grammar and vocabulary. Cambridge exam preparation available for those seeking official certification.'
      }]
    }],
    icon: 'Globe',
    price: 'From £45/hour',
    duration: '60 minutes',
    features: [
      'All levels: Beginner to Advanced',
      'Conversational fluency focus',
      'Cambridge exam preparation',
      'Business English available',
      'Cultural context included',
      'Flexible scheduling'
    ],
    subjects: ['General English', 'Business English', 'Cambridge Exams', 'IELTS Preparation'],
    order: 2,
    featured: true,
  },
  {
    _type: 'service',
    title: 'Academic English',
    slug: { current: 'academic-english' },
    shortDescription: 'Bridge the gap between English fluency and academic excellence with curriculum-specific language support.',
    fullDescription: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Many students speak English well but struggle with academic requirements. I specialize in teaching the sophisticated language skills needed for top grades: essay structure, subject-specific terminology, critical analysis, and exam technique.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Perfect for international students or those who need extra support with academic writing. Learn to express complex ideas clearly, analyze texts effectively, and write with the precision examiners expect.'
      }]
    }],
    icon: 'PenTool',
    price: 'From £55/hour',
    duration: '60-90 minutes',
    features: [
      'Essay writing mastery',
      'Subject-specific vocabulary',
      'Critical thinking skills',
      'Exam answer techniques',
      'Academic presentation skills',
      'Research methodology'
    ],
    subjects: ['Academic Writing', 'Essay Skills', 'Critical Analysis', 'Research Methods'],
    order: 3,
    featured: true,
  },
  {
    _type: 'service',
    title: 'Exam Marking Service',
    slug: { current: 'exam-marking' },
    shortDescription: 'Get your practice papers marked by a real examiner with detailed feedback.',
    fullDescription: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Submit your practice exam papers and receive authentic examiner feedback. I mark your work using official mark schemes and provide detailed comments on how to improve. This service gives you invaluable insight into exactly what examiners look for.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Each marked paper includes grade boundaries, specific improvement suggestions, and examiner tips. Perfect for mock exams or regular practice throughout the year.'
      }]
    }],
    icon: 'CheckSquare',
    price: '£30 per paper',
    duration: '48-hour turnaround',
    features: [
      'Official mark scheme used',
      'Detailed written feedback',
      'Grade breakdown provided',
      'Improvement strategies',
      'Examiner tips included',
      'Fast turnaround'
    ],
    subjects: ['All exam boards', 'GCSE/IGCSE', 'A-Level', 'IB'],
    order: 4,
    featured: false,
  },
  {
    _type: 'service',
    title: 'Interview Practice',
    slug: { current: 'interview-practice' },
    shortDescription: 'Prepare for school, university, or scholarship interviews with confidence.',
    fullDescription: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Master the art of impressive interviews with expert coaching. I help students prepare for entrance interviews at top schools and universities, including Oxbridge applications. Learn to articulate your thoughts clearly, handle tough questions, and showcase your potential.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Sessions include mock interviews, feedback on body language and communication style, and strategies for common question types. Build the confidence to excel in high-pressure situations.'
      }]
    }],
    icon: 'Mic',
    price: '£75 per session',
    duration: '90 minutes',
    features: [
      'Mock interview practice',
      'Oxbridge preparation',
      'Scholarship interviews',
      'Body language coaching',
      'Answer structuring techniques',
      'Confidence building'
    ],
    subjects: ['University interviews', 'School entrance', 'Scholarship applications'],
    order: 5,
    featured: false,
  },
]

// Testimonials Data
const testimonialsData = [
  {
    _type: 'testimonial',
    name: 'Sarah Mitchell',
    role: 'Parent of Year 11 Student',
    content: 'Amy transformed my daughter\'s approach to English Literature. She went from a Grade 5 to achieving a Grade 8 in her GCSEs. The examiner insights were invaluable!',
    rating: 5,
    studentInitials: 'EM',
    course: 'GCSE English Literature',
    achievement: 'Grade 5 to Grade 8',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'David Chen',
    role: 'IB Student',
    content: 'The academic writing support was exactly what I needed. Amy helped me develop a sophisticated writing style that impressed my teachers. I achieved a 7 in English!',
    rating: 5,
    studentInitials: 'DC',
    course: 'IB English',
    achievement: 'Achieved Grade 7',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'Maria González',
    role: 'Parent of International Student',
    content: 'Moving from Spain, my son struggled with academic English. Amy\'s patient approach and cultural understanding made all the difference. He\'s now thriving at university!',
    rating: 5,
    studentInitials: 'JG',
    course: 'Academic English',
    achievement: 'University admission success',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'James Thompson',
    role: 'A-Level Student',
    content: 'Amy\'s examiner perspective gave me a huge advantage. She showed me exactly what examiners look for and how to structure perfect answers. Got my A* and into Oxford!',
    rating: 5,
    studentInitials: 'JT',
    course: 'A-Level English',
    achievement: 'A* grade, Oxford admission',
    featured: true,
  },
  {
    _type: 'testimonial',
    name: 'Priya Patel',
    role: 'Parent of Year 9 Student',
    content: 'My daughter was falling behind due to lack of confidence. Amy built her up gradually, and now she actively participates in class. The personalized approach really works!',
    rating: 5,
    studentInitials: 'AP',
    course: 'KS3 English',
    achievement: 'Improved confidence and grades',
    featured: false,
  },
  {
    _type: 'testimonial',
    name: 'Robert Kim',
    role: 'Business Professional',
    content: 'I needed to improve my business English for presentations. Amy\'s lessons were practical and immediately applicable. My confidence in meetings has soared!',
    rating: 5,
    studentInitials: 'RK',
    course: 'Business English',
    achievement: 'Professional advancement',
    featured: false,
  },
]

// Success Stories Data
const successStoriesData = [
  {
    _type: 'successStory',
    title: 'From Grade 4 to Oxford: James\'s Journey',
    slug: { current: 'james-oxford-journey' },
    studentName: 'James Thompson',
    excerpt: 'How strategic exam preparation and insider knowledge helped James achieve his Oxford dream.',
    challenge: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'James was a bright student stuck at Grade 4 in English Literature. Despite understanding the texts, he couldn\'t translate his knowledge into exam success. With Oxford as his goal, he needed exceptional grades.'
      }]
    }],
    solution: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'We focused on exam technique using my examiner experience. I taught James the specific structures and analytical approaches that earn top marks. We practiced with past papers, and I marked them exactly as an examiner would.'
      }]
    }],
    result: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'James achieved an A* at A-Level and secured his place at Oxford University. He learned not just what to write, but how to think like an examiner. His essays became models of clarity and sophisticated analysis.'
      }]
    }],
    beforeGrade: 'Grade 4',
    afterGrade: 'A* (A-Level)',
    duration: '18 months',
    featured: true,
    order: 1,
  },
  {
    _type: 'successStory',
    title: 'Building Confidence: Priya\'s Transformation',
    slug: { current: 'priya-confidence-transformation' },
    studentName: 'Priya Anderson',
    excerpt: 'From silent in class to student leader - how personalized support changed everything.',
    challenge: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Priya rarely spoke in class and avoided participating in discussions. Her written work was good, but her lack of confidence was holding her back from achieving her potential. Her parents were concerned about her upcoming GCSEs.'
      }]
    }],
    solution: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'I created a safe, encouraging environment where Priya could build confidence gradually. We started with structured discussions, practiced presentation skills, and worked on assertive communication. Each session built on small victories.'
      }]
    }],
    result: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Priya not only improved her grades from Grade 5 to Grade 8, but became a confident class participant. She now leads study groups and recently won a school debate competition. Her teachers can\'t believe the transformation.'
      }]
    }],
    beforeGrade: 'Grade 5',
    afterGrade: 'Grade 8',
    duration: '12 months',
    featured: true,
    order: 2,
  },
  {
    _type: 'successStory',
    title: 'International Success: Carlos\'s Academic English Journey',
    slug: { current: 'carlos-academic-english' },
    studentName: 'Carlos Rodriguez',
    excerpt: 'Moving from Spain to UK education - mastering academic English in record time.',
    challenge: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Carlos spoke conversational English well but struggled with academic requirements. Essay writing, subject-specific vocabulary, and exam techniques were all new challenges. He risked falling behind in his A-Level studies.'
      }]
    }],
    solution: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'We developed a comprehensive program covering academic writing structures, subject terminology, and critical analysis skills. I provided frameworks for different essay types and taught him to decode exam questions effectively.'
      }]
    }],
    result: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Carlos went from struggling to pass to achieving A grades across all subjects. He mastered academic English in just 6 months and is now studying Engineering at Imperial College London. His essays are now used as examples for other students.'
      }]
    }],
    beforeGrade: 'D (struggling)',
    afterGrade: 'A grades',
    duration: '6 months',
    featured: true,
    order: 3,
  },
  {
    _type: 'successStory',
    title: 'The Power of Exam Insight: Sofia\'s Success',
    slug: { current: 'sofia-exam-success' },
    studentName: 'Sofia Williams',
    excerpt: 'How examiner knowledge helped Sofia crack the code to Grade 9 success.',
    challenge: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Sofia worked incredibly hard but couldn\'t break through the Grade 7 barrier. She knew her texts inside out but wasn\'t presenting her knowledge in the way examiners wanted. Frustration was affecting her motivation.'
      }]
    }],
    solution: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Using my examiner experience, I showed Sofia exactly what earns marks. We analyzed mark schemes together, practiced specific techniques for each question type, and I marked her work with examiner-style feedback.'
      }]
    }],
    result: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'Sofia achieved Grade 9s in both English Language and Literature. She finally understood the \'examiner code\' and could showcase her knowledge effectively. She\'s now mentoring younger students using the techniques she learned.'
      }]
    }],
    beforeGrade: 'Grade 7',
    afterGrade: 'Grade 9',
    duration: '9 months',
    featured: false,
    order: 4,
  },
]

// About Content Data
const aboutContentData = [
  {
    _type: 'aboutContent',
    sectionTitle: 'Meet Amy',
    slug: { current: 'meet-amy' },
    content: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'I\'m Amy, founder of Aulawell and your dedicated education partner. With over 15 years of teaching experience and current roles as an examiner for both AQA and Cambridge International, I bring unique insights that transform student outcomes.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'My journey in education began at the University of Cambridge, where I developed a passion for helping students unlock their potential. Since then, I\'ve taught in top UK schools, international schools in Spain, and built a thriving online tutoring practice that serves families worldwide.'
      }]
    }],
    order: 1,
  },
  {
    _type: 'aboutContent',
    sectionTitle: 'Teaching Philosophy',
    slug: { current: 'teaching-philosophy' },
    content: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'I believe every student has untapped potential waiting to be discovered. My approach combines high expectations with patient, personalized support. I don\'t just teach content – I teach students how to think, analyze, and express themselves with confidence.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'As a current examiner, I know exactly what earns top marks. This insider knowledge, combined with my genuine care for each student\'s success, creates a learning environment where excellence becomes achievable for everyone.'
      }]
    }],
    order: 2,
  },
  {
    _type: 'aboutContent',
    sectionTitle: 'The Examiner Advantage',
    slug: { current: 'examiner-advantage' },
    content: [{
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'My role as an active examiner for AQA and Cambridge International provides students with an unprecedented advantage. I see hundreds of exam papers each year, understand exactly how marks are awarded, and know the common mistakes that prevent good students from achieving great grades.'
      }]
    }, {
      _type: 'block',
      children: [{
        _type: 'span',
        text: 'This experience means I can teach students not just what to learn, but how to present their knowledge for maximum marks. It\'s like having the exam marking scheme in advance – because I help write them.'
      }]
    }],
    order: 3,
  },
]

// Team Member Data (Amy)
const teamMemberData = {
  _type: 'teamMember',
  name: 'Amy Thompson',
  role: 'Founder & Lead Tutor',
  bio: [{
    _type: 'block',
    children: [{
      _type: 'span',
      text: 'Education specialist with 15+ years experience, current examiner for AQA and Cambridge International. Cambridge University graduate with a passion for transforming student outcomes through personalized, expert tutoring.'
    }]
  }],
  qualifications: [
    'MA Education, University of Cambridge',
    'PGCE, King\'s College London',
    'Current Examiner: AQA & Cambridge International',
    'Qualified Teacher Status (QTS)',
    'DBS Enhanced Certificate',
    'Member: The Tutors\' Association'
  ],
  specialties: [
    'English Literature & Language',
    'Academic Writing',
    'Exam Preparation',
    'University Applications',
    'Interview Coaching',
    'International Curricula'
  ],
  image: {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: 'image-amy-thompson' // This would need to be uploaded separately
    }
  },
  order: 1,
  featured: true,
}

// Migration functions
async function migrateContent() {
  console.log('Starting content migration to Sanity...\n')
  
  let successCount = 0
  let errorCount = 0
  
  // Migrate FAQs
  console.log('📝 Migrating FAQs...')
  for (const faq of faqData) {
    try {
      const result = await client.create(faq)
      console.log(`✓ Created FAQ: ${faq.question}`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to create FAQ: ${faq.question}`, error)
      errorCount++
    }
  }
  
  // Migrate Services
  console.log('\n🎯 Migrating Services...')
  for (const service of servicesData) {
    try {
      const result = await client.create(service)
      console.log(`✓ Created Service: ${service.title}`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to create Service: ${service.title}`, error)
      errorCount++
    }
  }
  
  // Migrate Testimonials
  console.log('\n⭐ Migrating Testimonials...')
  for (const testimonial of testimonialsData) {
    try {
      const result = await client.create(testimonial)
      console.log(`✓ Created Testimonial: ${testimonial.name}`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to create Testimonial: ${testimonial.name}`, error)
      errorCount++
    }
  }
  
  // Migrate Success Stories
  console.log('\n🏆 Migrating Success Stories...')
  for (const story of successStoriesData) {
    try {
      const result = await client.create(story)
      console.log(`✓ Created Success Story: ${story.title}`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to create Success Story: ${story.title}`, error)
      errorCount++
    }
  }
  
  // Migrate About Content
  console.log('\n📖 Migrating About Content...')
  for (const section of aboutContentData) {
    try {
      const result = await client.create(section)
      console.log(`✓ Created About Section: ${section.sectionTitle}`)
      successCount++
    } catch (error) {
      console.error(`✗ Failed to create About Section: ${section.sectionTitle}`, error)
      errorCount++
    }
  }
  
  // Migrate Team Member
  console.log('\n👤 Migrating Team Member...')
  try {
    const result = await client.create(teamMemberData)
    console.log(`✓ Created Team Member: ${teamMemberData.name}`)
    successCount++
  } catch (error) {
    console.error(`✗ Failed to create Team Member: ${teamMemberData.name}`, error)
    errorCount++
  }
  
  console.log('\n✅ Migration Summary:')
  console.log(`   Successful: ${successCount}`)
  console.log(`   Failed: ${errorCount}`)
  console.log(`   Total: ${successCount + errorCount}`)
  
  console.log('\n📌 Next Steps:')
  console.log('1. Upload Amy\'s photo to Sanity Media Library')
  console.log('2. Update the team member image reference')
  console.log('3. Update components to fetch from Sanity instead of using hardcoded data')
  console.log('4. Test all pages to ensure content displays correctly')
  console.log('5. Remove hardcoded data from components')
}

// Run the migration
migrateContent().catch(console.error)