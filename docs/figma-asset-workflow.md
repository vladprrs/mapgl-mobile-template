# Figma Asset Extraction Workflow

## Overview
This document outlines the workflow for extracting and integrating Figma assets into the bottomsheet dashboard components.

## Asset Organization Structure

```
public/
├── assets/          # Raw exported assets from Figma (auto-generated)
└── icons/           # Organized icon library
    ├── navigation/  # Navigation icons (home, work, bookmark, etc.)
    ├── ui/          # UI icons (search, menu, close, etc.)
    └── traffic/     # Traffic indicator icons

src/
├── components/
│   └── icons/       # React icon components
│       ├── Icon.tsx # Base icon component
│       └── index.ts # Icon exports
└── lib/
    └── icons/       # Icon definitions and mappings
```

## Workflow Steps

### 1. Asset Extraction from Figma

When extracting assets using the Figma MCP tool:

```typescript
// Use the get_code tool with asset directory
mcp__figma-dev-mode-mcp-server__get_code({
  nodeId: "node-id-from-figma",
  dirForAssetWrites: "/Users/.../public/assets",
  // ... other params
})
```

### 2. Asset Types

#### Icons (SVG)
- **Format**: SVG for scalability
- **Naming**: Descriptive names (e.g., `icon-home.svg`, `icon-search.svg`)
- **Size**: Export at 24x24px base size
- **Color**: Export with `currentColor` for dynamic coloring

#### Images (PNG/JPG)
- **Format**: PNG for transparency, JPG for photos
- **Naming**: Descriptive with context (e.g., `story-card-1.jpg`)
- **Size**: Export at 2x for retina displays
- **Optimization**: Compress before use

### 3. Icon Component System

Create reusable icon components:

```typescript
// src/components/icons/Icon.tsx
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({ name, size = 24, color = 'currentColor', className = '' }: IconProps) {
  const iconPath = `/icons/${name}.svg`;
  // Implementation
}
```

### 4. Asset Mapping

Create a central mapping for all assets:

```typescript
// src/lib/icons/index.ts
export const ICONS = {
  // Navigation
  HOME: 'navigation/home',
  WORK: 'navigation/work',
  BOOKMARK: 'navigation/bookmark',
  
  // UI
  SEARCH: 'ui/search',
  MENU: 'ui/menu',
  VOICE: 'ui/voice-assistant',
  
  // Traffic
  TRAFFIC_HEAVY: 'traffic/heavy',
  TRAFFIC_MODERATE: 'traffic/moderate',
  TRAFFIC_LIGHT: 'traffic/light',
} as const;

export const IMAGES = {
  SALUT_ASSISTANT: 'assets/a10745cc0887a7d79c8328cd4679580095658d0a.png',
  // Add other images
} as const;
```

### 5. Component Integration

#### SearchBar Integration
```typescript
import { Icon } from '@/components/icons';
import { ICONS, IMAGES } from '@/lib/icons';

// In SearchBar component
<Icon name={ICONS.SEARCH} className="text-gray-500" />
<img src={IMAGES.SALUT_ASSISTANT} alt="Voice assistant" />
```

#### QuickAccessPanel Integration
```typescript
const actions: QuickAction[] = [
  {
    id: 'home',
    icon: <Icon name={ICONS.HOME} />,
    label: '45 мин',
    labelColor: '#f5373c',
  },
  // ... more actions
];
```

## Figma Node IDs Reference

Track Figma node IDs for easy re-extraction:

| Component | Node ID | Description |
|-----------|---------|-------------|
| SearchBar | 189-220904 | Search bar with voice assistant |
| QuickAccessPanel | 189-220977 | Quick access buttons row |
| Stories Panel | [Pending] | Story cards |
| Tips Block | [Pending] | Tips with 3 layouts |

## Asset Extraction Commands

### Extract specific component assets:
```bash
# Extract SearchBar assets
node extract-figma-assets.js --node-id="189-220904"

# Extract QuickAccessPanel assets
node extract-figma-assets.js --node-id="189-220977"
```

## Best Practices

1. **Version Control**: Commit assets with descriptive messages
2. **Optimization**: Always optimize images before committing
3. **Naming Convention**: Use kebab-case for files, UPPER_SNAKE for constants
4. **Documentation**: Update this file when adding new assets
5. **Cleanup**: Remove unused assets regularly

## Asset Checklist

### SearchBar
- [x] Search icon
- [x] Voice assistant (Salut) icon
- [x] Menu/hamburger icon

### QuickAccessPanel
- [ ] Home icon
- [ ] Work/briefcase icon
- [ ] Bookmark icon
- [ ] Location pin icon
- [ ] Traffic indicators

### Stories Panel
- [ ] Story card images
- [ ] Category icons
- [ ] Placeholder images

### Tips Block
- [ ] Tip icons
- [ ] Illustration assets
- [ ] Background patterns

## Tools and Resources

- **Figma MCP Server**: For extracting assets programmatically
- **SVGO**: For optimizing SVG files
- **Sharp/ImageOptim**: For optimizing raster images
- **React SVGR**: For converting SVGs to React components

## Maintenance

- Review and update asset library monthly
- Remove unused assets quarterly
- Update Figma node IDs when designs change
- Document any custom modifications to extracted assets