import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import crypto from 'crypto'

// Webhook handler for email events (opens, clicks, etc.)
// This will be used for tracking email performance

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('resend-signature')
    
    if (!signature || !WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Missing signature or secret' },
        { status: 401 }
      )
    }
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(body)
      .digest('hex')
    
    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
    
    const event = JSON.parse(body)
    
    // Handle different event types
    switch (event.type) {
      case 'email.sent':
        console.log('Email sent:', event.data)
        // Track in analytics or CRM
        break
        
      case 'email.delivered':
        console.log('Email delivered:', event.data)
        // Update delivery status
        break
        
      case 'email.opened':
        console.log('Email opened:', event.data)
        // Track engagement
        // Could trigger follow-up sequences
        break
        
      case 'email.clicked':
        console.log('Email link clicked:', event.data)
        // Track which links are most effective
        // Could trigger sales sequences
        break
        
      case 'email.bounced':
        console.log('Email bounced:', event.data)
        // Clean email list
        // Notify admin
        break
        
      case 'email.complained':
        console.log('Spam complaint:', event.data)
        // Remove from all sequences immediately
        // Review content
        break
    }
    
    // In production, you would:
    // 1. Store these events in a database
    // 2. Update contact records in CRM
    // 3. Trigger automated actions based on behavior
    // 4. Generate reports for optimization
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}