'use client';

import React from 'react';
import { StoreImageStack, Icon, Text } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';

interface StoreHeaderProps {
  name: string;
  images: string[];
  deliveryTime: string;
  rating: number;
}

export function StoreHeader({ name, images, deliveryTime, rating }: StoreHeaderProps) {
  return (
    <div 
      className="flex items-start gap-3"
      style={{
        padding: tokens.spacing[2], // 8px
      }}
    >
      {/* Store Image Stack */}
      <StoreImageStack images={images} size={88} />
      
      {/* Store Info */}
      <div className="flex-1 min-w-0">
        {/* Store Name */}
        <Text
          className="font-semibold leading-5 mb-1"
          style={{
            fontSize: '16px',
            fontWeight: 600, // Semibold
            color: tokens.colors.text.primary,
          }}
        >
          {name}
        </Text>
        
        {/* Delivery Info */}
        <Text
          className="leading-[18px] mb-2"
          style={{
            fontSize: '14px',
            fontWeight: 400, // Regular
            color: tokens.colors.text.secondary,
          }}
        >
          {deliveryTime}
        </Text>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Icon 
            name="star-filled"
            size={16}
            color="#FFC107" // Gold star color
          />
          <Text
            className="leading-4"
            style={{
              fontSize: '14px',
              fontWeight: 500, // Medium
              color: tokens.colors.text.primary,
            }}
          >
            {rating.toFixed(1)}
          </Text>
        </div>
      </div>
    </div>
  );
}