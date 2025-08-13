'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { SearchBar, QuickAccessPanel, StoriesPanel, AdviceSection } from '@/components/organisms';
import type { AdviceItem } from '@/__mocks__/advice/types';

interface DashboardProps {
  className?: string;
  onSearch?: (query: string) => void;
  items?: AdviceItem[];
  showSearchBar?: boolean;
  showQuickAccess?: boolean;
  /**
   * When rendered inside BottomSheet/SheetLayout, header is provided by the sheet.
   * In this mode, disable sticky positioning and hide header blocks by default.
   */
  withinSheet?: boolean;
}

export function DashboardPage({ 
  className = '',
  onSearch,
  items,
  showSearchBar = true,
  showQuickAccess = true,
  withinSheet = false,
}: DashboardProps) {
  const handleSearch = (query: string) => {
    debugLog('Search query:', query);
    onSearch?.(query);
  };

  const handleMenuClick = () => {
    debugLog('Menu clicked');
  };

  const handleVoiceClick = () => {
    debugLog('Voice assistant clicked');
  };

  const handleQuickAction = (actionId: string) => {
    debugLog('Quick action clicked:', actionId);
  };

  const handleStoryClick = (storyId: string) => {
    debugLog('Story clicked:', storyId);
  };

  const handleAdviceClick = (item: AdviceItem) => {
    debugLog('Advice item clicked:', item);
  };

  // If used within the sheet, default to hiding header parts and remove sticky behavior
  const effectiveShowSearchBar = withinSheet ? false : showSearchBar;
  const effectiveShowQuickAccess = withinSheet ? false : showQuickAccess;

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Search Bar: Figma spec - contained within header with pt-4 */}
      {effectiveShowSearchBar && (
        <div className={`bg-white ${withinSheet ? '' : 'sticky top-0 z-20'}`}>
          <SearchBar
            onSearch={handleSearch}
            onMenuClick={handleMenuClick}
            onVoiceClick={handleVoiceClick}
          />
        </div>
      )}

      {/* Quick Access Panel: Figma spec - py-4 vertical padding */}
      {effectiveShowQuickAccess && (
        <div className="bg-white py-4">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Stories Panel and subsequent blocks on muted background - Figma spec bg #F1F1F1 */}
      <div 
        className="flex-1 bg-[#f1f1f1]"
        style={{
          // Allow vertical drag gestures to pass through for bottom sheet dragging
          // This ensures consistent behavior across all dashboard content
          touchAction: 'pan-y',
        }}
      >
        {/* Stories Panel - Figma spec: pt-4 pb-4 px-4 */}
        <div className="pt-4 pb-4 px-4">
          <StoriesPanel onStoryClick={handleStoryClick} className="w-full" />
        </div>

        {/* Advice Section - Figma spec: px-4 pb-[60px] */}
        <div className="px-4 pb-[60px]">
          <AdviceSection 
            items={items ?? []}
            layout="mixed"
            onItemClick={handleAdviceClick}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}