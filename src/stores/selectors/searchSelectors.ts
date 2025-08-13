'use client';

import type { AppStore } from '../types';
import useStore from '../index';

export const selectSearchQuery = (state: AppStore) => state.search.query;
export const selectSearchSuggestions = (state: AppStore) => state.search.suggestions;
export const selectSearchResults = (state: AppStore) => state.search.results;
export const selectSearchHistory = (state: AppStore) => state.search.history;
export const selectSearchFocused = (state: AppStore) => state.search.isFocused;
export const selectIsSearching = (state: AppStore) => state.search.isSearching;

export const selectHasSearchResults = (state: AppStore) => 
  state.search.results.length > 0;

export const selectSearchResultById = (id: string) => (state: AppStore) =>
  state.search.results.find(result => result.id === id);

export const selectSuggestionById = (id: string) => (state: AppStore) =>
  state.search.suggestions.find(suggestion => suggestion.id === id);

export const selectRecentSearches = (limit: number = 5) => (state: AppStore) =>
  state.search.history.slice(0, limit);

export const useSearchQuery = () => useStore(selectSearchQuery);
export const useSearchSuggestions = () => useStore(selectSearchSuggestions);
export const useSearchResults = () => useStore(selectSearchResults);
export const useSearchHistory = () => useStore(selectSearchHistory);
export const useSearchFocused = () => useStore(selectSearchFocused);
export const useIsSearching = () => useStore(selectIsSearching);