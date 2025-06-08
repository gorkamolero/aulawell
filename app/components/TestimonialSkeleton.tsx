import { Skeleton } from './ui/skeleton'

export default function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-20 mb-4" />
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-48" />
    </div>
  )
}