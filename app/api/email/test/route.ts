import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactFormEmail, ThankYouEmail } from '@/lib/email/templates'

const resend = new Resend(process.env.RESEND_API_KEY)

// Test endpoint to preview and send test emails
// In production, protect this with authentication

export async function POST(request: NextRequest) {
  try {
    const { type, recipientEmail } = await request.json()
    
    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Recipient email is required' },
        { status: 400 }
      )
    }
    
    let emailSent
    
    switch (type) {
      case 'contact-admin':
        emailSent = await resend.emails.send({
          from: 'Aulawell Contact Form <noreply@aulawell.com>',
          to: recipientEmail,
          subject: 'TEST: New Contact Form Submission',
          react: ContactFormEmail({
            parentName: 'Test Parent',
            studentName: 'Test Student',
            email: 'test@example.com',
            phone: '+34 600 000 000',
            subject: 'Inquiry about GCSE tutoring',
            message: 'This is a test message to preview the email template. The actual message would contain parent inquiries about tutoring services.',
          }),
        })
        break
        
      case 'contact-thank-you':
        emailSent = await resend.emails.send({
          from: 'Amy at Aulawell <amy@aulawell.com>',
          to: recipientEmail,
          subject: 'TEST: Thank you for contacting Aulawell',
          react: ThankYouEmail({
            parentName: 'Test Parent',
            studentName: 'Test Student',
          }),
        })
        break
        
      case 'welcome-sequence':
        // For testing the welcome sequence
        const welcomeEmails = [
          {
            subject: 'The 3 Hidden Reasons Your Child Isn\'t Reaching Their Potential',
            preview: 'Examiner insights that will transform your child\'s grades',
            delay: '0 hours'
          },
          {
            subject: 'Why smart kids fail British exams',
            preview: 'It\'s not about intelligence...',
            delay: '24 hours'
          },
          {
            subject: 'From predicted 5 to achieved 8: Maria\'s story',
            preview: 'And what it means for your child',
            delay: '96 hours'
          }
        ]
        
        return NextResponse.json({
          message: 'Welcome sequence preview',
          sequence: welcomeEmails,
          note: 'These would be sent automatically at the specified delays'
        })
        
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        )
    }
    
    return NextResponse.json({
      message: 'Test email sent successfully',
      data: emailSent
    })
    
  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}

// GET endpoint to preview email templates
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  
  const templates = {
    'contact-admin': {
      name: 'Contact Form - Admin Notification',
      description: 'Sent to admin when someone submits the contact form',
      variables: ['parentName', 'studentName', 'email', 'phone', 'subject', 'message']
    },
    'contact-thank-you': {
      name: 'Contact Form - Thank You',
      description: 'Sent to the parent after submitting contact form',
      variables: ['parentName', 'studentName']
    },
    'welcome-sequence': {
      name: 'Welcome Email Sequence',
      description: '8-email nurture sequence for new contacts',
      emails: [
        'Hidden Reasons (immediate)',
        'Smart Kids Fail (24h)',
        'Success Story (4 days)',
        'Examiner Secrets (7 days)',
        'Parent Mistakes (14 days)',
        'Mock Prep (21 days)',
        'Last Chance (28 days)',
        'Final Offer (30 days)'
      ]
    }
  }
  
  if (type && templates[type as keyof typeof templates]) {
    return NextResponse.json(templates[type as keyof typeof templates])
  }
  
  return NextResponse.json(templates)
}