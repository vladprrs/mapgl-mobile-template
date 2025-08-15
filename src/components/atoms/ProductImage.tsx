'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface ProductImageProps {
  src: string;
  alt: string;
  size?: number; // default 142
  className?: string;
}

export function ProductImage({ src, alt, size = 142, className }: ProductImageProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundColor: '#f1f1f1', // Gray background for loading state
        border: '1px solid rgba(137,137,137,0.3)', // Exact border from Figma
        borderRadius: tokens.borders.radius.md, // 8px
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        loading="lazy" // Lazy loading for performance
      />
    </div>
  );
}