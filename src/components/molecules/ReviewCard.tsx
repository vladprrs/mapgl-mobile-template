'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Text, RatingStars } from '@/components/atoms';

export interface Review {
  id: string;
  customerName: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

/**
 * ReviewCard Molecule
 * Displays a customer review with name, date, rating, and review text
 * 
 * Features:
 * - Customer name and date in header
 * - Star rating display
 * - Review text with proper line breaks
 * - Clean, readable layout with proper spacing
 */
export function ReviewCard({ 
  review, 
  className = '' 
}: ReviewCardProps) {
  return (
    <div
      className={`review-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.colors.background.primary,
        borderRadius: tokens.borders.radius.lg,
        padding: tokens.spacing[4], // 16px
        gap: tokens.spacing[2], // 8px
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Name and Date */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text
          as="h4"
          style={{
            fontSize: tokens.typography.fontSize.base, // 14px
            fontWeight: tokens.typography.fontWeight.semibold, // 600
            color: tokens.colors.text.primary,
            lineHeight: '18px',
            margin: 0,
          }}
        >
          {review.customerName}
        </Text>
        
        <Text
          as="span"
          style={{
            fontSize: tokens.typography.fontSize.sm, // 12px
            fontWeight: tokens.typography.fontWeight.normal, // 400
            color: tokens.colors.text.secondary,
            lineHeight: '16px',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {review.date}
        </Text>
      </div>

      {/* Rating */}
      <div>
        <RatingStars
          rating={review.rating}
          showNumber={false}
          theme="Light"
          size={16}
        />
      </div>

      {/* Review Text */}
      <Text
        as="p"
        style={{
          fontSize: tokens.typography.fontSize.base, // 14px
          fontWeight: tokens.typography.fontWeight.normal, // 400
          color: tokens.colors.text.primary,
          lineHeight: '20px',
          margin: 0,
          whiteSpace: 'pre-wrap', // Preserve line breaks
        }}
      >
        {review.text}
      </Text>
    </div>
  );
}