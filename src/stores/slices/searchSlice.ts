'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, SearchSlice, SearchSuggestion } from '../types';
import { debugLog } from '@/lib/logging';
import { mockAllSuggestions } from '@/__mocks__/search/suggestions';
import { mockSearchResults } from '@/__mocks__/search/results';

const MAX_HISTORY_ITEMS = 10;

export const createSearchSlice: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  SearchSlice
> = (set, get) => ({
  query: '',
  suggestions: [],
  results: [],
  history: [],
  isFocused: false,
  isSearching: false,

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
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const results = mockSearchResults.filter((result) =>
        result.name?.toLowerCase().includes(query.toLowerCase()) ||
        result.address?.toLowerCase().includes(query.toLowerCase()) ||
        result.category?.toLowerCase().includes(query.toLowerCase())
      ).map(r => ({
        id: r.id,
        title: r.name,
        subtitle: `${r.category} • ${r.address}`,
        description: r.address,
        coords: [82.9207 + Math.random() * 0.1, 55.0415 + Math.random() * 0.1] as [number, number],
        distance: parseFloat(r.distance?.replace(' км', '') || '0'),
        rating: r.rating,
        category: r.category
      }));

      set((state) => {
        state.search.results = results;
        state.search.isSearching = false;
      });

      get().search.addToHistory(query);

    } catch (error) {
      console.error('Search failed:', error);
      set((state) => {
        state.search.isSearching = false;
        state.search.results = [];
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

      set((state) => {
        state.search.suggestions = historySuggestions.length > 0 
          ? historySuggestions 
          : mockAllSuggestions.slice(0, 5).map((s) => ({
            id: `suggestion-${Math.random()}`,
            title: s.title,
            subtitle: 'subtitle' in s ? s.subtitle : undefined,
            type: 'place' as const,
            coords: undefined
          }));
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const filtered = mockAllSuggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(query.toLowerCase())
      ).map((s) => ({
        id: `suggestion-${Math.random()}`,
        title: s.title,
        subtitle: 'subtitle' in s ? s.subtitle : undefined,
        type: 'place' as const,
        coords: undefined
      }));

      const historySuggestions: SearchSuggestion[] = get().search.history
        .filter(item => item.toLowerCase().includes(query.toLowerCase()))
        .map((item, index) => ({
          id: `history-${index}`,
          title: item,
          type: 'history' as const,
        }));

      set((state) => {
        state.search.suggestions = [...historySuggestions, ...filtered].slice(0, 10);
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
      state.search.suggestions = [];
      state.search.isSearching = false;
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

    if (suggestion.type === 'history') {
      get().search.search(suggestion.title);
    } else {
      get().search.search(suggestion.title);
    }
  },
});