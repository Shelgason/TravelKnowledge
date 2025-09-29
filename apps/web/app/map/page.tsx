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
  const attractions = await fetchAttractionsForMap();

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
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Explore Iceland</h1>
      <div
        style={{ height: '700px' }}
        className="w-full bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <MapShell
          key="map-shell-v1" // Adding a version key
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
}
