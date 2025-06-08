import { Skeleton } from './ui/skeleton'

export default function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <Skeleton className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <Skeleton className="h-4 w-24 mt-4" />
      </div>
    </div>
  )
}