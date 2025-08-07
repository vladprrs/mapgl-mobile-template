'use client';

import React from 'react';
import { CoverProps } from './types';

/**
 * Cover Component
 * Featured collection cover showcasing compilations
 * 
 * Design specs from Figma:
 * - Default state: 116px height (single height in masonry)
 * - Big state: 244px height (double height in masonry)
 * - Rounded: 12px (rounded-xl)
 * - Background image with gradient overlay
 * - Title: 16px, Medium, -0.24px tracking, white
 * - Subtitle: 13px, Regular, -0.234px tracking, white
 * - Gradient: from rgba(0,0,0,0.6) to transparent via rgba(0,0,0,0.28) at 42%
 * - Border: 0.5px rgba(137,137,137,0.3)
 * - Light theme only (always white text on image)
 */
export function Cover({
  id,
  title,
  subtitle,
  imageUrl,
  collectionId,
  itemCount,
  author,
  state = 'Default',
  onClick,
  className = '',
}: CoverProps) {
  const handleClick = () => {
    console.log('Cover clicked:', { collectionId });
    onClick?.();
  };

  const isBig = state === 'Big';
  const height = isBig ? 'h-[244px]' : 'h-[116px]';

  // Format subtitle text
  const getSubtitleText = () => {
    const parts = [];
    if (subtitle) parts.push(subtitle);
    if (itemCount) parts.push(`${itemCount} ${itemCount === 1 ? 'место' : itemCount < 5 ? 'места' : 'мест'}`);
    if (author) parts.push(author);
    return parts.join(' · ');
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative w-full ${height}
        rounded-xl overflow-hidden
        transition-transform active:scale-95
        bg-white
        ${className}
      `}
      aria-label={`Collection: ${title}`}
      data-collection-id={collectionId}
      data-item-id={id}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Overlay - different for Default vs Big state */}
      {isBig ? (
        // Big state: simple dark overlay
        <div className="absolute inset-0 rounded-xl bg-black/40" />
      ) : (
        // Default state: gradient overlay
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.28) 42.336%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      )}

      {/* Text content */}
      <div className="absolute inset-0 px-4 pt-2.5 pb-0 flex flex-col">
        {/* Title */}
        <h3 className="font-medium text-[16px] leading-5 tracking-[-0.24px] text-white text-left">
          {title}
        </h3>
        
        {/* Subtitle/metadata */}
        {getSubtitleText() && (
          <p className="text-[13px] leading-4 tracking-[-0.234px] text-white text-left mt-0.5">
            {getSubtitleText()}
          </p>
        )}
      </div>

      {/* Border */}
      <div 
        className="absolute inset-0 border-[0.5px] border-[rgba(137,137,137,0.3)] rounded-xl pointer-events-none"
        aria-hidden="true"
      />
    </button>
  );
}