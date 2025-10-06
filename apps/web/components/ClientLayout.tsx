'use client';

import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">{children}</main>
      <Footer />
    </>
  );
}
