'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';
import { Text, RatingStars } from '@/components/atoms';
import { FriendAvatars, ZMKBlock } from '@/components/molecules';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface ZMKProduct {
  id: string;
  image: string;
  title: string;
  price?: string;
}

export interface SearchResultCardProps {
  id: string;
  name: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  address: string;
  distance?: string;
  closingStatus?: {
    text: string;
    isWarning: boolean;
  };
  friendsVisited?: {
    friends: Friend[];
    rating: number;
    displayText?: string;
  };
  zmkData?: {
    products: ZMKProduct[];
  };
  coords?: [number, number];
  // Result type to distinguish between organizations and addresses
  type?: 'organization' | 'address';
  // Advertiser-specific fields
  isAdvertiser?: boolean;
  logo?: string;
  gallery?: string[]; // Array of image URLs for photo gallery
  promotionalText?: string;
  buttonLabel?: string;
  // Future extensibility fields
  hasLogo?: boolean;
  hasPhotos?: boolean;
  friendsReviews?: number;
  onClick?: () => void;
}

export function SearchResultCard({
  name,
  category,
  rating,
  reviewCount,
  address,
  distance,
  closingStatus,
  friendsVisited,
  zmkData,
  isAdvertiser = false,
  logo,
  gallery,
  promotionalText,
  buttonLabel,
  onClick,
}: SearchResultCardProps) {
  return (
    <div
      className={`${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      style={{
        backgroundColor: tokens.colors.background.primary,
        borderRadius: tokens.borders.radius.lg,
        padding: 0, // Remove padding for advertiser cards to match Figma
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden', // For rounded corners
      }}
    >
      {/* Gallery Section - Only for advertisers */}
      {isAdvertiser && gallery && gallery.length > 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          paddingTop: tokens.spacing[3], // 12px - matches Figma pt-3
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: tokens.spacing[1], // 4px
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            overflowX: 'auto',
            overflowY: 'hidden',
            paddingLeft: tokens.spacing[3], // 12px
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            width: '100%',
          }}>
            {gallery.slice(0, 6).map((image, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: tokens.colors.background.primary,
                  overflow: 'hidden',
                  borderRadius: tokens.borders.radius.md, // 8px
                  flexShrink: 0,
                  width: '88px', // Exact from Figma
                  height: '88px', // Exact from Figma
                }}
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={88}
                  height={88}
                  style={{
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: tokens.borders.radius.md,
                    border: '0.5px solid rgba(137,137,137,0.3)', // Exact from Figma
                  }}
                />
              </div>
            ))}
            {/* Spacer */}
            <div style={{ 
              borderRadius: '6px',
              alignSelf: 'stretch',
              flexShrink: 0,
              width: '24px'
            }} />
          </div>
        </div>
      )}

      {/* Content Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: tokens.spacing[4], // 16px
        paddingRight: tokens.spacing[4], // 16px
        paddingTop: tokens.spacing[3], // 12px
        paddingBottom: tokens.spacing[3], // 12px
        width: '100%',
      }}>
        {/* Top Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: tokens.spacing[2],
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
          }}>
            {/* Friends Section */}
            {friendsVisited && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px', // 2.5 spacing - matches Figma
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingBottom: tokens.spacing[1], // 4px
                paddingTop: 0,
                width: '319px', // Exact from Figma
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: tokens.spacing[1], // 4px
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingTop: tokens.spacing[1], // 4px
                  paddingBottom: tokens.spacing[1], // 4px
                }}>
                  <FriendAvatars 
                    friends={friendsVisited.friends}
                    maxVisible={4}
                    size={24}
                    theme="Light"
                    showRating={false} // Hide rating for advertiser friends
                  />
                </div>
              </div>
            )}

            {/* Header - Title with Crown for Advertisers */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '100%',
            }}>
              {/* Title Row */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 1,
                  minWidth: 0,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingTop: '2px', // 2px - matches Figma pt-0.5
                  paddingBottom: 0,
                }}>
                  <Text
                    as="h3"
                    style={{
                      fontSize: tokens.typography.fontSize.lg, // 16px
                      fontWeight: tokens.typography.fontWeight.semibold, // 600
                      color: tokens.colors.text.primary, // #141414
                      lineHeight: '20px', // Exact from Figma
                      letterSpacing: '-0.24px', // Exact from Figma
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {name}
                  </Text>
                  
                  {/* Crown/Badge for Advertisers */}
                  {isAdvertiser && (
                    <div style={{ 
                      marginLeft: tokens.spacing[2], // 8px spacing from title
                      flexShrink: 0 
                    }}>
                      <div style={{
                        backgroundColor: '#1ba136', // Green circle from Figma
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <div style={{
                          width: '8px',
                          height: '6px',
                          borderLeft: '2px solid white',
                          borderBottom: '2px solid white',
                          transform: 'rotate(-45deg)',
                          marginTop: '-1px',
                        }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Subtitle/Category */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 1,
                  minWidth: 0,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingTop: '2px', // 2px
                  paddingBottom: '6px', // 6px - matches Figma pb-1.5
                }}>
                  <Text
                    as="p"
                    style={{
                      fontSize: tokens.typography.fontSize.base, // 14px
                      fontWeight: tokens.typography.fontWeight.normal, // 400
                      color: tokens.colors.text.secondary, // #898989
                      lineHeight: '18px', // Exact from Figma
                      letterSpacing: '-0.28px', // Exact from Figma
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {category}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section - Only for advertisers */}
        {isAdvertiser && rating && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
            <RatingStars 
              rating={rating}
              reviewCount={reviewCount}
              showNumber={true}
              theme="Light"
            />
          </div>
        )}

        {/* Address Line */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: tokens.spacing[1], // 4px
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            minWidth: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: '2px', // 2px
            paddingBottom: '2px', // 2px
          }}>
            <Text
              as="p"
              style={{
                fontSize: tokens.typography.fontSize.base, // 14px
                fontWeight: tokens.typography.fontWeight.normal, // 400
                color: tokens.colors.text.primary, // #141414
                lineHeight: '18px', // Exact from Figma
                letterSpacing: '-0.28px', // Exact from Figma
                margin: 0,
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {isAdvertiser && promotionalText ? promotionalText : address}
            </Text>
          </div>

          {/* Distance/Ride Time */}
          {distance && (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: tokens.spacing[1], // 4px
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexShrink: 0,
            }}>
              <div style={{
                width: tokens.spacing[4], // 16px
                height: tokens.spacing[4], // 16px
                flexShrink: 0,
              }}>
                {/* Icon container - empty for now */}
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingTop: '2px', // 2px
                paddingBottom: '2px', // 2px
              }}>
                <Text
                  as="span"
                  style={{
                    fontSize: tokens.typography.fontSize.base, // 14px
                    fontWeight: tokens.typography.fontWeight.medium, // 500
                    color: tokens.colors.text.secondary, // #898989
                    lineHeight: '18px', // Exact from Figma
                    letterSpacing: '-0.28px', // Exact from Figma
                    whiteSpace: 'nowrap',
                  }}
                >
                  {distance}
                </Text>
              </div>
            </div>
          )}
        </div>

        {/* Work Time/Closing Status */}
        {closingStatus && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flex: 1,
              minWidth: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              paddingTop: '6px', // 6px - matches Figma pt-1.5
              paddingBottom: '2px', // 2px
            }}>
              <Text
                as="p"
                style={{
                  fontSize: tokens.typography.fontSize.base, // 14px
                  fontWeight: tokens.typography.fontWeight.medium, // 500
                  color: closingStatus.isWarning 
                    ? '#f5373c' // Exact from Figma critical color
                    : tokens.colors.text.secondary,
                  lineHeight: '18px', // Exact from Figma
                  letterSpacing: '-0.28px', // Exact from Figma
                  whiteSpace: 'nowrap',
                  margin: 0,
                }}
              >
                {closingStatus.text}
              </Text>
            </div>
          </div>
        )}
      </div>

      {/* Advertiser AD Section */}
      {isAdvertiser && (promotionalText || buttonLabel) && (
        <div style={{
          backgroundColor: tokens.colors.background.primary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          paddingBottom: '6px', // 6px - matches Figma pb-1.5
          paddingLeft: tokens.spacing[4], // 16px
          paddingRight: 0,
          paddingTop: 0,
          width: '100%',
        }}>
          <div style={{
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            gap: tokens.spacing[3], // 12px
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: tokens.spacing[4], // 16px
            paddingTop: tokens.spacing[2], // 8px
            width: '100%',
          }}>
            {/* Text Content */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
              {/* Promotional Text */}
              {promotionalText && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingBottom: tokens.spacing[1], // 4px
                  paddingTop: '2px', // 2px
                  width: '100%',
                }}>
                  <Text
                    as="p"
                    style={{
                      fontSize: tokens.typography.fontSize.base, // 14px
                      fontWeight: tokens.typography.fontWeight.normal, // 400
                      color: tokens.colors.text.primary, // #141414
                      lineHeight: '18px', // Exact from Figma
                      letterSpacing: '-0.28px', // Exact from Figma
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {promotionalText}
                  </Text>
                </div>
              )}

              {/* Fine Print */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingBottom: '3px', // 3px
                  paddingTop: '1px', // 1px
                  width: '100%',
                }}>
                  <Text
                    as="p"
                    style={{
                      fontSize: '11px', // Small text from Figma
                      fontWeight: tokens.typography.fontWeight.normal, // 400
                      color: '#b8b8b8', // Exact tertiary color from Figma
                      lineHeight: '14px', // Exact from Figma
                      letterSpacing: '-0.176px', // Exact from Figma
                      margin: 0,
                      flex: 1,
                      minWidth: 0,
                      height: '14px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Реклама • Есть противопоказания, нужна консультация врача
                  </Text>
                </div>
              </div>

              {/* Button */}
              {buttonLabel && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingTop: '6px', // 6px
                  paddingBottom: 0,
                  width: '100%',
                }}>
                  <div style={{
                    position: 'relative',
                    borderRadius: tokens.borders.radius.md, // 8px
                    flexShrink: 0,
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '6px', // 6px
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingLeft: '14px', // 14px
                        paddingRight: '14px', // 14px
                        paddingTop: '10px', // 10px
                        paddingBottom: '10px', // 10px
                        flexShrink: 0,
                      }}>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: tokens.spacing[2], // 8px
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                          <Text
                            as="span"
                            style={{
                              fontSize: '15px', // 15px from Figma
                              fontWeight: tokens.typography.fontWeight.semibold, // 600
                              color: '#5a5a5a', // Exact color from Figma
                              lineHeight: '20px', // Exact from Figma
                              letterSpacing: '-0.3px', // Exact from Figma
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {buttonLabel}
                          </Text>
                        </div>
                      </div>
                      {/* Purple gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        background: '#6833ff', // Purple color from Figma
                        inset: 0,
                        borderRadius: tokens.borders.radius.md,
                        // TODO: Add proper mask for gradient effect when available
                      }} />
                    </div>
                    {/* Border */}
                    <div style={{
                      position: 'absolute',
                      border: '2px solid rgba(20,20,20,0.06)', // Exact from Figma
                      borderRadius: tokens.borders.radius.md,
                      inset: 0,
                      pointerEvents: 'none',
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* Logo */}
            {logo && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingBottom: 0,
                paddingTop: tokens.spacing[1], // 4px
                alignSelf: 'stretch',
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '32px', // Full round
                  flexShrink: 0,
                  width: '40px', // Exact from Figma
                  height: '40px', // Exact from Figma
                }}>
                  <Image
                    src={logo}
                    alt="Advertiser logo"
                    width={40}
                    height={40}
                    style={{
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: '32px',
                      border: '0.5px solid rgba(137,137,137,0.3)', // Exact from Figma
                    }}
                  />
                </div>
              </div>
            )}

            {/* Inset shadow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              boxShadow: '0px 0.5px 0px 0px inset rgba(137,137,137,0.3)',
            }} />
          </div>
        </div>
      )}

      {/* ZMK Advertising Block - Only for non-advertiser cards */}
      {!isAdvertiser && zmkData && (
        <div style={{ paddingLeft: tokens.spacing[3], paddingRight: tokens.spacing[3] }}>
          <ZMKBlock 
            products={zmkData.products}
            maxProducts={4}
            theme="Light"
          />
        </div>
      )}
    </div>
  );
}