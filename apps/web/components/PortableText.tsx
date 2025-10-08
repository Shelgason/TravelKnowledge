import { PortableText as BasePortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface PortableTextProps {
  value: PortableTextBlock[] | null | undefined;
}

const components = {
  types: {
    image: ({ value }: { value: any }) => {
      const imageUrl = urlFor(value)?.url();
      if (!imageUrl) return null;

      return (
        <div className="my-6">
          <Image
            src={imageUrl}
            alt={value.alt || 'Guide image'}
            width={800}
            height={400}
            className="rounded-lg shadow-md object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: any }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          target={rel ? '_blank' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-bold mt-5 mb-2">{children}</h3>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  },
};

export default function PortableText({ value }: PortableTextProps) {
  if (!value) {
    return <p className="text-gray-500 italic">No content available.</p>;
  }
  return <BasePortableText value={value} components={components as any} />;
}
