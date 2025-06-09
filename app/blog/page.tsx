import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { BlogPost } from '@/sanity/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/app/components/ui/fade-in'

export const metadata = {
  title: 'Blog | Aulawell - Expert Insights on British & American Education',
  description: 'Educational insights, exam tips, and guidance for international students navigating British and American curricula.',
}

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(blogPostsQuery)

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-gray-50 py-16 border-b">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-navy mb-4">
              Blog
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              Expert guidance from a current examiner on navigating British and American education systems, 
              exam preparation, and academic success strategies.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No blog posts available yet. Check back soon!</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <FadeIn key={post._id} delay={index * 0.1}>
                  <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {post.mainImage && (
                      <Link href={`/blog/${post.slug?.current || 'undefined'}`}>
                        <div className="relative h-48 w-full">
                          <Image
                            src={urlFor(post.mainImage).width(600).height(400).url()}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6">
                      {post.categories && post.categories.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {post.categories.map((category) => (
                            <span
                              key={category}
                              className="text-xs font-semibold text-gold bg-gold/10 px-2 py-1 rounded"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <Link href={`/blog/${post.slug?.current || 'undefined'}`}>
                        <h2 className="text-xl font-bold text-navy mb-3 hover:text-gold transition-colors">
                          {post.title}
                        </h2>
                      </Link>
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-500">
                          {new Date(post.publishedAt || post._createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <Link
                          href={`/blog/${post.slug?.current || 'undefined'}`}
                          className="text-gold font-semibold hover:text-gold/80 transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">
              Need Personalized Academic Support?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              As a current examiner, I provide insights that transform good students into exceptional ones.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-lg hover:bg-gold/90 transition-colors"
            >
              Book Your Free Consultation
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}