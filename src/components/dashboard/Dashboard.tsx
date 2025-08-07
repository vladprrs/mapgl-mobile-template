'use client';

import React from 'react';
import { SearchBar } from './SearchBar';

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

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        onMenuClick={handleMenuClick}
        onVoiceClick={handleVoiceClick}
      />

      {/* Dashboard Content */}
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        {/* Placeholder for Quick Access Panel */}
        <div className="mb-4">
          <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            Quick Access Panel (Coming Soon)
          </div>
        </div>

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