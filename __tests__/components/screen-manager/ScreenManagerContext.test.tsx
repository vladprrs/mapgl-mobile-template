import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { ScreenManagerProvider, useScreenManager } from '@/components/screen-manager/ScreenManagerContext';
import { ScreenType } from '@/components/screen-manager/types';

describe('ScreenManagerContext', () => {
  describe('ScreenManagerProvider', () => {
    it('provides default screen state', () => {
      const { result } = renderHook(() => useScreenManager(), {
        wrapper: ({ children }) => (
          <ScreenManagerProvider>{children}</ScreenManagerProvider>
        ),
      });

      expect(result.current.screenState.currentScreen).toBe(ScreenType.DASHBOARD);
      expect(result.current.screenState.screenHistory).toEqual([ScreenType.DASHBOARD]);
      expect(result.current.isTransitioning).toBe(false);
    });

    it('accepts custom initial screen', () => {
      const { result } = renderHook(() => useScreenManager(), {
        wrapper: ({ children }) => (
          <ScreenManagerProvider initialScreen={ScreenType.SEARCH_SUGGESTIONS}>
            {children}
          </ScreenManagerProvider>
        ),
      });

      expect(result.current.screenState.currentScreen).toBe(ScreenType.SEARCH_SUGGESTIONS);
      expect(result.current.screenState.screenHistory).toEqual([ScreenType.SEARCH_SUGGESTIONS]);
    });
  });

  describe('useScreenManager', () => {
    it('throws error when used outside provider', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        renderHook(() => useScreenManager());
      }).toThrow('useScreenManager must be used within a ScreenManagerProvider');
      
      consoleError.mockRestore();
    });

    describe('navigateTo', () => {
      it('navigates to a new screen', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
        });

        expect(result.current.screenState.currentScreen).toBe(ScreenType.SEARCH_SUGGESTIONS);
        expect(result.current.screenState.previousScreen).toBe(ScreenType.DASHBOARD);
        expect(result.current.screenState.screenHistory).toEqual([
          ScreenType.DASHBOARD,
          ScreenType.SEARCH_SUGGESTIONS,
        ]);
      });

      it('sets search query when navigating', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_RESULTS, 'test query');
        });

        expect(result.current.screenState.searchQuery).toBe('test query');
      });

      it('sets transitioning state during navigation', () => {
        jest.useFakeTimers();
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
        });

        expect(result.current.isTransitioning).toBe(true);

        act(() => {
          jest.advanceTimersByTime(300);
        });

        expect(result.current.isTransitioning).toBe(false);
        jest.useRealTimers();
      });
    });

    describe('navigateBack', () => {
      it('navigates to previous screen in history', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        // Navigate forward twice
        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
        });
        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_RESULTS);
        });

        // Navigate back
        act(() => {
          result.current.navigateBack();
        });

        expect(result.current.screenState.currentScreen).toBe(ScreenType.SEARCH_SUGGESTIONS);
        expect(result.current.screenState.previousScreen).toBe(ScreenType.SEARCH_RESULTS);
        expect(result.current.screenState.screenHistory).toEqual([
          ScreenType.DASHBOARD,
          ScreenType.SEARCH_SUGGESTIONS,
        ]);
      });

      it('does nothing when at initial screen', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        const initialState = result.current.screenState;
        
        act(() => {
          result.current.navigateBack();
        });

        expect(result.current.screenState).toEqual(initialState);
      });

      it('preserves search query when navigating back', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_RESULTS, 'test query');
        });

        act(() => {
          result.current.navigateBack();
        });

        expect(result.current.screenState.searchQuery).toBe('test query');
      });
    });

    describe('clearHistory', () => {
      it('resets to dashboard screen', () => {
        const { result } = renderHook(() => useScreenManager(), {
          wrapper: ({ children }) => (
            <ScreenManagerProvider>{children}</ScreenManagerProvider>
          ),
        });

        // Navigate through multiple screens
        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_SUGGESTIONS);
        });
        act(() => {
          result.current.navigateTo(ScreenType.SEARCH_RESULTS, 'query');
        });

        // Clear history
        act(() => {
          result.current.clearHistory();
        });

        expect(result.current.screenState.currentScreen).toBe(ScreenType.DASHBOARD);
        expect(result.current.screenState.screenHistory).toEqual([ScreenType.DASHBOARD]);
        expect(result.current.screenState.searchQuery).toBe('');
        expect(result.current.screenState.previousScreen).toBeUndefined();
      });
    });
  });
});