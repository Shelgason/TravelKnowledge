import { fetchAttractionsForMap } from '@/lib/sanity';

export async function generateStaticParams() {
  const attractions = await fetchAttractionsForMap();

  return attractions.map(attraction => ({
    slug: attraction.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `${params.slug} - TravelKnowledge`,
  };
}
