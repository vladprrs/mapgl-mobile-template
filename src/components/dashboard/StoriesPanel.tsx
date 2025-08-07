'use client';

import React, { useRef, useState, useEffect } from 'react';
import { StoryItem, type StoryItemProps } from './StoryItem';

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

// Default stories for demo
const defaultStories: Story[] = [
  {
    id: '1',
    imageUrl: '/assets/stories/d8d5249851401c81411a441573fe467750b6e049.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '2',
    imageUrl: '/assets/stories/cd1a0d93b746871ac856345bbbf8054a55131586.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '3',
    imageUrl: '/assets/stories/6db4130db09497160e078c4e5160e605753cdc52.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
  {
    id: '4',
    imageUrl: '/assets/stories/5738e1bc9a25d52bf21144f9c160f545681e96d7.png',
    label: 'Заголовок стоис три строки',
    isViewed: true,
  },
];

export function StoriesPanel({
  stories = defaultStories,
  onStoryClick,
  className = '',
}: StoriesPanelProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

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
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="
          flex flex-row gap-2 
          overflow-x-auto
          scroll-smooth
          px-4
          [&::-webkit-scrollbar]:hidden
          [-ms-overflow-style:none]
          [scrollbar-width:none]
        "
        style={{
          WebkitOverflowScrolling: 'touch',
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

        {/* Right padding for scroll */}
        <div className="w-4 shrink-0" aria-hidden="true" />
      </div>
    </div>
  );
}