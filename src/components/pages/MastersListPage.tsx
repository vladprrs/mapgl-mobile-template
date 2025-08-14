'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Text, Button } from '@/components/atoms';
import { MastersList } from '@/components/organisms';
import useStore from '@/stores';
import { useActions } from '@/stores';
import { mockMasters } from '@/__mocks__/masters/data';
import type { Master } from '@/__mocks__/masters/data';

interface MastersListPageProps {
  className?: string;
}

/**
 * MastersListPage Component
 * Dedicated page showing all nearby masters with navigation
 * 
 * Features:
 * - Simple header with back button
 * - Full list of masters using MastersList organism
 * - Gray background with white cards
 * - Navigation to individual master details
 * - Back navigation to search results
 */
export function MastersListPage({
  className = '',
}: MastersListPageProps) {
  const actions = useActions();
  
  const handleBackClick = () => {
    const ui = useStore.getState().ui;
    ui.navigateBack();
  };

  const handleMasterClick = (master: Master) => {
    // Navigate to master details page
    actions.selectMaster(master);
  };

  return (
    <div className={`masters-list-page flex flex-col h-full ${className}`}>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.colors.background.primary,
          padding: `${tokens.spacing[4]} ${tokens.spacing[4]}`, // 16px
          position: 'relative',
          borderBottom: `1px solid rgba(137,137,137,0.3)`,
        }}
      >
        {/* Back Button - Left */}
        <div
          style={{
            flexShrink: 0,
            marginRight: tokens.spacing[3], // 12px
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackClick}
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

        {/* Title - Center */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Text
            as="h1"
            style={{
              fontSize: tokens.typography.fontSize.xl, // 18px
              fontWeight: tokens.typography.fontWeight.semibold, // 600
              color: tokens.colors.text.primary,
              lineHeight: '24px',
              margin: 0,
              textAlign: 'center',
            }}
          >
            Мастера рядом
          </Text>
        </div>

        {/* Right spacer to balance the back button */}
        <div
          style={{
            width: '40px',
            height: '40px',
            flexShrink: 0,
            marginLeft: tokens.spacing[3], // 12px
          }}
        />
      </div>

      {/* Content Area - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: tokens.colors.background.secondary,
          padding: tokens.spacing[4], // 16px
        }}
      >
        <MastersList
          masters={mockMasters}
          onMasterClick={handleMasterClick}
          emptyMessage="Мастеров не найдено в этом районе"
        />
      </div>
    </div>
  );
}