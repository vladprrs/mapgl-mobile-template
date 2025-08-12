'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';
import { SearchResultCard } from '@/components/search-results/SearchResultCard';
import { mockSearchResults } from '@/__mocks__/search-results/organizations';

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
  // Use mock data for now - replace with actual API call
  const searchResults = mockSearchResults;

  if (searchResults.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <Icon name={ICONS.SEARCH} size={48} color={COLORS.TEXT_SECONDARY} />
        <p className="mt-4 text-gray-500">No results found for &ldquo;{query}&rdquo;</p>
        <p className="mt-1 text-sm text-gray-400">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 p-4 ${className}`}>
      {searchResults.map((result) => (
          <SearchResultCard
            key={result.organization.id}
            variant={result.variant}
            organization={result.organization}
            features={result.features}
            onClick={() => {
              // Convert to old SearchResult format for compatibility
              const oldResult: SearchResult = {
                id: result.organization.id,
                name: result.organization.name,
                category: result.organization.category,
                address: result.organization.address,
                distance: result.organization.distance,
                rating: result.organization.rating
              };
              onSelectResult(oldResult);
            }}
            onRouteClick={() => {
              console.log('Route to:', result.organization.id);
            }}
            onServiceClick={(service) => {
              console.log('Service clicked:', service, 'for', result.organization.id);
            }}
            onButtonClick={() => {
              console.log('Button clicked for:', result.organization.id);
            }}
          />
        ))}
    </div>
  );
}

export { type SearchResult };