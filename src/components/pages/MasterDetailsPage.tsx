'use client';

import React from 'react';
import { tokens } from '@/lib/ui/tokens';
import { Text } from '@/components/atoms';
import { ReviewCard, ContactInfo } from '@/components/molecules';
import { MasterDetailsHeader } from '@/components/organisms';
import useStore from '@/stores';
// ScreenType import removed - not used directly in component
import type { Master } from '@/__mocks__/masters/data';

interface MasterDetailsPageProps {
  className?: string;
}

/**
 * MasterDetailsPage Component
 * Complete master profile page with header, description, reviews, and call button
 * 
 * Features:
 * - MasterDetailsHeader with large photo and stats
 * - Master description section
 * - Reviews list with ReviewCard components
 * - Fixed call-to-action button at bottom
 * - Back navigation to previous screen
 */
export function MasterDetailsPage({
  className = '',
}: MasterDetailsPageProps) {
  
  // Get current master from organization slice (reusing for masters)
  const currentMaster = useStore((state) => state.organization.currentOrganization) as Master | null;
  
  const handleBackClick = () => {
    const ui = useStore.getState().ui;
    ui.navigateBack();
  };


  // Loading state
  if (!currentMaster) {
    return (
      <div className={`master-details-page min-h-full bg-background-primary flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading master details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`master-details-page flex flex-col h-full ${className}`}>
      {/* Header */}
      <MasterDetailsHeader 
        master={currentMaster}
        onBackClick={handleBackClick}
      />

      {/* Content Area - Scrollable */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{
          backgroundColor: tokens.colors.background.secondary,
        }}
      >
        <div
          style={{
            padding: tokens.spacing[4], // 16px
          }}
        >
          {/* Contact Info Section */}
          <div
            style={{
              marginBottom: tokens.spacing[4], // 16px
            }}
          >
            <ContactInfo
              phone={currentMaster.phone}
              messengers={currentMaster.messengers}
              website={currentMaster.website}
              socialMedia={currentMaster.socialMedia}
            />
          </div>

          {/* Description Section */}
          <div
            style={{
              backgroundColor: tokens.colors.background.primary,
              borderRadius: tokens.borders.radius.lg,
              padding: tokens.spacing[4], // 16px
              marginBottom: tokens.spacing[4], // 16px
            }}
          >
            <Text
              as="h2"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.semibold, // 600
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                margin: 0,
                marginBottom: tokens.spacing[3], // 12px
              }}
            >
              О мастере
            </Text>
            
            <Text
              as="p"
              style={{
                fontSize: tokens.typography.fontSize.base, // 14px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                margin: 0,
              }}
            >
              {currentMaster.description}
            </Text>
          </div>

          {/* Reviews Section */}
          <div>
            <Text
              as="h2"
              style={{
                fontSize: tokens.typography.fontSize.lg, // 16px
                fontWeight: tokens.typography.fontWeight.semibold, // 600
                color: tokens.colors.text.primary,
                lineHeight: '20px',
                margin: 0,
                marginBottom: tokens.spacing[4], // 16px
              }}
            >
              Отзывы ({currentMaster.reviewCount})
            </Text>

            {/* Reviews List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: tokens.spacing[3], // 12px
              }}
            >
              {currentMaster.reviews && currentMaster.reviews.length > 0 ? (
                currentMaster.reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))
              ) : (
                <div
                  style={{
                    backgroundColor: tokens.colors.background.primary,
                    borderRadius: tokens.borders.radius.lg,
                    padding: `${tokens.spacing[6]} ${tokens.spacing[4]}`, // 24px vertical, 16px horizontal
                    textAlign: 'center',
                  }}
                >
                  <Text
                    as="p"
                    style={{
                      fontSize: tokens.typography.fontSize.base, // 14px
                      fontWeight: tokens.typography.fontWeight.normal, // 400
                      color: tokens.colors.text.secondary,
                      margin: 0,
                    }}
                  >
                    Отзывов пока нет
                  </Text>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}