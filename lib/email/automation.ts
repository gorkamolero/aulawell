import { client } from '@/sanity/lib/client'
import { emailTemplatesByCategoryQuery } from '@/sanity/lib/queries'
import { EmailTemplate } from '@/sanity/lib/types'

interface EmailSequenceTrigger {
  type: 'contact_form' | 'trial_signup' | 'student_onboarding' | 'manual'
  recipientEmail: string
  variables: Record<string, string>
}

interface ScheduledEmail {
  templateId: string
  recipientEmail: string
  scheduledFor: Date
  variables: Record<string, string>
  status: 'pending' | 'sent' | 'failed'
}

// In production, these would be stored in a database
const scheduledEmails: ScheduledEmail[] = []

export async function triggerEmailSequence(trigger: EmailSequenceTrigger) {
  let category: EmailTemplate['category']
  
  switch (trigger.type) {
    case 'contact_form':
      category = 'welcome'
      break
    case 'trial_signup':
    case 'student_onboarding':
      category = 'onboarding'
      break
    default:
      category = 'notification'
  }
  
  // Fetch all templates for this category
  const templates = await client.fetch<EmailTemplate[]>(
    emailTemplatesByCategoryQuery,
    { category }
  )
  
  // Schedule each email based on its delay
  const now = new Date()
  
  for (const template of templates) {
    const scheduledFor = new Date(now)
    
    if (template.sendDelay) {
      // Add hours to current time
      scheduledFor.setHours(scheduledFor.getHours() + template.sendDelay)
    }
    
    scheduledEmails.push({
      templateId: template._id,
      recipientEmail: trigger.recipientEmail,
      scheduledFor,
      variables: trigger.variables,
      status: 'pending'
    })
  }
  
  // In production, you would:
  // 1. Store these in a database
  // 2. Use a job queue (like BullMQ) to process them
  // 3. Set up cron jobs to check and send scheduled emails
  
  return scheduledEmails.filter(
    email => email.recipientEmail === trigger.recipientEmail
  )
}

// Function to check and send due emails (would run on a cron job)
export async function processDueEmails() {
  const now = new Date()
  const dueEmails = scheduledEmails.filter(
    email => email.status === 'pending' && email.scheduledFor <= now
  )
  
  for (const email of dueEmails) {
    try {
      // Send the email using the template
      // Update status to 'sent'
      email.status = 'sent'
    } catch (error) {
      email.status = 'failed'
      console.error('Failed to send scheduled email:', error)
    }
  }
}

// Email sequence optimization functions
export function calculateOptimalSendTime(_timezone: string): Date {
  // Research shows best open rates at:
  // - Tuesday/Thursday 10am or 2pm local time
  // - Avoid Mondays and Fridays
  
  const now = new Date()
  const targetHour = 10 // 10am local time
  
  // Simple implementation - in production use proper timezone library
  const sendTime = new Date(now)
  sendTime.setHours(targetHour, 0, 0, 0)
  
  // If it's past 10am, schedule for tomorrow
  if (now.getHours() >= targetHour) {
    sendTime.setDate(sendTime.getDate() + 1)
  }
  
  // Skip weekends
  const dayOfWeek = sendTime.getDay()
  if (dayOfWeek === 0) sendTime.setDate(sendTime.getDate() + 1) // Sunday -> Monday
  if (dayOfWeek === 6) sendTime.setDate(sendTime.getDate() + 2) // Saturday -> Monday
  
  return sendTime
}

// A/B testing for subject lines
export function selectSubjectVariant(
  template: EmailTemplate,
  recipientEmail: string
): string {
  // Simple A/B test - in production, track which performs better
  const variants = template.subject.split('|') // Use | to separate variants in Sanity
  
  if (variants.length === 1) return variants[0]
  
  // Use email hash to consistently assign variants
  const hash = recipientEmail.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const variantIndex = hash % variants.length
  
  return variants[variantIndex].trim()
}

// Engagement scoring for smart follow-ups
export interface ContactEngagement {
  email: string
  opensCount: number
  clicksCount: number
  lastOpenDate?: Date
  lastClickDate?: Date
  engagementScore: number
}

export function calculateEngagementScore(engagement: Partial<ContactEngagement>): number {
  let score = 0
  
  // Opens are worth 1 point each (max 5)
  score += Math.min(engagement.opensCount || 0, 5)
  
  // Clicks are worth 3 points each (max 15)
  score += Math.min((engagement.clicksCount || 0) * 3, 15)
  
  // Recency bonus (opened in last 7 days = 5 points)
  if (engagement.lastOpenDate) {
    const daysSinceOpen = (Date.now() - engagement.lastOpenDate.getTime()) / (1000 * 60 * 60 * 24)
    if (daysSinceOpen < 7) score += 5
  }
  
  return score
}

// Smart follow-up rules
export function shouldSendFollowUp(engagement: ContactEngagement): boolean {
  // High engagement (score > 10): They're interested, follow up quickly
  if (engagement.engagementScore > 10) return true
  
  // Medium engagement (score 5-10): Follow up with different angle
  if (engagement.engagementScore >= 5) return true
  
  // Low engagement: Maybe one final attempt with different approach
  if (engagement.opensCount > 0) return true
  
  // No engagement: Stop sending to avoid spam
  return false
}