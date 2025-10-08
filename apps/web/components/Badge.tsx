import React from 'react';

type BadgeVariant = 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function Badge({ children, variant = 'blue', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
