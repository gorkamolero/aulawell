import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/sanity/lib/portableText'
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/sanity/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/app/components/ui/fade-in'
import { GridBackground } from '@/app/components/ui/grid-background'

export async function generateStaticParams() {
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery)
  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({
      slug: post.slug.current,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, {
    slug,
  })

  if (!post) {
    return {
      title: 'Post Not Found | Aulawell',
    }
  }

  return {
    title: `${post.title} | Aulawell Blog`,
    description: post.excerpt || `Read ${post.title} on the Aulawell blog.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read ${post.title} on the Aulawell blog.`,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch<BlogPost | null>(blogPostBySlugQuery, {
    slug,
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white">
      <GridBackground />

      {/* Hero Section with Featured Image */}
      {post.mainImage && (
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(1920).height(500).url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container mx-auto">
              <FadeIn>
                {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="text-sm font-semibold text-navy bg-gold px-3 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-white/90">
                  <time>
                    {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              {/* No hero image fallback */}
              {!post.mainImage && (
                <div className="mb-8">
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="text-sm font-semibold text-gold bg-gold/10 px-3 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1 className="text-3xl md:text-5xl font-bold text-navy mb-4">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <time>
                      {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 font-serif italic">
                  {post.excerpt}
                </p>
              )}

              {/* Main Content */}
              {post.body && (
                <div className="prose prose-lg max-w-none">
                  <PortableTextRenderer content={post.body} />
                </div>
              )}

              {/* Author Bio (Amy) */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold text-navy mb-2">About Amy</h3>
                <p className="text-gray-600">
                  Amy is a UK-qualified teacher and current examiner for AQA and Cambridge, 
                  bringing insider knowledge that transforms good students into exceptional ones. 
                  Based in Madrid, she specializes in helping international students excel in 
                  British and American curricula.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Get personalized support from a current examiner who knows exactly what it takes to achieve top grades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-lg hover:bg-gold/90 transition-colors"
              >
                Book Your Free Consultation
              </Link>
              <Link
                href="/blog"
                className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-navy transition-colors"
              >
                Read More Articles
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  )
}