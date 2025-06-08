import TestimonialCard from '../components/TestimonialCard';
import { TrendingUp, Award, Users, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { successStoriesQuery } from '@/sanity/lib/queries';
import { SuccessStory } from '@/sanity/lib/types';
import { urlFor } from '@/sanity/lib/image';
import { FadeIn } from '../components/ui/fade-in';

export const metadata: Metadata = {
  title: 'Success Stories & Results | Aulawell Tutoring',
  description: 'Real results from real families. Read how students improved from C to A*, achieved Oxbridge offers, and exceeded their academic goals with Aulawell tutoring.',
};

export default async function SuccessStoriesPage() {
  const stories = await client.fetch<SuccessStory[]>(successStoriesQuery);
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl font-bold text-navy mb-6">Real Results from Real Families</h1>
            <p className="text-xl text-gray-700">
              Every grade improvement represents a child's increased confidence and a family's relief. 
              Here are some of the journeys I've been privileged to be part of.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Dynamic Success Stories from CMS */}
      {stories && stories.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <FadeIn key={story._id} delay={index * 0.1}>
                  <Link href={`/success-stories/${story.slug}`}>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                      {story.image && (
                        <div className="relative h-48 w-full">
                          <Image
                            src={urlFor(story.image).width(400).height(300).url()}
                            alt={story.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-navy mb-2 hover:text-gold transition-colors">
                          {story.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {story.studentName} • {story.grade}
                        </p>
                        {story.summary && (
                          <p className="text-gray-700 mb-4 line-clamp-3">{story.summary}</p>
                        )}
                        {story.beforeAfterScores && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">{story.beforeAfterScores.before}</span>
                            <TrendingUp className="text-gold w-4 h-4" />
                            <span className="font-bold text-gold">{story.beforeAfterScores.after}</span>
                          </div>
                        )}
                        <p className="text-gold font-semibold mt-4 hover:text-navy transition-colors">
                          Read Full Story →
                        </p>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story 1: Sofia */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              From Struggling to Soaring: Sofia's A-Level English Transformation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="font-semibold text-gray-600">Background</p>
                <p>Sofia moved from Argentina to Madrid in Year 12, facing A-Level English Literature 
                with no understanding of British literary analysis.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Challenge</p>
                <p>C grades were jeopardizing her dream of studying Medicine at a UK university.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Approach</p>
                <p>Using my examiner insight, we decoded exactly what Cambridge wanted. We worked on 
                essay structure, critical terminology, and the specific analytical style that scores A*.</p>
              </div>
            </div>
            
            <div className="bg-navy text-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">C → A*</p>
                  <p>English Literature</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">✓</p>
                  <p>Personal Statement Crafted to Perfection</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">UCL</p>
                  <p>Accepted to study Medicine</p>
                </div>
              </div>
            </div>
            
            <TestimonialCard
              quote="Amy didn't just tutor Sofia; she showed her exactly what examiners look for. As an examiner herself, Amy knew the 'secret formula' that made all the difference."
              author="Maria, Sofia's mother"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Story 2: James */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Building Foundations: James's GCSE Journey
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="font-semibold text-gray-600">Background</p>
                <p>American student at ASM struggling with the transition to IGCSE requirements.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Challenge</p>
                <p>Failing mock exams in Mathematics and Sciences, parents considering changing schools.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Approach</p>
                <p>Started 18 months before exams, focusing on fundamental understanding rather than 
                rote learning. Weekly sessions with monthly parent updates.</p>
              </div>
            </div>
            
            <div className="bg-navy text-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">4 → 8</p>
                  <p>Mathematics</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">3 → 7</p>
                  <p>Physics</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">4 → 8</p>
                  <p>Chemistry</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">✓</p>
                  <p>Stayed at ASM and thrived</p>
                </div>
              </div>
            </div>
            
            <TestimonialCard
              quote="Amelia understood that James learned differently from his British peers. She adapted her teaching style and gave him confidence. The transformation was remarkable."
              author="Jennifer, James's mother"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Story 3: Yuki */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Academic English Excellence: Yuki's Writing Revolution
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="font-semibold text-gray-600">Background</p>
                <p>Japanese student with excellent spoken English but struggling with IB English Literature.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Challenge</p>
                <p>Despite fluency, her essays lacked the analytical depth and structure required for 
                high IB scores.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Approach</p>
                <p>Intensive focus on academic writing conventions, literary analysis frameworks, and 
                Western argumentation styles.</p>
              </div>
            </div>
            
            <div className="bg-navy text-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">4 → 6</p>
                  <p>IB English (Predicted to Final)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">Grade A</p>
                  <p>Extended Essay in English</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">✓</p>
                  <p>Improved across all essay subjects</p>
                </div>
              </div>
            </div>
            
            <TestimonialCard
              quote="My daughter spoke perfect English but couldn't write academically. Amelia taught her the 'secret code' of Western academic writing. It changed everything."
              author="Keiko, Yuki's mother"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* Story 4: Harrison Family */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Curriculum Transition Success: The Harrison Family's Move
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="font-semibold text-gray-600">Background</p>
                <p>British family relocating from London to Madrid, twins in Year 10.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Challenge</p>
                <p>Transition from UK state school to Madrid's British Council School mid-GCSE.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Approach</p>
                <p>Summer intensive program covering gaps, plus ongoing support for adaptation.</p>
              </div>
            </div>
            
            <div className="bg-navy text-white rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">A/A*</p>
                  <p>Both twins maintained grades</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">✓</p>
                  <p>Seamless transition</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gold">100%</p>
                  <p>Parent satisfaction</p>
                </div>
              </div>
            </div>
            
            <TestimonialCard
              quote="Moving countries during GCSEs could have been a disaster. Amelia made it smooth, supporting both our children and explaining every difference between the systems."
              author="Sarah Harrison"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Aulawell's Track Record</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-navy w-10 h-10" />
              </div>
              <p className="text-3xl font-bold mb-1">95%</p>
              <p className="text-sm">of students improve by at least one grade</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-navy w-10 h-10" />
              </div>
              <p className="text-3xl font-bold mb-1">80%</p>
              <p className="text-sm">achieve their target grades or higher</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-navy w-10 h-10" />
              </div>
              <p className="text-3xl font-bold mb-1">100%</p>
              <p className="text-sm">of families report increased confidence</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-navy w-10 h-10" />
              </div>
              <p className="text-3xl font-bold mb-1">500+</p>
              <p className="text-sm">successful students since 2014</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <p className="text-navy text-2xl font-bold">20+</p>
              </div>
              <p className="text-3xl font-bold mb-1">20+</p>
              <p className="text-sm">nationalities supported</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <p className="text-navy text-2xl font-bold">4.9</p>
              </div>
              <p className="text-3xl font-bold mb-1">4.9/5</p>
              <p className="text-sm">average parent satisfaction rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* More Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy mb-12 text-center">What Parents Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Amy's examiner knowledge is invaluable. She doesn't just teach English; she teaches exactly what the examiners want to see."
              author="Robert Chen"
              context="Parent of A-Level student"
              rating={5}
            />
            
            <TestimonialCard
              quote="The personalized approach made all the difference. Amy understood our son's learning style and adapted perfectly."
              author="Emma Thompson"
              context="Parent of GCSE student"
              rating={5}
            />
            
            <TestimonialCard
              quote="From failing mocks to achieving 8s and 9s. Amy's systematic approach transformed our daughter's confidence and results."
              author="Ahmed Al-Rashid"
              context="Parent of IGCSE student"
              rating={5}
            />
            
            <TestimonialCard
              quote="The exam marking service was eye-opening. Seeing exactly where marks were lost helped my son improve dramatically."
              author="Isabella Martinez"
              context="Parent of IB student"
              rating={5}
            />
            
            <TestimonialCard
              quote="Amy prepared both our children for UK independent school interviews. They were confident and successful!"
              author="Michael & Sophie Laurent"
              context="Parents relocating to UK"
              rating={5}
            />
            
            <TestimonialCard
              quote="The academic English program bridged the gap perfectly. Our daughter went from struggling to excelling in essay writing."
              author="Yuki Tanaka"
              context="Parent of international student"
              rating={5}
            />
          </div>
        </div>
      </section>
    </>
  );
}