import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { emailTemplatesByCategoryQuery } from '@/sanity/lib/queries'
import { EmailTemplate } from '@/sanity/lib/types'
import { prepareEmailFromTemplate } from './utils'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailSequenceTrigger {
  type: 'contact_form' | 'trial_signup' | 'student_onboarding' | 'manual'
  recipientEmail: string
  variables: Record<string, string>
}

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
  
  try {
    // Fetch all templates for this category
    const templates = await client.fetch<EmailTemplate[]>(
      emailTemplatesByCategoryQuery,
      { category }
    )
    
    if (!templates || templates.length === 0) {
      console.log(`No email templates found for category: ${category}`)
      return
    }
    
    // Sort templates by send delay
    const sortedTemplates = templates.sort((a, b) => 
      (a.sendDelay || 0) - (b.sendDelay || 0)
    )
    
    // Send immediate emails (sendDelay = 0 or undefined)
    const immediateEmails = sortedTemplates.filter(t => !t.sendDelay || t.sendDelay === 0)
    
    for (const template of immediateEmails) {
      try {
        const emailData = await prepareEmailFromTemplate(
          template.slug.current,
          trigger.variables,
          trigger.recipientEmail
        )
        
        if (emailData) {
          const { data: _data, error } = await resend.emails.send({
            from: emailData.from || 'Amy at Aulawell <amy@aulawell.com>',
            to: emailData.to,
            subject: emailData.subject,
            html: emailData.html,
            replyTo: emailData.replyTo,
          })
          
          if (error) {
            console.error(`Failed to send email "${template.name}":`, error)
          } else {
            console.log(`Sent email "${template.name}" to ${trigger.recipientEmail}`)
          }
        }
      } catch (error) {
        console.error(`Error sending template ${template.slug.current}:`, error)
      }
    }
    
    // Schedule delayed emails
    const delayedEmails = sortedTemplates.filter(t => t.sendDelay && t.sendDelay > 0)
    
    if (delayedEmails.length > 0) {
      // In production, you would:
      // 1. Store these in a database with scheduled times
      // 2. Use Vercel Cron Jobs or a queue service to send them
      // 3. For now, we'll just log what would be scheduled
      
      console.log('Email sequence scheduled:')
      delayedEmails.forEach(template => {
        console.log(`- "${template.name}" will be sent in ${template.sendDelay} hours`)
      })
      
      // For development/testing: Store in Vercel KV or similar
      // This is where you'd integrate with your scheduling system
    }
    
  } catch (error) {
    console.error('Error in email sequence:', error)
  }
}

// Function to send a scheduled email (called by cron job)
export async function sendScheduledEmail(
  templateSlug: string,
  recipientEmail: string,
  variables: Record<string, string>
) {
  try {
    const emailData = await prepareEmailFromTemplate(
      templateSlug,
      variables,
      recipientEmail
    )
    
    if (emailData) {
      const { data, error } = await resend.emails.send({
        from: emailData.from || 'Amy at Aulawell <amy@aulawell.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        replyTo: emailData.replyTo,
      })
      
      if (error) {
        console.error(`Failed to send scheduled email:`, error)
        throw error
      }
      
      return data
    }
  } catch (error) {
    console.error('Error sending scheduled email:', error)
    throw error
  }
}