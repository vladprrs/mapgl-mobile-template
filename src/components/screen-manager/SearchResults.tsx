'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';
import { SearchResultCard } from '@/components/search-results/SearchResultCard';
import { StoriesPanel } from '@/components/dashboard/StoriesPanel';
import { mockSearchResults } from '@/__mocks__/search-results/organizations';
import { mockStories } from '@/__mocks__/dashboard/stories';

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

  // Empty state with explicit styling
  if (searchResults.length === 0) {
    return (
      <div 
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 16px',
          backgroundColor: '#F1F1F1',
          border: 'none',
          outline: 'none',
          margin: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Icon name={ICONS.SEARCH} size={48} color={COLORS.TEXT_SECONDARY} />
        <p style={{ 
          marginTop: '16px', 
          color: '#6B7280',
          fontSize: '16px',
          border: 'none',
          outline: 'none',
        }}>
          No results found for &ldquo;{query}&rdquo;
        </p>
        <p style={{ 
          marginTop: '4px', 
          color: '#9CA3AF',
          fontSize: '14px',
          border: 'none',
          outline: 'none',
        }}>
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

  // Main results view with explicit styling
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F1F1F1',
        padding: 0,
        margin: 0,
        border: 'none',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* First 3 search results */}
      {resultsBeforeStories.map((result, index) => (
        <div
          key={result.organization.id}
          style={{
            padding: index === 0 ? '16px 16px 8px 16px' : '8px 16px',
            backgroundColor: '#F1F1F1',
            border: 'none',
            outline: 'none',
            margin: 0,
            boxSizing: 'border-box',
          }}
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
        <div 
          style={{
            padding: '16px',
            backgroundColor: '#F1F1F1',
            border: 'none',
            outline: 'none',
            margin: 0,
            boxSizing: 'border-box',
          }}
        >
          <StoriesPanel 
            stories={mockStories}
            onStoryClick={handleStoryClick}
            className="w-full"
          />
        </div>
      )}
      
      {/* Remaining search results (4, 5, 6, etc.) */}
      {resultsAfterStories.map((result, index) => (
        <div
          key={result.organization.id}
          style={{
            padding: '8px 16px',
            backgroundColor: '#F1F1F1',
            border: 'none',
            outline: 'none',
            margin: 0,
            boxSizing: 'border-box',
          }}
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
      <div 
        style={{
          height: '16px',
          backgroundColor: '#F1F1F1',
          border: 'none',
          outline: 'none',
          margin: 0,
        }}
      />
    </div>
  );
}

export { type SearchResult };