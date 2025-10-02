import { fetchAllRegions } from '@/lib/sanity';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Regions - TravelKnowledge',
  description: 'Discover attractions and travel guides by region',
};

export default async function RegionsPage() {
  const regions = await fetchAllRegions();

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Explore by Region</h1>

      {regions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 italic">
            No regions available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map(region => (
            <Link
              href={`/regions/${region.slug}`}
              key={region.slug}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{region.name}</h2>
                {region.intro && (
                  <p className="text-gray-600 line-clamp-3">{region.intro.slice(0, 150)}...</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
