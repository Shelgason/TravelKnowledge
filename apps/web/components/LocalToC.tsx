'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './LocalToC.css';

interface ToCItem {
  href: string;
  label: string;
}

interface LocalToCProps {
  items: ToCItem[];
}

export default function LocalToC({ items }: LocalToCProps) {
  const [activeSection, setActiveSection] = useState('');
  const tocRef = useRef<HTMLDivElement>(null);

  // Track scroll position and update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    // Observe all sections
    items.forEach(item => {
      const section = document.getElementById(item.href.replace('#', ''));
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  // Auto-scroll active item into view in the ToC
  useEffect(() => {
    if (activeSection && tocRef.current) {
      const activeElement = tocRef.current.querySelector(`[href="#${activeSection}"]`);
      if (activeElement) {
        tocRef.current.scrollTo({
          left: (activeElement as HTMLElement).offsetLeft - 20,
          behavior: 'smooth',
        });
      }
    }
  }, [activeSection]);

  return (
    <div className="mb-6 mt-2">
      {/* Mobile: Horizontal scroll */}
      <div
        ref={tocRef}
        className="lg:hidden flex overflow-x-auto pb-2 pt-1 px-2 gap-3 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-full flex-shrink-0 transition ${
              activeSection === item.href.replace('#', '')
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop: Vertical list */}
      <div className="hidden lg:block">
        <div className="sticky top-20 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-2 pb-2 border-b border-gray-100">
            On this page
          </h3>
          <nav>
            <ul className="space-y-1">
              {items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm rounded px-2 py-1 block transition ${
                      activeSection === item.href.replace('#', '')
                        ? 'bg-blue-50 text-blue-800 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
