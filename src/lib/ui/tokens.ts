/**
 * Design Tokens System
 * Centralized design values for consistent styling across the application
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary Colors
  primary: {
    DEFAULT: '#2563EB', // blue-600
    hover: '#1D4ED8',   // blue-700
    active: '#1E40AF',  // blue-800
  },
  
  // Text Colors
  text: {
    primary: '#141414',
    secondary: '#898989',
    tertiary: '#B8B8B8',
    inverse: '#FFFFFF',
  },
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F1F1F1',
    tertiary: '#F7F7F7',
    overlay: 'rgba(20, 20, 20, 0.06)',
    overlayDark: 'rgba(20, 20, 20, 0.12)',
  },
  
  // Border Colors
  border: {
    DEFAULT: 'rgba(137, 137, 137, 0.3)',
    light: 'rgba(137, 137, 137, 0.15)',
    dark: 'rgba(137, 137, 137, 0.5)',
    transparent: 'transparent',
  },
  
  // UI Element Colors
  ui: {
    dragHandle: 'rgba(137, 137, 137, 0.25)',
    buttonSecondary: 'rgba(20, 20, 20, 0.06)',
    buttonSecondaryHover: 'rgba(20, 20, 20, 0.08)',
    buttonSecondaryActive: 'rgba(20, 20, 20, 0.10)',
  },
  
  // Traffic Colors
  traffic: {
    heavy: '#F5373C',   // Red
    moderate: '#EFA701', // Yellow
    light: '#1BA136',   // Green
  },
  
  // Status Colors
  status: {
    success: '#1BA136',
    warning: '#EFA701',
    error: '#F5373C',
    info: '#2563EB',
  },
  
  // Utility Colors
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  // Base unit = 4px
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    DEFAULT: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  },
  
  // Font Sizes
  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',
    md: '15px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '32px',
  },
  
  // Font Weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.38px',
    tight: '-0.3px',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

// ============================================================================
// BORDERS
// ============================================================================

export const borders = {
  // Border Radius
  radius: {
    none: '0',
    sm: '4px',
    DEFAULT: '8px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    full: '9999px',
  },
  
  // Border Width
  width: {
    0: '0px',
    DEFAULT: '1px',
    2: '2px',
    4: '4px',
  },
} as const;

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(37, 99, 235, 0.5)',
} as const;

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  // Durations
  duration: {
    fast: '150ms',
    DEFAULT: '300ms',
    slow: '500ms',
  },
  
  // Easings
  easing: {
    DEFAULT: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
} as const;

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
  0: 0,
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  auto: 'auto',
} as const;

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// EXPORT ALL TOKENS
// ============================================================================

export const tokens = {
  colors,
  spacing,
  typography,
  borders,
  shadows,
  transitions,
  zIndex,
  breakpoints,
} as const;

// Type exports for TypeScript
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type Typography = typeof typography;
export type Borders = typeof borders;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;
export type ZIndex = typeof zIndex;
export type Breakpoints = typeof breakpoints;
export type Tokens = typeof tokens;

// Default export
export default tokens;