import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAttractionBySlug, urlFor, fetchAttractionsForMap } from '@/lib/sanity';
import Image from 'next/image';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const attractions = await fetchAttractionsForMap();
  return attractions.map(attraction => ({
    slug: attraction.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const attraction = await fetchAttractionBySlug(params.slug);
  if (!attraction) return { title: 'Not Found' };

  return {
    title: `${attraction.name} - TravelKnowledge`,
    description: attraction.description,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function AttractionPage({ params }: PageProps) {
  console.log('Fetching attraction with slug:', params.slug);
  const attraction = await fetchAttractionBySlug(params.slug);
  console.log('Fetched attraction:', attraction);

  if (!attraction) {
    console.log('Attraction not found, returning 404');
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 md:py-8 max-w-4xl">
      {attraction.mainImage && (
        <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-96 mb-4 sm:mb-6 md:mb-8 rounded-lg overflow-hidden">
          <Image
            src={urlFor(attraction.mainImage)!.url()}
            alt={attraction.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 800px"
            priority
          />
        </div>
      )}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{attraction.name}</h1>
        {attraction.category && (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {attraction.category}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 sm:mb-6 md:mb-8 bg-gray-50 p-3 sm:p-4 md:p-6 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Region</h3>
          <p>{attraction.region.name}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Visit Duration</h3>
          <p>
            {attraction.visitDurationMin
              ? `${attraction.visitDurationMin} - ${attraction.visitDurationMax || attraction.visitDurationMin} hours`
              : 'Duration not specified'}
          </p>
        </div>
        {attraction.facilities && attraction.facilities.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-600 mb-1">Facilities</h3>
            <ul className="space-y-1">
              {attraction.facilities.map(facility => (
                <li key={facility} className="text-sm">
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {attraction.description && (
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed">{attraction.description}</p>
        </div>
      )}

      <Link
        href="/map"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Map
      </Link>
    </main>
  );
}
