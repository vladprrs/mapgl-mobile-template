'use client';

import React from 'react';

export interface StoryItemProps {
  id: string;
  imageUrl: string;
  label: string;
  isViewed?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * StoryItem component - Individual story card with image and label
 * Based on Figma design: 96x112px content with 4px padding = 120px total
 */
export function StoryItem({
  id,
  imageUrl,
  label,
  isViewed = false,
  onClick,
  className = '',
}: StoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative shrink-0 rounded-2xl 
        h-[120px] w-[104px]
        p-1
        outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        transition-transform active:scale-95
        overflow-hidden
        ${className}
      `}
      style={{
        // Use inset box-shadow for inside border when viewed
        boxShadow: isViewed ? 'inset 0 0 0 2px #1BA136' : undefined,
      }}
      aria-label={`Story: ${label}`}
      data-story-id={id}
    >
      {/* Inner content container */}
      <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-gray-900/[0.06]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        
        {/* Text label at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-1.5 pb-[5px] pt-[3px]">
          <p className="text-white text-[11px] leading-[14px] font-semibold tracking-[-0.176px] text-left line-clamp-2">
            {label}
          </p>
        </div>
        
        {/* Subtle inner border */}
        <div 
          className="absolute inset-0 rounded-xl border-[0.5px] border-gray-900/[0.3] pointer-events-none" 
          aria-hidden="true"
        />
      </div>
    </button>
  );
}