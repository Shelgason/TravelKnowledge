import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { sanityConfig } from './config';

// Create Sanity client with configuration from centralized config module
export const client = createClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
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
  facilities?: string[];
  mainImage: SanityAsset;
  gallery: SanityAsset[];
  region: {
    slug: { current: string };
    name: string;
    intro: string;
  };
  practical?: {
    parking?: {
      lat?: number;
      lng?: number;
      notes?: string;
    };
    approach?: {
      walkDistanceM?: number;
      elevationGainM?: number;
      surface?: string;
      notes?: string;
    };
    safety?: {
      windRisk?: string;
      iceRisk?: string;
      otherNotes?: string;
    };
    facilities?: string[];
    accessibility?: {
      wheelchairFriendly?: boolean;
      steps?: number;
      railings?: boolean;
      surface?: string;
      notes?: string;
    };
  };
  mapSnippet?: {
    zoom?: number;
    showScale?: boolean;
  };
  photoTips?: string;
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
      practical {
        parking {
          lat,
          lng,
          notes
        },
        approach {
          walkDistanceM,
          elevationGainM,
          surface,
          notes
        },
        safety {
          windRisk,
          iceRisk,
          otherNotes
        },
        facilities,
        accessibility {
          wheelchairFriendly,
          steps,
          railings,
          surface,
          notes
        }
      },
      mapSnippet {
        zoom,
        showScale
      },
      photoTips,
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
