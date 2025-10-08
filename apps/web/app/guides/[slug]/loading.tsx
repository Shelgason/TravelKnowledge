export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>

        {/* Region badge skeleton */}
        <div className="h-6 bg-gray-200 rounded-full w-32 mb-8"></div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Image skeleton */}
        <div className="h-64 bg-gray-200 rounded-lg mt-6"></div>
      </div>
    </div>
  );
}
