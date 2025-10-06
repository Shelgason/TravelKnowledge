'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Don't render if there are no items
  if (!items || items.length === 0) {
    return null;
  }

  const toggleItem = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-3 text-left flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            aria-expanded={openIndex === index}
            aria-controls={`faq-panel-${index}`}
          >
            <span className="font-medium text-gray-800">{item.question}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${
                openIndex === index ? 'transform rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            id={`faq-panel-${index}`}
            className={`px-4 overflow-hidden transition-all ${
              openIndex === index ? 'py-3 max-h-96' : 'max-h-0'
            }`}
            aria-hidden={openIndex !== index}
          >
            <p className="text-gray-700">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
