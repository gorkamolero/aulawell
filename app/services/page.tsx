import { Users, CheckSquare, MessageSquare, Globe, School, FileText } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FadeIn } from '../components/ui/fade-in';

export const metadata: Metadata = {
  title: 'Tutoring Services - GCSE, A-Level, IB & More | Aulawell',
  description: 'Expert tutoring services including GCSE, A-Level, IB, English as a Foreign Language, exam marking, and interview preparation. Online and in-person in Madrid.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-4xl font-bold text-navy mb-6 text-center">
              Comprehensive Support for International Academic Success
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-xl text-gray-700 text-center mb-8">
              Every international student's journey is unique. That's why Aulawell offers flexible, 
              personalized tutoring that adapts to your child's specific curriculum, learning style, and goals.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/online-tutoring.jpg"
                alt="Online tutoring session"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Academic Tutoring */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-4">Academic Tutoring</h2>
          <p className="text-xl text-gray-700 mb-12">
            Master British & American Curricula with Confidence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-navy mb-3">Key Stage 3 (Ages 11-14)</h3>
              <p className="mb-4">
                Build strong foundations during these crucial transition years. I help students 
                develop essential skills while adapting to new educational systems.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Subjects:</strong> Mathematics, Science, English Language & Literature</p>
                <p><strong>Focus:</strong> Study skills, curriculum adaptation, confidence building</p>
                <p className="text-gold font-semibold">Outcome: Smooth transition and preparation for GCSE success</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-navy mb-3">GCSE & IGCSE (Ages 14-16)</h3>
              <p className="mb-4">
                Navigate the complexities of British examinations with an actual examiner as your guide.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Speciality:</strong> English Language & Literature (AQA, Cambridge, Edexcel)</p>
                <p><strong>Examiner Advantage:</strong> I mark these exams—I know exactly what earns top marks</p>
                <p className="text-gold font-semibold">Outcome: Consistent 7-9 grades (A/A*) for my students</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-navy mb-3">A-Level (Ages 16-18)</h3>
              <p className="mb-4">
                Achieve the grades needed for top university admission with examiner-level insight.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Speciality:</strong> English Literature, Language, and Language & Literature</p>
                <p><strong>Support Includes:</strong> Essay mastery, unseen text analysis, coursework guidance</p>
                <p className="text-gold font-semibold">Outcome: Students regularly achieve A/A* and Oxbridge offers</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-navy mb-3">International Baccalaureate (IB)</h3>
              <p className="mb-4">
                Master the unique demands of IB English with specialized support.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Coverage:</strong> English A Literature, English B, Extended Essay support</p>
                <p><strong>Levels:</strong> Both Standard and Higher Level</p>
                <p className="text-gold font-semibold">Outcome: Average improvement from 5 to 7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* English as a Foreign Language */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-4">English as a Foreign Language</h2>
          <p className="text-xl text-gray-700 mb-12">
            From First Words to Fluent Conversations
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <School className="text-navy w-8 h-8" />
                <h3 className="text-xl font-bold text-navy">Children & Teenagers</h3>
              </div>
              <p className="mb-4">
                Engaging, age-appropriate lessons that build confidence alongside competence.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Interactive games and activities</li>
                <li>School curriculum support</li>
                <li>Social English for making friends</li>
                <li>Cambridge Young Learners preparation</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-navy w-8 h-8" />
                <h3 className="text-xl font-bold text-navy">Adults</h3>
              </div>
              <p className="mb-4">
                Professional development and life skills through practical English.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Business English for professionals</li>
                <li>Everyday conversation skills</li>
                <li>Job interview preparation</li>
                <li>Cambridge FCE/CAE/CPE preparation</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className="font-semibold text-navy mb-3">All EFL programs include:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <p className="flex items-center gap-2">
                <CheckSquare className="text-gold w-5 h-5" />
                Customized learning plans
              </p>
              <p className="flex items-center gap-2">
                <CheckSquare className="text-gold w-5 h-5" />
                Regular progress assessments
              </p>
              <p className="flex items-center gap-2">
                <CheckSquare className="text-gold w-5 h-5" />
                Cultural context integration
              </p>
              <p className="flex items-center gap-2">
                <CheckSquare className="text-gold w-5 h-5" />
                Flexible scheduling for families
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic English */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-4">Academic English</h2>
          <p className="text-xl text-gray-700 mb-6">
            Bridge the Gap Between Conversational and Academic Excellence
          </p>
          <p className="text-lg mb-12">
            Many international students speak English well but struggle with academic requirements. 
            This specialized program addresses that exact challenge.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-navy mb-4">What We Cover:</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Essay Writing Mastery</p>
                  <p className="text-gray-700">Structure, argumentation, and style for British/American standards</p>
                </div>
                <div>
                  <p className="font-semibold">Subject-Specific Vocabulary</p>
                  <p className="text-gray-700">Master the precise language of your curriculum</p>
                </div>
                <div>
                  <p className="font-semibold">Critical Analysis Skills</p>
                  <p className="text-gray-700">Develop the analytical thinking examiners reward</p>
                </div>
                <div>
                  <p className="font-semibold">Exam Technique</p>
                  <p className="text-gray-700">Understand mark schemes and examiner expectations</p>
                </div>
                <div>
                  <p className="font-semibold">Research Skills</p>
                  <p className="text-gray-700">Properly cite sources and avoid plagiarism</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-navy mb-4">Perfect For:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>International students transitioning to English-medium education</li>
                <li>Students preparing for English Literature/Language examinations</li>
                <li>Anyone struggling with academic writing despite good spoken English</li>
                <li>University preparation and personal statement writing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">Additional Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exam Marking Service */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-navy w-8 h-8" />
                <h3 className="text-2xl font-bold text-navy">Exam Marking Service</h3>
              </div>
              <p className="text-lg font-semibold mb-4">Get Examiner-Level Feedback on Practice Papers</p>
              <p className="mb-6">
                As a current examiner, I provide the exact feedback your child needs to improve their grades.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">What's Included:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Detailed marking using official mark schemes</li>
                    <li>Examiner-style annotations and comments</li>
                    <li>Grade breakdown by assessment objective</li>
                    <li>Specific improvement strategies</li>
                    <li>Model answers for comparison</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-semibold mb-2">Available for:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>GCSE English Language & Literature (AQA, Edexcel, OCR)</li>
                    <li>IGCSE English (Cambridge, Edexcel)</li>
                    <li>A-Level English (all boards)</li>
                    <li>IB English assessments</li>
                    <li>Mock exams and past papers</li>
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <p><strong>Turnaround:</strong> 48-72 hours</p>
                  <p><strong>Investment:</strong> €35 per GCSE paper, €45 per A-Level/IB paper</p>
                </div>
              </div>
            </div>
            
            {/* Interview Practice */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-navy w-8 h-8" />
                <h3 className="text-2xl font-bold text-navy">Interview Practice</h3>
              </div>
              <p className="text-lg font-semibold mb-4">Confident Communication for School & University Success</p>
              <p className="mb-6">
                Prepare for crucial interviews with expert coaching from someone who knows what institutions are looking for.
              </p>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold mb-2">School Interviews (11+, 13+, 16+):</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>UK independent school interview techniques</li>
                    <li>Common questions and strong responses</li>
                    <li>Body language and presentation skills</li>
                    <li>Practice with feedback</li>
                    <li>Parent guidance on supporting preparation</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-semibold mb-2">University Interviews:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Oxbridge interview preparation</li>
                    <li>Personal statement discussion practice</li>
                    <li>Subject-specific interview techniques</li>
                    <li>Critical thinking exercises</li>
                    <li>Mock interviews with detailed feedback</li>
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <p><strong>Format:</strong> 1-hour intensive sessions with follow-up report</p>
                  <p><strong>Investment:</strong> €85 per session</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flexible Learning Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">
            Flexible Learning That Fits Your Life
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-navy w-8 h-8" />
                <h3 className="text-xl font-bold text-navy">Online Tutoring (Worldwide)</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Live, interactive sessions via Zoom</li>
                <li>Screen sharing for collaborative work</li>
                <li>Digital resources and homework</li>
                <li>Recorded sessions for review</li>
                <li>Flexible scheduling across time zones</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-navy w-8 h-8" />
                <h3 className="text-xl font-bold text-navy">In-Person Tutoring (Madrid)</h3>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Face-to-face sessions in your home</li>
                <li>Available in central Madrid and surrounding areas</li>
                <li>Premium service for enhanced engagement</li>
                <li>Small group options for neighbors</li>
                <li>Includes printed materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 text-center">Investment in Your Child's Future</h2>
          <p className="text-xl mb-12 text-center">Transparent Pricing, Exceptional Value</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Online Sessions</h3>
              <ul className="space-y-2">
                <li>KS3/GCSE: €50/hour</li>
                <li>A-Level/IB: €65/hour</li>
                <li>University Prep: €75/hour</li>
                <li>EFL: €45/hour</li>
                <li>Academic English: €55/hour</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">In-Person Sessions (Madrid)</h3>
              <p className="mb-2">Add €25 to online rates</p>
              <p className="mb-2">Travel included for central Madrid</p>
              <p>Small group discounts available</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Package Options</h3>
              <ul className="space-y-2">
                <li>Monthly Package (8 sessions): 10% discount</li>
                <li>Exam Prep Intensive (20 hours): 15% discount</li>
                <li>Family Package (2+ children): 20% discount</li>
                <li>Trial Package: 3 sessions at 50% off</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center mt-8 text-gray-300">
            *All prices include materials, progress reports, and parent communication
          </p>
        </div>
      </section>
    </>
  );
}