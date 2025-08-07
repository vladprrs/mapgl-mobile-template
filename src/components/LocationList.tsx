'use client';

import React from 'react';
import { useMapGL } from '@/hooks/useMapGL';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'Red Square',
    address: 'Moscow, Russia',
    coordinates: [37.6173, 55.7558],
  },
  {
    id: '2',
    name: 'Gorky Park',
    address: 'Krymsky Val, 9, Moscow',
    coordinates: [37.6016, 55.7312],
  },
  {
    id: '3',
    name: 'Moscow City',
    address: 'Presnenskaya Naberezhnaya, Moscow',
    coordinates: [37.5377, 55.7494],
  },
  {
    id: '4',
    name: 'Tretyakov Gallery',
    address: 'Lavrushinsky Ln, 10, Moscow',
    coordinates: [37.6204, 55.7415],
  },
  {
    id: '5',
    name: 'Bolshoi Theatre',
    address: 'Theatre Square, 1, Moscow',
    coordinates: [37.6185, 55.7601],
  },
];

export function LocationList() {
  const { addMarker, centerOnLocation, clearMarkers } = useMapGL();

  const handleLocationClick = (location: Location) => {
    clearMarkers();
    addMarker(location.id, location.coordinates, {
      label: location.name,
    });
    centerOnLocation(location.coordinates, 16);
  };

  return (
    <div className="py-4 space-y-3">
      <h2 className="text-xl font-semibold mb-4">Popular Locations</h2>
      
      {SAMPLE_LOCATIONS.map((location) => (
        <button
          key={location.id}
          onClick={() => handleLocationClick(location)}
          className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <h3 className="font-medium text-gray-900">{location.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{location.address}</p>
        </button>
      ))}
      
      <button
        onClick={clearMarkers}
        className="w-full mt-4 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
      >
        Clear All Markers
      </button>
    </div>
  );
}