'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, SearchSlice, SearchSuggestion, Filter, SearchResult, SearchContext } from '../types';
import { debugLog } from '@/lib/logging';
import { mockAllSuggestions, getSuggestions, getDefaultSuggestions } from '@/__mocks__/search/suggestions';
import { allOrganizations } from '@/__mocks__/organizations';
import { getSearchResultsForQuery, hasResultsForQuery } from '@/data/searchResultsByQuery';
import { 
  getMatchingCategories, 
  getOrganizationCategories, 
  categoryDisplayNames 
} from '@/__mocks__/search/productAliases';

const MAX_HISTORY_ITEMS = 10;

// Generate available filters based on search results and query
function generateAvailableFilters(results: SearchResult[], query: string): Filter[] {
  const filters: Filter[] = [];
  
  // Always add common filters
  filters.push(
    { id: 'nearby', label: 'Рядом' },
    { id: 'open-now', label: 'Открыто' },
    { id: 'high-rating', label: 'Рейтинг 4+' }
  );
  
  // Add 24-hour filter if relevant
  const has24Hour = results.some(r => 
    r.name.toLowerCase().includes('24') || 
    r.category.toLowerCase().includes('круглосуточно')
  );
  if (has24Hour) {
    filters.push({ 
      id: '24-hours', 
      label: '24 часа'
    });
  }
  
  // Add delivery filter for restaurants/cafes
  const hasFood = results.some(r => 
    r.category.toLowerCase().includes('кафе') || 
    r.category.toLowerCase().includes('ресторан') ||
    r.category.toLowerCase().includes('еда')
  );
  if (hasFood) {
    filters.push({ 
      id: 'delivery', 
      label: 'Доставка'
    });
  }
  
  // Add parking filter for various venues
  if (results.length > 2) {
    filters.push({ 
      id: 'with-parking', 
      label: 'Парковка'
    });
  }
  
  // Add wifi filter for cafes, restaurants, hotels
  const hasWifi = results.some(r => 
    r.category.toLowerCase().includes('кафе') || 
    r.category.toLowerCase().includes('ресторан') ||
    r.category.toLowerCase().includes('отель')
  );
  if (hasWifi) {
    filters.push({ 
      id: 'with-wifi', 
      label: 'Wi-Fi'
    });
  }
  
  return filters;
}

export const createSearchSlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  SearchSlice
> = (set, get) => ({
  query: '',
  suggestions: [],
  results: [],
  filteredResults: [],
  history: [],
  isFocused: false,
  isSearching: false,
  activeFilters: [],
  availableFilters: [],
  searchContext: null,

  setQuery: (query: string) => {
    set((state) => {
      state.search.query = query;
    });
  },

  search: async (query: string) => {
    debugLog('Performing search:', query);
    
    set((state) => {
      state.search.isSearching = true;
      state.search.query = query;
      state.search.searchContext = null; // Clear previous context
    });

    try {
      
      let results: SearchResult[] = [];
      let searchContext: SearchContext | null = null;
      
      // 1. Check if query matches any product/service terms
      const matchedCategories = getMatchingCategories(query);
      
      if (matchedCategories.length > 0) {
        // Product search found - find organizations in those categories
        const orgCategories = getOrganizationCategories(matchedCategories);
        
        results = allOrganizations.filter(org => 
          orgCategories.includes(org.category)
        );
        
        // Create search context for product search
        searchContext = {
          type: 'product_search',
          query: query,
          categories: matchedCategories,
          message: `Показаны магазины, где можно купить "${query}"`,
          originalQuery: query
        };
        
        debugLog('Product search found:', { 
          query, 
          matchedCategories, 
          orgCategories, 
          resultCount: results.length 
        });
      } else {
        // 2. Try to get results from our query-specific mock data
        results = getSearchResultsForQuery(query);
        
        // 3. If no specific results found, fall back to filtered consolidated organizations
        if (results.length === 0) {
          results = allOrganizations.filter((result) =>
            result.name?.toLowerCase().includes(query.toLowerCase()) ||
            result.address?.toLowerCase().includes(query.toLowerCase()) ||
            result.category?.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        // Set regular search context
        searchContext = {
          type: 'regular_search',
          query: query
        };
      }

      // Generate available filters based on search results
      const availableFilters = generateAvailableFilters(results, query);
      
      set((state) => {
        state.search.results = results;
        state.search.filteredResults = results;
        state.search.availableFilters = availableFilters;
        state.search.searchContext = searchContext;
        state.search.isSearching = false;
      });

      get().search.addToHistory(query);

    } catch (error) {
      console.error('Search failed:', error);
      set((state) => {
        state.search.isSearching = false;
        state.search.results = [];
        state.search.searchContext = null;
      });
    }
  },

  loadSuggestions: async (query: string) => {
    debugLog('Loading suggestions for:', query);

    if (!query.trim()) {
      const historySuggestions: SearchSuggestion[] = get().search.history.map((item, index) => ({
        id: `history-${index}`,
        title: item,
        type: 'history' as const,
      }));

      const defaultSuggestions = getDefaultSuggestions().map((s) => ({
        id: s.id,
        title: s.text,
        subtitle: s.subtitle,
        type: s.type as 'place' | 'category' | 'history' | 'organization' | 'chain',
        coords: 'coordinates' in s ? s.coordinates : undefined,
        organizationId: 'organizationId' in s ? s.organizationId : undefined,
        organizationIds: 'organizationIds' in s ? s.organizationIds : undefined,
        category: s.category
      }));

      set((state) => {
        state.search.suggestions = historySuggestions.length > 0 
          ? [...historySuggestions, ...defaultSuggestions].slice(0, 8)
          : defaultSuggestions.slice(0, 5);
      });
      return;
    }

    try {

      // Use new smart suggestions system
      const smartSuggestions = getSuggestions(query).map((s) => ({
        id: s.id,
        title: s.text,
        subtitle: s.subtitle,
        type: s.type as 'place' | 'category' | 'history' | 'organization' | 'chain',
        coords: 'coordinates' in s ? s.coordinates : undefined,
        organizationId: 'organizationId' in s ? s.organizationId : undefined,
        organizationIds: 'organizationIds' in s ? s.organizationIds : undefined,
        category: s.category
      }));

      const historySuggestions: SearchSuggestion[] = get().search.history
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .map((item, index) => ({
          id: `history-${index}`,
          title: item,
          type: 'history' as const,
        }));

      set((state) => {
        state.search.suggestions = [...historySuggestions, ...smartSuggestions].slice(0, 10);
      });

    } catch (error) {
      console.error('Failed to load suggestions:', error);
      set((state) => {
        state.search.suggestions = [];
      });
    }
  },

  clearSearch: () => {
    set((state) => {
      state.search.query = '';
      state.search.results = [];
      state.search.filteredResults = [];
      state.search.suggestions = [];
      state.search.isSearching = false;
      state.search.activeFilters = [];
      state.search.availableFilters = [];
      state.search.searchContext = null;
    });
  },

  setFocused: (focused: boolean) => {
    set((state) => {
      state.search.isFocused = focused;
    });
  },

  addToHistory: (query: string) => {
    if (!query.trim()) return;

    set((state) => {
      const filtered = state.search.history.filter(item => item !== query);
      const newHistory = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      state.search.history = newHistory;
    });
  },

  clearHistory: () => {
    set((state) => {
      state.search.history = [];
    });
  },

  selectSuggestion: (suggestion: SearchSuggestion) => {
    debugLog('Selected suggestion:', suggestion);

    set((state) => {
      state.search.query = suggestion.title;
    });

    // Handle different suggestion types
    switch (suggestion.type) {
      case 'organization':
        if (suggestion.organizationId) {
          // Navigate directly to organization
          const organization = allOrganizations.find(org => org.id === suggestion.organizationId);
          if (organization) {
            get().actions.selectOrganization(organization);
            return;
          }
        }
        break;
        
      case 'category':
        if (suggestion.category) {
          // Search by category
          const categoryResults = allOrganizations.filter(org => org.category === suggestion.category);
          set((state) => {
            state.search.results = categoryResults;
            state.search.filteredResults = categoryResults;
            state.search.isSearching = false;
          });
          get().search.addToHistory(suggestion.title);
          return;
        }
        break;
        
      case 'chain':
        if (suggestion.organizationIds) {
          // Show all chain branches
          const chainResults = allOrganizations.filter(org => 
            suggestion.organizationIds!.includes(org.id)
          );
          set((state) => {
            state.search.results = chainResults;
            state.search.filteredResults = chainResults;
            state.search.isSearching = false;
          });
          get().search.addToHistory(suggestion.title);
          return;
        }
        break;
        
      case 'product':
        // For product suggestions, perform a product search
        get().search.search(suggestion.title);
        break;
        
      case 'history':
      case 'place':
      default:
        // Fallback to regular search
        get().search.search(suggestion.title);
        break;
    }
  },

  toggleFilter: (filterId: string) => {
    set((state) => {
      const currentFilters = state.search.activeFilters;
      if (currentFilters.includes(filterId)) {
        state.search.activeFilters = currentFilters.filter(id => id !== filterId);
      } else {
        state.search.activeFilters = [...currentFilters, filterId];
      }
    });
    
    // Apply filters after toggling
    get().search.applyFilters();
  },

  clearFilters: () => {
    set((state) => {
      state.search.activeFilters = [];
      state.search.filteredResults = state.search.results;
    });
  },

  setAvailableFilters: (filters: Filter[]) => {
    set((state) => {
      state.search.availableFilters = filters;
    });
  },

  applyFilters: () => {
    const state = get().search;
    const { results, activeFilters, availableFilters } = state;
    
    if (activeFilters.length === 0) {
      set((searchState) => {
        searchState.search.filteredResults = results;
      });
      return;
    }

    const filtered = results.filter((result) => {
      // Apply each active filter
      return activeFilters.every(filterId => {
        switch (filterId) {
          case 'open-now':
            // Check if place is open (mock logic)
            return !result.closingStatus?.isWarning;
          
          case 'nearby':
            // Check if place is nearby (mock logic - check if distance exists and is short)
            return result.distance && parseFloat(result.distance) < 5;
          
          case '24-hours':
            // Check if place is 24 hours (mock logic)
            return result.name.toLowerCase().includes('24') || 
                   result.category.toLowerCase().includes('круглосуточно');
          
          case 'high-rating':
            // Check if rating is 4+ 
            return result.rating && result.rating >= 4;
          
          case 'with-parking':
            // Mock logic for parking availability
            return Math.random() > 0.5; // 50% chance for demo
          
          case 'delivery':
            // Mock logic for delivery availability
            return result.category.toLowerCase().includes('кафе') || 
                   result.category.toLowerCase().includes('ресторан') ||
                   result.category.toLowerCase().includes('еда');
          
          case 'with-wifi':
            // Mock logic for wifi availability  
            return result.category.toLowerCase().includes('кафе') || 
                   result.category.toLowerCase().includes('ресторан');
          
          default:
            return true;
        }
      });
    });

    set((state) => {
      state.search.filteredResults = filtered;
    });
  },

  setSearchContext: (context: SearchContext | null) => {
    set((state) => {
      state.search.searchContext = context;
    });
  },
});