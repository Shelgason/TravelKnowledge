import Link from 'next/link';
import { HomeIcon } from './icons/HomeIcon';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700">
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Link>
        </li>

        <li aria-hidden="true" className="text-gray-400 mx-1">
          /
        </li>

        <li>
          <Link href="/attractions" className="text-gray-500 hover:text-gray-700">
            Attractions
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <span aria-hidden="true" className="text-gray-400 mx-1">
                /
              </span>
              {item.href ? (
                <Link href={item.href} className="text-gray-500 hover:text-gray-700">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-700" aria-current="page">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
