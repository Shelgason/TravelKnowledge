export interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string;
  category?: string;
  region: string;
  visitDurationMin: number;
  visitDurationMax: number;
  facilities: string[];
  location: {
    lat: number;
    lng: number;
  };
  images: string[];
}

export const attractions: Attraction[] = [
  {
    id: '1',
    name: 'Blue Lagoon',
    slug: 'blue-lagoon',
    category: 'Geothermal Spa',
    region: 'Reykjanes',
    description:
      'A geothermal spa in southwestern Iceland, known for its milky-blue water rich in silica and sulfur.',
    visitDurationMin: 2,
    visitDurationMax: 4,
    facilities: ['Spa', 'Restaurant', 'Cafe', 'Shop', 'Changing Rooms', 'Showers'],
    location: {
      lat: 64.25544,
      lng: -21.131592,
    },
    images: ['https://source.unsplash.com/1600x900/?blue-lagoon-iceland'],
  },
  {
    id: '2',
    name: 'Kirkjufell Mountain',
    slug: 'kirkjufell-mountain',
    category: 'Natural Landmark',
    region: 'Snæfellsnes',
    description:
      "A 463m high mountain on the north coast of Iceland's Snæfellsnes peninsula, near the town of Grundarfjörður.",
    visitDurationMin: 1,
    visitDurationMax: 3,
    facilities: ['Parking', 'Viewing Platform', 'Hiking Trails'],
    location: {
      lat: 64.747913,
      lng: -23.509254,
    },
    images: ['https://source.unsplash.com/1600x900/?kirkjufell-mountain'],
  },
];

export async function fetchAttractionBySlug(slug: string): Promise<Attraction | null> {
  // In a real application, this would be a database or API call
  return attractions.find(attraction => attraction.slug === slug) || null;
}
