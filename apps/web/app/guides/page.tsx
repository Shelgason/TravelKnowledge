import { fetchAllGuides } from '@/lib/sanity';
import Link from 'next/link';
import { Metadata } from 'next';
import Badge from '@/components/Badge';

export const metadata: Metadata = {
  title: 'Travel Guides - TravelKnowledge',
  description: 'Explore our collection of travel guides for different regions',
};

export default async function GuidesPage() {
  const guides = await fetchAllGuides();

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Travel Guides</h1>

      {guides.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 italic">
            No guides available at the moment. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map(guide => (
            <Link
              href={`/guides/${guide.slug.current}`}
              key={guide.slug.current}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 text-gray-800">{guide.title}</h2>

                {guide.region && (
                  <div className="mt-auto pt-4">
                    <Badge variant="green">{guide.region.name}</Badge>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
