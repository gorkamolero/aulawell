import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactFormEmail, ThankYouEmail } from '@/lib/email/templates'
import { prepareEmailFromTemplate } from '@/lib/email/utils'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Extract parent and student names from the form data
    const parentName = `${data.firstName} ${data.lastName}`
    const studentName = data.studentName || 'your child' // Default if not provided
    
    // Format services requested
    const servicesRequested = []
    if (data.services.tuition) servicesRequested.push('1-2-1 Tuition')
    if (data.services.groupTuition) servicesRequested.push('Group Tuition')
    if (data.services.courses) servicesRequested.push('Courses')
    if (data.services.examMarking) servicesRequested.push('Exam Marking')
    if (data.services.interviewPractice) servicesRequested.push('Interview Practice')
    if (data.services.other) servicesRequested.push('Other/General Inquiry')
    
    const subject = servicesRequested.length > 0 
      ? `Inquiry about ${servicesRequested.join(', ')}`
      : 'General Inquiry'
    
    try {
      // First, try to use Sanity template for admin notification
      const adminEmailData = await prepareEmailFromTemplate(
        'contact-form-admin',
        {
          parentName,
          studentName,
          email: data.email,
          phone: data.phone || 'Not provided',
          subject,
          message: data.message,
          services: servicesRequested.join(', '),
        },
        process.env.CONTACT_EMAIL || 'amy@aulawell.com'
      )
      
      if (adminEmailData) {
        // Send using Sanity template
        const { data: _adminEmail, error: adminError } = await resend.emails.send({
          from: adminEmailData.from || 'Aulawell Contact Form <noreply@aulawell.com>',
          to: adminEmailData.to,
          subject: adminEmailData.subject,
          html: adminEmailData.html,
          replyTo: adminEmailData.replyTo,
        })
        
        if (adminError) {
          console.error('Admin email error:', adminError)
          throw adminError
        }
      } else {
        // Fallback to React Email template
        const { data: _adminEmail, error: adminError } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Use Resend's test domain
          to: 'miller@bravura.studio', // Temporarily locked to verified email
          subject: `New Contact Form: ${subject}`,
          react: ContactFormEmail({
            parentName,
            studentName,
            email: data.email,
            phone: data.phone,
            subject,
            message: data.message,
          }),
        })
        
        if (adminError) {
          console.error('Admin email error:', adminError)
          throw adminError
        }
      }
      
      // Try to send thank you email to the user
      const thankYouEmailData = await prepareEmailFromTemplate(
        'contact-form-thank-you',
        {
          parentName,
          studentName,
        },
        data.email
      )
      
      if (thankYouEmailData) {
        // Send using Sanity template
        const { data: _thankYouEmail, error: thankYouError } = await resend.emails.send({
          from: thankYouEmailData.from || 'Amy at Aulawell <amy@aulawell.com>',
          to: thankYouEmailData.to,
          subject: thankYouEmailData.subject,
          html: thankYouEmailData.html,
          replyTo: thankYouEmailData.replyTo,
        })
        
        if (thankYouError) {
          console.error('Thank you email error:', thankYouError)
          throw thankYouError
        }
      } else {
        // Fallback to React Email template
        const { data: _thankYouEmail, error: thankYouError } = await resend.emails.send({
          from: 'onboarding@resend.dev', // Use Resend's test domain
          to: data.email,
          subject: 'Thank you for contacting Aulawell',
          react: ThankYouEmail({
            parentName,
            studentName,
          }),
        })
        
        if (thankYouError) {
          console.error('Thank you email error:', thankYouError)
          throw thankYouError
        }
      }
      
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the whole request if email fails
      // You might want to log this to a monitoring service
    }
    
    // Trigger email flow
    try {
      const { triggerContactFormFlow } = await import('@/lib/email/flow-processor')
      await triggerContactFormFlow(data.email, {
        parentName,
        studentName,
        email: data.email,
        phone: data.phone || '',
        subject,
        message: data.message,
        services: servicesRequested,
      })
    } catch (flowError) {
      console.error('Email flow error:', flowError)
      // Don't fail the request if flow fails
    }
    
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}