import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/sanity/lib/portableText'
import { successStoryBySlugQuery, successStoriesQuery } from '@/sanity/lib/queries'
import { SuccessStory } from '@/sanity/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/app/components/ui/fade-in'
import { GridBackground } from '@/app/components/ui/grid-background'
import { TrendingUp, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  const stories = await client.fetch<SuccessStory[]>(successStoriesQuery)
  return stories.map((story) => ({
    slug: story.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await client.fetch<SuccessStory | null>(successStoryBySlugQuery, {
    slug,
  })

  if (!story) {
    return {
      title: 'Success Story Not Found | Aulawell',
    }
  }

  return {
    title: `${story.title} | Aulawell Success Stories`,
    description: story.summary || `Read about ${story.studentName}'s success story at Aulawell.`,
  }
}

export default async function SuccessStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await client.fetch<SuccessStory | null>(successStoryBySlugQuery, {
    slug,
  })

  if (!story) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      <GridBackground />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy/5 to-gold/5" />
        <div className="container relative z-10 mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-navy mb-6">
              {story.title}
            </h1>
            <div className="text-center mb-4">
              <span className="text-lg text-gray-600">{story.studentName}</span>
              {story.grade && (
                <>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-lg text-gray-600">{story.grade}</span>
                </>
              )}
            </div>
            {story.summary && (
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
                {story.summary}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Story Image (if available) */}
      {story.image && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="relative h-[400px] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(story.image).width(1200).height(400).url()}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Before/After Scores */}
      {story.beforeAfterScores && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-2xl mx-auto bg-gray-50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-navy mb-6 text-center">Results Achieved</h2>
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Before</p>
                    <p className="text-3xl font-bold text-gray-700">{story.beforeAfterScores.before}</p>
                  </div>
                  <TrendingUp className="text-gold w-8 h-8" />
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">After</p>
                    <p className="text-3xl font-bold text-gold">{story.beforeAfterScores.after}</p>
                  </div>
                </div>
                {story.beforeAfterScores.subject && (
                  <p className="text-center text-gray-600 mt-4">
                    {story.beforeAfterScores.subject}
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              {/* Challenges */}
              {story.challenges && story.challenges.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">The Challenge</h2>
                  <ul className="space-y-3">
                    {story.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-gold font-bold">•</span>
                        <span className="text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Story */}
              {story.story && (
                <div className="prose prose-lg max-w-none mb-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">The Journey</h2>
                  <PortableTextRenderer content={story.story} />
                </div>
              )}

              {/* Improvements */}
              {story.improvements && story.improvements.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">Key Improvements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {story.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <span className="text-gold font-bold">✓</span>
                        <span className="text-gray-700">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Your Success Story Starts Here
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every exceptional result begins with the right guidance. Let's write your success story together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-lg hover:bg-gold/90 transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                href="/success-stories"
                className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-navy transition-colors"
              >
                Read More Stories
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* More Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center text-navy mb-12">
              More Success Stories
            </h2>
            <div className="text-center">
              <Link
                href="/success-stories"
                className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
              >
                Discover How We Help Students Excel <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  )
}