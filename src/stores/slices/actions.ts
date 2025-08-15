'use client';

import type { StateCreator } from 'zustand';
import type { AppStore, CrossSliceActions, SearchResult, SearchSuggestion } from '../types';
import { ScreenType } from '@/components/templates/types';
import { debugLog } from '@/lib/logging';
import type { Master } from '@/__mocks__/masters/data';

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
      if (result.coords) {
        await get().map.addMarker(result.id, result.coords, {
          icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
        });
      }
    }
    
    if (results.length > 0) {
      const firstResult = results[0];
      if (firstResult.coords) {
        get().map.centerOnLocation(firstResult.coords, 15);
      }
    }
  },

  selectLocation: (location: SearchResult | SearchSuggestion) => {
    debugLog('Selecting location:', location);
    
    if (!location.coords) {
      // Handle SearchSuggestion or SearchResult without coords
      const searchQuery = 'title' in location ? location.title : location.name;
      get().actions.performSearch(searchQuery);
      return;
    }
    
    get().map.clearMarkers();
    
    get().map.addMarker(location.id, location.coords, {
      icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
    });
    
    get().map.centerOnLocation(location.coords, 16);
    
    get().ui.setBottomSheetSnap(10);
    
    set((state) => {
      // Update query based on location type
      state.search.query = 'title' in location ? location.title : location.name;
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

  selectOrganization: (organization: SearchResult) => {
    debugLog('Selecting organization:', organization);
    
    // Set current organization/address in store (reuse organization slice)
    get().organization.setCurrentOrganization(organization);
    
    // Navigate to appropriate details screen based on type
    if (organization.type === 'address') {
      get().ui.navigateTo(ScreenType.ADDRESS_DETAILS);
    } else {
      get().ui.navigateTo(ScreenType.ORGANIZATION_DETAILS);
    }
    
    // Center map on organization/address if it has coordinates
    if (organization.coords) {
      get().map.clearMarkers();
      get().map.addMarker(organization.id, organization.coords, {
        icon: 'https://docs.2gis.com/img/mapgl/marker.svg',
      });
      get().map.centerOnLocation(organization.coords, 16);
    }
  },

  toggleFilter: (filterId: string) => {
    debugLog('Toggling filter:', filterId);
    
    get().search.toggleFilter(filterId);
  },

  selectMaster: (master: unknown) => {
    const masterData = master as Master;
    debugLog('Selecting master:', masterData);
    
    // Set master as current organization in store (reuse organization slice)
    get().organization.setCurrentOrganization(masterData as unknown as SearchResult);
    
    // Navigate to master details screen
    get().ui.navigateTo(ScreenType.MASTER_DETAILS);
  },

  showMastersList: () => {
    debugLog('Showing masters list');
    
    // Navigate to masters list screen
    get().ui.navigateTo(ScreenType.MASTERS_LIST);
  },

  openChat: () => {
    debugLog('Opening AI chat');
    
    // Open chat overlay
    get().chat.openChat();
  },

  closeChat: () => {
    debugLog('Closing AI chat');
    
    // Close chat overlay
    get().chat.closeChat();
  },
});