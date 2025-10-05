import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

// Validate environment variables
if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('Missing SANITY_PROJECT_ID');
}

if (!process.env.SANITY_DATASET) {
  throw new Error('Missing SANITY_DATASET');
}

if (!process.env.SANITY_API_VERSION) {
  throw new Error('Missing SANITY_API_VERSION');
}

// Create Sanity client
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === 'production',
});

// Set up image builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityAsset | null) {
  return source ? builder.image(source) : null;
}

export interface MapAttraction {
  slug: { current: string };
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
  category: string;
  region: {
    slug: { current: string };
    name: string;
  };
}

export async function fetchAttractionsForMap(): Promise<MapAttraction[]> {
  // Adding a cache busting timestamp to prevent excessive caching
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
    }`,
    {},
    { cache: 'no-store' } // Disable caching for this query
  );
}

export interface FullAttraction extends Omit<MapAttraction, 'region'> {
  description: string;
  visitDurationMin?: number;
  visitDurationMax?: number;
  facilities: string[];
  mainImage: SanityAsset;
  gallery: SanityAsset[];
  region: {
    slug: { current: string };
    name: string;
    intro: string;
  };
}

export async function fetchAttractionBySlug(slug: string): Promise<FullAttraction | null> {
  console.log('Fetching attraction with slug:', slug);
  const attractions = await client.fetch(
    `*[_type == "attraction" && slug.current == $slug][0]{
      "slug": slug.current,
      name,
      coords,
      category,
      description,
      visitDurationMin,
      visitDurationMax,
      facilities,
      mainImage,
      gallery,
      "region": region->{
        "slug": slug.current,
        name,
        intro
      }
    }`,
    { slug }
  );

  return attractions || null;
}

export interface Guide {
  title: string;
  slug: { current: string };
  body: any[]; // This is for portable text content
  region?: {
    slug: { current: string };
    name: string;
  };
}

export async function fetchGuideBySlug(slug: string): Promise<Guide | null> {
  const guide = await client.fetch(
    `*[_type == "guide" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      body,
      region->{
        "slug": slug.current,
        name
      }
    }`,
    { slug }
  );

  return guide || null;
}

export async function fetchAllGuides(): Promise<Guide[]> {
  const guides = await client.fetch(
    `*[_type == "guide"] | order(title asc) {
      title,
      "slug": slug.current,
      body,
      region->{
        "slug": slug.current,
        name
      }
    }`
  );

  return guides || [];
}

export async function fetchAttractionsByRegionSlug(regionSlug: string): Promise<MapAttraction[]> {
  const attractions = await client.fetch(
    `*[_type == "attraction" && region->slug.current == $regionSlug] | order(name asc) {
      slug,
      name,
      coords,
      category,
      region->{
        "slug": slug.current,
        name
      }
    }`,
    { regionSlug },
    { cache: 'no-store' } // Disable caching for this query
  );

  return attractions || [];
}

export interface Region {
  name: string;
  slug: { current: string };
  intro: string;
}

export async function fetchRegionBySlug(slug: string): Promise<Region | null> {
  const region = await client.fetch(
    `*[_type == "region" && slug.current == $slug][0] {
      name,
      "slug": slug.current,
      intro
    }`,
    { slug },
    { cache: 'no-store' } // Disable caching for this query
  );

  return region || null;
}

export async function fetchAllRegions(): Promise<Region[]> {
  const regions = await client.fetch(
    `*[_type == "region"] | order(name asc) {
      name,
      "slug": slug.current,
      intro
    }`,
    {},
    { cache: 'no-store' } // Disable caching for this query
  );

  return regions || [];
}

// Helper to ensure slugs are properly referenced
export function resolveSlugReference(slug: string | { current: string }): string {
  if (typeof slug === 'string') return slug;
  return slug.current;
}
