import { client } from '@/sanity/lib/client'
import { sendEmailFromTemplate } from './automation-sender'

interface EmailFlowStep {
  stepName: string
  emailTemplate: {
    _id: string
    slug: { current: string }
  }
  delayValue: number
  delayUnit: 'minutes' | 'hours' | 'days' | 'weeks'
  conditions?: Array<{
    type: string
    value?: string
  }>
}

interface EmailFlow {
  _id: string
  name: string
  slug: { current: string }
  trigger: string
  steps: EmailFlowStep[]
  isActive: boolean
  settings?: {
    stopOnUnsubscribe?: boolean
    skipWeekends?: boolean
    timezone?: string
  }
}

interface FlowRecipient {
  email: string
  data: Record<string, any>
  flowId: string
  currentStep?: number
  startedAt?: Date
  completedSteps?: string[]
}

// Convert delay to milliseconds
function getDelayInMs(value: number, unit: string): number {
  const multipliers = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
  }
  return value * (multipliers[unit as keyof typeof multipliers] || 0)
}

// Check if we should skip weekends
function adjustForWeekends(date: Date, skipWeekends: boolean): Date {
  if (!skipWeekends) return date
  
  const day = date.getDay()
  if (day === 6) { // Saturday
    date.setDate(date.getDate() + 2)
  } else if (day === 0) { // Sunday
    date.setDate(date.getDate() + 1)
  }
  return date
}

// Get email flow by trigger type
export async function getFlowByTrigger(trigger: string): Promise<EmailFlow | null> {
  const query = `*[_type == "emailFlow" && trigger == $trigger && isActive == true][0] {
    _id,
    name,
    slug,
    trigger,
    steps[] {
      stepName,
      emailTemplate->{
        _id,
        slug
      },
      delayValue,
      delayUnit,
      conditions
    },
    isActive,
    settings
  }`
  
  return await client.fetch(query, { trigger })
}

// Get email flow by slug
export async function getFlowBySlug(slug: string): Promise<EmailFlow | null> {
  const query = `*[_type == "emailFlow" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    slug,
    trigger,
    steps[] {
      stepName,
      emailTemplate->{
        _id,
        slug
      },
      delayValue,
      delayUnit,
      conditions
    },
    isActive,
    settings
  }`
  
  return await client.fetch(query, { slug })
}

// Start an email flow for a recipient
export async function startEmailFlow(
  flowSlugOrTrigger: string,
  recipient: string,
  data: Record<string, any>,
  isTrigger = false
): Promise<void> {
  // Get the flow
  const flow = isTrigger 
    ? await getFlowByTrigger(flowSlugOrTrigger)
    : await getFlowBySlug(flowSlugOrTrigger)
    
  if (!flow || !flow.isActive) {
    console.log(`No active flow found for ${flowSlugOrTrigger}`)
    return
  }
  
  console.log(`Starting email flow: ${flow.name} for ${recipient}`)
  
  // Process each step
  for (let i = 0; i < flow.steps.length; i++) {
    const step = flow.steps[i]
    
    // Check conditions
    const shouldSend = await checkStepConditions(step, recipient, data)
    if (!shouldSend) {
      console.log(`Skipping step ${step.stepName} due to conditions`)
      continue
    }
    
    // Calculate delay
    const delay = getDelayInMs(step.delayValue, step.delayUnit)
    
    if (delay > 0) {
      // Schedule for later (in production, you'd use a job queue)
      console.log(`Scheduling ${step.stepName} for ${recipient} in ${delay}ms`)
      setTimeout(async () => {
        await sendFlowStep(flow, step, recipient, data)
      }, delay)
    } else {
      // Send immediately
      await sendFlowStep(flow, step, recipient, data)
    }
  }
}

// Check if step conditions are met
async function checkStepConditions(
  step: EmailFlowStep,
  recipient: string,
  data: Record<string, any>
): Promise<boolean> {
  if (!step.conditions || step.conditions.length === 0) return true
  
  for (const condition of step.conditions) {
    switch (condition.type) {
      case 'always':
        return true
      case 'if_opened':
        // In production, check email tracking data
        return true
      case 'if_not_opened':
        // In production, check email tracking data
        return true
      case 'if_clicked':
        // In production, check click tracking data
        return true
      case 'custom':
        // Implement custom condition logic
        return true
      default:
        return true
    }
  }
  
  return true
}

// Send a specific flow step
async function sendFlowStep(
  flow: EmailFlow,
  step: EmailFlowStep,
  recipient: string,
  data: Record<string, any>
): Promise<void> {
  try {
    console.log(`Sending ${step.stepName} to ${recipient}`)
    
    // Add flow metadata to the data
    const enrichedData = {
      ...data,
      flowName: flow.name,
      stepName: step.stepName,
    }
    
    // Send the email using the template
    await sendEmailFromTemplate(
      step.emailTemplate.slug.current,
      recipient,
      enrichedData
    )
    
    console.log(`Successfully sent ${step.stepName} to ${recipient}`)
  } catch (error) {
    console.error(`Failed to send ${step.stepName} to ${recipient}:`, error)
  }
}

// Trigger a flow for contact form submissions
export async function triggerContactFormFlow(
  email: string,
  formData: Record<string, any>
): Promise<void> {
  await startEmailFlow('contact_form', email, formData, true)
}

// Trigger a welcome series flow
export async function triggerWelcomeFlow(
  email: string,
  userData: Record<string, any>
): Promise<void> {
  await startEmailFlow('welcome_series', email, userData, true)
}