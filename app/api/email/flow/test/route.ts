import { NextRequest, NextResponse } from 'next/server'
import { startEmailFlow, getFlowBySlug } from '@/lib/email/flow-processor'

export async function POST(request: NextRequest) {
  try {
    const { flowSlug, recipientEmail, testData } = await request.json()
    
    if (!flowSlug || !recipientEmail) {
      return NextResponse.json(
        { error: 'Flow slug and recipient email are required' },
        { status: 400 }
      )
    }
    
    // Check if flow exists
    const flow = await getFlowBySlug(flowSlug)
    if (!flow) {
      return NextResponse.json(
        { error: `Flow with slug "${flowSlug}" not found or not active` },
        { status: 404 }
      )
    }
    
    // Default test data if none provided
    const defaultData = {
      parentName: 'Test Parent',
      studentName: 'Test Student',
      email: recipientEmail,
      phone: '+34 600 000 000',
      subject: 'Test Inquiry',
      message: 'This is a test message from the email flow testing endpoint.',
      services: ['1-2-1 Tuition', 'Exam Preparation'],
    }
    
    const data = { ...defaultData, ...testData }
    
    // Start the email flow
    await startEmailFlow(flowSlug, recipientEmail, data)
    
    return NextResponse.json({
      success: true,
      message: `Email flow "${flow.name}" started for ${recipientEmail}`,
      flow: {
        name: flow.name,
        steps: flow.steps.length,
        trigger: flow.trigger,
      },
      data,
    })
  } catch (error) {
    console.error('Email flow test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to start email flow' },
      { status: 500 }
    )
  }
}

// GET endpoint to list available flows
export async function GET() {
  try {
    const { client } = await import('@/sanity/lib/client')
    
    const flows = await client.fetch(`
      *[_type == "emailFlow" && isActive == true] {
        _id,
        name,
        slug,
        description,
        trigger,
        "stepCount": count(steps)
      } | order(name asc)
    `)
    
    return NextResponse.json({
      flows,
      testEndpoint: '/api/email/flow/test',
      requiredParams: {
        flowSlug: 'The slug of the flow to test',
        recipientEmail: 'Email address to send test emails to',
        testData: 'Optional: Override default test data',
      },
    })
  } catch (error) {
    console.error('Error fetching flows:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email flows' },
      { status: 500 }
    )
  }
}