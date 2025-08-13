import useStore from '@/stores';
import { ScreenType } from '@/components/templates/types';

describe('Zustand Store', () => {
  beforeEach(() => {
    useStore.setState({
      search: {
        query: '',
        suggestions: [],
        results: [],
        history: [],
        isFocused: false,
        isSearching: false,
        setQuery: useStore.getState().search.setQuery,
        search: useStore.getState().search.search,
        loadSuggestions: useStore.getState().search.loadSuggestions,
        clearSearch: useStore.getState().search.clearSearch,
        setFocused: useStore.getState().search.setFocused,
        addToHistory: useStore.getState().search.addToHistory,
        clearHistory: useStore.getState().search.clearHistory,
        selectSuggestion: useStore.getState().search.selectSuggestion,
      },
      ui: {
        currentScreen: ScreenType.DASHBOARD,
        previousScreen: null,
        screenHistory: [ScreenType.DASHBOARD],
        bottomSheet: {
          snapPoint: 50,
          snapPoints: [10, 50, 90],
          isTransitioning: false,
          isDragging: false,
        },
        scrollEnabled: true,
        navigateTo: useStore.getState().ui.navigateTo,
        navigateBack: useStore.getState().ui.navigateBack,
        setBottomSheetSnap: useStore.getState().ui.setBottomSheetSnap,
        setBottomSheetDragging: useStore.getState().ui.setBottomSheetDragging,
        setBottomSheetTransitioning: useStore.getState().ui.setBottomSheetTransitioning,
        setScrollEnabled: useStore.getState().ui.setScrollEnabled,
        resetNavigation: useStore.getState().ui.resetNavigation,
      },
    });
  });

  describe('Search Slice', () => {
    it('should set search query', () => {
      const { search } = useStore.getState();
      search.setQuery('test query');
      
      expect(useStore.getState().search.query).toBe('test query');
    });

    it('should add to search history', () => {
      const { search } = useStore.getState();
      search.addToHistory('first search');
      search.addToHistory('second search');
      
      const history = useStore.getState().search.history;
      expect(history).toContain('first search');
      expect(history).toContain('second search');
    });

    it('should clear search state', () => {
      const { search } = useStore.getState();
      search.setQuery('test');
      search.clearSearch();
      
      const state = useStore.getState().search;
      expect(state.query).toBe('');
      expect(state.results).toEqual([]);
      expect(state.suggestions).toEqual([]);
    });
  });

  describe('UI Slice', () => {
    it('should navigate to screen', () => {
      const { ui } = useStore.getState();
      ui.navigateTo(ScreenType.SEARCH_RESULTS);
      
      const state = useStore.getState().ui;
      expect(state.currentScreen).toBe(ScreenType.SEARCH_RESULTS);
      expect(state.previousScreen).toBe(ScreenType.DASHBOARD);
    });

    it('should set bottom sheet snap point', () => {
      const { ui } = useStore.getState();
      ui.setBottomSheetSnap(90);
      
      expect(useStore.getState().ui.bottomSheet.snapPoint).toBe(90);
    });

    it('should navigate back', () => {
      const { ui } = useStore.getState();
      ui.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
      ui.navigateTo(ScreenType.SEARCH_RESULTS);
      ui.navigateBack();
      
      expect(useStore.getState().ui.currentScreen).toBe(ScreenType.SEARCH_SUGGESTIONS);
    });

    it('should reset navigation', () => {
      const { ui } = useStore.getState();
      ui.navigateTo(ScreenType.SEARCH_RESULTS);
      ui.resetNavigation();
      
      const state = useStore.getState().ui;
      expect(state.currentScreen).toBe(ScreenType.DASHBOARD);
      expect(state.screenHistory).toEqual([ScreenType.DASHBOARD]);
      expect(state.bottomSheet.snapPoint).toBe(50);
    });
  });

  describe('Cross-Slice Actions', () => {
    it('should focus search bar and navigate to suggestions', () => {
      const { actions } = useStore.getState();
      actions.focusSearchBar();
      
      const state = useStore.getState();
      expect(state.search.isFocused).toBe(true);
      expect(state.ui.currentScreen).toBe(ScreenType.SEARCH_SUGGESTIONS);
    });

    it('should clear all state', () => {
      const { actions, search, ui } = useStore.getState();
      
      search.setQuery('test');
      ui.navigateTo(ScreenType.SEARCH_RESULTS);
      
      actions.clearAllState();
      
      const state = useStore.getState();
      expect(state.search.query).toBe('');
      expect(state.ui.currentScreen).toBe(ScreenType.DASHBOARD);
    });
  });

  describe('Map Slice', () => {
    it('should start with loading state', () => {
      const { map } = useStore.getState();
      expect(map.isLoading).toBe(true);
      expect(map.instance).toBeNull();
    });

    it('should manage markers', () => {
      const { map } = useStore.getState();
      expect(map.markers.size).toBe(0);
      
      map.clearMarkers();
      expect(map.markers.size).toBe(0);
    });
  });
});