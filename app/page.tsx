import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import TestimonialCard from './components/TestimonialCard';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Expert British & American Curriculum Tutoring for International Students
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                Helping students aged 11-18 excel in KS3, GCSE, IGCSE, A-Level, and IB from Madrid and worldwide
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-block bg-gold text-navy px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200 text-center"
                >
                  Book Your Free Consultation
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-navy transition-colors duration-200 text-center"
                >
                  WhatsApp Me
                </a>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                  <span>Current AQA & Cambridge Examiner</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                  <span>UK Leading Independent School Teacher</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-gold w-5 h-5 flex-shrink-0" />
                  <span>100% of Students Exceed Target Grades</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gray-300 rounded-lg">
                {/* Placeholder for Amy's photo */}
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Professional photo placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-navy">Meet Your Expert Tutor</h2>
            <p className="text-lg mb-4">
              Hi, I'm Amy. As a UK-qualified teacher and current examiner for AQA and Cambridge, 
              I bring insider knowledge that transforms good students into exceptional ones.
            </p>
            <p className="text-lg mb-8">
              With over a decade teaching in Britain's leading independent schools and internationally, 
              I understand exactly what top universities and schools are looking for—and how to get your child there.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
            >
              Learn More About My Approach <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">
            Tailored Support for Every Student
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Academic Tutoring"
              subtitle="British & American Curricula"
              description={[
                "KS3, GCSE, IGCSE",
                "A-Level & IB",
                "University preparation"
              ]}
              outcome="Average 2-grade improvement in 6 months"
            />
            
            <ServiceCard
              title="English as a Foreign Language"
              subtitle="All Ages & Levels"
              description={[
                "Conversational fluency",
                "Cambridge exam preparation",
                "Business English"
              ]}
              outcome="From beginners to advanced speakers"
            />
            
            <ServiceCard
              title="Academic English"
              subtitle="Curriculum-Specific Language"
              description={[
                "Essay writing mastery",
                "Subject terminology",
                "Exam technique"
              ]}
              outcome="Bridge the gap between fluency and academic excellence"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <TestimonialCard
              quote="Amy transformed my daughter's approach to A-Level English Literature. As expat parents new to the British system, we were overwhelmed. Amy not only improved Sofia's grades from C to A*, but her examiner insight meant Sofia knew exactly what Cambridge wanted. Her understanding of both international perspectives and UK requirements is invaluable."
              author="Maria & Carlos"
              context="Parents of Sofia (now studying Medicine at UCL)"
              rating={5}
            />
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
            >
              Read More Success Stories <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Unlock Your Child's Potential?</h2>
          <p className="text-xl mb-8">
            Limited spaces available for the new academic year. Let's discuss your child's specific needs and create a personalized learning plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '34XXXXXXXXX'}`}
              className="inline-block bg-gold text-navy px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200"
            >
              WhatsApp Me Now
            </a>
            <p className="flex items-center justify-center text-gray-300">
              Or email hello@aulawell.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
}