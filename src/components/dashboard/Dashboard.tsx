'use client';

import React from 'react';
import { SearchBar } from './SearchBar';
import { QuickAccessPanel } from './QuickAccessPanel';
import { StoriesPanel } from './StoriesPanel';
import { AdviceSection } from './advice';
import { mockAdviceItems } from './advice/mockData';
import type { AdviceItem } from './advice/types';

interface DashboardProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export function Dashboard({ 
  className = '',
  onSearch 
}: DashboardProps) {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    onSearch?.(query);
  };

  const handleMenuClick = () => {
    console.log('Menu clicked');
  };

  const handleVoiceClick = () => {
    console.log('Voice assistant clicked');
  };

  const handleQuickAction = (actionId: string) => {
    console.log('Quick action clicked:', actionId);
  };

  const handleStoryClick = (storyId: string) => {
    console.log('Story clicked:', storyId);
  };

  const handleAdviceClick = (item: AdviceItem) => {
    console.log('Advice item clicked:', item);
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

      {/* Stories Panel and subsequent blocks on #F1F1F1 background */}
      <div className="flex-1 bg-[#F1F1F1] overflow-y-auto">
        {/* Stories Panel */}
        <div className="pt-4 pb-4">
          <StoriesPanel onStoryClick={handleStoryClick} />
        </div>

        {/* Advice Section */}
        <div className="pb-4">
          <AdviceSection 
            items={mockAdviceItems}
            layout="mixed"
            onItemClick={handleAdviceClick}
          />
        </div>
      </div>
    </div>
  );
}