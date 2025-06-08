import { BaseEmailTemplate } from './templates'

interface WelcomeEmailProps {
  parentName: string
  studentName: string
}

export function WelcomeEmail1({ parentName, studentName }: WelcomeEmailProps) {
  const preheader = 'The 3 hidden reasons your child isn\'t reaching their potential'
  
  const content = `
    <h2 style="color: #1e3a5f; font-size: 24px; margin-bottom: 16px;">
      The 3 Hidden Reasons Your Child Isn't Reaching Their Potential
    </h2>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Dear ${parentName},
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Thank you for reaching out about tutoring for ${studentName}. As a current examiner, I see brilliant students underperform every year - not because they lack ability, but because they're missing three crucial elements.
    </p>
    
    <h3 style="color: #d4af37; font-size: 18px; margin-top: 24px;">1. They Don't Know What Examiners Actually Want</h3>
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Most students write what they think is right. But examiners look for specific techniques that unlock top marks - techniques I teach from day one.
    </p>
    
    <h3 style="color: #d4af37; font-size: 18px; margin-top: 24px;">2. They're Studying Hard, Not Smart</h3>
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Hours of revision mean nothing if you're using outdated methods. My students learn the 80/20 approach that top achievers use.
    </p>
    
    <h3 style="color: #d4af37; font-size: 18px; margin-top: 24px;">3. They Lack Exam Strategy</h3>
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Knowing the content is only half the battle. Without proper exam technique, even prepared students lose marks unnecessarily.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px; margin-top: 24px;">
      <strong>The good news?</strong> These are all fixable with the right guidance. I've helped hundreds of students transform their grades by addressing these exact issues.
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://aulawell.com/contact" style="background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Book Your Free Consultation
      </a>
    </div>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Best regards,<br />
      Amy<br />
      Founder & Lead Tutor, Aulawell
    </p>
    
    <p style="color: #8898aa; font-size: 14px; line-height: 20px; margin-top: 24px;">
      P.S. Spaces for the upcoming term are filling quickly. Reply to this email or WhatsApp me to secure ${studentName}'s spot.
    </p>
  `
  
  return <BaseEmailTemplate preheader={preheader} content={content} />
}

export function WelcomeEmail2({ parentName, studentName }: WelcomeEmailProps) {
  const preheader = 'Why smart kids fail British exams'
  
  const content = `
    <h2 style="color: #1e3a5f; font-size: 24px; margin-bottom: 16px;">
      "My Child Is Smart, So Why Are They Getting 5s and 6s?"
    </h2>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Hi ${parentName},
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Yesterday I shared the 3 hidden reasons students underperform. Today, let me tell you about Sarah...
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px; background-color: #f8fafc; padding: 20px; border-left: 4px solid #d4af37;">
      <em>"She's always been bright,"</em> her mum told me. <em>"Top of her class in Year 9. But her GCSE mocks came back with 5s and 6s. We don't understand what happened."</em>
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Here's what happened: <strong>British exams don't test intelligence - they test exam technique.</strong>
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Sarah knew her subjects inside out. But she was answering questions the way she'd been taught in class - not the way examiners wanted.
    </p>
    
    <h3 style="color: #d4af37; font-size: 18px; margin-top: 24px;">The Result?</h3>
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      After just 8 weeks working together, Sarah's grades jumped to 8s and 9s. Same knowledge. Different approach.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      The difference? I showed her exactly what I look for when marking papers - the specific phrases, structures, and techniques that earn top marks.
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://aulawell.com/success-stories" style="background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Read More Success Stories
      </a>
    </div>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      If ${studentName} is capable but not getting the grades they deserve, let's talk.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Amy<br />
      Current AQA & Cambridge Examiner
    </p>
  `
  
  return <BaseEmailTemplate preheader={preheader} content={content} />
}

export function WelcomeEmail3({ parentName, studentName }: WelcomeEmailProps) {
  const preheader = 'From predicted 5 to achieved 8: Maria\'s story'
  
  const content = `
    <h2 style="color: #1e3a5f; font-size: 24px; margin-bottom: 16px;">
      "We Thought a Grade 5 Was the Best We Could Hope For..."
    </h2>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      ${parentName},
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      When Maria's parents contacted me, they were worried. Her predicted grades were 5s across the board, and her confidence was shattered.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      <strong>"She studies for hours but nothing seems to stick,"</strong> her dad explained. Sound familiar?
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Here's what we discovered: Maria was memorizing content instead of understanding exam requirements. She was working hard, but in all the wrong ways.
    </p>
    
    <h3 style="color: #d4af37; font-size: 18px; margin-top: 24px;">We Changed Three Things:</h3>
    
    <ul style="color: #334155; font-size: 16px; line-height: 24px;">
      <li><strong>Examiner Insights:</strong> I showed her exactly how marks are awarded</li>
      <li><strong>Smart Study Methods:</strong> Replaced hours of notes with targeted practice</li>
      <li><strong>Confidence Building:</strong> Small wins every session rebuilt her self-belief</li>
    </ul>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px; background-color: #f8fafc; padding: 20px; border-left: 4px solid #d4af37; margin: 24px 0;">
      <strong>Result:</strong> Maria achieved 7s and 8s in her final exams. Her parents couldn't believe the transformation.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      ${studentName} has the same potential. They just need the right guidance to unlock it.
    </p>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      <strong>Limited spaces available for January start.</strong> Reply to this email or book a free consultation to discuss how I can help ${studentName} achieve their best.
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="https://aulawell.com/contact" style="background-color: #d4af37; color: #1e3a5f; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
        Book Free Consultation
      </a>
    </div>
    
    <p style="color: #334155; font-size: 16px; line-height: 24px;">
      Looking forward to ${studentName}'s success story,<br />
      Amy
    </p>
  `
  
  return <BaseEmailTemplate preheader={preheader} content={content} />
}