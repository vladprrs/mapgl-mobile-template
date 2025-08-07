'use client';

import React from 'react';
import { SearchBar } from './SearchBar';
import { QuickAccessPanel } from './QuickAccessPanel';

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

  return (
    <div className={`flex flex-col h-full ${className}`}>
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

      {/* Dashboard Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        {/* Placeholder for Stories Panel */}
        <div className="mb-4">
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Stories Panel (Coming Soon)
          </div>
        </div>

        {/* Placeholder for Tips Block */}
        <div className="mb-4">
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Tips Block (Coming Soon)
          </div>
        </div>
      </div>
    </div>
  );
}