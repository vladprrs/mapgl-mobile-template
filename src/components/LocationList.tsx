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
  {
    id: '6',
    name: 'Cathedral of Christ the Saviour',
    address: 'Volkhonka St, 15, Moscow',
    coordinates: [37.6049, 55.7447],
  },
  {
    id: '7',
    name: 'Sparrow Hills',
    address: 'Vorobyovy Gory, Moscow',
    coordinates: [37.5433, 55.7098],
  },
  {
    id: '8',
    name: 'VDNKh',
    address: 'Prospekt Mira, 119, Moscow',
    coordinates: [37.6284, 55.8312],
  },
  {
    id: '9',
    name: 'Kremlin',
    address: 'Moscow Kremlin, Moscow',
    coordinates: [37.6167, 55.7520],
  },
  {
    id: '10',
    name: 'Arbat Street',
    address: 'Arbat St, Moscow',
    coordinates: [37.5997, 55.7524],
  },
  {
    id: '11',
    name: 'Sokolniki Park',
    address: 'Sokolnicheskiy Val, Moscow',
    coordinates: [37.6724, 55.7891],
  },
  {
    id: '12',
    name: 'Moscow State University',
    address: 'Leninskie Gory, 1, Moscow',
    coordinates: [37.5336, 55.7033],
  },
];

export function LocationList() {
  const { addMarker, centerOnLocation, clearMarkers } = useMapGL();

  const handleLocationClick = async (location: Location) => {
    clearMarkers();
    await addMarker(location.id, location.coordinates);
    centerOnLocation(location.coordinates, 16);
  };

  return (
    <div className="py-4 space-y-3">
      <div className="sticky top-0 bg-white pb-2 border-b border-gray-100">
        <h2 className="text-xl font-semibold">Popular Locations</h2>
        <p className="text-sm text-gray-600 mt-1">Starting in HALF view • Scroll to navigate • Touch locations to view</p>
      </div>
      
      <div className="space-y-3 pt-2">
        {SAMPLE_LOCATIONS.map((location) => (
          <button
            key={location.id}
            onClick={() => handleLocationClick(location)}
            className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <h3 className="font-medium text-gray-900">{location.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{location.address}</p>
          </button>
        ))}
      </div>
      
      <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-100">
        <button
          onClick={clearMarkers}
          className="w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
        >
          Clear All Markers
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Scroll Behavior (INVERTED - Natural Feel):</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>Collapsed:</strong> Scroll DOWN to expand to half view</li>
          <li>• <strong>Half:</strong> Scroll DOWN to expand full, UP to collapse</li>
          <li>• <strong>Expanded:</strong> Scroll content freely, pull UP from top to collapse</li>
          <li>• <strong>Desktop:</strong> Mouse wheel DOWN = expand, UP = collapse</li>
          <li>• <strong>Mobile:</strong> Swipe DOWN = expand, UP = collapse</li>
        </ul>
        <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-blue-900">
          <strong>Note:</strong> This inverted behavior matches natural iOS/Android bottom sheets
        </div>
      </div>
    </div>
  );
}