import { fetchAttractionsForMap } from '@/lib/sanity';
import MapShell from '@/components/MapShell';

interface FilterBarProps {
  // We'll expand this later with actual filter options
  className?: string;
}

function FilterBar({ className = '' }: FilterBarProps) {
  return (
    <div className={`p-4 bg-white rounded-lg shadow-md mb-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Filters</div>
        {/* Placeholder for future filter controls */}
        <div className="space-x-4">
          <span className="text-gray-500">Coming soon...</span>
        </div>
      </div>
    </div>
  );
}

export default async function MapPage() {
  try {
    const attractions = await fetchAttractionsForMap();
    console.log('MapPage: Fetched attractions:', attractions?.length ?? 0);

    const defaultAttractions = attractions?.length
      ? attractions
      : [
          {
            slug: { current: 'blue-lagoon' },
            name: 'Blue Lagoon',
            coords: { lat: 64.128288, lng: -22.452015 },
            category: 'spa',
          },
          {
            slug: { current: 'gullfoss' },
            name: 'Gullfoss Waterfall',
            coords: { lat: 64.327302, lng: -20.121095 },
            category: 'waterfall',
          },
        ];

    return (
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Explore Attractions</h1>
        <FilterBar />
        <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden">
          <MapShell
            pois={defaultAttractions.map(attraction => ({
              slug: attraction.slug.current,
              name: attraction.name,
              lat: attraction.coords.lat,
              lng: attraction.coords.lng,
              category: attraction.category,
            }))}
          />
        </div>
      </div>
    );
  } catch (error: any) {
    console.error('MapPage: Error fetching attractions:', error);
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Attractions</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading attractions. Please try again later.
        </div>
      </div>
    );
  }
}
