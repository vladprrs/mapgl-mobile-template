
'use client';

import React from 'react';
import Image from 'next/image';
import { ICON_SVGS } from '@/lib/icons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Icon component that renders exact SVG icons extracted from Figma
 * Icons maintain their natural aspect ratio and padding within the container
 */
export function Icon({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = ''
}: IconProps) {
  
  // Container style - fixed size
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  };

  // Exact icon definitions from Figma designs with their natural viewBoxes
  const icons: Record<string, React.ReactNode> = {
    // Search icon from Figma (19x19 natural size, centered in 24x24)
    search: (
      <svg 
        width="19" 
        height="19" 
        viewBox="0 0 19 19" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5ZM7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C9.21054 15 10.7873 14.4274 12.0491 13.4633L17.2929 18.7071L18.7071 17.2929L13.4633 12.0491C14.4274 10.7873 15 9.21054 15 7.5C15 3.35786 11.6421 0 7.5 0Z" 
          fill={color}
        />
      </svg>
    ),
    // Menu icon from Figma (18x14 natural size, centered in 24x24)
    menu: (
      <svg 
        width="18" 
        height="14" 
        viewBox="0 0 18 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M18 2H0V0H18V2ZM18 8H0V6H18V8ZM0 14H18V12H0V14Z" 
          fill={color}
        />
      </svg>
    ),
    // Home icon from Figma (22x19 natural size, centered in 24x24)
    home: (
      <svg 
        width="22" 
        height="19" 
        viewBox="0 0 22 19" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M0 8.62938V6.62938L9.92625 0.312677C10.5814 -0.104226 11.4186 -0.104226 12.0738 0.312677L22 6.62938V8.62938C22 9.18167 21.5523 9.62938 21 9.62938H19V15.6294C19 17.2862 17.6569 18.6294 16 18.6294H6C4.34315 18.6294 3 17.2862 3 15.6294V9.62938H1C0.447715 9.62938 0 9.18167 0 8.62938ZM11 2L2.15383 7.62938H19.8462L11 2ZM5 9.62938V15.6294C5 16.1817 5.44772 16.6294 6 16.6294H7V14.6286C7 12.9713 8.34363 11.6294 10 11.6294H12C13.6569 11.6294 15 12.9725 15 14.6294V16.6294H16C16.5523 16.6294 17 16.1817 17 15.6294V9.62938H5ZM13 14.6294V16.6294H9V14.6286C9 14.0768 9.44723 13.6294 10 13.6294H12C12.5523 13.6294 13 14.0771 13 14.6294Z" 
          fill={color}
        />
      </svg>
    ),
    // Work/Briefcase icon from Figma (20x18 natural size, centered in 24x24)
    work: (
      <svg 
        width="20" 
        height="18" 
        viewBox="0 0 20 18" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          d="M13 4V3C13 2.44772 12.5523 2 12 2H8C7.44772 2 7 2.44772 7 3V4H13ZM2 15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V11H15V13H13V11H7V13H5V11H2V15ZM3 6C2.44772 6 2 6.44772 2 7V9H18V7C18 6.44772 17.5523 6 17 6H3ZM17 4C18.6569 4 20 5.34315 20 7V15C20 16.6569 18.6569 18 17 18H3C1.34315 18 0 16.6569 0 15V7C0 5.34315 1.34315 4 3 4H5V3C5 1.34315 6.34315 0 8 0H12C13.6569 0 15 1.34315 15 3V4H17Z" 
          fill={color}
        />
      </svg>
    ),
    // Bookmark icon from Figma (14x19 natural size, centered in 24x24)
    bookmark: (
      <svg 
        width="14" 
        height="19" 
        viewBox="0 0 14 19" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M0 3C0 1.34315 1.34315 0 3 0H11C12.6569 0 14 1.34315 14 3V18.618L7 15.118L0 18.618V3ZM3 2C2.44772 2 2 2.44772 2 3V15.382L7 12.882L12 15.382V3C12 2.44772 11.5523 2 11 2H3Z" 
          fill={color}
        />
      </svg>
    ),
    // Location icon (keeping generic as no exact Figma version found yet)
    location: (
      <svg 
        width="21" 
        height="22" 
        viewBox="0 0 21 22" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          d="M20 9C20 16 10.5 22 10.5 22C10.5 22 1 16 1 9C1 6.61305 1.94821 4.32387 3.63604 2.63604C5.32387 0.94821 7.61305 0 9.5 0C11.8869 0 14.1761 0.94821 15.864 2.63604C17.5518 4.32387 19 6.61305 19 9Z" 
          stroke={color} 
          strokeWidth={1.5} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle 
          cx="10.5" 
          cy="9" 
          r="3" 
          stroke={color} 
          strokeWidth={1.5} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    // Close/X icon (14x14 natural size, centered in 24x24)
    close: (
      <svg 
        width="14" 
        height="14" 
        viewBox="0 0 14 14" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" 
          fill={color}
        />
      </svg>
    ),
    // Navigation/route icon for AddressCard
    navigation: (
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0Z" 
          fill={color}
        />
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M8.55279 6.10557C8.83431 5.82405 9.29289 5.82405 9.57441 6.10557L13.5744 10.1056C13.8559 10.3871 13.8559 10.8457 13.5744 11.1272L9.57441 15.1272C9.29289 15.4087 8.83431 15.4087 8.55279 15.1272C8.27126 14.8457 8.27126 14.3871 8.55279 14.1056L11.6584 11L8.55279 7.89443C8.27126 7.61291 8.27126 7.15433 8.55279 6.87281Z" 
          fill={color}
        />
        <path 
          d="M6 11C6.55228 11 7 10.5523 7 10C7 9.44772 6.55228 9 6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11Z" 
          fill={color}
        />
      </svg>
    ),
    // Chain/link icon for chain suggestions
    chain: (
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          d="M7.5 12.5L12.5 7.5M9.16667 6.66667L10.8333 5C11.5 4.33333 12.5 4.33333 13.1667 5L15 6.83333C15.6667 7.5 15.6667 8.5 15 9.16667L13.3333 10.8333M6.66667 9.16667L5 10.8333C4.33333 11.5 4.33333 12.5 5 13.1667L6.83333 15C7.5 15.6667 8.5 15.6667 9.16667 15L10.8333 13.3333" 
          stroke={color} 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    // Category icon (folder/grid representation)
    category: (
      <svg 
        width="20" 
        height="18" 
        viewBox="0 0 20 18" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: 'block' }}
      >
        <path 
          d="M0 3C0 1.34315 1.34315 0 3 0H7.58579C8.11622 0 8.62493 0.210714 9 0.585786L10.4142 2H17C18.6569 2 20 3.34315 20 5V15C20 16.6569 18.6569 18 17 18H3C1.34315 18 0 16.6569 0 15V3ZM3 2C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V5C18 4.44772 17.5523 4 17 4H9.58579C9.05536 4 8.54665 3.78929 8.17157 3.41421L6.75736 2H3Z" 
          fill={color}
        />
      </svg>
    ),
    // Traffic icons (simple circle indicators)
    'traffic-heavy': (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
        <circle cx="6" cy="6" r="5" fill={color} />
      </svg>
    ),
    'traffic-moderate': (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
        <circle cx="6" cy="6" r="5" fill={color} />
      </svg>
    ),
    'traffic-light': (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
        <circle cx="6" cy="6" r="5" fill={color} />
      </svg>
    ),
    // Star icon for ratings
    'star-filled': (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
        <path
          d="M8 1L9.854 5.146L14.5 5.5L11.25 8.5L12.208 13.5L8 11L3.792 13.5L4.75 8.5L1.5 5.5L6.146 5.146L8 1Z"
          fill={color}
        />
      </svg>
    ),
    // Robot icon for AI suggestions
    robot: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: 'block' }}>
        <rect x="5" y="6" width="10" height="8" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
        <rect x="6.5" y="4" width="7" height="3" rx="1.5" stroke={color} strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="9" r="1" fill={color}/>
        <circle cx="12" cy="9" r="1" fill={color}/>
        <path d="M8 11.5H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 3V4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M5 8H3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 8H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 14V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 14V16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };

  // Wrap icon in container div with fixed dimensions
  return (
    <div style={containerStyle} className={className}>
      {icons[name] ?? (() => {
        const normalized = name.toUpperCase().replace(/-/g, '_');
        const path = (ICON_SVGS as Record<string, string>)[normalized];
        if (path && path.trim() !== '') {
          return (
            <Image
              src={path}
              alt=""
              width={size}
              height={size}
              className="w-full h-full object-contain"
              unoptimized
            />
          );
        }
        return null;
      })()}
    </div>
  );
}