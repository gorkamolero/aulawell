import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Verify reCAPTCHA if configured
    if (process.env.RECAPTCHA_SECRET_KEY && data.captcha) {
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.captcha}`,
      });
      
      const recaptchaData = await recaptchaResponse.json();
      
      if (!recaptchaData.success) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }
    }
    
    // Format the email content
    const emailContent = `
New Contact Form Submission from Aulawell Website

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}

Services Requested:
${data.services.tuition ? '- 1-2-1 Tuition\n' : ''}${data.services.groupTuition ? '- Group Tuition\n' : ''}${data.services.courses ? '- Courses\n' : ''}${data.services.examMarking ? '- Exam Marking\n' : ''}${data.services.interviewPractice ? '- Interview Practice\n' : ''}

Message:
${data.message}
    `.trim();
    
    // Here you would integrate with your preferred email service
    // For now, we'll just log and return success
    console.log('Contact form submission:', emailContent);
    
    // If using Sanity CMS, you could save the form submission here
    // Example:
    // await sanityClient.create({
    //   _type: 'contactFormSubmission',
    //   ...data,
    //   submittedAt: new Date().toISOString(),
    // });
    
    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}