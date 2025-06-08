import { Skeleton } from './ui/skeleton'

interface LoadingStateProps {
  type?: 'page' | 'section' | 'card'
  message?: string
}

export default function LoadingState({ type = 'section', message = 'Loading...' }: LoadingStateProps) {
  if (type === 'page') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    )
  }

  if (type === 'card') {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    )
  }

  // Default section loading
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Skeleton className="h-8 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <Skeleton className="h-40 mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}