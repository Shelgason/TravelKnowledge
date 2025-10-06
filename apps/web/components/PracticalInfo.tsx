import React from 'react';
import { CarIcon, BootIcon, ShieldIcon, BuildingIcon, WheelchairIcon } from './icons';

interface PracticalInfoProps {
  parking?: { lat?: number; lng?: number; notes?: string };
  approach?: { walkDistanceM?: number; elevationGainM?: number; surface?: string; notes?: string };
  safety?: { windRisk?: string; iceRisk?: string; otherNotes?: string };
  facilities?: string[];
  accessibility?: {
    wheelchairFriendly?: boolean;
    steps?: number;
    railings?: boolean;
    surface?: string;
    notes?: string;
  };
  mapLinks?: { placeUrl?: string; directionsUrl?: string };
}

const PracticalInfo: React.FC<PracticalInfoProps> = ({
  parking,
  approach,
  safety,
  facilities,
  accessibility,
  mapLinks,
}) => {
  // Helper function to check if a section has content
  const hasContent = (section: any): boolean => {
    if (!section) return false;
    if (Array.isArray(section)) return section.length > 0;
    return Object.values(section).some(val => val !== undefined && val !== null && val !== '');
  };

  // Only render if at least one section has content
  if (
    !hasContent(parking) &&
    !hasContent(approach) &&
    !hasContent(safety) &&
    !hasContent(facilities) &&
    !hasContent(accessibility)
  ) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Practical Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Parking Card */}
        {hasContent(parking) && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start mb-3">
              <CarIcon size={24} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-medium">Parking</h3>
            </div>

            {parking?.lat && parking?.lng && (
              <div className="mb-3 space-y-2">
                <p className="text-sm">
                  Coordinates: {parking.lat.toFixed(6)}, {parking.lng.toFixed(6)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {mapLinks?.placeUrl && (
                    <a
                      href={mapLinks.placeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open parking location in Google Maps"
                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      Open in Maps
                    </a>
                  )}

                  {mapLinks?.directionsUrl && (
                    <a
                      href={mapLinks.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get directions to parking location"
                      className="inline-flex items-center px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      Directions
                    </a>
                  )}
                </div>
              </div>
            )}

            {parking?.notes && <p className="text-sm text-gray-700">{parking.notes}</p>}
          </div>
        )}

        {/* Approach Card */}
        {hasContent(approach) && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start mb-3">
              <BootIcon size={24} className="mr-2 text-green-600" />
              <h3 className="text-lg font-medium">Approach</h3>
            </div>

            <div className="mb-3 space-y-1">
              {approach?.walkDistanceM !== undefined && (
                <p className="text-sm">Distance: {approach.walkDistanceM} meters</p>
              )}
              {approach?.elevationGainM !== undefined && (
                <p className="text-sm">Elevation gain: {approach.elevationGainM} meters</p>
              )}
              {approach?.surface && <p className="text-sm">Surface: {approach.surface}</p>}
            </div>

            {approach?.notes && <p className="text-sm text-gray-700">{approach.notes}</p>}
          </div>
        )}

        {/* Safety Card */}
        {hasContent(safety) && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start mb-3">
              <ShieldIcon size={24} className="mr-2 text-red-600" />
              <h3 className="text-lg font-medium">Safety</h3>
            </div>

            <div className="mb-3 space-y-1">
              {safety?.windRisk && (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">Wind risk:</span>
                  <span
                    className={`text-sm px-2 py-0.5 rounded ${
                      safety.windRisk.toLowerCase() === 'high'
                        ? 'bg-red-100 text-red-800'
                        : safety.windRisk.toLowerCase() === 'moderate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {safety.windRisk}
                  </span>
                </div>
              )}

              {safety?.iceRisk && (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">Ice risk:</span>
                  <span
                    className={`text-sm px-2 py-0.5 rounded ${
                      safety.iceRisk.toLowerCase() === 'high'
                        ? 'bg-red-100 text-red-800'
                        : safety.iceRisk.toLowerCase() === 'moderate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {safety.iceRisk}
                  </span>
                </div>
              )}
            </div>

            {safety?.otherNotes && <p className="text-sm text-gray-700">{safety.otherNotes}</p>}
          </div>
        )}

        {/* Facilities Card */}
        {hasContent(facilities) && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start mb-3">
              <BuildingIcon size={24} className="mr-2 text-purple-600" />
              <h3 className="text-lg font-medium">Facilities</h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {facilities?.map((facility, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md"
                >
                  {facility}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Accessibility Card */}
        {hasContent(accessibility) && (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex items-start mb-3">
              <WheelchairIcon size={24} className="mr-2 text-blue-600" />
              <h3 className="text-lg font-medium">Accessibility</h3>
            </div>

            <div className="mb-3 space-y-1">
              {accessibility?.wheelchairFriendly !== undefined && (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">Wheelchair friendly:</span>
                  <span
                    className={`text-sm ${accessibility.wheelchairFriendly ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {accessibility.wheelchairFriendly ? 'Yes' : 'No'}
                  </span>
                </div>
              )}

              {accessibility?.steps !== undefined && (
                <p className="text-sm">Steps: {accessibility.steps}</p>
              )}

              {accessibility?.railings !== undefined && (
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">Railings:</span>
                  <span
                    className={`text-sm ${accessibility.railings ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {accessibility.railings ? 'Yes' : 'No'}
                  </span>
                </div>
              )}

              {accessibility?.surface && (
                <p className="text-sm">Surface: {accessibility.surface}</p>
              )}
            </div>

            {accessibility?.notes && <p className="text-sm text-gray-700">{accessibility.notes}</p>}
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticalInfo;
