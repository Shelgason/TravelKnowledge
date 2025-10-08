export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>

        {/* Title skeleton */}
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Badges skeleton */}
        <div className="flex gap-3 mb-6">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-6 bg-gray-200 rounded-full w-32"></div>
          <div className="h-6 bg-gray-200 rounded-full w-28"></div>
        </div>

        {/* Image skeleton */}
        <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
