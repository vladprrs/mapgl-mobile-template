'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { Text, RatingStars, Button } from '@/components/atoms';
import { useActions } from '@/stores';
import type { Master } from '@/__mocks__/masters/data';

interface MasterCardProps {
  master: Master;
  onClick?: (master: Master) => void;
  className?: string;
}

/**
 * MasterCard Molecule
 * Professional service master card with photo, info, and action button
 * 
 * Features:
 * - Left: Master photo (80x80px rounded)
 * - Center: Name, profession, description, rating
 * - Right: "Подробнее" button
 * - Clean, professional styling with good visual hierarchy
 */
export function MasterCard({ 
  master, 
  onClick,
  className = '' 
}: MasterCardProps) {
  const actions = useActions();

  const handleClick = () => {
    if (onClick) {
      onClick(master);
    } else {
      // Default behavior: navigate to master details
      actions.selectMaster(master);
    }
  };

  return (
    <div
      className={`master-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: tokens.spacing[4], // 16px
        gap: tokens.spacing[3], // 12px
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Master Photo - Left */}
      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full">
        <Image
          src={master.photo}
          alt={`${master.name} - ${master.profession}`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          style={{
            backgroundColor: tokens.colors.background.secondary,
          }}
        />
      </div>

      {/* Master Info - Center */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
          gap: tokens.spacing[1], // 4px
        }}
      >
        {/* Name */}
        <Text
          as="h3"
          style={{
            fontSize: tokens.typography.fontSize.lg, // 16px
            fontWeight: tokens.typography.fontWeight.semibold, // 600
            color: tokens.colors.text.primary,
            lineHeight: '20px',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {master.name}
        </Text>

        {/* Profession */}
        <Text
          as="p"
          style={{
            fontSize: tokens.typography.fontSize.sm, // 12px
            fontWeight: tokens.typography.fontWeight.medium, // 500
            color: tokens.colors.text.secondary,
            lineHeight: '16px',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {master.profession}
        </Text>

        {/* Description */}
        <Text
          as="p"
          style={{
            fontSize: tokens.typography.fontSize.sm, // 12px
            fontWeight: tokens.typography.fontWeight.normal, // 400
            color: tokens.colors.text.secondary,
            lineHeight: '16px',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {master.description}
        </Text>

        {/* Rating */}
        <div
          style={{
            marginTop: tokens.spacing[1], // 4px
          }}
        >
          <RatingStars
            rating={master.rating}
            reviewCount={master.reviewCount}
            showNumber={true}
            theme="Light"
            size={14}
          />
        </div>
      </div>

      {/* Action Button - Right */}
      <div
        style={{
          flexShrink: 0,
          alignSelf: 'center',
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={handleClick}
          style={{
            fontSize: tokens.typography.fontSize.sm, // 12px
            fontWeight: tokens.typography.fontWeight.medium, // 500
            padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`, // 8px 12px
            borderRadius: tokens.borders.radius.md, // 8px
            backgroundColor: tokens.colors.background.secondary,
            color: tokens.colors.text.primary,
            border: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
}