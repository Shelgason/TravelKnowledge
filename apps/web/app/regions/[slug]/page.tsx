import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchRegionBySlug, fetchAllRegions, fetchAttractionsByRegionSlug } from '@/lib/sanity';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const regions = await fetchAllRegions();
  return regions.map(region => ({
    slug: region.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const region = await fetchRegionBySlug(params.slug);
  if (!region) return { title: 'Region Not Found' };

  return {
    title: `${region.name} - TravelKnowledge`,
    description: region.intro.slice(0, 160),
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function RegionPage({ params }: PageProps) {
  const region = await fetchRegionBySlug(params.slug);

  if (!region) {
    notFound();
  }

  // Fetch attractions in this region
  const attractions = await fetchAttractionsByRegionSlug(params.slug);

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Region title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{region.name}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">{region.intro}</p>
        </div>
      </div>

      {/* Attractions in this region */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Attractions in {region.name}</h2>

        {attractions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-500 italic">No attractions available for this region yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attractions.map(attraction => (
              <Link
                href={`/attractions/${attraction.slug.current}`}
                key={attraction.slug.current}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div
                    className={`w-3 h-3 mt-1.5 mr-3 rounded-full ${getCategoryColor(attraction.category)}`}
                  ></div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">{attraction.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{attraction.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="text-center pb-8">
        <Link href="/regions" className="text-blue-600 hover:text-blue-800 text-sm mr-4">
          All Regions
        </Link>
        <Link href="/map" className="text-blue-600 hover:text-blue-800 text-sm">
          View Map
        </Link>
      </div>
    </main>
  );
}

function getCategoryColor(category: string): string {
  switch (category?.toLowerCase()) {
    case 'museum':
      return 'bg-amber-500';
    case 'park':
      return 'bg-green-500';
    case 'landmark':
      return 'bg-blue-500';
    case 'restaurant':
      return 'bg-red-500';
    case 'hotel':
      return 'bg-purple-500';
    case 'spa':
      return 'bg-pink-500';
    case 'waterfall':
      return 'bg-cyan-500';
    default:
      return 'bg-gray-500';
  }
}
