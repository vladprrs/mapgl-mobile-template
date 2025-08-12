# SearchResultCard Component Implementation Guide

## Overview
SearchResultCard is a complex component system with two major variants:
- **RD (Рекламодатель/Advertiser)**: Enhanced cards with galleries, promotional content, and call-to-action buttons
- **Non-RD**: Standard cards with basic information

## Component Architecture

### Main Component Structure
```typescript
interface SearchResultCardProps {
  isRD: boolean;  // Determines card variant
  data: OrganizationData;
  onClick?: () => void;
  onButtonClick?: () => void;
}
```

## Common Elements (Both RD and Non-RD)

### 1. Friends Component
**Purpose**: Shows friends who have visited/rated the place
- **Variants**: 1, 2, 3, 4, 5, N+ people
- **Visual**: Circular avatar images with 12px overlap
- **Counter**: Green badge showing "+N" for overflow

### 2. Header Nav Bar
**Structure**:
- **Title**: Organization name (16px Semibold)
- **Subtitle**: Category/description (14px Regular, gray)

### 3. Secondary Line (Rating & Distance)
**Components**:
- **Stars**: 5-star rating system (yellow #EFA701 for filled)
- **Rating Score**: Numeric value (14px Medium)
- **Review Count**: "120 оценок" (14px Regular, gray)
- **Distance/Time**: "3 мин" with icon (14px Medium, gray)

### 4. Address Line
- **Format**: "Тверская 32/12, 1 этаж, Москва"
- **Style**: 14px Regular, primary color

### 5. Work Time Status
**States**:
- **Open**: "Откроется через 40 минут" (green #1BA136)
- **Closing Soon**: "Закроется через 30 минут" (red #F5373C)
- **Closed**: "Закрыто" (gray)

## RD-Specific Elements

### Photo Gallery
**Large Gallery (116px height)**:
- First photo includes logo overlay (64px circular)
- Horizontal scroll with 4px gap between images
- 24px right padding for scroll fade

**Small Gallery (88px height)**:
- No logo overlay
- Same scroll behavior as large gallery

### AD (Advertisement) Section
**Structure**:
1. **Promotional Text**: Marketing message (14px Regular)
2. **FAS Disclaimer**: "Реклама • Есть противопоказания..." (11px, #B8B8B8)
3. **CTA Button**: 
   - Border: 2px solid rgba(20,20,20,0.06)
   - Text: 15px Semibold, #5A5A5A
   - Padding: 14px horizontal, 10px vertical
4. **Logo**: 40px circular (optional, right side)

### Gallery Variations
- **Multiple**: Full-size gallery with logo
- **Small**: Compact 88px gallery
- **Award**: Special gallery with achievement badges
- **One/Two/Three**: Limited photo count variations

## Non-RD Specific Elements

### DA (Additional Details) Section
**Types**:
- **Parking**: "500 мест • Цена в час 50 ₽ • Теплая"
- **Building**: Building-specific information
- **Eat**: Restaurant/cafe specific details

### ZMK (Delivery) Section
**Structure**:
- **Label**: "Реклама" disclaimer
- **Button**: Delivery CTA with icon
  - Background: rgba(20,20,20,0.06)
  - Icon: 24px delivery service logo
  - Text: "Заказать доставку"

## Conditional Blocks

### 1. Friends Section
- **Condition**: Show if user has friends who visited
- **Placement**: Top of content area

### 2. Gallery
- **RD**: Always show (different sizes based on photo count)
- **Non-RD**: Show only if photos available

### 3. Work Time
- **Condition**: Show if working hours data available
- **Color coding**: Green (open), Red (closing), Gray (closed)

### 4. AD Section (RD only)
- **Condition**: Always show for RD cards
- **Content**: Promotional text + button

### 5. ZMK Section (Non-RD)
- **Condition**: Show if delivery/service available
- **Alternative**: Can show other service CTAs

## Layout Specifications

### Card Container
- **Background**: #FFFFFF
- **Border Radius**: 12px (rounded-xl)
- **Overflow**: Hidden for clean edges

### Spacing
- **Padding**: 16px horizontal, 12px vertical
- **Gallery**: Full width with 12px left padding
- **Section Gaps**: 8px between major sections

### Typography Scale
```typescript
const typography = {
  title: "16px Semibold, -0.24px tracking",
  subtitle: "14px Regular, -0.28px tracking, #898989",
  body: "14px Regular, -0.28px tracking",
  rating: "14px Medium, -0.28px tracking",
  button: "15px Semibold, -0.3px tracking",
  disclaimer: "11px Regular, -0.176px tracking, #B8B8B8"
};
```

### Color Palette
```typescript
const colors = {
  primary: "#141414",
  secondary: "#898989",
  tertiary: "#B8B8B8",
  success: "#1BA136",
  warning: "#EFA701",
  critical: "#F5373C",
  buttonText: "#5A5A5A",
  buttonBorder: "rgba(20,20,20,0.06)",
  surface: "#FFFFFF"
};
```

## Implementation Strategy

### 1. Base Components
```typescript
// Core building blocks
- Friends
- HeaderNavBar
- SecondaryLine
- AddressLine
- WorkTime
- Gallery
- ADSection
- ZMKSection
```

### 2. Composition Pattern
```typescript
const SearchResultCard = ({ isRD, data }) => {
  if (isRD) {
    return <RDCard data={data} />;
  }
  return <NonRDCard data={data} />;
};
```

### 3. Data Interface
```typescript
interface OrganizationData {
  // Common fields
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: string;
  workingHours?: WorkingHours;
  friends?: Friend[];
  
  // RD specific
  photos?: Photo[];
  logo?: string;
  promotionalText?: string;
  buttonLabel?: string;
  disclaimer?: string;
  
  // Non-RD specific
  additionalInfo?: string;
  deliveryAvailable?: boolean;
}
```

## Responsive Behavior
- **Mobile First**: Designed for mobile viewport (375px)
- **Gallery Scroll**: Touch-friendly horizontal scroll
- **Text Truncation**: Ellipsis for long text with max-width constraints

## Accessibility
- **Touch Targets**: Minimum 44px for interactive elements
- **Color Contrast**: WCAG AA compliant
- **Screen Readers**: Proper ARIA labels for interactive elements
- **Focus States**: Visible focus indicators for keyboard navigation

## Performance Optimizations
- **Image Loading**: Lazy load gallery images
- **Virtual Scrolling**: For large result lists
- **Memoization**: Use React.memo for static sections
- **Bundle Splitting**: Separate RD/Non-RD components

## Testing Strategy
1. **Unit Tests**: Individual component behavior
2. **Integration Tests**: RD/Non-RD switching logic
3. **Visual Tests**: Screenshot comparison for all variants
4. **E2E Tests**: User interaction flows

## File Structure
```
src/components/search-results/
├── SearchResultCard/
│   ├── index.tsx
│   ├── SearchResultCard.types.ts
│   ├── RDCard/
│   │   ├── RDCard.tsx
│   │   ├── Gallery.tsx
│   │   └── ADSection.tsx
│   ├── NonRDCard/
│   │   ├── NonRDCard.tsx
│   │   └── ZMKSection.tsx
│   └── shared/
│       ├── Friends.tsx
│       ├── HeaderNavBar.tsx
│       ├── SecondaryLine.tsx
│       ├── AddressLine.tsx
│       └── WorkTime.tsx
```

## Usage Example
```typescript
import { SearchResultCard } from '@/components/search-results';

<SearchResultCard
  isRD={organization.isAdvertiser}
  data={organization}
  onClick={() => navigateToDetails(organization.id)}
  onButtonClick={() => handleCTA(organization)}
/>
```

## Migration Notes
- Existing search result components should be gradually replaced
- Maintain backward compatibility during transition
- Use feature flags for A/B testing new designs