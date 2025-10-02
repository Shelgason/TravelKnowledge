import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchGuideBySlug, fetchAllGuides, fetchAttractionsByRegionSlug } from '@/lib/sanity';
import PortableText from '@/components/PortableText';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const guides = await fetchAllGuides();
  return guides.map(guide => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const guide = await fetchGuideBySlug(params.slug);
  if (!guide) return { title: 'Not Found' };

  return {
    title: `${guide.title} - TravelKnowledge`,
    description: `Travel guide for ${guide.title}`,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function GuidePage({ params }: PageProps) {
  const guide = await fetchGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  // Fetch attractions in this region if the guide is associated with a region
  let regionAttractions: Array<import('@/lib/sanity').MapAttraction> = [];
  if (guide.region?.slug?.current) {
    try {
      regionAttractions = await fetchAttractionsByRegionSlug(guide.region.slug.current);
    } catch (error) {
      console.error('Error fetching region attractions:', error);
      // Continue without region attractions
    }
  }

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Guide title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{guide.title}</h1>
        {guide.region && (
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {guide.region.name} Region
            </span>
          </div>
        )}
      </div>

      {/* Guide content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {guide.body ? (
          <div className="prose max-w-none">
            <PortableText value={guide.body} />
          </div>
        ) : (
          <p className="text-gray-500 italic">No content available for this guide.</p>
        )}
      </div>

      {/* Attractions in this region */}
      {guide.region && regionAttractions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Suggested Attractions in {guide.region.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionAttractions.map(attraction => (
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
        </div>
      )}

      {/* Navigation */}
      <div className="text-center pb-8">
        <Link href="/guides" className="text-blue-600 hover:text-blue-800 text-sm mr-4">
          Back to Guides
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
    default:
      return 'bg-gray-500';
  }
}
