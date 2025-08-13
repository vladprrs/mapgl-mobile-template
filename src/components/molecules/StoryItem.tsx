'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import Image from 'next/image';

interface StoryItemProps {
  id: string;
  image?: string;
  label: string;
  isViewed?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StoryItem({
  image,
  label,
  isViewed = false,
  onClick,
  className = '',
}: StoryItemProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex-shrink-0 cursor-pointer ${className}`}
      style={{
        width: '104px', // Total width: 96px content + 4px gap + 4px border
        height: '120px', // Total height: 112px content + 4px gap + 4px border
      }}
    >
      {/* Outer Border Container - matches Figma structure */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden"
        style={{
          border: !isViewed ? `${tokens.borders.width[2]} solid ${tokens.colors.status.success}` : `${tokens.borders.width[2]} solid ${tokens.colors.border.dark}`,
          padding: '2px', // 2px padding gap (tokens don't have 2px, need exact spec)
        }}
      >
        {/* Inner Content Container - 96px × 112px */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            borderRadius: tokens.borders.radius.lg, // rounded-xl
            border: `0.5px solid ${tokens.colors.border.DEFAULT}`, // Inner border from Figma
            backgroundColor: tokens.colors.background.overlay,
          }}
        >
          {/* Background Image - fills the 96px × 112px content area */}
          {image && (
            <Image
              src={image}
              alt={label}
              fill
              className="object-cover"
              sizes="96px"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p 
              className="text-white font-semibold line-clamp-2"
              style={{
                fontSize: '11px',
                lineHeight: '14px',
                letterSpacing: '-0.176px',
              }}
            >
              {label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}