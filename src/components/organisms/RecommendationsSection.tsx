'use client';

import React from 'react';
import { RecommendationCard } from '@/components/molecules/RecommendationCard';
import { useActions } from '@/stores';

interface Recommendation {
  id: string;
  icon: string;
  title: string;
}

const mockRecommendations: Recommendation[] = [
  { id: '1', icon: '🍽️', title: 'Рестораны' },
  { id: '2', icon: '💊', title: 'Аптеки' },
  { id: '3', icon: '☕', title: 'Кофейни' },
  { id: '4', icon: '🛒', title: 'Продукты' },
  { id: '5', icon: '⛽', title: 'АЗС' },
  { id: '6', icon: '🏥', title: 'Больницы' },
  { id: '7', icon: '🏪', title: 'Магазины' },
  { id: '8', icon: '🏦', title: 'Банки' },
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