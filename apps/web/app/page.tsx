import Link from 'next/link';
import { attractions } from '@/lib/attractions';

export default function HomePage() {
  return (
    <div>
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to TravelKnowledge</h1>
        <p className="text-xl text-gray-600 mb-8">Discover amazing places around the world</p>
        <Link
          href="/map"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Explore Map
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
