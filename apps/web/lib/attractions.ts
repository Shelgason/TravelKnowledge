export interface Attraction {
  id: string;
  name: string;
  slug: string;
  description: string;
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
    description:
      'A geothermal spa in southwestern Iceland, known for its milky-blue water rich in silica and sulfur.',
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
    description:
      "A 463m high mountain on the north coast of Iceland's Snæfellsnes peninsula, near the town of Grundarfjörður.",
    location: {
      lat: 64.747913,
      lng: -23.509254,
    },
    images: ['https://source.unsplash.com/1600x900/?kirkjufell-mountain'],
  },
];
