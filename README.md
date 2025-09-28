# TravelKnowledge

A Next.js application for exploring interesting places around the world, featuring Mapbox integration and Sanity CMS.

## Prerequisites

- Node.js 18+
- pnpm
- Mapbox API token
- Sanity.io account and project

## Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your environment variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token
   - `SANITY_PROJECT_ID`: Your Sanity project ID
   - `SANITY_DATASET`: Your Sanity dataset name (default: production)

3. Install dependencies:
```bash
pnpm install
```

4. Start the development server:
```bash
# Run Next.js
pnpm dev

# Run Sanity Studio (in a new terminal)
pnpm sanity
```

## Available Scripts

- `pnpm dev`: Start Next.js development server
- `pnpm build`: Build the Next.js application
- `pnpm start`: Start Next.js production server
- `pnpm lint`: Run ESLint
- `pnpm typecheck`: Run TypeScript type checking
- `pnpm sanity`: Start Sanity Studio development server

## Project Structure

- `/apps/web`: Next.js frontend application
  - `/app`: Next.js app router pages
  - `/components`: React components
  - `/lib`: Utilities and data
- `/apps/sanity`: Sanity CMS studio
  - `/schemas`: Content type definitions

## Features

- Interactive map with location markers
- Content management through Sanity
- TypeScript for type safety
- Tailwind CSS for styling