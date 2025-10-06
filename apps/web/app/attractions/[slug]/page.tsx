import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchAttractionBySlug, urlFor, fetchAttractionsForMap } from '@/lib/sanity';
import Image from 'next/image';
import { Metadata } from 'next';
import PracticalInfo from '@/components/PracticalInfo';
import { googleMapsPlaceLink, googleMapsDirectionsLink } from '@/lib/mapLinks';
import dynamic from 'next/dynamic';
import ShareDownload from '@/components/ShareDownload';
import PhotoTips from '@/components/PhotoTips';
import Breadcrumbs from '@/components/Breadcrumbs';
import ImageCarousel from '@/components/ImageCarousel';
import FAQAccordion from '@/components/FAQAccordion';
import LocalToC from '@/components/LocalToC';
import { urlConfig } from '@/lib/config';

// Nearby attractions will be implemented in the future

// Import MapSnippet with dynamic loading to avoid SSR issues with Mapbox
const MapSnippet = dynamic(() => import('@/components/MapSnippet'), {
  ssr: false,
  loading: () => <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse"></div>,
});

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

  // Base metadata
  const metadata: Metadata = {
    title: `${attraction.name} - TravelKnowledge`,
    description: attraction.description,
  };

  // Add OpenGraph metadata if an image is available
  if (attraction.mainImage) {
    const imageUrl = urlFor(attraction.mainImage)!.width(1200).height(630).url();
    metadata.openGraph = {
      title: `${attraction.name} - TravelKnowledge`,
      description: attraction.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: attraction.name,
        },
      ],
      type: 'website',
    };
  }

  return metadata;
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function AttractionPage({ params }: PageProps) {
  const attraction = await fetchAttractionBySlug(params.slug);

  if (!attraction) {
    notFound();
  }

  // Function to calculate average visit duration
  const getAverageVisitMinutes = () => {
    if (!attraction.visitDurationMin) return null;

    const minDuration = attraction.visitDurationMin * 60; // convert to minutes
    const maxDuration = attraction.visitDurationMax
      ? attraction.visitDurationMax * 60
      : minDuration;

    return Math.round((minDuration + maxDuration) / 2);
  };

  // Calculate average visit duration in minutes
  const averageVisitMinutes = getAverageVisitMinutes();

  // Create images array for the carousel
  const galleryImages = attraction.mainImage
    ? [attraction.mainImage, ...(attraction.gallery || [])]
    : attraction.gallery || [];

  // FAQs would come from the schema if they existed
  // For now, create an empty array until schema is updated
  const faqItems: { question: string; answer: string }[] = [];

  // Calculate absolute page URL using our centralized config
  const pageUrl = `${urlConfig.siteUrl}/attractions/${params.slug}`;

  // Prepare map links
  const parkingCoords =
    attraction.practical?.parking?.lat && attraction.practical?.parking?.lng
      ? { lat: attraction.practical.parking.lat, lng: attraction.practical.parking.lng }
      : attraction.coords;

  const mapLinks = {
    placeUrl: googleMapsPlaceLink(attraction.coords.lat, attraction.coords.lng, attraction.name),
    directionsUrl: googleMapsDirectionsLink(attraction.coords.lat, attraction.coords.lng),
    parkingUrl: parkingCoords
      ? googleMapsPlaceLink(parkingCoords.lat, parkingCoords.lng, `${attraction.name} Parking`)
      : undefined,
    parkingDirectionsUrl: parkingCoords
      ? googleMapsDirectionsLink(parkingCoords.lat, parkingCoords.lng)
      : undefined,
  };

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl">
      {/* 1. Breadcrumbs + H1 + Quick facts */}
      <div className="mb-6">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              label: attraction.region.name,
              href: `/regions/${attraction.region.slug.current}`,
            },
            { label: attraction.name },
          ]}
        />

        {/* H1 Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">{attraction.name}</h1>

        {/* Quick facts */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          {attraction.category && (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}
            </span>
          )}

          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {attraction.region.name}
          </span>

          {averageVisitMinutes && (
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              ~{averageVisitMinutes} minutes
            </span>
          )}
        </div>
      </div>

      {/* 2. Image Carousel */}
      {galleryImages.length > 0 && (
        <ImageCarousel images={galleryImages} altText={attraction.name} />
      )}

      {/* Table of Contents - only visible on mobile at this location */}
      <div className="lg:hidden">
        <LocalToC
          items={[
            { href: '#about', label: 'About' },
            ...(attraction.practical ? [{ href: '#practical', label: 'Practical Info' }] : []),
            { href: '#map', label: 'Map' },
            ...(attraction.photoTips ? [{ href: '#phototips', label: 'Photo Tips' }] : []),
            ...(faqItems.length > 0 ? [{ href: '#faq', label: 'FAQ' }] : []),
            { href: '#nearby', label: 'Nearby' },
            { href: '#share', label: 'Share & Download' },
          ]}
        />
      </div>

      {/* Main content grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left content (2/3 width on desktop) */}
        <div className="lg:col-span-2">
          {/* 3. Chapters: About, History */}
          <section id="about" className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200">
              About {attraction.name}
            </h2>
            {attraction.description ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{attraction.description}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Description coming soon</p>
            )}
          </section>

          {/* History section would go here if it existed in the schema */}

          {/* 4. Practical information */}
          <section id="practical" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Practical Information</h2>

            {attraction.practical ? (
              <PracticalInfo
                parking={attraction.practical.parking}
                approach={attraction.practical.approach}
                safety={attraction.practical.safety}
                facilities={attraction.practical.facilities}
                accessibility={attraction.practical.accessibility}
                mapLinks={{
                  placeUrl: mapLinks.parkingUrl,
                  directionsUrl: mapLinks.parkingDirectionsUrl,
                }}
              />
            ) : (
              <p className="text-gray-500 italic">Practical information coming soon</p>
            )}
          </section>

          {/* Map section */}
          <section id="map" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="rounded-lg overflow-hidden shadow-md">
              <MapSnippet
                lat={attraction.coords.lat}
                lng={attraction.coords.lng}
                zoom={attraction.mapSnippet?.zoom || 12}
                showScale={attraction.mapSnippet?.showScale || false}
                slug={params.slug}
              />
            </div>
          </section>

          {/* 5. Photo Tips */}
          {attraction.photoTips && (
            <section id="phototips" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Photography Tips</h2>
              <PhotoTips content={attraction.photoTips} />
            </section>
          )}

          {/* 6. FAQ Accordion */}
          {faqItems.length > 0 && (
            <section id="faq" className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <FAQAccordion items={faqItems} />
            </section>
          )}

          {/* 7. Nearby attractions */}
          <section id="nearby" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nearby Attractions</h2>

            {/* This would be populated from the schema once nearby attractions are implemented */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-gray-500 italic text-center">
                Nearby attractions will appear here soon.
              </p>
            </div>
          </section>
        </div>

        {/* Right sidebar (1/3 width on desktop) */}
        <div className="lg:col-span-1">
          {/* Table of Contents - only visible on desktop */}
          <div className="hidden lg:block mb-6">
            <LocalToC
              items={[
                { href: '#about', label: 'About' },
                ...(attraction.practical ? [{ href: '#practical', label: 'Practical Info' }] : []),
                { href: '#map', label: 'Map' },
                ...(attraction.photoTips ? [{ href: '#phototips', label: 'Photo Tips' }] : []),
                ...(faqItems.length > 0 ? [{ href: '#faq', label: 'FAQ' }] : []),
                { href: '#nearby', label: 'Nearby' },
                { href: '#share', label: 'Share & Download' },
              ]}
            />
          </div>

          {/* 8. Share & Download */}
          <section id="share" className="mb-6">
            <ShareDownload
              name={attraction.name}
              lat={attraction.coords.lat}
              lng={attraction.coords.lng}
              pageUrl={pageUrl}
              slug={params.slug}
            />
          </section>

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

          {/* Region Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
              About {attraction.region.name}
            </h2>
            {attraction.region.intro ? (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{attraction.region.intro}</p>
                <div className="mt-3">
                  <Link
                    href={`/regions/${attraction.region.slug.current}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    Explore more in {attraction.region.name}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">Region information coming soon</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div className="text-center py-8 border-t border-gray-200 mt-8">
        <Link
          href="/map"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Return to Map
        </Link>
      </div>
    </main>
  );
}
