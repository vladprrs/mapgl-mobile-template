'use client';

import React from 'react';
import { FriendAvatars, OrganizationTabs, type TabItem } from '@/components/molecules';
import { Button, Icon, RatingStars } from '@/components/atoms';
import { tokens } from '@/lib/ui/tokens';
import useStore from '@/stores';

interface OrganizationHeaderProps {
  isCollapsed?: boolean;
  onClose?: () => void;
  className?: string;
  tabs?: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
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
  className = '',
  tabs = [],
  activeTab = 'overview',
  onTabChange
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
    closingStatus,
    isAdvertiser
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
        paddingTop: '6px', // 6px - equivalent to pt-1.5 for drag handle space
        paddingBottom: 0,
      }}
    >

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
                    className="flex flex-row items-center gap-2"
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
                    
                    {/* Crown badge for advertisers */}
                    {isAdvertiser && (
                      <div 
                        className="flex-shrink-0"
                        style={{
                          width: '16px',
                          height: '16px',
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 5.5L4 10h8l1.5-4.5L11 7l-3-1.5L5 7L2.5 5.5z"
                            fill="#FFD700"
                          />
                          <path
                            d="M4 10h8v1.5c0 0.276-0.224 0.5-0.5 0.5h-7c-0.276 0-0.5-0.224-0.5-0.5V10z"
                            fill="#FFA500"
                          />
                          <circle cx="5" cy="4" r="0.5" fill="#FFD700" />
                          <circle cx="8" cy="3" r="0.5" fill="#FFD700" />
                          <circle cx="11" cy="4" r="0.5" fill="#FFD700" />
                        </svg>
                      </div>
                    )}
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
                  className="flex-1 flex flex-row items-center justify-start"
                >
                  <RatingStars
                    rating={rating}
                    maxStars={5}
                    size={16}
                    showNumber={true}
                    reviewCount={reviewCount}
                    theme="Light"
                  />
                </div>
              )}

              {/* Travel time with icon */}
              <div 
                className="flex flex-row gap-1 items-center justify-start"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2L9.5 6.5H14L10.5 9.5L12 14L8 11L4 14L5.5 9.5L2 6.5H6.5L8 2Z"
                    fill={tokens.colors.text.secondary}
                  />
                </svg>
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
                    color: closingStatus.isWarning ? tokens.colors.traffic.heavy : tokens.colors.text.primary,
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

          {/* AD block for advertisers */}
          {isAdvertiser && (
            <div 
              className="flex flex-row items-center justify-start"
              style={{
                width: '100%',
                paddingTop: tokens.spacing[2], // 8px
              }}
            >
              <div 
                className="flex flex-row items-center gap-2 px-2 py-1 rounded"
                style={{
                  backgroundColor: 'rgba(20, 20, 20, 0.05)',
                }}
              >
                <div 
                  className="w-4 h-4 rounded bg-primary flex items-center justify-center"
                  style={{
                    backgroundColor: tokens.colors.primary.DEFAULT,
                  }}
                >
                  <span 
                    className="text-white text-xs font-bold"
                    style={{
                      fontSize: '10px',
                      lineHeight: '12px',
                    }}
                  >
                    AD
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{
                    color: tokens.colors.text.secondary,
                    fontSize: '11px',
                    lineHeight: '14px',
                    fontFamily: 'SB Sans Text, sans-serif',
                  }}
                >
                  Реклама
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs section - integrated into header */}
      {!isCollapsed && tabs.length > 0 && onTabChange && (
        <div 
          className="bg-white border-t"
          style={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor: 'rgba(137,137,137,0.3)',
          }}
        >
          <OrganizationTabs
            activeTab={activeTab}
            onTabChange={onTabChange}
            tabs={tabs}
          />
        </div>
      )}
    </div>
  );
}