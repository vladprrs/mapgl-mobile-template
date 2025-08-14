'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { Text, RatingStars, Button } from '@/components/atoms';
import type { Master } from '@/__mocks__/masters/data';

interface MasterDetailsHeaderProps {
  master: Master;
  onBackClick?: () => void;
  className?: string;
}

/**
 * MasterDetailsHeader Organism
 * Header for master details page with large photo, info, and back button
 * 
 * Features:
 * - Large circular master photo (120x120px)
 * - Master name, profession, and rating
 * - Years of experience and completed jobs stats
 * - Back button for navigation
 * - Clean, professional layout
 */
export function MasterDetailsHeader({ 
  master, 
  onBackClick,
  className = '' 
}: MasterDetailsHeaderProps) {
  return (
    <div
      className={`master-details-header ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: tokens.colors.background.primary,
        padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`, // 24px vertical, 16px horizontal
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Back Button - Top Left */}
      {onBackClick && (
        <div
          style={{
            position: 'absolute',
            top: tokens.spacing[4], // 16px
            left: tokens.spacing[4], // 16px
            zIndex: 10,
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackClick}
            style={{
              padding: tokens.spacing[2], // 8px
              borderRadius: tokens.borders.radius.full,
              backgroundColor: 'rgba(20, 20, 20, 0.06)',
              color: tokens.colors.text.primary,
              border: 'none',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ←
          </Button>
        </div>
      )}

      {/* Master Photo - Large Circle */}
      <div
        className="flex-shrink-0 overflow-hidden rounded-full"
        style={{
          width: '120px',
          height: '120px',
          marginBottom: tokens.spacing[4], // 16px
        }}
      >
        <Image
          src={master.photo}
          alt={`${master.name} - ${master.profession}`}
          width={120}
          height={120}
          className="w-full h-full object-cover"
          style={{
            backgroundColor: tokens.colors.background.secondary,
          }}
        />
      </div>

      {/* Master Name */}
      <Text
        as="h1"
        style={{
          fontSize: tokens.typography.fontSize.xl, // 18px
          fontWeight: tokens.typography.fontWeight.semibold, // 600
          color: tokens.colors.text.primary,
          lineHeight: '24px',
          margin: 0,
          marginBottom: tokens.spacing[1], // 4px
          textAlign: 'center',
        }}
      >
        {master.name}
      </Text>

      {/* Profession */}
      <Text
        as="p"
        style={{
          fontSize: tokens.typography.fontSize.base, // 14px
          fontWeight: tokens.typography.fontWeight.normal, // 400
          color: tokens.colors.text.secondary,
          lineHeight: '18px',
          margin: 0,
          marginBottom: tokens.spacing[3], // 12px
          textAlign: 'center',
        }}
      >
        {master.profession}
      </Text>

      {/* Rating */}
      <div
        style={{
          marginBottom: tokens.spacing[4], // 16px
        }}
      >
        <RatingStars
          rating={master.rating}
          reviewCount={master.reviewCount}
          showNumber={true}
          theme="Light"
          size={20}
        />
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: tokens.spacing[6], // 24px
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Years of Experience */}
        {master.yearsOfExperience && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing[1], // 4px
            }}
          >
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.semibold, // 600
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                margin: 0,
              }}
            >
              {master.yearsOfExperience}
            </Text>
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.sm, // 12px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.secondary,
                lineHeight: '16px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              {master.yearsOfExperience === 1 ? 'год опыта' : 
               master.yearsOfExperience < 5 ? 'года опыта' : 'лет опыта'}
            </Text>
          </div>
        )}

        {/* Completed Jobs */}
        {master.completedJobs && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: tokens.spacing[1], // 4px
            }}
          >
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.semibold, // 600
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                margin: 0,
              }}
            >
              {master.completedJobs}
            </Text>
            <Text
              as="span"
              style={{
                fontSize: tokens.typography.fontSize.sm, // 12px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.secondary,
                lineHeight: '16px',
                margin: 0,
                textAlign: 'center',
              }}
            >
              выполненных{'\n'}работ
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}