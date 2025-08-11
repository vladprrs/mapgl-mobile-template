'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  address: string;
  distance?: string;
  rating?: number;
}

interface SearchResultsProps {
  query: string;
  onSelectResult: (result: SearchResult) => void;
  className?: string;
}

export function SearchResults({ 
  query, 
  onSelectResult,
  className = '' 
}: SearchResultsProps) {
  // Mock results - replace with actual API call
  const results: SearchResult[] = [
    {
      id: '1',
      name: `${query} Restaurant`,
      category: 'Restaurant',
      address: 'Tverskaya Street, 1',
      distance: '0.5 km',
      rating: 4.5,
    },
    {
      id: '2',
      name: `${query} Cafe`,
      category: 'Cafe',
      address: 'Arbat Street, 15',
      distance: '1.2 km',
      rating: 4.2,
    },
    {
      id: '3',
      name: `${query} Shop`,
      category: 'Shopping',
      address: 'Red Square, 3',
      distance: '2.0 km',
      rating: 4.8,
    },
  ];

  if (results.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 bg-white ${className}`}>
        <Icon name={ICONS.SEARCH} size={48} color={COLORS.TEXT_SECONDARY} />
        <p className="mt-4 text-gray-500">No results found for &ldquo;{query}&rdquo;</p>
        <p className="mt-1 text-sm text-gray-400">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col bg-white ${className}`}>
      {/* Results header */}
      <div className="px-4 pt-4 pb-2 border-b border-gray-100">
        <p className="text-sm text-gray-500">
          Found {results.length} results for &ldquo;{query}&rdquo;
        </p>
      </div>
      
      {/* Results list */}
      <div className="flex flex-col">
        {results.map((result) => (
          <button
            key={result.id}
            onClick={() => onSelectResult(result)}
            className="flex items-start gap-3 px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
          >
            {/* Location icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mt-1">
              <Icon 
                name={ICONS.LOCATION} 
                size={20} 
                color={COLORS.TEXT_SECONDARY} 
              />
            </div>
            
            {/* Result details */}
            <div className="flex-1 text-left">
              <h4 className="font-medium text-[15px] text-gray-900">
                {result.name}
              </h4>
              <p className="text-sm text-gray-500 mt-0.5">
                {result.category}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {result.address}
              </p>
              
              {/* Distance and rating */}
              <div className="flex items-center gap-3 mt-2">
                {result.distance && (
                  <span className="text-xs text-gray-500">
                    {result.distance}
                  </span>
                )}
                {result.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-yellow-600">★</span>
                    <span className="text-xs text-gray-600">{result.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export { type SearchResult };