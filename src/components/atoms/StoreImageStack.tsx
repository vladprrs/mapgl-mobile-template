'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface StoreImageStackProps {
  images: string[];
  size?: number;
}

export function StoreImageStack({ images, size = 88 }: StoreImageStackProps) {
  // Ensure we have exactly 3 images, fallback to duplicates if needed
  const stackImages = images.slice(0, 3);
  while (stackImages.length < 3) {
    stackImages.push(stackImages[0] || '');
  }

  // Image properties for each layer
  const imageConfigs = [
    { rotation: 345, opacity: 0.2, zIndex: 1 },
    { rotation: 4, opacity: 0.5, zIndex: 2 },
    { rotation: 355, opacity: 1.0, zIndex: 3 },
  ];

  return (
    <div 
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      {stackImages.map((imageSrc, index) => {
        const config = imageConfigs[index];
        const imageSize = Math.round(size * 0.8); // Images are 80% of container size
        
        return (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotate(${config.rotation}deg)`,
              opacity: config.opacity,
              zIndex: config.zIndex,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: tokens.borders.radius.md,
                border: '2px solid white',
                backgroundColor: tokens.colors.background.primary,
              }}
            >
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}