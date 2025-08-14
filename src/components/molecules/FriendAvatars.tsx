'use client';

import React from 'react';
import Image from 'next/image';
import { tokens } from '@/lib/ui/tokens';

interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface FriendAvatarsProps {
  friends: Friend[];
  maxVisible?: number;
  size?: number;
  theme?: 'Light' | 'Dark';
  showRating?: boolean;
  additionalCount?: number;
}

export function FriendAvatars({
  friends,
  maxVisible = 4,
  size = 24,
  showRating = true,
  additionalCount,
}: FriendAvatarsProps) {
  if (friends.length === 0) {
    return null;
  }

  const visibleFriends = friends.slice(0, maxVisible);
  const overflowCount = additionalCount || Math.max(0, friends.length - maxVisible);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: tokens.spacing[1], // 4px gap from Figma
        padding: `${tokens.spacing[1]} 0`, // 4px top/bottom padding
        height: `${size}px`,
      }}
    >
      {/* Overlapping Avatars */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          height: `${size}px`,
        }}
      >
        {visibleFriends.map((friend, index) => (
          <div
            key={friend.id}
            style={{
              position: 'relative',
              width: `${size / 2}px`, // 12px for 24px avatars - 50% overlap
              height: `${size}px`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: tokens.borders.radius.lg, // 12px for rounded square
                overflow: 'hidden',
                border: '0.5px solid rgba(137, 137, 137, 0.3)', // Exact border from Figma
                backgroundColor: tokens.colors.background.primary,
                zIndex: visibleFriends.length - index, // First avatar has highest z-index
              }}
            >
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={size}
                height={size}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                unoptimized
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.avatar-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'avatar-fallback';
                    fallback.style.cssText = `
                      width: 100%;
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      background-color: ${tokens.colors.ui.buttonSecondary};
                      color: ${tokens.colors.text.primary};
                      font-size: 10px;
                      font-weight: ${tokens.typography.fontWeight.semibold};
                    `;
                    fallback.textContent = friend.name.charAt(0).toUpperCase();
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* +N Rating Badge - Only show if there are additional friends */}
      {showRating && overflowCount > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: `${size}px`,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              backgroundColor: '#1ba136', // Exact green from Figma
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '3px 6px', // 3px vertical, 6px horizontal from Figma
              borderRadius: '100px', // Pill shape
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontFamily: 'SB Sans Text, sans-serif',
                fontWeight: 400, // Medium from Figma
                fontSize: '14px',
                lineHeight: '18px',
                letterSpacing: '-0.28px',
                color: '#ffffff',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              +{overflowCount}
            </div>
            <div
              style={{
                height: '0.001px',
                width: '12px', // Min width
                flexShrink: 0,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}