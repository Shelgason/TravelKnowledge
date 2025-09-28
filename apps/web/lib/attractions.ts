export interface Attraction {
  slug: string
  name: string
  lat: number
  lng: number
  description: string
}

export const attractions: Attraction[] = [
  {
    slug: 'blue-lagoon',
    name: 'Blue Lagoon',
    lat: 64.255440,
    lng: -21.131592,
    description: 'A geothermal spa in southwestern Iceland, known for its milky-blue water rich in silica and sulfur.'
  },
  {
    slug: 'kirkjufell-mountain',
    name: 'Kirkjufell Mountain',
    lat: 64.747913,
    lng: -23.509254,
    description: "A 463m high mountain on the north coast of Iceland's Snæfellsnes peninsula, near the town of Grundarfjörður."
  }
]