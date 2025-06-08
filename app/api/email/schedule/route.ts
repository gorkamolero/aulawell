import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { client } from '@/sanity/lib/client'
import { emailTemplatesByCategoryQuery } from '@/sanity/lib/queries'
import { EmailTemplate } from '@/sanity/lib/types'
import { prepareEmailFromTemplate } from '@/lib/email/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ScheduleEmailRequest {
  category: 'welcome' | 'followup' | 'onboarding'
  recipientEmail: string
  variables: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const data: ScheduleEmailRequest = await request.json()
    
    // Fetch email templates for this category
    const templates = await client.fetch<EmailTemplate[]>(
      emailTemplatesByCategoryQuery,
      { category: data.category }
    )
    
    if (!templates || templates.length === 0) {
      return NextResponse.json(
        { error: 'No templates found for this category' },
        { status: 404 }
      )
    }
    
    // Schedule emails based on their delay
    const scheduledEmails = []
    
    for (const template of templates) {
      const emailData = await prepareEmailFromTemplate(
        template.slug.current,
        data.variables,
        data.recipientEmail
      )
      
      if (emailData) {
        if (template.sendDelay && template.sendDelay > 0) {
          // Schedule for later (in production, you'd use a queue service like BullMQ or Vercel Cron)
          // For now, we'll just log it
          console.log(`Would schedule email "${template.name}" to send in ${template.sendDelay} hours`)
          scheduledEmails.push({
            template: template.name,
            sendDelay: template.sendDelay,
            scheduled: true,
          })
        } else {
          // Send immediately
          try {
            await resend.emails.send({
              from: emailData.from || 'Amy at Aulawell <amy@aulawell.com>',
              to: emailData.to,
              subject: emailData.subject,
              html: emailData.html,
              replyTo: emailData.replyTo,
            })
            scheduledEmails.push({
              template: template.name,
              sendDelay: 0,
              sent: true,
            })
          } catch (error) {
            console.error(`Failed to send email "${template.name}":`, error)
          }
        }
      }
    }
    
    return NextResponse.json({
      message: 'Email sequence initiated',
      emails: scheduledEmails,
    })
  } catch (error) {
    console.error('Email scheduling error:', error)
    return NextResponse.json(
      { error: 'Failed to schedule emails' },
      { status: 500 }
    )
  }
}