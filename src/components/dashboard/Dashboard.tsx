'use client';

import React from 'react';
import { debugLog } from '@/lib/logging';
import { SearchBar } from './SearchBar';
import { QuickAccessPanel } from './QuickAccessPanel';
import { StoriesPanel } from './StoriesPanel';
import { AdviceSection } from './advice';
import type { AdviceItem } from './advice/types';

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

export function Dashboard({ 
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
      {/* Search Bar: sticky only when not within sheet */}
      {effectiveShowSearchBar && (
        <div className={withinSheet ? 'bg-white' : 'sticky top-0 z-20 bg-white'}>
          <SearchBar
            onSearch={handleSearch}
            onMenuClick={handleMenuClick}
            onVoiceClick={handleVoiceClick}
            noTopRadius
          />
        </div>
      )}

      {/* Quick Access Panel: remains inside content flow; hidden by default within sheet */}
      {effectiveShowQuickAccess && (
        <div className="bg-white pt-2 pb-4 border-b border-gray-100">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Stories Panel and subsequent blocks on muted background - edge-to-edge */}
      <div className="flex-1" style={{ backgroundColor: 'var(--bg-muted)' }}>
        {/* Stories Panel */}
        <div className="pt-4 pb-4">
          <StoriesPanel onStoryClick={handleStoryClick} />
        </div>

        {/* Advice Section */}
        <div className="pb-4">
          <AdviceSection 
            items={items ?? []}
            layout="mixed"
            onItemClick={handleAdviceClick}
          />
        </div>
      </div>
    </div>
  );
}