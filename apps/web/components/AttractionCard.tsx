interface AttractionCardProps {
  name: string
  description: string
}

export function AttractionCard({ name, description }: AttractionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}