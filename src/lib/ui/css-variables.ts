/**
 * CSS Variables Generator
 * Converts design tokens to CSS custom properties for use in stylesheets
 */

import { tokens } from './tokens';

export function generateCSSVariables(): string {
  const cssVars: string[] = [];
  
  // Colors
  Object.entries(tokens.colors).forEach(([category, values]) => {
    if (typeof values === 'object') {
      Object.entries(values).forEach(([key, value]) => {
        const varName = `--color-${category}-${key}`.toLowerCase().replace(/_/g, '-');
        cssVars.push(`${varName}: ${value};`);
      });
    } else {
      const varName = `--color-${category}`.toLowerCase().replace(/_/g, '-');
      cssVars.push(`${varName}: ${values};`);
    }
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars.push(`--spacing-${key}: ${value};`);
  });
  
  // Typography
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`--font-size-${key}: ${value};`);
  });
  
  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`--font-weight-${key}: ${value};`);
  });
  
  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars.push(`--line-height-${key}: ${value};`);
  });
  
  Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
    cssVars.push(`--letter-spacing-${key}: ${value};`);
  });
  
  // Borders
  Object.entries(tokens.borders.radius).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? '--radius' : `--radius-${key}`;
    cssVars.push(`${varName}: ${value};`);
  });
  
  Object.entries(tokens.borders.width).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? '--border-width' : `--border-width-${key}`;
    cssVars.push(`${varName}: ${value};`);
  });
  
  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? '--shadow' : `--shadow-${key}`;
    cssVars.push(`${varName}: ${value};`);
  });
  
  // Transitions
  Object.entries(tokens.transitions.duration).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? '--duration' : `--duration-${key}`;
    cssVars.push(`${varName}: ${value};`);
  });
  
  Object.entries(tokens.transitions.easing).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? '--easing' : `--easing-${key}`;
    cssVars.push(`${varName}: ${value};`);
  });
  
  // Z-index
  Object.entries(tokens.zIndex).forEach(([key, value]) => {
    cssVars.push(`--z-${key}: ${value};`);
  });
  
  return `:root {\n  ${cssVars.join('\n  ')}\n}`;
}

// Export for Next.js global styles
export const cssVariables = generateCSSVariables();