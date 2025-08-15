'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Button, Icon, Text } from '@/components/atoms';

interface AddressCardProps {
  address: string;
  distance?: string;
  travelTime?: string;
  onNavigate?: () => void;
}

export function AddressCard({
  address,
  distance,
  travelTime,
  onNavigate,
}: AddressCardProps) {
  const secondaryText = [distance, travelTime].filter(Boolean).join(' • ');

  return (
    <div
      style={{
        backgroundColor: tokens.colors.background.primary,
        borderRadius: tokens.borders.radius.lg,
        padding: tokens.spacing[4],
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacing[3],
      }}
    >
      {/* Address content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          style={{
            fontSize: tokens.typography.fontSize.base,
            fontWeight: tokens.typography.fontWeight.normal,
            color: tokens.colors.text.primary,
            marginBottom: secondaryText ? tokens.spacing[1] : 0,
            wordBreak: 'break-word',
          }}
        >
          {address}
        </Text>
        {secondaryText && (
          <Text
            style={{
              fontSize: tokens.typography.fontSize.sm,
              color: tokens.colors.text.secondary,
              fontWeight: tokens.typography.fontWeight.normal,
            }}
          >
            {secondaryText}
          </Text>
        )}
      </div>

      {/* Navigate button */}
      {onNavigate && (
        <Button
          onClick={onNavigate}
          style={{
            backgroundColor: 'rgba(20, 20, 20, 0.06)',
            border: 'none',
            borderRadius: tokens.borders.radius.md,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
          aria-label="Navigate to address"
        >
          <Icon
            name="navigation"
            size={24}
            color={tokens.colors.text.primary}
          />
        </Button>
      )}
    </div>
  );
}