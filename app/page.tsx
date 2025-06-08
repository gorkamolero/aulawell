import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ArrowRight } from "lucide-react"
import { defineQuery } from "next-sanity"
import { draftMode } from "next/headers"
import { client } from "@/src/sanity/client"
import { Testimonial } from "@/sanity/lib/types"
import ServiceCard from "./components/ServiceCard"
import { FadeIn } from "./components/ui/fade-in"
import { ShimmerButton } from "./components/ui/shimmer-button"
import { GridBackground } from "./components/ui/grid-background"
import { AnimatedTestimonialCard } from "./components/ui/animated-testimonial-card"
import { AnimatedCounter } from "./components/ui/animated-counter"
import { ParallaxSection } from "./components/ui/parallax-section"
import { OptimizedParallax } from "./components/ui/optimized-parallax"
import { StatsSection } from "./components/ui/stats-section"
import { ScrollIndicator } from "./components/ui/scroll-indicator"

const query = defineQuery(`*[_type == "testimonial" && featured == true][0...3]{
  _id,
  name,
  role,
  content,
  rating
}`)

export default async function Home() {
  const { isEnabled } = await draftMode()

  const testimonials = await client.fetch<Testimonial[]>(
    query,
    {},
    isEnabled
      ? {
          perspective: "previewDrafts",
          useCdn: false,
          stega: true,
        }
      : undefined
  )
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-navy text-white min-h-[85vh] flex items-center overflow-hidden">
        <GridBackground />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wider uppercase mb-6">
                  <span className="w-12 h-px bg-gold"></span>
                  Current Examiner Advantage
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                  Expert British & American Curriculum Tutoring
                </h1>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-xl mb-8 text-gray-200">
                  Helping students aged 11-18 excel in KS3, GCSE, IGCSE,
                  A-Level, and IB from Madrid and worldwide
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/contact">
                    <ShimmerButton variant="primary">
                      Book Your Free Consultation
                    </ShimmerButton>
                  </Link>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34XXXXXXXXX"}`}
                  >
                    <ShimmerButton variant="secondary">
                      WhatsApp Me
                    </ShimmerButton>
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
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
                    <span>
                      <AnimatedCounter end={100} suffix="%" /> of Students
                      Exceed Target Grades
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.2} className="relative">
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
                <OptimizedParallax
                  src="/images/Student Studying 1.jpeg"
                  alt="Expert tutoring for British and American curriculum"
                  priority
                  className="absolute inset-0"
                  speed={20}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/20 to-transparent pointer-events-none" />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
              </div>
            </FadeIn>
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* About Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/images/tutor-teaching.jpg"
                  alt="Professional tutor providing personalized education"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:pl-8">
              <h2 className="text-3xl font-bold mb-6 text-navy">
                Meet Your Expert Tutor
              </h2>
              <p className="text-lg mb-4">
                Hi, I'm Amy. As a UK-qualified teacher and current examiner for
                AQA and Cambridge, I bring insider knowledge that transforms
                good students into exceptional ones.
              </p>
              <p className="text-lg mb-8">
                With over a decade teaching in Britain's leading independent
                schools and internationally, I understand exactly what top
                universities and schools are looking for—and how to get your
                child there.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
              >
                Learn More About My Approach <ArrowRight size={20} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ParallaxSection offset={30}>
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 text-navy">
                Tailored Support for Every Student
              </h2>
            </FadeIn>
          </ParallaxSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <ServiceCard
                title="Academic Tutoring"
                subtitle="British & American Curricula"
                description={[
                  "KS3, GCSE, IGCSE",
                  "A-Level & IB",
                  "University preparation",
                ]}
                outcome="Average 2-grade improvement in 6 months"
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <ServiceCard
                title="English as a Foreign Language"
                subtitle="All Ages & Levels"
                description={[
                  "Conversational fluency",
                  "Cambridge exam preparation",
                  "Business English",
                ]}
                outcome="From beginners to advanced speakers"
              />
            </FadeIn>

            <FadeIn delay={0.3}>
              <ServiceCard
                title="Academic English"
                subtitle="Curriculum-Specific Language"
                description={[
                  "Essay writing mastery",
                  "Subject terminology",
                  "Exam technique",
                ]}
                outcome="Bridge the gap between fluency and academic excellence"
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.4} className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
            >
              View All Services <ArrowRight size={20} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials && testimonials.length > 0 ? (
            <>
              <FadeIn>
                <h2 className="text-3xl font-bold text-center mb-12 text-navy">
                  What Parents & Students Say
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {testimonials.map((testimonial, index) => (
                  <FadeIn key={testimonial._id} delay={index * 0.1}>
                    <AnimatedTestimonialCard
                      quote={testimonial.content}
                      author={testimonial.name}
                      context={testimonial.role}
                      rating={testimonial.rating || 5}
                    />
                  </FadeIn>
                ))}
              </div>
            </>
          ) : (
            <FadeIn className="max-w-4xl mx-auto">
              <AnimatedTestimonialCard
                quote="Amy transformed my daughter's approach to A-Level English Literature. As expat parents new to the British system, we were overwhelmed. Amy not only improved Sofia's grades from C to A*, but her examiner insight meant Sofia knew exactly what Cambridge wanted. Her understanding of both international perspectives and UK requirements is invaluable."
                author="Maria & Carlos"
                context="Parents of Sofia (now studying Medicine at UCL)"
                rating={5}
              />
            </FadeIn>
          )}

          <FadeIn delay={0.2} className="text-center mt-8">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
            >
              Read More Success Stories <ArrowRight size={20} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Unlock Your Child's Potential?
          </h2>
          <p className="text-xl mb-8">
            Limited spaces available for the new academic year. Let's discuss
            your child's specific needs and create a personalized learning plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "34XXXXXXXXX"}`}
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
  )
}
