'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, CrossSliceActions, SearchResult, SearchSuggestion } from '../types';
import { ScreenType } from '@/components/templates/types';
import { debugLog } from '@/lib/logging';

export const createActions: StateCreator<
  AppStore,
  [['zustand/immer', never]],
  [],
  CrossSliceActions
> = (set, get) => ({
  performSearch: async (query: string) => {
    debugLog('Performing cross-slice search:', query);
    
    if (!query.trim()) {
      get().actions.clearAllState();
      return;
    }
    
    get().ui.navigateTo(ScreenType.SEARCH_RESULTS);
    
    await get().search.search(query);
    
    const results = get().search.results;
    get().map.clearMarkers();
    
    for (const result of results) {
      await get().map.addMarker(result.id, result.coords, {
        icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
      });
    }
    
    if (results.length > 0) {
      const firstResult = results[0];
      get().map.centerOnLocation(firstResult.coords, 15);
    }
  },

  selectLocation: (location: SearchResult | SearchSuggestion) => {
    debugLog('Selecting location:', location);
    
    if (!location.coords) {
      if ('title' in location) {
        get().actions.performSearch(location.title);
      }
      return;
    }
    
    get().map.clearMarkers();
    
    get().map.addMarker(location.id, location.coords, {
      icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
    });
    
    get().map.centerOnLocation(location.coords, 16);
    
    get().ui.setBottomSheetSnap(10);
    
    set((state) => {
      state.search.query = location.title;
    });
  },

  focusSearchBar: () => {
    debugLog('Focusing search bar');
    
    set((state) => {
      state.search.isFocused = true;
    });
    
    get().ui.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
    
    const currentQuery = get().search.query;
    get().search.loadSuggestions(currentQuery);
  },

  blurSearchBar: () => {
    debugLog('Blurring search bar');
    
    set((state) => {
      state.search.isFocused = false;
    });
    
    setTimeout(() => {
      const isFocused = get().search.isFocused;
      const currentScreen = get().ui.currentScreen;
      const query = get().search.query;
      
      if (!isFocused && currentScreen === ScreenType.SEARCH_SUGGESTIONS && !query) {
        get().ui.navigateTo(ScreenType.DASHBOARD);
      }
    }, 200);
  },

  clearAllState: () => {
    debugLog('Clearing all state');
    
    get().search.clearSearch();
    
    get().map.clearMarkers();
    
    get().ui.resetNavigation();
  },
});