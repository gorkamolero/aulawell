import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/sanity/lib/portableText'
import { blogPostBySlugQuery, blogPostsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/sanity/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/app/components/ui/fade-in'

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
      {/* Hero Section with Featured Image */}
      {post.mainImage && (
        <section className="relative w-full">
          <div className="relative aspect-[21/9] max-h-[480px] overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1920).height(600).url()}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-6xl mx-auto px-4">
              {post.categories && post.categories.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {post.categories.map((category) => (
                      <span
                        key={category}
                        className="text-sm font-semibold text-navy bg-gold px-3 py-1 rounded shadow-md"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-white/95 text-lg">
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
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
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
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-navy mb-6 leading-tight">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600 text-lg">
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
                <p className="text-xl md:text-2xl text-gray-700 mb-12 font-serif italic leading-relaxed border-l-4 border-gold pl-6">
                  {post.excerpt}
                </p>
              )}

              {/* Main Content */}
              {post.body && (
                <div className="prose prose-lg md:prose-xl max-w-none 
                  prose-headings:font-serif prose-headings:text-navy
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-strong:text-navy prose-strong:font-semibold
                  prose-em:text-gray-800
                  prose-blockquote:border-l-4 prose-blockquote:border-gold prose-blockquote:pl-6 prose-blockquote:italic
                  prose-ul:my-6 prose-li:my-2
                  prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
                  <PortableTextRenderer content={post.body} />
                </div>
              )}

              {/* Author Bio (Amy) */}
              <div className="mt-16 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <h3 className="text-xl font-serif font-bold text-navy mb-4">About the Author</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  <strong className="text-navy">Amy Fernandez Kong</strong> is a UK-qualified teacher and current examiner for AQA and Cambridge, 
                  bringing insider knowledge that transforms good students into exceptional ones. 
                  Based in Madrid, she specializes in helping international students excel in 
                  British and American curricula.
                </p>
              </div>
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