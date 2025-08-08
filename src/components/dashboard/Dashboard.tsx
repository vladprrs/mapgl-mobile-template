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
}

export function Dashboard({ 
  className = '',
  onSearch,
  items,
  showSearchBar = true,
  showQuickAccess = true,
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

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Sticky Search Bar (fixed within sheet scroll container) */}
      {showSearchBar && (
        <div className="sticky top-0 z-20 bg-white">
          <SearchBar
            onSearch={handleSearch}
            onMenuClick={handleMenuClick}
            onVoiceClick={handleVoiceClick}
            noTopRadius
          />
        </div>
      )}

      {/* Quick Access Panel on white background, scrolls under the sticky search bar */}
      {showQuickAccess && (
        <div className="bg-white pt-1 pb-4">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      )}

      {/* Stories Panel and subsequent blocks on muted background */}
      <div style={{ backgroundColor: 'var(--bg-muted)' }}>
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