import Link from 'next/link';
import { attractions } from '@/lib/attractions';

export default function HomePage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-8 md:py-12 max-w-7xl mx-auto">
      <section className="text-center mb-8 sm:mb-12 md:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Welcome to TravelKnowledge</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 md:mb-8">Discover amazing places around the world</p>
        <Link
          href="/map"
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          Explore Map
        </Link>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Featured Attractions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {attractions.slice(0, 2).map(attraction => (
            <Link
              key={attraction.slug}
              href={`/attractions/${attraction.slug}`}
              className="block group"
            >
              <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold group-hover:text-blue-500 transition-colors">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{attraction.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
