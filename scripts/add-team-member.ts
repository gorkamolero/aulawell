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

// Team Member Data (Amy) without image for now
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
  order: 1,
  featured: true,
}

async function addTeamMember() {
  try {
    const result = await client.create(teamMemberData)
    console.log(`✓ Created Team Member: ${teamMemberData.name} (${result._id})`)
    console.log('\n📌 Next: Upload Amy\'s photo to Sanity Media Library and update this record')
  } catch (error) {
    console.error(`✗ Failed to create Team Member: ${teamMemberData.name}`, error)
  }
}

addTeamMember()