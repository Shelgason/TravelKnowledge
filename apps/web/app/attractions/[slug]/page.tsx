import { notFound } from 'next/navigation'
import { attractions } from '@/lib/attractions'
import { AttractionCard } from '@/components/AttractionCard'

interface Props {
  params: { slug: string }
}

export default function AttractionPage({ params }: Props) {
  const attraction = attractions.find(a => a.slug === params.slug)
  
  if (!attraction) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AttractionCard
        name={attraction.name}
        description={attraction.description}
      />
    </div>
  )
}