import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableTextRenderer } from '@/sanity/lib/portableText'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { Service } from '@/sanity/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FadeIn } from '@/app/components/ui/fade-in'
import { GridBackground } from '@/app/components/ui/grid-background'
import { CheckCircle, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  const services = await client.fetch<Service[]>(servicesQuery)
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await client.fetch<Service | null>(serviceBySlugQuery, {
    slug,
  })

  if (!service) {
    return {
      title: 'Service Not Found | Aulawell',
    }
  }

  return {
    title: `${service.title} | Aulawell Services`,
    description: service.description || `Learn about our ${service.title} service at Aulawell.`,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await client.fetch<Service | null>(serviceBySlugQuery, {
    slug,
  })

  if (!service) {
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
              {service.title}
            </h1>
            {service.description && (
              <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
                {service.description}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Service Image (if available) */}
      {service.image && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="relative h-[400px] max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={urlFor(service.image).width(1200).height(400).url()}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
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
              {/* Features */}
              {service.features && service.features.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="text-gold w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              {service.fullDescription && (
                <div className="prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-navy mb-6">Detailed Information</h2>
                  <PortableTextRenderer content={service.fullDescription} />
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how our {service.title.toLowerCase()} service can help you achieve your academic goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-lg hover:bg-gold/90 transition-colors"
              >
                Book Your Free Consultation
              </Link>
              <Link
                href="/services"
                className="inline-block border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-navy transition-colors"
              >
                View All Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center text-navy mb-12">
              Explore Other Services
            </h2>
            <div className="text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-gold hover:text-navy font-semibold transition-colors"
              >
                View All Our Services <ArrowRight size={20} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </article>
  )
}