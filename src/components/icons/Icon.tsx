'use client';

import React from 'react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

/**
 * Generic Icon component that renders SVG icons
 * Can either use inline SVG or load from file
 */
export function Icon({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '',
  strokeWidth = 1.5 
}: IconProps) {
  // For now, we'll use inline SVGs
  // Later this can be extended to load from files or use a sprite sheet
  
  const iconStyle = {
    width: size,
    height: size,
    color,
  };

  // Icon definitions - will be moved to separate file
  const icons: Record<string, React.ReactNode> = {
    search: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <circle 
          cx="11" 
          cy="11" 
          r="8" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M21 21L16.65 16.65" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    menu: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <path 
          d="M3 6H21" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round"
        />
        <path 
          d="M3 12H21" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round"
        />
        <path 
          d="M3 18H21" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round"
        />
      </svg>
    ),
    home: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <path 
          d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M9 22V12H15V22" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    work: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <rect 
          x="2" 
          y="7" 
          width="20" 
          height="14" 
          rx="2" 
          stroke="currentColor" 
          strokeWidth={strokeWidth}
        />
        <path 
          d="M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle 
          cx="12" 
          cy="14" 
          r="1" 
          fill="currentColor"
        />
      </svg>
    ),
    bookmark: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <path 
          d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
    location: (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={iconStyle}
      >
        <path 
          d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <circle 
          cx="12" 
          cy="10" 
          r="3" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return <>{icons[name] || null}</>;
}