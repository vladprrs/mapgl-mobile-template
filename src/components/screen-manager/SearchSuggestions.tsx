'use client';

import React from 'react';
import { Icon, ICONS, COLORS } from '@/components/icons';

interface SearchSuggestionsProps {
  query: string;
  onSelectSuggestion: (suggestion: string) => void;
  className?: string;
}

export function SearchSuggestions({ 
  query, 
  onSelectSuggestion,
  className = '' 
}: SearchSuggestionsProps) {
  // Mock suggestions - replace with actual API call
  const suggestions = query ? [
    `${query} restaurants`,
    `${query} cafes`,
    `${query} shops`,
    `${query} hotels`,
    `${query} attractions`,
  ] : [
    'Restaurants nearby',
    'Coffee shops',
    'Shopping centers',
    'Hotels',
    'Tourist attractions',
  ];

  return (
    <div className={`flex flex-col bg-white ${className}`}>
      {/* Recent searches header */}
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-sm font-medium text-gray-500">
          {query ? 'Suggestions' : 'Recent searches'}
        </h3>
      </div>
      
      {/* Suggestion list */}
      <div className="flex flex-col">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelectSuggestion(suggestion)}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Icon 
              name={ICONS.SEARCH} 
              size={20} 
              color={COLORS.TEXT_SECONDARY} 
            />
            <span className="flex-1 text-left text-[15px] text-gray-900">
              {suggestion}
            </span>
          </button>
        ))}
      </div>
      
      {/* Clear recent searches (only when showing recent) */}
      {!query && (
        <div className="px-4 py-3 border-t border-gray-100">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Clear recent searches
          </button>
        </div>
      )}
    </div>
  );
}