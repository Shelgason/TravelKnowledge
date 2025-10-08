import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { urlConfig } from '@/lib/config';
import ClientLayout from '../components/ClientLayout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'TravelKnowledge',
    template: '%s | TravelKnowledge',
  },
  description: 'Discover and explore amazing travel destinations with insider knowledge',
  metadataBase: new URL(urlConfig.siteUrl || 'http://localhost:3000'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
