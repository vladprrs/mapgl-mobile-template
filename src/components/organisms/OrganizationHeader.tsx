'use client';

import React from 'react';
import { FriendAvatars } from '@/components/molecules';
import { Button, Icon } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';

interface OrganizationHeaderProps {
  isCollapsed?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * OrganizationHeader Component
 * Header for organization detail page with expanded/collapsed states
 * 
 * Design specs from Figma:
 * - Expanded: node-id 123-27101 (full header with friends, rating, address, etc.)
 * - Collapsed: node-id 123-26986 (minimal header with just title and close button)
 * - Smooth transitions between states based on scroll
 */
export function OrganizationHeader({
  isCollapsed = false,
  onClose,
  className = ''
}: OrganizationHeaderProps) {
  const organization = useStore((state) => state.organization.currentOrganization);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      // Default back navigation using ui slice
      const ui = useStore.getState().ui;
      ui.navigateBack();
    }
  };

  if (!organization) {
    return null;
  }

  // Extract data from organization
  const {
    name,
    category,
    address,
    rating,
    reviewCount,
    friendsVisited,
    closingStatus
  } = organization;

  if (isCollapsed) {
    // Collapsed header - minimal layout from Figma node 123-26986
    return (
      <div 
        className={`bg-white rounded-t-[16px] ${className}`}
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)', // From Figma: bg-[rgba(255,255,255,0.7)]
          paddingTop: 0,
          paddingBottom: tokens.spacing[3], // 12px
        }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-1.5 pb-1.5">
          <div 
            className="w-10 h-1 rounded-md" 
            style={{
              backgroundColor: 'rgba(137, 137, 137, 0.25)',
            }}
          />
        </div>

        {/* Nav bar */}
        <div className="flex flex-row gap-3 items-center px-4">
          {/* Title */}
          <div className="flex-1">
            <h1
              className="font-medium text-left text-nowrap"
              style={{
                color: tokens.colors.text.primary, // #141414
                fontSize: '19px', // From Figma: text-[19px]
                lineHeight: '24px', // From Figma: leading-[24px]
                letterSpacing: '-0.437px', // From Figma: tracking-[-0.437px]
                fontFamily: 'SB Sans Text, sans-serif',
              }}
            >
              {name}
            </h1>
          </div>

          {/* Close button - matches SearchBar styling */}
          <Button
            variant="icon"
            onClick={handleClose}
            className="w-10 h-10"
            style={{ 
              backgroundColor: 'rgba(20, 20, 20, 0.06)',
            }}
            aria-label="Закрыть"
          >
            <Icon name="close" size={24} color={tokens.colors.text.primary} />
          </Button>
        </div>
      </div>
    );
  }

  // Expanded header - full layout from Figma node 123-27101
  return (
    <div 
      className={`bg-white rounded-t-[16px] ${className}`}
      style={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-1.5 pb-1.5">
        <div 
          className="w-10 h-1 rounded-md" 
          style={{
            backgroundColor: 'rgba(20, 20, 20, 0.09)',
          }}
        />
      </div>

      {/* Main content */}
      <div 
        className="bg-white flex flex-col items-start justify-start overflow-hidden"
        style={{
          width: '100%',
        }}
      >
        <div 
          className="flex flex-col items-start justify-start"
          style={{
            paddingBottom: tokens.spacing[3], // 12px
            paddingTop: 0,
            paddingLeft: tokens.spacing[4], // 16px
            paddingRight: tokens.spacing[4], // 16px
            width: '100%',
          }}
        >
          {/* Top section */}
          <div 
            className="flex flex-row gap-2 items-start justify-start"
            style={{
              width: '100%',
            }}
          >
            {/* Content */}
            <div className="flex-1 flex flex-col items-start justify-start">
              {/* Friends section */}
              {friendsVisited && (
                <div 
                  className="flex flex-col gap-2.5 items-start justify-start"
                  style={{
                    width: '100%',
                  }}
                >
                  <div 
                    className="flex flex-row gap-1 items-start justify-start"
                    style={{
                      paddingTop: tokens.spacing[1], // 4px
                      paddingBottom: tokens.spacing[1], // 4px
                      width: '72px',
                    }}
                  >
                    <FriendAvatars
                      friends={friendsVisited.friends}
                      maxVisible={4}
                      size={24}
                      theme="Light"
                      showRating={false}
                    />
                  </div>
                </div>
              )}

              {/* Card header */}
              <div 
                className="flex flex-col items-start justify-center"
                style={{
                  width: '100%',
                }}
              >
                {/* Title */}
                <div className="flex flex-row items-start justify-start">
                  <div 
                    className="flex flex-row items-start justify-start"
                    style={{
                      paddingBottom: '1px',
                      paddingTop: '7px',
                    }}
                  >
                    <h1
                      className="font-medium text-left text-nowrap"
                      style={{
                        color: tokens.colors.text.primary, // #141414
                        fontSize: '19px', // From Figma: text-[19px]
                        lineHeight: '24px', // From Figma: leading-[24px]
                        letterSpacing: '-0.437px', // From Figma: tracking-[-0.437px]
                        fontFamily: 'SB Sans Text, sans-serif',
                      }}
                    >
                      {name}
                    </h1>
                  </div>
                </div>

                {/* Subtitle */}
                <div 
                  className="flex flex-col items-start justify-start"
                  style={{
                    width: '100%',
                  }}
                >
                  <div 
                    className="flex flex-row items-start justify-start"
                    style={{
                      paddingBottom: '3px',
                      paddingTop: '1px',
                      width: '100%',
                    }}
                  >
                    <p
                      className="flex-1 font-normal text-left"
                      style={{
                        color: tokens.colors.text.secondary, // #898989
                        fontSize: tokens.typography.fontSize.md, // 15px
                        lineHeight: '20px',
                        letterSpacing: '-0.3px',
                        fontFamily: 'SB Sans Text, sans-serif',
                        height: tokens.spacing[5], // 20px
                      }}
                    >
                      {category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Close button - matches SearchBar styling */}
            <Button
              variant="icon"
              onClick={handleClose}
              className="w-10 h-10"
              style={{ 
                backgroundColor: 'rgba(20, 20, 20, 0.06)',
              }}
              aria-label="Закрыть"
            >
              <Icon name="close" size={24} color={tokens.colors.text.primary} />
            </Button>
          </div>

          {/* Secondary line (rating) */}
          <div 
            className="flex flex-row items-start justify-start"
            style={{
              width: '100%',
            }}
          >
            <div 
              className="flex-1 flex flex-row gap-2 items-start justify-start"
            >
              {rating && (
                <div 
                  className="flex-1 flex flex-row gap-1 items-center justify-start"
                >
                  {/* Stars */}
                  <div className="flex flex-row items-start justify-start">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div 
                        key={star}
                        className="relative"
                        style={{
                          width: tokens.spacing[4], // 16px
                          height: tokens.spacing[4], // 16px
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: tokens.spacing[4], // 16px
                            height: tokens.spacing[4], // 16px
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            backgroundColor: star <= Math.floor(rating) ? '#efa701' : 'rgba(20,20,20,0.09)',
                            bottom: 0,
                            left: 0,
                            right: '50%',
                            top: 0,
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            backgroundColor: star <= Math.floor(rating) ? '#efa701' : 'rgba(20,20,20,0.09)',
                            bottom: 0,
                            left: '50%',
                            right: 0,
                            top: 0,
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Rating text */}
                  <div 
                    className="flex-1 flex flex-row gap-1.5 items-start justify-start"
                  >
                    <div 
                      className="flex flex-row items-start justify-start"
                      style={{
                        paddingTop: '1px',
                        paddingBottom: '1px',
                      }}
                    >
                      <p
                        className="font-medium text-left text-nowrap"
                        style={{
                          color: tokens.colors.text.primary, // #141414
                          fontSize: tokens.typography.fontSize.md, // 15px
                          lineHeight: '20px',
                          letterSpacing: '-0.3px',
                          fontFamily: 'SB Sans Text, sans-serif',
                        }}
                      >
                        {rating.toFixed(1)}
                      </p>
                    </div>
                    
                    {reviewCount && (
                      <div 
                        className="flex flex-row items-start justify-start"
                        style={{
                          paddingTop: '1px',
                          paddingBottom: '1px',
                        }}
                      >
                        <p
                          className="font-normal text-left"
                          style={{
                            color: tokens.colors.text.secondary, // #898989
                            fontSize: tokens.typography.fontSize.md, // 15px
                            lineHeight: '20px',
                            letterSpacing: '-0.3px',
                            fontFamily: 'SB Sans Text, sans-serif',
                            width: '128px',
                          }}
                        >
                          {reviewCount} оценок
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Travel time placeholder */}
              <div 
                className="flex flex-row gap-1 items-center justify-start"
              >
                <div 
                  style={{
                    width: tokens.spacing[4], // 16px
                    height: tokens.spacing[4], // 16px
                  }}
                />
                <div 
                  className="flex flex-row items-start justify-start"
                  style={{
                    paddingTop: '1px',
                    paddingBottom: '1px',
                  }}
                >
                  <p
                    className="font-medium text-left text-nowrap"
                    style={{
                      color: tokens.colors.text.secondary, // #898989
                      fontSize: tokens.typography.fontSize.md, // 15px
                      lineHeight: '20px',
                      letterSpacing: '-0.3px',
                      fontFamily: 'SB Sans Text, sans-serif',
                    }}
                  >
                    3 мин
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address line */}
          <div 
            className="flex flex-row gap-1 items-start justify-start"
            style={{
              width: '100%',
            }}
          >
            <div 
              className="flex-1 flex flex-row items-start justify-start"
              style={{
                paddingTop: '1px',
                paddingBottom: '1px',
              }}
            >
              <p
                className="flex-1 font-normal text-left"
                style={{
                  color: tokens.colors.text.primary, // #141414
                  fontSize: tokens.typography.fontSize.md, // 15px
                  lineHeight: '20px',
                  letterSpacing: '-0.3px',
                  fontFamily: 'SB Sans Text, sans-serif',
                }}
              >
                {address}
              </p>
            </div>
          </div>

          {/* Work time */}
          {closingStatus && (
            <div 
              className="flex flex-row items-start justify-start"
              style={{
                width: '100%',
              }}
            >
              <div 
                className="flex-1 flex flex-row items-start justify-start"
                style={{
                  paddingBottom: '1px',
                  paddingTop: '9px',
                }}
              >
                <p
                  className="font-medium text-left text-nowrap"
                  style={{
                    color: closingStatus.isWarning ? '#f5373c' : tokens.colors.text.primary,
                    fontSize: tokens.typography.fontSize.md, // 15px
                    lineHeight: '20px',
                    letterSpacing: '-0.3px',
                    fontFamily: 'SB Sans Text, sans-serif',
                  }}
                >
                  {closingStatus.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}