import { Resend } from 'resend'
import { WelcomeEmail1, WelcomeEmail2, WelcomeEmail3 } from './welcome-sequence'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailSequenceTrigger {
  type: 'contact_form' | 'trial_signup' | 'student_onboarding' | 'manual'
  recipientEmail: string
  variables: {
    parentName: string
    studentName: string
    [key: string]: string
  }
}

// Hardcoded email sequence for contact form
const contactFormSequence = [
  {
    id: 'welcome-1',
    name: 'Hidden Reasons Email',
    delayHours: 0, // Send immediately
    component: WelcomeEmail1,
  },
  {
    id: 'welcome-2', 
    name: 'Smart Kids Fail Email',
    delayHours: 24, // Send after 1 day
    component: WelcomeEmail2,
  },
  {
    id: 'welcome-3',
    name: 'Success Story Email', 
    delayHours: 96, // Send after 4 days
    component: WelcomeEmail3,
  }
]

export async function triggerEmailSequence(trigger: EmailSequenceTrigger) {
  console.log(`Starting email sequence for ${trigger.recipientEmail}`)
  
  // For now, only handle contact form sequence
  if (trigger.type !== 'contact_form') {
    console.log(`No sequence defined for type: ${trigger.type}`)
    return
  }
  
  const { parentName, studentName } = trigger.variables
  
  // Send immediate emails
  for (const email of contactFormSequence) {
    if (email.delayHours === 0) {
      try {
        const EmailComponent = email.component
        const { data: _data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Using test domain
          to: 'miller@bravura.studio', // Locked to verified email for testing
          subject: getSubjectForEmail(email.id),
          react: EmailComponent({ parentName, studentName }),
        })
        
        if (error) {
          console.error(`Failed to send ${email.name}:`, error)
        } else {
          console.log(`Sent ${email.name} to ${trigger.recipientEmail}`)
        }
      } catch (error) {
        console.error(`Error sending ${email.name}:`, error)
      }
    } else {
      // Log what would be scheduled
      console.log(`Would schedule "${email.name}" to be sent in ${email.delayHours} hours`)
      
      // In production, you would:
      // 1. Store in database with scheduled time
      // 2. Use Vercel Cron or similar to send at the right time
      // 3. For now, we could use setTimeout for demo purposes (not recommended for production)
      
      // Demo only - sends after minutes instead of hours for testing
      if (process.env.NODE_ENV === 'development' && process.env.DEMO_MODE === 'true') {
        setTimeout(async () => {
          try {
            const EmailComponent = email.component
            const { data: _data, error } = await resend.emails.send({
              from: 'onboarding@resend.dev',
              to: 'miller@bravura.studio',
              subject: getSubjectForEmail(email.id),
              react: EmailComponent({ parentName, studentName }),
            })
            
            if (error) {
              console.error(`Failed to send scheduled ${email.name}:`, error)
            } else {
              console.log(`Sent scheduled ${email.name}`)
            }
          } catch (error) {
            console.error(`Error sending scheduled ${email.name}:`, error)
          }
        }, email.delayHours * 60 * 1000) // Convert hours to milliseconds (using minutes for demo)
      }
    }
  }
}

function getSubjectForEmail(emailId: string): string {
  const subjects: Record<string, string> = {
    'welcome-1': 'The 3 Hidden Reasons Your Child Isn\'t Reaching Their Potential',
    'welcome-2': 'Why smart kids fail British exams (and how to fix it)',
    'welcome-3': 'From predicted 5 to achieved 8: Maria\'s transformation',
  }
  
  return subjects[emailId] || 'Message from Aulawell'
}