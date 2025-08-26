'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BottomSheet, BottomSheetRef, SearchBar, SearchFilters, ChatBottomSheet } from '@/components/organisms';
import { CartNavbar } from '@/components/molecules';
import { ScreenRenderer } from '@/components/templates';
import { CartSheetPage, SamokatProductsPage } from '@/components/pages';
import { ScreenType } from '@/components/templates/types';
import { debugLog } from '@/lib/logging';
// tokens import removed - not used
import type { AdviceItem } from '@/__mocks__/advice/types';
import useStore from '@/stores';
import { useActions } from '@/stores';

interface MobileMapShellProps {
  className?: string;
  snapPoints?: [number, number, number];
  initialSnap?: number;
  onSnapChange?: (snap: number) => void;
  items?: AdviceItem[];
}

export function MobileMapShell({
  className = '',
  snapPoints = [10, 50, 90],
  initialSnap,
  onSnapChange,
  items,
}: MobileMapShellProps) {
  // Get state and actions directly from Zustand store
  const search = useStore((state) => state.search);
  const ui = useStore((state) => state.ui);
  const map = useStore((state) => state.map);
  const cart = useStore((state) => state.cart);
  const chat = useStore((state) => state.chat);
  const actions = useActions();
  
  // Create screen state object for compatibility
  const screenState = {
    currentScreen: ui.currentScreen,
    previousScreen: ui.previousScreen,
    history: ui.screenHistory,
  };
  
  const searchQuery = search.query;
  const adjustCenterForBottomSheet = map.adjustCenterForBottomSheet;
  
  // Action handlers
  const handleSearch = actions.performSearch;
  const handleSearchFocus = actions.focusSearchBar;
  const handleSearchBlur = actions.blurSearchBar;
  const handleSearchChange = search.setQuery;
  const handleClearSearch = () => {
    search.clearSearch();
    ui.navigateTo(ScreenType.DASHBOARD);
  };
  const [currentSnap, setCurrentSnap] = useState<number>(initialSnap ?? snapPoints[1]);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState<boolean>(false);
  const [cartViewMode, setCartViewMode] = useState<'cart' | 'success'>('cart');
  const [isSamokatOpen, setIsSamokatOpen] = useState<boolean>(false);
  const [samokatSearchQuery, setSamokatSearchQuery] = useState<string>('');
  const previousSnapRef = useRef<number>(initialSnap ?? snapPoints[1]);
  const pendingAdjustmentRef = useRef<{ old: number; new: number } | null>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const cartBottomSheetRef = useRef<BottomSheetRef>(null);
  const previousScreenRef = useRef<ScreenType>(screenState.currentScreen);
  const isAutoSnappingRef = useRef<boolean>(false);
  
  // Automatically adjust snap point ONLY when screen changes
  useEffect(() => {
    // Only trigger automatic snap if the screen actually changed
    if (previousScreenRef.current === screenState.currentScreen) {
      return;
    }
    
    previousScreenRef.current = screenState.currentScreen;
    
    let targetSnap: number;
    
    switch (screenState.currentScreen) {
      case ScreenType.SEARCH_SUGGESTIONS:
        // Expand to 90% for better visibility of suggestions
        targetSnap = 90;
        break;
      case ScreenType.SEARCH_RESULTS:
        // Expand to 90% for better visibility of search results
        targetSnap = 90;
        break;
      case ScreenType.ORGANIZATION_DETAILS:
        // Expand to 90% for organization details page
        targetSnap = 90;
        break;
      case ScreenType.ADDRESS_DETAILS:
        // Expand to 90% for address details page (same as organization)
        targetSnap = 90;
        break;
      case ScreenType.MASTER_DETAILS:
        // Expand to 90% for master details page
        targetSnap = 90;
        break;
      case ScreenType.MASTERS_LIST:
        // Expand to 90% for masters list page
        targetSnap = 90;
        break;
      case ScreenType.DASHBOARD:
      default:
        // Keep at 50% for dashboard (or use current position)
        targetSnap = 50;
        break;
    }
    
    // Only snap if the target is different from current position
    if (targetSnap !== currentSnap && bottomSheetRef.current) {
      debugLog(`Auto-adjusting snap point to ${targetSnap}% for ${screenState.currentScreen}`);
      isAutoSnappingRef.current = true;
      bottomSheetRef.current.snapTo(targetSnap);
      // Don't update currentSnap here - let handleSnapChange do it
    }
  }, [screenState.currentScreen, currentSnap]); // Include currentSnap but only use it for comparison
  
  // Execute pending adjustments when map becomes available
  useEffect(() => {
    if (map.instance && pendingAdjustmentRef.current) {
      adjustCenterForBottomSheet(pendingAdjustmentRef.current.old, pendingAdjustmentRef.current.new);
      pendingAdjustmentRef.current = null;
    }
  }, [map.instance, adjustCenterForBottomSheet]);

  const handleMenuClick = useCallback(() => {
    debugLog('Menu clicked');
    // Could open a menu screen in the future
  }, []);

  const handleVoiceClick = useCallback(() => {
    debugLog('Voice assistant clicked - opening AI chat');
    const currentQuery = search.query.trim();
    
    // Open chat overlay
    actions.openChat();
    
    // Add search query as first user message if it exists
    if (currentQuery) {
      debugLog('Adding search query to chat:', currentQuery);
      chat.addMessage({
        text: currentQuery,
        sender: 'user',
      });
    }
  }, [actions, search.query, chat]);

  const clearCart = useStore((state) => state.cart.clearCart);
  
  const handleCheckout = useCallback(() => {
    if (isCartSheetOpen && cartViewMode === 'cart') {
      // If cart sheet is open and in cart view, complete the order
      debugLog('Completing order, total:', cart.cart.total);
      clearCart();
      setCartViewMode('success');
    } else {
      // Otherwise, open cart sheet
      debugLog('Opening cart sheet, total:', cart.cart.total);
      setIsCartSheetOpen(true);
      setCartViewMode('cart');
    }
  }, [cart.cart.total, isCartSheetOpen, cartViewMode, clearCart]);

  const handleCartSheetClose = useCallback(() => {
    setIsCartSheetOpen(false);
    setCartViewMode('cart'); // Reset view mode when closing
  }, []);

  const handleSamokatOpen = useCallback((query?: string) => {
    setSamokatSearchQuery(query || 'Товары для фитнеса');
    setIsSamokatOpen(true);
    debugLog('Opening Samokat products page with query:', query);
  }, []);

  const handleSamokatClose = useCallback(() => {
    setIsSamokatOpen(false);
    debugLog('Closing Samokat products page');
  }, []);

  // Chat sheet handlers
  const handleChatBack = useCallback(() => {
    actions.closeChat();
  }, [actions]);

  const handleChatClose = useCallback(() => {
    actions.closeChat();
  }, [actions]);


  const handleSnapChange = useCallback((snap: number) => {
    // Update current snap state
    setCurrentSnap(snap);
    
    // Check if this was an automatic snap (triggered by screen change)
    if (isAutoSnappingRef.current) {
      isAutoSnappingRef.current = false;
      // For automatic snaps, we still want to adjust the map center
    }
    
    // Adjust map center to keep the same point visible
    if (previousSnapRef.current !== snap) {
      if (map.instance) {
        adjustCenterForBottomSheet(previousSnapRef.current, snap);
      } else {
        // Queue adjustment for when map becomes available
        pendingAdjustmentRef.current = { old: previousSnapRef.current, new: snap };
      }
      previousSnapRef.current = snap;
    }
    
    // Call the original onSnapChange if provided
    if (onSnapChange) {
      onSnapChange(snap);
    }
  }, [adjustCenterForBottomSheet, onSnapChange, map.instance]);

  // Determine the search bar variant based on current screen
  const getSearchBarVariant = () => {
    switch (screenState.currentScreen) {
      case ScreenType.SEARCH_RESULTS:
        return 'results';
      case ScreenType.SEARCH_SUGGESTIONS:
        return 'suggest';
      case ScreenType.ORGANIZATION_DETAILS:
      case ScreenType.ADDRESS_DETAILS:
      case ScreenType.MASTER_DETAILS:
      case ScreenType.MASTERS_LIST:
        return 'results'; // Hide search bar for organization/address/master details and masters list
      default:
        return 'dashboard';
    }
  };

  // Determine header background based on screen - use solid color to prevent artifacts
  const getHeaderBackground = () => {
    return (screenState.currentScreen === ScreenType.SEARCH_RESULTS || 
            screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS ||
            screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
            screenState.currentScreen === ScreenType.MASTER_DETAILS ||
            screenState.currentScreen === ScreenType.MASTERS_LIST) ? '#F1F1F1' : 'white';
  };

  // Determine content background based on screen
  const getContentBackground = () => {
    return (screenState.currentScreen === ScreenType.SEARCH_RESULTS || 
            screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS ||
            screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
            screenState.currentScreen === ScreenType.MASTER_DETAILS ||
            screenState.currentScreen === ScreenType.MASTERS_LIST) ? '#F1F1F1' : 'white';
  };

  // Determine header content based on screen
  const getHeaderContent = () => {
    // No header for ORGANIZATION_DETAILS or ADDRESS_DETAILS - pages handle their own headers
    return null;
  };

  // Determine sticky header content based on screen
  const getStickyHeaderContent = () => {
    if (screenState.currentScreen === ScreenType.ORGANIZATION_DETAILS || 
        screenState.currentScreen === ScreenType.ADDRESS_DETAILS ||
        screenState.currentScreen === ScreenType.MASTER_DETAILS ||
        screenState.currentScreen === ScreenType.MASTERS_LIST) {
      return null;
    }
    return (
      <div className="sticky-header-content">
        <SearchBar
          onSearch={handleSearch}
          onMenuClick={handleMenuClick}
          onVoiceClick={handleVoiceClick}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          value={searchQuery}
          variant={getSearchBarVariant()}
        />
        {screenState.currentScreen === ScreenType.SEARCH_RESULTS && (
          <SearchFilters />
        )}
      </div>
    );
  };

  // Use BottomSheet wrapper for all screens for consistency
  return (
    <div className="relative h-full">
      {/* Main BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        className={className}
        snapPoints={snapPoints}
        initialSnap={initialSnap}
        onSnapChange={handleSnapChange}
        headerBackground={getHeaderBackground()}
        contentBackground={getContentBackground()}
        header={getHeaderContent()}
        stickyHeader={getStickyHeaderContent()}
      >
        <ScreenRenderer items={items} onSamokatOpen={handleSamokatOpen} />
      </BottomSheet>

      {/* Cart BottomSheet Overlay - appears above main sheet */}
      {isCartSheetOpen && (
        <div 
          className="fixed inset-0 z-[60]"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
          onClick={(e) => {
            // Close if clicking the backdrop
            if (e.target === e.currentTarget) {
              handleCartSheetClose();
            }
          }}
        >
          <BottomSheet
            ref={cartBottomSheetRef}
            className="z-[60]"
            snapPoints={[0, 90, 90]}
            initialSnap={1}
            headerBackground="transparent"
            contentBackground="transparent"
            onSnapChange={(snap) => {
              // Close sheet if snapped to 0
              if (snap === 0) {
                handleCartSheetClose();
              }
            }}
          >
            <CartSheetPage 
              isOpen={isCartSheetOpen}
              onClose={handleCartSheetClose}
              viewMode={cartViewMode}
              onViewModeChange={setCartViewMode}
            />
          </BottomSheet>
        </div>
      )}

      {/* CartNavbar - OVER everything with highest z-index */}
      <CartNavbar
        totalAmount={cart.cart.total}
        itemCount={cart.cart.count}
        isVisible={(cart.cart.count > 0 || (isCartSheetOpen && cartViewMode === 'cart')) && cartViewMode !== 'success'}
        isInCartView={isCartSheetOpen && cartViewMode === 'cart'}
        onCheckout={handleCheckout}
      />

      {/* AI Chat BottomSheet Overlay - highest z-index [70] */}
      <ChatBottomSheet
        isOpen={chat.isChatOpen}
        onClose={handleChatClose}
        onBack={handleChatBack}
        onSamokatOpen={handleSamokatOpen}
      />
      
      {/* Samokat Products Overlay */}
      <SamokatProductsPage
        isOpen={isSamokatOpen}
        onClose={handleSamokatClose}
        searchQuery={samokatSearchQuery}
      />
    </div>
  );
}

