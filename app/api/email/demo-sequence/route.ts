import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { WelcomeEmail1, WelcomeEmail2, WelcomeEmail3 } from '@/lib/email/welcome-sequence'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { parentName = 'Test Parent', studentName = 'Test Student' } = await request.json()
    
    const emails = [
      {
        name: 'Email 1: Hidden Reasons',
        subject: 'The 3 Hidden Reasons Your Child Isn\'t Reaching Their Potential',
        component: WelcomeEmail1,
        delay: 0,
      },
      {
        name: 'Email 2: Smart Kids Fail',
        subject: 'Why smart kids fail British exams (and how to fix it)',
        component: WelcomeEmail2,
        delay: 5000, // 5 seconds
      },
      {
        name: 'Email 3: Success Story',
        subject: 'From predicted 5 to achieved 8: Maria\'s transformation',
        component: WelcomeEmail3,
        delay: 10000, // 10 seconds
      },
    ]
    
    const results = []
    
    for (const email of emails) {
      // Wait for the specified delay
      if (email.delay > 0) {
        await new Promise(resolve => setTimeout(resolve, email.delay))
      }
      
      const EmailComponent = email.component
      const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'miller@bravura.studio',
        subject: `[DEMO] ${email.subject}`,
        react: EmailComponent({ parentName, studentName }),
      })
      
      if (error) {
        results.push({
          name: email.name,
          status: 'failed',
          error: error.message,
        })
      } else {
        results.push({
          name: email.name,
          status: 'sent',
          id: data?.id,
        })
      }
    }
    
    return NextResponse.json({
      message: 'Demo sequence completed',
      results,
    })
  } catch (error) {
    console.error('Demo sequence error:', error)
    return NextResponse.json(
      { error: 'Failed to send demo sequence' },
      { status: 500 }
    )
  }
}