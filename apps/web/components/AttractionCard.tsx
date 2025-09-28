interface AttractionCardProps {
  name: string;
  description: string;
  image?: string;
  lat?: number;
  lng?: number;
}

export function AttractionCard({ name, description, image, lat, lng }: AttractionCardProps) {
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-lg">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {lat && lng && (
          <div className="text-sm text-gray-500">
            <p>Latitude: {lat}</p>
            <p>Longitude: {lng}</p>
          </div>
        )}
      </div>
    </div>
  );
}
