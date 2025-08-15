'use client';

import React from 'react';
import { SearchResultsList } from '@/components/organisms/SearchResultsList';
import type { SearchResultCardProps } from '@/components/organisms/SearchResultCard';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { debugLog } from '@/lib/logging';

interface SearchResultsPageProps {
  className?: string;
}

/**
 * SearchResultsPage Component
 * Connected to Zustand store for real search results
 * Uses SearchResultCard organism through SearchResultsList
 */
export function SearchResultsPage({
  className = '',
}: SearchResultsPageProps) {
  // Connect to Zustand store with atomic selectors
  const searchResults = useStore((state) => state.search.filteredResults);
  const isSearching = useStore((state) => state.search.isSearching);
  const actions = useActions();

  const handleResultClick = (result: SearchResultCardProps) => {
    debugLog('Search result selected:', result);
    // Use cross-slice action to handle organization selection
    actions.selectOrganization(result);
  };

  // Show loading state
  if (isSearching) {
    return (
      <div className={`search-results-page min-h-full bg-background-secondary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`search-results-page min-h-full bg-background-secondary ${className}`}>
      {/* AISearchHelper now handles the product search messaging */}
      <SearchResultsList
        results={searchResults}
        onResultClick={handleResultClick}
      />
    </div>
  );
}