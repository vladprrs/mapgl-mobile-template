'use client';

import React from 'react';
import { SearchResultItem, type SearchResultItemProps } from '@/components/molecules/SearchResultItem';
import { Text } from '@/components/atoms';

interface SearchResultsListProps {
  results: SearchResultItemProps[];
  onResultClick?: (result: SearchResultItemProps) => void;
  onActionClick?: (result: SearchResultItemProps) => void;
  className?: string;
}

/**
 * SearchResultsList Organism
 * A clean list container for search results using design tokens
 * Simple, semantic structure with proper spacing
 */
export function SearchResultsList({
  results,
  onResultClick,
  onActionClick,
  className = '',
}: SearchResultsListProps) {
  // Empty state
  if (results.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
        <Text size="lg" color="secondary" className="text-center">
          No results found
        </Text>
        <Text size="sm" color="tertiary" className="mt-2 text-center">
          Try adjusting your search terms
        </Text>
      </div>
    );
  }

  // Results list
  return (
    <div 
      className={`search-results-list flex flex-col gap-2 p-4 bg-background-secondary ${className}`}
      role="list"
      aria-label="Search results"
    >
      {results.map((result) => (
        <div key={result.id} role="listitem">
          <SearchResultItem
            {...result}
            onClick={() => onResultClick?.(result)}
            onActionClick={() => onActionClick?.(result)}
          />
        </div>
      ))}
    </div>
  );
}