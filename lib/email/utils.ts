import { client } from '@/sanity/lib/client'
import { emailTemplateQuery } from '@/sanity/lib/queries'
import { EmailTemplate } from '@/sanity/lib/types'
import { toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'

interface EmailVariables {
  [key: string]: string | undefined
}

export async function getEmailTemplate(slug: string): Promise<EmailTemplate | null> {
  try {
    const template = await client.fetch<EmailTemplate>(emailTemplateQuery, { slug })
    return template
  } catch (error) {
    console.error('Error fetching email template:', error)
    return null
  }
}

export function replaceVariables(text: string, variables: EmailVariables): string {
  let processedText = text
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    processedText = processedText.replace(regex, value || '')
  })
  
  return processedText
}

export function convertBodyToHtml(body: PortableTextBlock[], variables: EmailVariables): string {
  const html = toHTML(body, {
    components: {
      block: {
        normal: ({ children }) => `<p style="color: #334155; font-size: 16px; line-height: 24px; margin: 16px 0;">${children}</p>`,
        h1: ({ children }) => `<h1 style="color: #1e3a5f; font-size: 32px; margin: 24px 0;">${children}</h1>`,
        h2: ({ children }) => `<h2 style="color: #1e3a5f; font-size: 24px; margin: 20px 0;">${children}</h2>`,
        h3: ({ children }) => `<h3 style="color: #1e3a5f; font-size: 20px; margin: 16px 0;">${children}</h3>`,
        blockquote: ({ children }) => `<blockquote style="border-left: 4px solid #d4af37; padding-left: 16px; margin: 16px 0; color: #64748b; font-style: italic;">${children}</blockquote>`,
      },
      marks: {
        strong: ({ children }) => `<strong style="font-weight: 600;">${children}</strong>`,
        em: ({ children }) => `<em style="font-style: italic;">${children}</em>`,
        underline: ({ children }) => `<span style="text-decoration: underline;">${children}</span>`,
        link: ({ value, children }) => {
          const href = value?.href || '#'
          return `<a href="${href}" style="color: #d4af37; text-decoration: underline;">${children}</a>`
        },
      },
      list: {
        bullet: ({ children }) => `<ul style="margin: 16px 0; padding-left: 24px;">${children}</ul>`,
        number: ({ children }) => `<ol style="margin: 16px 0; padding-left: 24px;">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }) => `<li style="margin: 8px 0;">${children}</li>`,
        number: ({ children }) => `<li style="margin: 8px 0;">${children}</li>`,
      },
    },
  })
  
  return replaceVariables(html, variables)
}

export interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
  replyTo?: string
}

export async function prepareEmailFromTemplate(
  templateSlug: string,
  variables: EmailVariables,
  recipientEmail: string
): Promise<EmailData | null> {
  const template = await getEmailTemplate(templateSlug)
  
  if (!template) {
    console.error(`Email template not found: ${templateSlug}`)
    return null
  }
  
  const subject = replaceVariables(template.subject, variables)
  const html = convertBodyToHtml(template.body, variables)
  
  return {
    to: recipientEmail,
    subject,
    html,
    from: 'Amy at Aulawell <amy@aulawell.com>',
    replyTo: 'amy@aulawell.com',
  }
}