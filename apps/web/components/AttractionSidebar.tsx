import Link from 'next/link';
import LocalToC from './LocalToC';
import ShareDownload from './ShareDownload';

interface AttractionSidebarProps {
  name: string;
  region: {
    slug: { current: string };
    name: string;
    intro: string;
  };
  visitDurationMin?: number;
  visitDurationMax?: number;
  facilities?: string[];
  tocItems: Array<{ href: string; label: string }>;
  shareDownloadProps: {
    name: string;
    lat: number;
    lng: number;
    pageUrl: string;
    slug: string;
  };
}

export default function AttractionSidebar({
  name,
  region,
  visitDurationMin,
  visitDurationMax,
  facilities,
  tocItems,
  shareDownloadProps,
}: AttractionSidebarProps) {
  return (
    <div className="lg:col-span-1">
      {/* Table of Contents - only visible on desktop */}
      <div className="hidden lg:block mb-6">
        <LocalToC items={tocItems} />
      </div>

      {/* Share & Download */}
      <section id="share" className="mb-6">
        <ShareDownload {...shareDownloadProps} />
      </section>

      {/* Quick Info Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
          Visit Information
        </h2>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Duration</h3>
          {visitDurationMin ? (
            <p className="text-gray-600">
              {visitDurationMin}
              {visitDurationMax && visitDurationMax !== visitDurationMin
                ? ` - ${visitDurationMax}`
                : ''}{' '}
              hours
            </p>
          ) : (
            <p className="text-gray-500 italic">Not available</p>
          )}
        </div>

        {facilities && facilities.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {facilities.map(facility => (
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
          About {region.name}
        </h2>
        {region.intro ? (
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{region.intro}</p>
            <div className="mt-3">
              <Link
                href={`/regions/${region.slug.current}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
              >
                Explore more in {region.name}
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
  );
}
