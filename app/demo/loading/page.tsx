import { Skeleton } from '@/app/components/ui/skeleton'
import TestimonialSkeleton from '@/app/components/TestimonialSkeleton'
import BlogPostSkeleton from '@/app/components/BlogPostSkeleton'
import ServiceCardSkeleton from '@/app/components/ServiceCardSkeleton'
import LoadingState from '@/app/components/LoadingState'

export default function LoadingDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Loading States Demo</h1>
        
        {/* Basic Skeleton */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Basic Skeleton</h2>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </section>

        {/* Testimonial Skeleton */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Testimonial Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialSkeleton />
            <TestimonialSkeleton />
            <TestimonialSkeleton />
          </div>
        </section>

        {/* Blog Post Skeleton */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Blog Post Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BlogPostSkeleton />
            <BlogPostSkeleton />
            <BlogPostSkeleton />
          </div>
        </section>

        {/* Service Card Skeleton */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Service Card Loading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
            <ServiceCardSkeleton />
          </div>
        </section>

        {/* Loading State Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Loading State - Page</h2>
          <div className="bg-white rounded-lg shadow p-8 h-96 relative">
            <LoadingState type="page" message="Loading your content..." />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Loading State - Section</h2>
          <LoadingState type="section" />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Loading State - Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LoadingState type="card" />
            <LoadingState type="card" />
            <LoadingState type="card" />
          </div>
        </section>
      </div>
    </div>
  )
}