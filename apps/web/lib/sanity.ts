import { createClient } from '@sanity/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import imageUrlBuilder from '@sanity/image-url';

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('Missing SANITY_PROJECT_ID in environment variables');
}

if (!process.env.SANITY_DATASET) {
  throw new Error('Missing SANITY_DATASET in environment variables');
}

if (!process.env.SANITY_API_VERSION) {
  throw new Error('Missing SANITY_API_VERSION in environment variables');
}

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface MapAttraction {
  slug: string;
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
  category: string;
  region: {
    slug: string;
    name: string;
  };
}

export async function fetchAttractionsForMap(): Promise<MapAttraction[]> {
  return client.fetch(
    `*[_type == "attraction"] {
      slug,
      name,
      coords,
      category,
      region->{
        slug,
        name
      }
    }`
  );
}

export interface FullAttraction extends MapAttraction {
  description: string;
  visitDurationMin?: number;
  visitDurationMax?: number;
  facilities: string[];
  mainImage: any; // You can type this more strictly if needed
  gallery: any[]; // You can type this more strictly if needed
}

export async function fetchAttractionBySlug(slug: string): Promise<FullAttraction | null> {
  const attractions = await client.fetch(
    `*[_type == "attraction" && slug.current == $slug] {
      slug,
      name,
      coords,
      category,
      description,
      visitDurationMin,
      visitDurationMax,
      facilities,
      mainImage,
      gallery,
      region->{
        slug,
        name
      }
    }`,
    { slug }
  );

  return attractions[0] || null;
}

export interface Guide {
  title: string;
  slug: string;
  body: any[]; // This is for portable text content
}

export async function fetchGuideBySlug(slug: string): Promise<Guide | null> {
  const guides = await client.fetch(
    `*[_type == "guide" && slug.current == $slug] {
      title,
      slug,
      body
    }`,
    { slug }
  );

  return guides[0] || null;
}

// Helper to ensure slugs are properly referenced
export function resolveSlugReference(slug: string | { current: string }): string {
  if (typeof slug === 'string') return slug;
  return slug.current;
}
