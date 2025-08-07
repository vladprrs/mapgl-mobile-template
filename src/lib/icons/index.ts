/**
 * Central icon and asset mapping
 * This file contains all icon names and asset paths used in the application
 */

// Icon names for the Icon component
export const ICONS = {
  // UI Icons
  SEARCH: 'search',
  MENU: 'menu',
  
  // Navigation Icons
  HOME: 'home',
  WORK: 'work',
  BOOKMARK: 'bookmark',
  LOCATION: 'location',
  
  // Traffic Icons (to be added)
  TRAFFIC_HEAVY: 'traffic-heavy',
  TRAFFIC_MODERATE: 'traffic-moderate',
  TRAFFIC_LIGHT: 'traffic-light',
} as const;

// Image assets from Figma
export const IMAGES = {
  // Voice Assistant
  SALUT_ASSISTANT: '/assets/a10745cc0887a7d79c8328cd4679580095658d0a.png',
  
  // Story Cards (to be added when extracted)
  // STORY_CARD_1: '/assets/...',
  // STORY_CARD_2: '/assets/...',
  
  // Tips Illustrations (to be added when extracted)
  // TIP_ILLUSTRATION_1: '/assets/...',
  // TIP_ILLUSTRATION_2: '/assets/...',
} as const;

// Color tokens from Figma design system
export const COLORS = {
  // Surface colors
  SURFACE_01: '#141414',
  SURFACE_02: '#141414',
  
  // Background colors
  BACKGROUND_01: '#FFFFFF',
  BACKGROUND_02: '#FFFFFF',
  
  // Text colors
  TEXT_PRIMARY: '#141414',
  TEXT_SECONDARY: '#898989',
  
  // Button colors
  BUTTON_SECONDARY: '#141414',
  BUTTON_SECONDARY_BG: 'rgba(20, 20, 20, 0.06)',
  
  // Traffic colors
  TRAFFIC_HEAVY: '#F5373C',    // Red for heavy traffic
  TRAFFIC_MODERATE: '#EFA701',  // Yellow for moderate traffic
  TRAFFIC_LIGHT: '#1BA136',     // Green for light traffic
  
  // Other UI colors
  DRAG_HANDLE: 'rgba(137, 137, 137, 0.25)',
} as const;

// Font definitions from Figma
export const FONTS = {
  BODY: {
    family: 'SB Sans Text',
    size: 15,
    weight: 400,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  MEDIUM: {
    family: 'SB Sans Text',
    size: 15,
    weight: 500,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
} as const;

// Type exports
export type IconName = typeof ICONS[keyof typeof ICONS];
export type ImagePath = typeof IMAGES[keyof typeof IMAGES];
export type ColorToken = typeof COLORS[keyof typeof COLORS];