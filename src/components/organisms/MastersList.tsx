'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Text } from '@/components/atoms';
import { MasterCard } from '@/components/molecules';
import type { Master } from '@/__mocks__/masters/data';

interface MastersListProps {
  masters: Master[];
  onMasterClick?: (master: Master) => void;
  className?: string;
  title?: string;
  emptyMessage?: string;
}

/**
 * MastersList Organism
 * Renders a vertical list of master cards with proper spacing
 * 
 * Features:
 * - Vertical scrollable list layout
 * - Optional title and empty state message
 * - Consistent spacing between cards
 * - Handles master selection via onClick
 */
export function MastersList({
  masters,
  onMasterClick,
  className = '',
  title,
  emptyMessage = 'Мастеров пока нет'
}: MastersListProps) {
  const handleMasterClick = (master: Master) => {
    if (onMasterClick) {
      onMasterClick(master);
    }
  };

  return (
    <div
      className={`masters-list ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {/* Title */}
      {title && (
        <Text
          as="h2"
          style={{
            fontSize: tokens.typography.fontSize.xl, // 18px
            fontWeight: tokens.typography.fontWeight.semibold, // 600
            color: tokens.colors.text.primary,
            lineHeight: '24px',
            margin: 0,
            marginBottom: tokens.spacing[4], // 16px
          }}
        >
          {title}
        </Text>
      )}

      {/* Masters List */}
      {masters.length > 0 ? (
        <div
          style={{
            backgroundColor: tokens.colors.background.secondary, // Gray background
            borderRadius: tokens.borders.radius.lg,
            padding: tokens.spacing[4], // 16px padding around the list
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: tokens.spacing[3], // 12px between cards
              width: '100%',
            }}
          >
            {masters.map((master) => (
              <div
                key={master.id}
                style={{
                  backgroundColor: tokens.colors.background.primary, // White card background
                  borderRadius: tokens.borders.radius.lg,
                  overflow: 'hidden', // Ensure rounded corners are respected
                }}
              >
                <MasterCard
                  master={master}
                  onClick={handleMasterClick}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `${tokens.spacing[8]} ${tokens.spacing[4]}`, // 32px 16px
            backgroundColor: tokens.colors.background.secondary,
            borderRadius: tokens.borders.radius.lg,
          }}
        >
          <Text
            as="p"
            style={{
              fontSize: tokens.typography.fontSize.base, // 14px
              fontWeight: tokens.typography.fontWeight.normal, // 400
              color: tokens.colors.text.secondary,
              textAlign: 'center',
              margin: 0,
            }}
          >
            {emptyMessage}
          </Text>
        </div>
      )}
    </div>
  );
}