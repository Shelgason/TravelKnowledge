export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="h-10 bg-gray-200 rounded w-2/3 mb-8"></div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
