# 2GIS MapGL Mobile App

A mobile-first map application with a draggable bottom sheet interface, built using Atomic Design principles.

## 🏗️ Architecture

This application follows **Atomic Design** methodology with a clear component hierarchy:
- **Atoms** → **Molecules** → **Organisms** → **Templates** → **Pages**

## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **2GIS MapGL** - Interactive map rendering
- **react-modal-sheet** - Bottom sheet functionality
- **Design Tokens** - Centralized style system

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
├── components/
│   ├── atoms/             # Basic UI elements (Button, Badge, Text, Icon)
│   ├── molecules/         # Combinations of atoms (SearchResultItem, QuickAction)
│   ├── organisms/         # Complex components (SearchBar, SearchResultsList, BottomSheet)
│   ├── templates/         # Page layouts (ScreenManager, MobileMapShell)
│   └── pages/            # Full pages (DashboardPage, SearchResultsPage)
├── hooks/                 # React hooks (useMapGL, etc.)
├── lib/
│   └── ui/
│       └── tokens.ts     # Design tokens (colors, spacing, typography)
└── __mocks__/            # Mock data for development
```

## 🎨 Design Principles

### 1. Atomic Design Hierarchy
- Components can only import from layers below
- Atoms have no dependencies on other components
- Strict separation of concerns at each level

### 2. Design Tokens
- All styling uses centralized tokens from `lib/ui/tokens.ts`
- No hardcoded colors, spacing, or typography values
- Consistent visual language throughout the app

### 3. Single Source of Truth
- **ScreenManager** handles all navigation state
- **MapProvider** manages map instance and operations
- No duplicate state management

### 4. Minimal Complexity
- Clean, semantic HTML structure
- No unnecessary animations or wrappers
- Maximum 2-3 levels of DOM nesting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- 2GIS API key

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Add your 2GIS API key to .env.local
```

### Development

```bash
# Start development server
npm run dev
# Opens at http://localhost:3000
```

### Production Build

```bash
# Create production build
npm run build

# Run production server
npm start
```

## 📝 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |
| `npm test` | Run test suite |

## 🏛️ Component Architecture

### Atoms
Basic building blocks with no dependencies:
- `Button`, `Badge`, `Text`, `Icon`
- `CardContainer`, `Input`

### Molecules
Simple combinations of atoms:
- `SearchResultItem` - Composed of Text, Badge, Button
- `QuickAction` - Icon + Text
- `StoryItem` - Image + Badge

### Organisms
Complex, self-contained components:
- `SearchBar` - Full search interface
- `SearchResultsList` - List of SearchResultItems
- `BottomSheet` - Draggable sheet container
- `MapContainer` - Map instance wrapper

### Templates
Page layouts and navigation:
- `ScreenManager` - Navigation state management
- `MobileMapShell` - Main app shell with map + bottom sheet
- `ScreenRenderer` - Screen transition handler

### Pages
Complete screen implementations:
- `DashboardPage` - Home screen with advice cards
- `SearchResultsPage` - Search results display
- `SearchSuggestionsPage` - Search suggestions

## 🎯 Key Features

- **Draggable Bottom Sheet** - 3 snap points (10%, 50%, 90%)
- **Interactive Map** - 2GIS MapGL with markers and navigation
- **Search System** - Real-time suggestions and results
- **Responsive Design** - Mobile-first with safe area support
- **Theme Support** - Light/Dark theme variants

## 📱 Mobile Optimizations

- Viewport-fit cover for notched devices
- Safe area insets for proper spacing
- Touch-optimized interactions
- Cooperative gestures for map

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_2GIS_API_KEY=your_api_key_here
```

### Design Tokens
Modify `src/lib/ui/tokens.ts` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Transitions

## 📄 License

[Your License Here]

## 🤝 Contributing

Please read our contributing guidelines before submitting PRs.