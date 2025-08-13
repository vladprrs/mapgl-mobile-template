'use client';

import useStore from '../index';
import { ScreenType } from '@/components/templates/types';

export function useScreenManagerCompat() {
  const search = useStore((state) => state.search);
  const ui = useStore((state) => state.ui);
  const actions = useStore((state) => state.actions);
  
  return {
    screenState: {
      currentScreen: ui.currentScreen,
      previousScreen: ui.previousScreen,
      history: ui.screenHistory,
    },
    searchQuery: search.query,
    searchFocused: search.isFocused,
    
    navigateTo: (screen: ScreenType, searchQuery?: string) => {
      if (searchQuery !== undefined) {
        search.setQuery(searchQuery);
      }
      ui.navigateTo(screen);
    },
    navigateBack: ui.navigateBack,
    clearHistory: ui.resetNavigation,
    
    handleSearch: actions.performSearch,
    handleSearchFocus: actions.focusSearchBar,
    handleSearchBlur: actions.blurSearchBar,
    handleSearchChange: search.setQuery,
    handleClearSearch: () => {
      search.clearSearch();
      ui.navigateTo(ScreenType.DASHBOARD);
    },
  };
}