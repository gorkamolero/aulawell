import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: string
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad Request', { status: 400 })
    }

    // Revalidate based on document type
    switch (body._type) {
      case 'testimonial':
        revalidateTag('testimonials')
        break
      case 'service':
        revalidateTag('services')
        if (body.slug) {
          revalidateTag(`service:${body.slug}`)
        }
        break
      case 'successStory':
        revalidateTag('success-stories')
        if (body.slug) {
          revalidateTag(`success-story:${body.slug}`)
        }
        break
      case 'teamMember':
        revalidateTag('team')
        break
      case 'faq':
        revalidateTag('faqs')
        break
      case 'post':
        revalidateTag('posts')
        if (body.slug) {
          revalidateTag(`post:${body.slug}`)
        }
        break
      default:
        // Revalidate all if unknown type
        revalidateTag('all')
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    })
  } catch (err: unknown) {
    console.error(err)
    return new Response(err instanceof Error ? err.message : 'Internal Server Error', { status: 500 })
  }
}