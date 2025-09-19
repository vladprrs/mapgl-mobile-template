'use client';

import React, { useEffect, useState } from 'react';
import { SuggestRow, AIAssistantSuggestion } from '@/components/molecules';
import { RecommendationsSection, SearchHistorySection, CityHighlightsSection } from '@/components/organisms';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { getSuggestions, getDefaultSuggestions, type SearchSuggestion } from '@/__mocks__/search/suggestions';

interface SearchSuggestionsProps {
  className?: string;
}

// Re-export types for convenience
export type { 
  SavedAddressSuggestion,
  OrganizationSuggestion,
  CategorySuggestion
} from '@/__mocks__/search/suggestions';

export function SearchSuggestionsPage({ 
  className = '' 
}: SearchSuggestionsProps) {
  // Get query from Zustand store instead of props
  const query = useStore((state) => state.search.query);
  const searchHistory = useStore((state) => state.search.history);
  const search = useStore((state) => state.search);
  const actions = useActions();
  
  // State for instant suggestions with debounce
  const [instantSuggestions, setInstantSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Debounced suggestions effect
  useEffect(() => {
    if (!query.trim()) {
      // For empty query, show default suggestions immediately
      const defaultSuggestions = getDefaultSuggestions();
      setInstantSuggestions(defaultSuggestions);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Debounce: 150ms delay for better UX
    const timer = setTimeout(() => {
      const suggestions = getSuggestions(query);
      
      // Add history suggestions if they match
      const historySuggestions: SearchSuggestion[] = searchHistory
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3) // Limit history suggestions
        .map((item, index) => ({
          id: `history-${index}`,
          type: 'history' as const,
          text: item,
          subtitle: 'Из истории поиска',
          category: '',
        }));
      
      // Combine history and smart suggestions, limit to 10 total
      const combinedSuggestions = [...historySuggestions, ...suggestions].slice(0, 10);
      setInstantSuggestions(combinedSuggestions);
      setIsLoading(false);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [query, searchHistory]);
  
  // Handle AI assistant button click (Подобрать button)
  const handleAIAssistantClick = () => {
    // Open AI chat with context about автозапчасти
    actions.openChat();

    // Add the search query as the first user message to provide context
    const chat = useStore.getState().chat;
    chat.addMessage({
      text: 'автозапчасти',
      sender: 'user',
    });
  };

  // Handle main row click for AI suggestion (search for автозапчасти)
  const handleAIMainClick = () => {
    actions.performSearch('автозапчасти');
  };

  // Handle smart suggestion selection
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    // AI assistant suggestions are handled separately with their own click handlers
    if (suggestion.type === 'ai_assistant') {
      return; // This shouldn't be called for AI suggestions now
    }

    // Convert our new suggestion format to the store's expected format
    const storeSuggestion = {
      id: suggestion.id,
      title: suggestion.text,
      subtitle: suggestion.subtitle,
      type: suggestion.type as 'place' | 'category' | 'history' | 'organization' | 'chain',
      coords: 'coordinates' in suggestion ? suggestion.coordinates : undefined,
      organizationId: 'organizationId' in suggestion ? suggestion.organizationId : undefined,
      organizationIds: 'organizationIds' in suggestion ? suggestion.organizationIds : undefined,
      category: suggestion.category
    };

    // Use the store's smart selection logic
    search.selectSuggestion(storeSuggestion);
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

  // Search state: Show smart suggestions with loading state
  return (
    <div className={`flex flex-col bg-white ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="px-4 py-3 text-center">
          <p className="text-sm text-[#898989]">Поиск...</p>
        </div>
      )}
      
      {/* Suggestion list */}
      {!isLoading && (
        <div className="flex flex-col">
          {instantSuggestions.map((suggestion) => {
            // Render AI assistant suggestion with two click zones
            if (suggestion.type === 'ai_assistant') {
              return (
                <AIAssistantSuggestion
                  key={suggestion.id}
                  text={suggestion.text}
                  subtext={suggestion.subtitle}
                  onMainClick={handleAIMainClick}
                  onAssistantClick={handleAIAssistantClick}
                />
              );
            }

            // Render regular suggestions
            return (
              <SuggestRow
                key={suggestion.id}
                type={suggestion.type}
                title={suggestion.text}
                subtitle={suggestion.subtitle}
                onClick={() => handleSuggestionClick(suggestion)}
              />
            );
          })}
        </div>
      )}
      
      {/* Show more suggestions hint */}
      {query && !isLoading && instantSuggestions.length > 0 && (
        <div className="px-4 py-3 border-t border-[rgba(137,137,137,0.3)]">
          <p className="text-sm text-[#898989]">
            Показано {instantSuggestions.length} результатов
          </p>
        </div>
      )}
      
      {/* No results state */}
      {query && !isLoading && instantSuggestions.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-[#898989]">
            Ничего не найдено по запросу &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}