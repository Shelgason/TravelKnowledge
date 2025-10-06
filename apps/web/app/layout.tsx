import './globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata } from 'next';
import { urlConfig } from '@/lib/config';
import ClientLayout from '../components/ClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'TravelKnowledge',
    template: '%s | TravelKnowledge',
  },
  description: 'Discover and explore amazing travel destinations with insider knowledge',
  metadataBase: new URL(urlConfig.siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
