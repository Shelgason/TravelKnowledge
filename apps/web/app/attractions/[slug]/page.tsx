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
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Hero Section with Name and Category */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{attraction.name}</h1>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          {attraction.category && (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}
            </span>
          )}
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {attraction.region.name}
          </span>
        </div>
      </div>

      {/* Two-column layout for desktop, single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Left column - Image */}
        <div className="lg:col-span-3">
          {attraction.mainImage && (
            <div className="w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src={urlFor(attraction.mainImage)!.url()}
                alt={attraction.name}
                width={800}
                height={400}
                className="object-cover object-center attraction-image"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          )}
        </div>

        {/* Right column - Details */}
        <div className="lg:col-span-2">
          {/* Quick Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
              Visit Information
            </h2>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-700">Duration</h3>
              {attraction.visitDurationMin ? (
                <p className="text-gray-600">
                  {attraction.visitDurationMin}
                  {attraction.visitDurationMax &&
                  attraction.visitDurationMax !== attraction.visitDurationMin
                    ? ` - ${attraction.visitDurationMax}`
                    : ''}{' '}
                  hours
                </p>
              ) : (
                <p className="text-gray-500 italic">Not available</p>
              )}
            </div>

            {attraction.facilities && attraction.facilities.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {attraction.facilities.map(facility => (
                    <span
                      key={facility}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {facility.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
          About {attraction.name}
        </h2>
        {attraction.description && (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{attraction.description}</p>
          </div>
        )}
      </div>

      {/* Region Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
          About {attraction.region.name}
        </h2>
        {attraction.region.intro ? (
          <p className="text-gray-700 leading-relaxed">{attraction.region.intro}</p>
        ) : (
          <p className="text-gray-500 italic">Region information coming soon</p>
        )}
      </div>

      {/* Subtle navigation */}
      <div className="text-center pb-8">
        <Link href="/map" className="text-blue-600 hover:text-blue-800 text-sm">
          Return to Map
        </Link>
      </div>
    </main>
  );
}
