import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Make sure Tailwind doesn't purge these classes
  safelist: [
    'bg-blue-600',
    'text-blue-600',
    'border-gray-200',
    'text-gray-700',
    'hover:text-blue-600',
    'bg-blue-50',
    'hover:bg-gray-50',
    'text-gray-900',
    'text-white',
    'text-gray-600',
    'focus:ring-blue-500',
    'focus:border-blue-500',
  ],
};

export default config;
