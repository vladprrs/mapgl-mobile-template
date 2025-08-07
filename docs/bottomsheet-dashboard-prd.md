# Product Requirements Document: BottomSheet Dashboard Component

## 1. Executive Summary

The Dashboard component serves as the default content state within the BottomSheet, providing users with a comprehensive interface for map exploration and interaction. It consists of four main sections arranged vertically: Search Bar, Quick Access Button Panel, Stories Card Panel, and Tips Block.

## 2. Project Context

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Map Integration**: 2GIS MapGL
- **State Management**: React Context (via useMapGL hook)

### Existing Architecture Patterns
Based on codebase exploration:
- **Component Structure**: Functional components with TypeScript interfaces
- **Styling Approach**: Tailwind CSS utility classes with inline styles for dynamic properties
- **File Organization**: 
  - Components in `/src/components/`
  - Hooks in `/src/hooks/`
  - Tests in `/src/__tests__/`
- **Client Components**: Using 'use client' directive for interactive components
- **Mobile-First Design**: Responsive design with touch gesture support

## 3. Functional Requirements

### 3.1 Dashboard Overview
- **Purpose**: Provide primary interface for map exploration and quick actions
- **Position**: Rendered as child content within BottomSheet component
- **Default State**: Visible when BottomSheet is in half-view (50% position)
- **Responsive**: Adapts to all BottomSheet states (collapsed/half/expanded)

### 3.2 Component Sections

#### 3.2.1 Search Bar
- **Position**: Top of dashboard
- **Functionality**: 
  - Text input for location/place search
  - Search icon indicator
  - Placeholder text guidance
  - Clear button when text is entered
- **Interaction**: 
  - Tap to focus and open keyboard
  - Real-time search suggestions (future implementation)
  - Submit on enter/search button tap

#### 3.2.2 Quick Access Button Panel
- **Position**: Below search bar (SearchBar's bottom padding creates the gap)
- **Layout**: Horizontal scrollable panel with edge-to-edge fade mask
- **Spacing**:
  - Top margin: 4px (combined with SearchBar's 12px bottom padding = 16px total gap)
  - Content left margin: 16px from bottomsheet edge
  - Content right margin: Scrollable content with fade mask extending to edge
  - Bottom margin: 16px before next component
- **Visual Design**:
  - Fade mask: Extends to the very edges of bottomsheet (0px margins)
  - Content: Starts 16px from left edge, scrolls horizontally
  - Gradient: 32px wide fade effect on both sides when scrollable
- **Functionality**:
  - Quick action buttons for common map operations
  - Icons with labels
  - Traffic time indicators with color coding
  - Examples: Home (45 min - red), Work (45 min - yellow), Location (50 min - green)
- **Interaction**:
  - Tap to trigger map search/filter
  - Visual feedback on press
  - Horizontal scroll with fade gradients
  - Smooth scroll behavior

#### 3.2.3 Stories Card Panel
- **Position**: Below quick access buttons
- **Layout**: Horizontal scrollable cards
- **Functionality**:
  - Visual story cards with images
  - Title and brief description
  - Category tags
- **Current Scope**: Non-clickable (structure only for future implementation)
- **Future**: Will open detailed story view

#### 3.2.4 Tips Block
- **Position**: Bottom section
- **Layout**: Two-column grid with 3 different layout types
- **Layout Types**: [To be defined from Figma]
  - Type 1: [Awaiting Figma specification]
  - Type 2: [Awaiting Figma specification]  
  - Type 3: [Awaiting Figma specification]
- **Functionality**:
  - Display helpful tips and suggestions
  - Visual variety through different layouts
  - Adaptive content based on context

### 3.3 User Interactions

#### Touch Gestures
- **Scroll**: Vertical scroll when BottomSheet is expanded
- **Swipe**: Horizontal swipe for story cards and quick access buttons
- **Tap**: Interactive elements provide visual feedback

#### Responsive Behavior
- **Collapsed State (10%)**: Dashboard hidden
- **Half State (50%)**: Dashboard visible, search bar accessible
- **Expanded State (90%)**: Full dashboard scrollable

### 3.4 Accessibility Requirements
- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Tab order support
- **Screen Reader**: Descriptive text for all UI elements
- **Focus Management**: Clear focus indicators
- **Touch Targets**: Minimum 44x44px for mobile

## 4. Technical Requirements

### 4.1 Component Architecture

```typescript
// Proposed component structure
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx           // Main container
│   │   ├── SearchBar.tsx          // Search input component
│   │   ├── QuickAccessPanel.tsx   // Quick action buttons
│   │   ├── StoriesPanel.tsx       // Story cards
│   │   ├── TipsBlock.tsx          // Tips grid
│   │   └── index.ts               // Barrel export
```

### 4.2 Props Interfaces

```typescript
interface DashboardProps {
  className?: string;
  onSearch?: (query: string) => void;
  onQuickAction?: (action: string) => void;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

interface QuickAccessPanelProps {
  actions: QuickAction[];
  onActionClick: (action: string) => void;
  className?: string;
}

interface StoriesPanelProps {
  stories: Story[];
  className?: string;
}

interface TipsBlockProps {
  tips: Tip[];
  className?: string;
}
```

### 4.3 State Management
- **Local State**: Search input, focus states
- **Context Integration**: Connect to MapGL context for map operations
- **Performance**: Memoization for expensive computations

### 4.4 Performance Considerations
- **Lazy Loading**: Story images load on demand
- **Virtualization**: Consider for long lists
- **Debouncing**: Search input with 300ms delay
- **Image Optimization**: Next.js Image component for story cards

## 5. Design Specifications

### 5.1 Visual Design

#### Search Bar (Header) Specifications
Based on Figma design (node-id: 189-220904):

**Structure:**
- Container with rounded top corners (16px radius)
- White background (#FFFFFF)
- Drag handle indicator at top
- Search input field with icons

**Components:**
1. **Drag Handle**
   - Width: 40px (w-10)
   - Height: 4px (h-1)
   - Color: rgba(137, 137, 137, 0.25)
   - Rounded: 4px radius
   - Position: Centered, 6px padding from top edge, 6px padding bottom

2. **Search Input Field**
   - Height: 40px (h-10)
   - Background: rgba(20, 20, 20, 0.06)
   - Rounded: 8px (rounded-lg)
   - Padding: 10px vertical, 8px horizontal
   - Gap between elements: 6px (gap-1.5)

3. **Search Icon**
   - Size: 24x24px
   - Position: Left side of input
   - Color: #898989

4. **Placeholder Text**
   - Text: "Поиск в Москве" (Search in Moscow)
   - Font: SB Sans Text Regular
   - Size: 15px
   - Line Height: 20px
   - Color: #898989
   - Letter Spacing: -0.3px

5. **Voice Assistant Icon**
   - Size: 24x24px
   - Position: Right side within input
   - Type: Salut assistant icon

6. **Action Button (Menu)**
   - Size: 40x40px
   - Style: Secondary mono
   - Background: rgba(20, 20, 20, 0.06)
   - Position: Right side, outside input
   - Icon: Hamburg menu

### 5.2 Spacing and Layout
- **Container Padding**: 16px horizontal (px-4)
- **Drag Handle**: 6px from top edge (pt-1.5), 6px bottom padding (pb-1.5)
- **Element Gap**: 12px between search field and action button
- **Search Field**: Flex-grow to fill available space

### 5.3 Typography
- **Primary Font**: SB Sans Text (fallback to system sans-serif)
- **Search Placeholder**: 15px, Regular weight (400)
- **Line Height**: 20px for body text
- **Letter Spacing**: -0.3px for improved readability

### 5.4 Colors and Theming

**Design Tokens from Figma:**
- **Surface/01**: #141414 (primary surface)
- **Surface/02**: #141414 (secondary surface)
- **Background/02**: #FFFFFF (white background)
- **Text/Icons Primary**: #141414 (primary text)
- **Text/Icons Secondary**: #898989 (secondary text/placeholders)
- **Button Secondary**: #141414
- **Input Background**: rgba(20, 20, 20, 0.06) (6% opacity black)
- **Drag Handle**: rgba(137, 137, 137, 0.25) (25% opacity gray)

### 5.5 Animation and Transitions
- **Transition Duration**: 300ms (matching existing patterns)
- **Easing**: ease-out for natural feel
- **Interactive Feedback**: Scale/opacity changes on press

## 6. Testing Strategy

### 6.1 Unit Tests
- Individual component rendering
- Props validation
- Event handler execution
- State management

### 6.2 Integration Tests
- Dashboard within BottomSheet
- Interaction with MapGL context
- Responsive behavior

### 6.3 E2E Tests
- User flow from search to map interaction
- Mobile gesture support
- Accessibility compliance

## 7. Implementation Phases

### Phase 1: Core Structure
1. Dashboard container component
2. Basic layout with sections
3. Integration with BottomSheet

### Phase 2: Search Functionality
1. SearchBar component
2. Input handling and validation
3. Visual states (focus, active, disabled)

### Phase 3: Quick Access Panel
1. QuickAccessPanel component
2. Button grid/scroll layout
3. Action handlers

### Phase 4: Stories Panel
1. StoriesPanel structure
2. Card components
3. Horizontal scroll implementation

### Phase 5: Tips Block
1. TipsBlock component
2. Three layout type implementations
3. Grid responsive behavior

### Phase 6: Polish & Testing
1. Animations and transitions
2. Accessibility improvements
3. Comprehensive test coverage

## 8. Success Metrics

- **Rendering Performance**: 60fps scroll and animations
- **Accessibility Score**: WCAG 2.1 AA compliance
- **Test Coverage**: Minimum 80% code coverage
- **User Experience**: Smooth transitions between BottomSheet states
- **Code Quality**: Consistent with existing patterns

## 9. Dependencies and Risks

### Dependencies
- Figma design specifications (pending)
- 2GIS MapGL API for search functionality
- Existing BottomSheet component

### Risks
- Performance impact with complex content
- Touch gesture conflicts with BottomSheet
- Search API rate limiting

## 10. Future Enhancements

- Real-time search suggestions
- Clickable story cards with detailed views
- Personalized quick actions based on user history
- Dynamic tips based on context and location
- Voice search integration
- Offline support for cached content

## 11. Appendix

### A. References
- [2GIS MapGL Documentation](https://docs.2gis.com/en/mapgl)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)

### B. Glossary
- **BottomSheet**: Draggable overlay component
- **Snap Points**: Predefined positions for BottomSheet
- **MapGL**: 2GIS map rendering library
- **Quick Actions**: Preset map search filters

---

*Document Version: 1.0*  
*Date: 2025-08-07*  
*Status: Awaiting Figma Design Specifications*