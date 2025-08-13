'use client';

import React from 'react';
import { CardContainer } from '@/components/atoms';
import Image from 'next/image';

interface StoryItemProps {
  id: string;
  image: string;
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
    <CardContainer
      variant="default"
      padding="none"
      radius="lg"
      onClick={onClick}
      className={`relative w-24 h-28 overflow-hidden flex-shrink-0 ${
        isViewed ? 'ring-1 ring-gray-300' : ''
      } ${className}`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover"
        sizes="96px"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-white text-xs font-medium line-clamp-2">
          {label}
        </p>
      </div>
      
      {/* Viewed Indicator */}
      {isViewed && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-gray-400 pointer-events-none" />
      )}
    </CardContainer>
  );
}