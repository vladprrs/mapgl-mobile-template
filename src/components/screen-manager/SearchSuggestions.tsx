'use client';

import React from 'react';
import { SuggestRow, SuggestType } from './SuggestRow';

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

// Type definitions for suggestions
interface SavedAddressSuggestion {
  type: SuggestType.SAVED_ADDRESS;
  title: string;
  subtitle: string;
  distance: string;
  icon: 'home' | 'work';
}

interface OrganizationSuggestion {
  type: SuggestType.ORGANIZATION;
  title: string;
  subtitle: string;
  highlightedText: string;
}

interface CategorySuggestion {
  type: SuggestType.CATEGORY;
  title: string;
  branchCount: string;
  highlightedText: string;
}

// Type is used internally for filtering - removing from exports

// Mock data for different suggestion types
const mockSuggestions = {
  savedAddresses: [
    {
      type: SuggestType.SAVED_ADDRESS,
      title: 'Дом',
      subtitle: 'Красный проспект, 49',
      distance: '5 км',
      icon: 'home' as const,
    },
    {
      type: SuggestType.SAVED_ADDRESS,
      title: 'Работа',
      subtitle: 'Октябрьская, 42',
      distance: '12 км',
      icon: 'work' as const,
    },
  ] as SavedAddressSuggestion[],
  organizations: [
    {
      type: SuggestType.ORGANIZATION,
      title: 'МЕСТО, инвест-апарты',
      subtitle: 'Красный проспект, 49',
      highlightedText: 'МЕС',
    },
    {
      type: SuggestType.ORGANIZATION,
      title: 'Место встречи, кафе',
      subtitle: 'Ленина, 21',
      highlightedText: 'Мес',
    },
  ] as OrganizationSuggestion[],
  categories: [
    {
      type: SuggestType.CATEGORY,
      title: 'Аквапарки/Водные аттракционы',
      branchCount: '6 филиалов',
      highlightedText: 'Места отдыха',
    },
    {
      type: SuggestType.CATEGORY,
      title: 'Рестораны',
      branchCount: '124 филиала',
      highlightedText: '',
    },
  ] as CategorySuggestion[],
};

export function SearchSuggestions({ 
  query, 
  onSelectSuggestion,
  className = '' 
}: SearchSuggestionsProps) {
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