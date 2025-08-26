'use client';

import React from 'react';
import { StoreImageStack, Icon, Text } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';

interface StoreHeaderProps {
  name: string;
  images: string[];
  deliveryTime: string;
  rating: number;
  rideTime?: string;
  hasAward?: boolean;
  storeId?: string;
}

export function StoreHeader({ name, images, deliveryTime, rating, rideTime, hasAward, storeId }: StoreHeaderProps) {
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
        {/* Store Name with Award Badge */}
        <div className="flex items-center gap-2 mb-1">
          <Text
            className="font-semibold leading-5"
            style={{
              fontSize: '16px',
              fontWeight: 600, // Semibold
              color: tokens.colors.text.primary,
            }}
          >
            {name}
          </Text>
          {hasAward && (
            <Icon 
              name="crown"
              size={16}
              color="#FFD700" // Gold crown
            />
          )}
        </div>
        
        {/* Delivery Info */}
        <div className="flex flex-col gap-1 mb-2">
          <Text
            className="leading-[18px]"
            style={{
              fontSize: '14px',
              fontWeight: 400, // Regular
              color: tokens.colors.text.secondary,
            }}
          >
            {deliveryTime}
          </Text>
          {rideTime && (
            <div className="flex items-center gap-1">
              {storeId === 'ozon' && (
                <div 
                  className="inline-flex items-center px-2 py-0.5"
                  style={{
                    backgroundColor: '#005BFF',
                    borderRadius: '4px',
                  }}
                >
                  <Text
                    className="leading-4"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {rideTime}
                  </Text>
                </div>
              )}
              {storeId !== 'ozon' && (
                <Text
                  className="leading-4"
                  style={{
                    fontSize: '12px',
                    fontWeight: 400,
                    color: tokens.colors.text.tertiary,
                  }}
                >
                  {rideTime}
                </Text>
              )}
            </div>
          )}
        </div>
        
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