'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onArrowClick?: () => void;
  showArrow?: boolean;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  onArrowClick, 
  showArrow = true 
}: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: tokens.spacing[2], // 8px
        paddingRight: tokens.spacing[4], // 16px
        gap: tokens.spacing[2], // 8px between text and arrow
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <h2
          style={{
            fontSize: '19px',
            fontWeight: tokens.typography.fontWeight.semibold, // 600
            color: tokens.colors.text.primary, // #141414
            lineHeight: '24px',
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: tokens.typography.fontSize.md, // 15px
              fontWeight: tokens.typography.fontWeight.normal, // 400
              color: tokens.colors.text.secondary, // #898989
              lineHeight: '20px',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      
      {showArrow && (
        <button
          onClick={onArrowClick}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: onArrowClick ? 'pointer' : 'default',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          disabled={!onArrowClick}
        >
          <Image
            src="/assets/figma/headers/7cf1e4d58af2a93f80580a9ffc627cf38f42fadc.svg"
            alt="Arrow"
            width={24}
            height={24}
            style={{ flexShrink: 0 }}
          />
        </button>
      )}
    </div>
  );
}