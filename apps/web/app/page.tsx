import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to TravelKnowledge
      </h1>
      <div className="flex gap-4">
        <Link
          href="/map"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          View Map
        </Link>
        <Link
          href="/about"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          About
        </Link>
      </div>
    </div>
  )
}