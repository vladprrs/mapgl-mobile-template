'use client';

import React from 'react';
import { SuggestRow } from '@/components/molecules';
import { RecommendationsSection, SearchHistorySection, CityHighlightsSection } from '@/components/organisms';
import useStore from '@/stores';

interface SearchSuggestionsProps {
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

// Import mock data from centralized location
import { 
  mockSavedAddresses,
  mockOrganizations, 
  mockCategories 
} from '@/__mocks__/search/suggestions';

// Re-export types for convenience
export type { 
  SavedAddressSuggestion,
  OrganizationSuggestion,
  CategorySuggestion,
  SearchSuggestion
} from '@/__mocks__/search/suggestions';

// Use imported mock data
const mockSuggestions = {
  savedAddresses: mockSavedAddresses,
  organizations: mockOrganizations,
  categories: mockCategories,
};

export function SearchSuggestionsPage({ 
  onSelectSuggestion,
  className = '' 
}: SearchSuggestionsProps) {
  // Get query from Zustand store instead of props
  const query = useStore((state) => state.search.query);
  // Filter suggestions based on query
  const getSuggestions = () => {
    if (!query) {
      // Show saved addresses when no query
      return mockSuggestions.savedAddresses;
    }
    
    // Filter and combine all suggestion types
    const allSuggestions = [
      ...mockSuggestions.savedAddresses.filter(s => 
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.subtitle?.toLowerCase().includes(query.toLowerCase())
      ),
      ...mockSuggestions.organizations.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.subtitle?.toLowerCase().includes(query.toLowerCase())
      ),
      ...mockSuggestions.categories.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase())
      ),
    ];
    
    return allSuggestions.length > 0 ? allSuggestions : mockSuggestions.categories;
  };

  // Conditional rendering based on query length
  if (query.length === 0) {
    // Empty state: Match Figma layout with proper background zones
    return (
      <div className={`flex flex-col h-full ${className}`}>
        {/* White background zone - Recommendations */}
        <div className="bg-white pb-4 pt-2 shrink-0">
          <RecommendationsSection />
        </div>
        
        {/* Gray background zone - History + City Highlights */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f1f1f1' }}>
          {/* History section - NO HEADER, starts with pt-4 */}
          <div className="pt-4">
            <SearchHistorySection showHeader={false} />
          </div>
          
          {/* City highlights section */}
          <CityHighlightsSection />
        </div>
      </div>
    );
  }

  // Search state: Show suggestions (current implementation)
  const suggestions = getSuggestions();

  return (
    <div className={`flex flex-col bg-white ${className}`}>
      {/* Suggestion list */}
      <div className="flex flex-col">
        {suggestions.map((suggestion, index) => (
          <SuggestRow
            key={index}
            type={suggestion.type}
            title={suggestion.title}
            subtitle={'subtitle' in suggestion ? suggestion.subtitle : undefined}
            distance={'distance' in suggestion ? suggestion.distance : undefined}
            branchCount={'branchCount' in suggestion ? suggestion.branchCount : undefined}
            highlightedText={'highlightedText' in suggestion ? suggestion.highlightedText : undefined}
            icon={'icon' in suggestion ? suggestion.icon : undefined}
            onClick={() => onSelectSuggestion(suggestion.title)}
          />
        ))}
      </div>
      
      {/* Show more suggestions hint */}
      {query && suggestions.length > 0 && (
        <div className="px-4 py-3 border-t border-[rgba(137,137,137,0.3)]">
          <p className="text-sm text-[#898989]">
            Показано {suggestions.length} из {suggestions.length + 10} результатов
          </p>
        </div>
      )}
    </div>
  );
}