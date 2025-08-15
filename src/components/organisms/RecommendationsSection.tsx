'use client';

import React from 'react';
import { RecommendationCard } from '@/components/molecules/RecommendationCard';
import { useActions } from '@/stores';

interface Recommendation {
  id: string;
  icon: string; // Image path to Figma-extracted asset
  title: string;
}

const mockRecommendations: Recommendation[] = [
  { id: '1', icon: '/assets/figma/icons/c5443c9b0d39ee0d86a9a663a17b3f2cc5c05af0.svg', title: 'Поесть' },
  { id: '2', icon: '/assets/figma/icons/5bbd729c4d66ffe9605baf28fedce95010a165cf.svg', title: 'Банкоматы' },
  { id: '3', icon: '/assets/figma/icons/58b4c95e38b9410447b0d379c29667cb42194242.svg', title: 'Катки' },
  { id: '4', icon: '/assets/figma/icons/4fa44d9eb250d553be8160f438c22620c295924e.svg', title: 'Аптеки' },
  { id: '5', icon: '/assets/figma/icons/8adb07d16b8ae139570779eedd1ad0d7024651e3.svg', title: 'Отели' },
  { id: '6', icon: '/assets/figma/icons/83921c4741ea1c0c421d5b412bf28d8175ca6c61.svg', title: 'Все рубрики' },
];

interface RecommendationsSectionProps {
  className?: string;
}

/**
 * RecommendationsSection Component
 * Horizontal scrollable section of recommendation cards for empty search state
 * 
 * Based on QuickAccessPanel scroll pattern with proper spacing from Figma:
 * - 16px horizontal padding (px-4) 
 * - 8px gap between cards (gap-2)
 * - Hidden scrollbar with smooth scrolling
 * - Cards are 88px wide with proper spacing
 */
export function RecommendationsSection({ className = '' }: RecommendationsSectionProps) {
  const actions = useActions();

  const handleRecommendationClick = (title: string) => {
    // Use cross-slice action to perform search and navigate
    actions.performSearch(title);
  };

  return (
    <div 
      className={`flex flex-col items-start justify-start pb-0 pt-0 px-0 relative w-full ${className}`}
    >
      {/* Horizontal scroll container */}
      <div 
        className="flex flex-row gap-2 items-start justify-start px-4 py-0 relative w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{
          scrollBehavior: 'auto',
        }}
      >
        {mockRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            id={recommendation.id}
            icon={recommendation.icon}
            title={recommendation.title}
            onClick={() => handleRecommendationClick(recommendation.title)}
          />
        ))}
        
        {/* Right padding for scroll */}
        <div className="shrink-0 w-0" />
      </div>
    </div>
  );
}