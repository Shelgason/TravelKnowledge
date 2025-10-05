'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current path matches or starts with the given path
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Brand Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="TravelKnowledge Home">
              {/* Simple circle logo */}
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">TK</span>
              </div>
              <span className="font-medium text-lg text-gray-900">TravelKnowledge</span>
            </Link>
          </div>

          {/* Desktop Navigation (≥1024px) */}
          <nav
            className="hidden lg:flex h-full items-center"
            role="navigation"
            aria-label="Primary"
          >
            <ul className="flex h-full">
              <li className="h-full flex items-center">
                <Link
                  href="/map"
                  className={`px-4 h-full flex items-center border-r border-gray-200 ${
                    isActive('/map') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  aria-current={isActive('/map') ? 'page' : undefined}
                >
                  Map
                </Link>
              </li>
              <li className="h-full flex items-center">
                <Link
                  href="/guides"
                  className={`px-4 h-full flex items-center border-r border-gray-200 ${
                    isActive('/guides') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  aria-current={isActive('/guides') ? 'page' : undefined}
                >
                  Guides
                </Link>
              </li>
              <li className="h-full flex items-center">
                <Link
                  href="/regions"
                  className={`px-4 h-full flex items-center border-r border-gray-200 ${
                    isActive('/regions') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  aria-current={isActive('/regions') ? 'page' : undefined}
                >
                  Regions
                </Link>
              </li>
              <li className="h-full flex items-center">
                <Link
                  href="/northern-lights/tonight"
                  className={`px-4 h-full flex items-center ${
                    isActive('/northern-lights')
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                  aria-current={isActive('/northern-lights') ? 'page' : undefined}
                >
                  Northern Lights
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center">
            {/* Language Selector */}
            <div className="hidden lg:block mr-4">
              <select
                className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select language"
              >
                <option value="en">EN</option>
                <option value="is">IS</option>
              </select>
            </div>

            {/* Search Button */}
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>

            {/* Mobile Menu Button (< 1024px) */}
            <button
              className="lg:hidden ml-2 p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
