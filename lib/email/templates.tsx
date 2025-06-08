import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface BaseEmailTemplateProps {
  preheader: string
  content: string
}

export function BaseEmailTemplate({ preheader, content }: BaseEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{preheader}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src="https://aulawell.com/images/logo.png"
              width="150"
              height="50"
              alt="Aulawell"
              style={logo}
            />
            <Hr style={hr} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <Hr style={hr} />
            <Text style={footer}>
              © 2024 Aulawell. All rights reserved.
              <br />
              <Link href="https://aulawell.com" style={link}>
                www.aulawell.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const logo = {
  margin: '0 auto',
  marginBottom: '24px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
}

const link = {
  color: '#8898aa',
  textDecoration: 'underline',
}

// Contact Form Email Template Props
interface ContactFormEmailProps {
  parentName: string
  studentName: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function ContactFormEmail({
  parentName,
  studentName,
  email,
  phone,
  subject,
  message,
}: ContactFormEmailProps) {
  const preheader = `New contact form submission from ${parentName}`
  
  const content = `
    <h2 style="color: #1e3a5f; font-size: 24px; margin-bottom: 16px;">New Contact Form Submission</h2>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      You have received a new contact form submission with the following details:
    </p>
    
    <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 8px 0;"><strong>Parent Name:</strong> ${parentName}</p>
      <p style="margin: 8px 0;"><strong>Student Name:</strong> ${studentName}</p>
      <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
      ${phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
      <p style="margin: 8px 0;"><strong>Subject:</strong> ${subject}</p>
    </div>
    
    <div style="background-color: #f8fafc; padding: 24px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${message}</p>
    </div>
    
    <div style="text-align: center; margin-top: 32px;">
      <a href="mailto:${email}" style="background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Reply to ${parentName}
      </a>
    </div>
  `
  
  return <BaseEmailTemplate preheader={preheader} content={content} />
}

// Thank You Email Template Props
interface ThankYouEmailProps {
  parentName: string
  studentName: string
}

export function ThankYouEmail({ parentName, studentName }: ThankYouEmailProps) {
  const preheader = `Thank you for contacting Aulawell`
  
  const content = `
    <h2 style="color: #1e3a5f; font-size: 24px; margin-bottom: 16px;">Thank You for Contacting Aulawell</h2>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Dear ${parentName},
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Thank you for reaching out about tutoring support for ${studentName}. I'm excited to learn more about their educational journey and how I can help them achieve their academic goals.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      I typically respond to all inquiries within 24 hours. In the meantime, here's what you can expect:
    </p>
    
    <ul style="color: #334155; font-size: 16px; line-height: 24px;">
      <li>A personalized response addressing ${studentName}'s specific needs</li>
      <li>Information about my trial session package</li>
      <li>Scheduling options that work for your timezone</li>
      <li>Answers to any questions you've raised</li>
    </ul>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      If you have any urgent questions, please don't hesitate to WhatsApp me at +34 123 456 789.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Looking forward to speaking with you soon!
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Best regards,<br />
      Amy<br />
      Founder & Lead Tutor, Aulawell
    </p>
    
    <div style="text-align: center; margin-top: 32px;">
      <a href="https://aulawell.com/services" style="background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Explore Our Services
      </a>
    </div>
  `
  
  return <BaseEmailTemplate preheader={preheader} content={content} />
}