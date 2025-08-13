'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/atoms';
import { SearchResultCard, StoriesPanel } from '@/components/organisms';
import { mockSearchResults } from '@/__mocks__/search-results/organizations';
import { mockStories } from '@/__mocks__/dashboard/stories';

export interface SearchResult {
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

export function SearchResultsPage({ 
  query, 
  onSelectResult,
  className = '' 
}: SearchResultsProps) {
  // Use mock data for now - replace with actual API call
  const searchResults = mockSearchResults;

  // Empty state - simplified
  if (searchResults.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
        <Icon name={ICONS.SEARCH} size={48} color={COLORS.TEXT_SECONDARY} />
        <p className="mt-4 text-gray-600 text-base">
          No results found for &ldquo;{query}&rdquo;
        </p>
        <p className="mt-1 text-gray-400 text-sm">
          Try searching for something else
        </p>
      </div>
    );
  }

  // Split results into before and after stories carousel
  const resultsBeforeStories = searchResults.slice(0, 3);
  const resultsAfterStories = searchResults.slice(3);

  // Handler for story clicks
  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
    // You can add navigation logic here if needed
  };

  // Main results view - simplified structure
  return (
    <>
      {/* First 3 search results */}
      {resultsBeforeStories.map((result, index) => (
        <div
          key={result.organization.id}
          className={index === 0 ? 'px-4 pt-4 pb-2' : 'px-4 py-2'}
        >
          <SearchResultCard
            variant={result.variant}
            organization={result.organization}
            features={result.features}
            onClick={() => {
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
        </div>
      ))}
      
      {/* Stories carousel at position 4 (after 3rd result) */}
      {resultsBeforeStories.length >= 3 && (
        <div className="p-4">
          <StoriesPanel 
            stories={mockStories}
            onStoryClick={handleStoryClick}
            className="w-full"
          />
        </div>
      )}
      
      {/* Remaining search results (4, 5, 6, etc.) */}
      {resultsAfterStories.map((result) => (
        <div
          key={result.organization.id}
          className="px-4 py-2"
        >
          <SearchResultCard
            variant={result.variant}
            organization={result.organization}
            features={result.features}
            onClick={() => {
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
        </div>
      ))}
      
      {/* Bottom padding to ensure last card isn't cut off */}
      <div className="h-4" />
    </>
  );
}