# SearchResultCard Visual Comparison Guide

## RD vs Non-RD Cards: Key Visual Differences

### RD (Advertiser) Cards - Premium Layout
**Visual Characteristics:**
1. **Photo Gallery**: Prominent horizontal scrolling gallery
   - Large variant: 116px height with logo overlay
   - Small variant: 88px height without logo
2. **Advertisement Section**: Dedicated promotional area
3. **Call-to-Action Button**: Styled promotional button
4. **Enhanced Visual Hierarchy**: More visual emphasis

### Non-RD Cards - Standard Layout
**Visual Characteristics:**
1. **Minimal/No Gallery**: Optional small gallery (88px)
2. **Compact Layout**: More condensed information
3. **Service Buttons**: Functional buttons (delivery, booking)
4. **Friends Indicator**: Social proof element

## Component Variations Matrix

| Component | RD Card | Non-RD Card |
|-----------|---------|-------------|
| **Gallery** | Always present (116px or 88px) | Optional (88px only) |
| **Logo** | Prominent display (64px or 40px) | Not displayed |
| **Friends** | Optional | Prominent when available |
| **Promotional Text** | Yes, with disclaimer | No |
| **CTA Button** | Styled "Label" button | Service-specific (Delivery) |
| **Working Hours** | Color-coded status | Color-coded status |
| **Additional Info** | In AD section | In DA section |

## Visual Hierarchy Patterns

### RD Card Flow
```
[Gallery with Logo]
    ↓
[Friends (if any)]
    ↓
[Title + Subtitle]
    ↓
[Rating + Distance]
    ↓
[Address]
    ↓
[Working Hours]
    ↓
[AD Section with CTA]
```

### Non-RD Card Flow
```
[Gallery (optional)]
    ↓
[Friends (prominent)]
    ↓
[Title + Subtitle]
    ↓
[Rating + Distance]
    ↓
[Address]
    ↓
[Additional Details]
    ↓
[Working Hours]
    ↓
[Service Button]
```

## Gallery States

### RD Gallery Types
1. **Multiple (Default)**
   - 5+ photos
   - Logo on first image
   - Full 116px height

2. **Small**
   - Compact 88px height
   - No logo overlay
   - Used when space is limited

3. **Award**
   - Special achievement badges
   - Premium positioning

### Non-RD Gallery
- **Optional**: Only shown if photos exist
- **Always Small**: 88px height maximum
- **No Branding**: Clean photo display

## Button Styling Comparison

### RD Button (AD Section)
```css
- Border: 2px solid rgba(20,20,20,0.06)
- Background: Transparent
- Text: #5A5A5A, 15px Semibold
- Padding: 14px 10px
- Custom color overlay possible
```

### Non-RD Button (ZMK Section)
```css
- Background: rgba(20,20,20,0.06)
- Border: None
- Text: #5A5A5A, 15px Semibold
- Icon: Service logo (24px)
- Padding: 14px 10px
```

## Working Hours Color Coding

| Status | Text Example | Color | Use Case |
|--------|-------------|--------|----------|
| **Open Soon** | "Откроется через 40 минут" | #1BA136 (Green) | Opening within hour |
| **Closing Soon** | "Закроется через 30 минут" | #F5373C (Red) | Closing within hour |
| **Closed** | "Закрыто до завтра" | #898989 (Gray) | Currently closed |
| **Open** | Not shown | - | Currently open (no text) |

## Friends Component Visual States

### Display Logic
- **1-4 Friends**: Show all avatars
- **5+ Friends**: Show 4 avatars + "+N" badge

### Visual Specifications
- **Avatar Size**: 24px diameter
- **Overlap**: -12px margin between avatars
- **Badge**: Green background, white text
- **Mask**: Special clipping for clean overlap

## Conditional Display Rules

### RD Cards
```
IF has_promotion:
  SHOW AD_section WITH promotional_text
IF has_logo:
  SHOW logo_overlay ON first_gallery_image
ALWAYS:
  SHOW gallery (minimum 1 placeholder image)
```

### Non-RD Cards
```
IF has_friends:
  SHOW friends_section AT top
IF has_delivery:
  SHOW ZMK_section WITH delivery_button
IF has_additional_info:
  SHOW DA_section WITH details
IF has_photos:
  SHOW small_gallery
```

## Spacing Guidelines

### Vertical Spacing
- **Between sections**: 8px
- **Inside sections**: 4px
- **Gallery to content**: 12px
- **Button padding**: 10px vertical

### Horizontal Spacing
- **Card padding**: 16px
- **Gallery indent**: 12px left
- **Text blocks**: Full width minus padding

## State Variations

### Loading State
- Skeleton placeholders for all content areas
- Shimmer animation on gallery area
- Preserve layout structure

### Error State
- Fallback to minimal card
- Show only essential information
- Gray out unavailable sections

### Selected State
- Border highlight (2px primary color)
- Slight elevation increase
- Background tint optional

## Image Asset Organization

### Directory Structure
```
public/assets/search-cards/
├── rd/
│   ├── logos/
│   ├── galleries/
│   └── icons/
└── non-rd/
    ├── avatars/
    ├── service-logos/
    └── galleries/
```

### Naming Convention
- **Logos**: `logo-{company}-{size}.png`
- **Gallery**: `gallery-{id}-{index}.jpg`
- **Avatars**: `avatar-{user-id}.png`
- **Icons**: `icon-{name}.svg`

## Responsive Considerations

### Mobile (Default)
- Full-width cards
- Optimized for 375px viewport
- Touch-friendly gallery scroll

### Tablet (Future)
- 2-column grid possible
- Increased gallery size
- More horizontal space utilization

### Desktop (Future)
- Multi-column layouts
- Hover states for buttons
- Expanded information display