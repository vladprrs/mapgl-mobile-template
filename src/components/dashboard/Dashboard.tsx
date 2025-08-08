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
}

export function Dashboard({ 
  className = '',
  onSearch,
  items,
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
      {/* Search Bar and Quick Access Panel on white background */}
      <div className="bg-white">
        {/* Search Bar */}
        <SearchBar
          onSearch={handleSearch}
          onMenuClick={handleMenuClick}
          onVoiceClick={handleVoiceClick}
        />

        {/* Quick Access Panel - No top padding (SearchBar pb-3 + 4px = 16px total) */}
        <div className="pt-1 pb-4">
          <QuickAccessPanel onActionClick={handleQuickAction} />
        </div>
      </div>

      {/* Stories Panel and subsequent blocks on muted background */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: 'var(--bg-muted)' }}>
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