'use client';

import React, { useRef, useState, useEffect } from 'react';
import { StoryItem } from '@/components/molecules';
// Import default stories from centralized mock data
import { mockStories as defaultStories } from '@/__mocks__/dashboard/stories';

export interface Story {
  id: string;
  imageUrl: string;
  label: string;
  isViewed?: boolean;
}

interface StoriesPanelProps {
  stories?: Story[];
  onStoryClick?: (storyId: string) => void;
  className?: string;
}

export function StoriesPanel({
  stories = defaultStories,
  onStoryClick,
  className = '',
}: StoriesPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Initialize gradient visibility based on expected initial state
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(stories.length > 3); // Only show if content overflows

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftGradient(scrollLeft > 0);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleStoryClick = (story: Story) => {
    onStoryClick?.(story.id);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Fade gradients - extend to edges for visual effect */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F1F1F1] via-[#F1F1F1]/50 to-transparent z-10 pointer-events-none" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F1F1F1] via-[#F1F1F1]/50 to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container - no padding as Dashboard already adds px-4 */}
      <div
        ref={scrollContainerRef}
        className="
          flex flex-row gap-2 
          overflow-x-auto
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x',
          scrollBehavior: 'auto',
        }}
      >
        {/* Story items */}
        {stories.map((story) => (
          <StoryItem
            key={story.id}
            id={story.id}
            imageUrl={story.imageUrl}
            label={story.label}
            isViewed={story.isViewed}
            onClick={() => handleStoryClick(story)}
          />
        ))}

        {/* No right padding needed as no horizontal padding */}
      </div>
    </div>
  );
}