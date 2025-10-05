'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  // Check if current path matches or starts with the given path
  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  // Close the menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Ensure we reset overflow only if the menu was open
      if (isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="lg:hidden fixed inset-0 bg-white z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="overflow-y-auto h-full py-4 px-6">
        <nav role="navigation" aria-label="Mobile navigation">
          <ul className="space-y-4 pt-6">
            <li>
              <Link
                href="/map"
                className={`block py-3 text-lg font-medium ${
                  isActive('/map') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                }`}
                onClick={onClose}
                aria-current={isActive('/map') ? 'page' : undefined}
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className={`block py-3 text-lg font-medium ${
                  isActive('/guides') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                }`}
                onClick={onClose}
                aria-current={isActive('/guides') ? 'page' : undefined}
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href="/regions"
                className={`block py-3 text-lg font-medium ${
                  isActive('/regions') ? 'text-blue-600' : 'text-gray-900 hover:text-blue-600'
                }`}
                onClick={onClose}
                aria-current={isActive('/regions') ? 'page' : undefined}
              >
                Regions
              </Link>
            </li>
            <li>
              <Link
                href="/northern-lights/tonight"
                className={`block py-3 text-lg font-medium ${
                  isActive('/northern-lights')
                    ? 'text-blue-600'
                    : 'text-gray-900 hover:text-blue-600'
                }`}
                onClick={onClose}
                aria-current={isActive('/northern-lights') ? 'page' : undefined}
              >
                Northern Lights
              </Link>
            </li>
          </ul>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="mb-4">
              <label
                htmlFor="mobile-language"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Language
              </label>
              <select
                id="mobile-language"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select language"
              >
                <option value="en">English</option>
                <option value="is">Icelandic</option>
              </select>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
