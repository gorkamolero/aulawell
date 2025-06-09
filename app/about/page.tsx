import { CheckCircle, GraduationCap, Award, BookOpen } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FadeIn } from '../components/ui/fade-in';
import { ParallaxSection } from '../components/ui/parallax-section';
import FAQSection from '../components/FAQSection';
import { client } from '@/sanity/lib/client';
import { faqsQuery } from '@/sanity/lib/queries';
import { FAQ } from '@/sanity/lib/types';

export const metadata: Metadata = {
  title: 'About Amy - Current Examiner & Expert Tutor | Aulawell',
  description: 'Learn about Amy, a current AQA & Cambridge examiner with 10+ years teaching in UK leading independent schools. Discover the examiner advantage for your child.',
};

export default async function AboutPage() {
  // Fetch FAQs from Sanity
  let faqs: FAQ[] = []
  try {
    faqs = await client.fetch<FAQ[]>(faqsQuery)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    faqs = []
  }
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold text-navy mb-6 text-center">
              Your Examiner-Insight Advantage for International Success
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Opening Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-navy mb-6">
              From Britain's Top Schools to Your Child's Success
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-4 text-lg">
            <p>
              I'm Amelia Fernández-Kong, and I bring something unique to international education: current examiner 
              experience combined with over a decade teaching in Britain's leading independent schools.
            </p>
            <p>
              As an active examiner for AQA GCSE English and Cambridge IGCSE/AS & A-Level, I don't 
              just prepare students for exams—I know exactly what examiners are looking for and how 
              to deliver it.
            </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* My Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-navy mb-6">
              From Russell Group to Global Classroom
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.1} className="mb-8">
            <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/uk-university.jpg"
                alt="Prestigious UK university campus"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="space-y-4 text-lg">
            <p>
              My journey began at one of the UK's top Russell Group universities, followed by earning 
              my QTS (Qualified Teacher Status) and CELTA certification. But it was my years in 
              Britain's most prestigious independent schools that truly shaped my teaching philosophy.
            </p>
            <p>
              Working with high-achieving students from diverse international backgrounds, I discovered 
              my passion: helping international families navigate the British education system with the 
              same advantages as those born into it.
            </p>
            <p>
              Now, as both a teacher and examiner, I offer something invaluable—insider knowledge that 
              turns good answers into top-band responses.
            </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Aulawell */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-navy mb-6">
              Because Examiner Insight Makes the Difference
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-4 text-lg">
            <p>
              "Aula" means classroom in Spanish, and "well" represents excellence in education. 
              Aulawell was born from a simple observation: even the best students struggle without 
              understanding what examiners actually want.
            </p>
            <p>
              Your child might write beautifully or solve problems correctly, but are they hitting 
              the specific assessment objectives? Do they understand the mark scheme nuances that 
              separate 7s from 9s? That's where my dual perspective as teacher and examiner becomes 
              your child's secret weapon.
            </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ParallaxSection offset={30}>
            <FadeIn>
              <h2 className="text-3xl font-bold text-navy mb-12 text-center">
                Three Pillars of Excellence
              </h2>
            </FadeIn>
          </ParallaxSection>
          
          <FadeIn className="mb-12">
            <div className="relative h-[400px] w-full max-w-4xl mx-auto rounded-xl overflow-hidden">
              <Image
                src="/images/tutor-teaching.jpg"
                alt="Professional tutoring approach"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors duration-300">
                  <BookOpen className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Examiner Intelligence</h3>
                <p>
                  I decode mark schemes, assessment objectives, and the subtle differences between 
                  good and exceptional answers. Your child learns to think like an examiner.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors duration-300">
                  <GraduationCap className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Elite School Standards</h3>
                <p>
                  Having taught in Britain's top independent schools, I bring those same high 
                  expectations and proven methodologies to every student.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="text-center group">
                <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold transition-colors duration-300">
                  <Award className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Personalised Pathways</h3>
                <p>
                  From beginners finding their voice to sixth-formers crafting university applications, 
                  I design programmes that challenge while building confidence.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-8">Credentials & Experience</h2>
          
          <FadeIn className="mb-8">
            <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/academic-excellence.jpg"
                alt="Academic excellence and achievements"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Qualified Teacher Status (QTS) - UK Department for Education",
              "CELTA Certified - Cambridge English Language Assessment",
              "Russell Group Graduate - Top UK University",
              "Current Examiner - AQA GCSE English",
              "Current Examiner - Cambridge IGCSE/AS & A-Level",
              "10+ years in leading UK independent schools",
              "Proven Results - Students consistently achieve 7-9 at GCSE, A/A* at A-Level",
              "University Success - Students accepted to Oxford, Cambridge, LSE, Imperial, and Ivy League",
              "Enhanced DBS Checked - Full clearance for child safety"
            ].map((credential, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-gold w-5 h-5 flex-shrink-0 mt-1" />
                  <p>{credential}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Examiner Advantage */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-6">The Examiner Advantage</h2>
          <p className="text-lg mb-6">
            As an active examiner, I see firsthand where students lose marks unnecessarily. 
            This insider knowledge means I can:
          </p>
          <ul className="space-y-3">
            {[
              "Teach the exact techniques that earn top marks",
              "Explain why certain answers score higher than others",
              "Prepare students for the specific style each exam board rewards",
              "Provide feedback using actual examiner criteria",
              "Predict and prepare for likely exam questions"
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="text-gold w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Beyond the Classroom */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-6">Beyond the Classroom</h2>
          <div className="space-y-4 text-lg">
            <p>
              My passion for education extends beyond tutoring. I regularly attend examiner training 
              sessions, staying current with the latest assessment trends. This commitment to 
              professional development ensures your child always receives cutting-edge preparation.
            </p>
            <p>
              Living in Madrid has enriched my understanding of international families' needs, 
              combining British educational excellence with the cultural awareness essential for 
              global success.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />
    </>
  );
}