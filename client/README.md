# CyberRanger Client - Modern Security Dashboard

A professional network security scanning dashboard built with the latest web technologies.

## Tech Stack

### Core Framework
- **Next.js 15.1** - App Router with React Server Components
- **React 19** - Latest React with improved performance
- **TypeScript 5.7** - Full type safety with strict mode

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS with custom design tokens
- **shadcn/ui** - Accessible component system built on Radix UI primitives
- **Lucide React** - Modern icon library

### Data Management
- **TanStack Query v5** - Powerful data synchronization and caching
- **TanStack Table v8** - Advanced data table with filtering, sorting, and pagination
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant form management
- **Zustand 5** - Lightweight state management

### Charts & Visualization
- **Recharts** - Composable charting library for functional, clear visualizations

### AI Integration (Ready)
- **Vercel AI SDK** - AI orchestration, streaming, and tool calling support
- **Drizzle ORM** - Lightweight, type-safe ORM for database operations

### Authentication (Structure Ready)
- **Auth.js v5 (NextAuth)** - Modern authentication solution

### Notifications
- **Sonner** - Modern toast notification system with great UX

## Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard route group
│   │   ├── dashboard/           # Main dashboard page
│   │   │   ├── page.tsx        # Dashboard content
│   │   │   ├── loading.tsx     # Loading state
│   │   │   └── error.tsx       # Error boundary
│   │   └── layout.tsx          # Dashboard layout with sidebar
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── providers.tsx            # Global providers (Query, Toaster)
│   └── not-found.tsx            # 404 page
├── components/
│   ├── dashboard/               # Dashboard-specific components
│   │   ├── network-scans-table.tsx  # TanStack Table implementation
│   │   ├── live-activity-feed.tsx   # Real-time activity log
│   │   ├── security-metrics-chart.tsx # Recharts visualization
│   │   ├── empty-state.tsx          # Empty and error states
│   │   └── dashboard-loading.tsx    # Loading skeletons
│   └── ui/                      # Reusable UI primitives
│       ├── button.tsx           # Button component
│       ├── card.tsx             # Card component
│       ├── dialog.tsx           # Modal dialog
│       ├── input.tsx            # Input field
│       ├── skeleton.tsx         # Loading skeleton
│       └── table.tsx            # Table primitives
├── lib/
│   └── utils.ts                 # Utility functions (cn, etc.)
└── styles/
    └── globals.css              # Global styles and design tokens
```

## Design System

### Color Palette
- **Neutral Base**: Dark theme with carefully chosen contrast ratios
- **Single Accent**: Cyan (`hsl(189 100% 50%)`) for primary actions
- **System Colors**:
  - Red for destructive/error states
  - Green for success states
  - Muted colors for secondary information

### Design Principles
1. **Data-First**: Content dominates, UI elements support
2. **Visual Hierarchy**: Clear focus through scale and contrast
3. **Progressive Disclosure**: Simple default, advanced on demand
4. **Perceived Performance**: Optimistic updates, skeletons, instant feedback
5. **Accessibility**: Keyboard navigation, screen reader support

### Layout Patterns
- **Persistent Sidebar**: 224px width, subtle colors, clear active states
- **Top Bar**: Global actions and search
- **Grid System**: Consistent spacing with Tailwind's spacing scale
- **Card-Based Layout**: Content organized in cards for clear grouping

## Key Features

### 1. TanStack Table Integration
- Filtering, sorting, pagination
- Row selection with bulk actions
- Responsive column configuration
- Empty and loading states

### 2. Real-Time Updates
- Live activity feed
- Automatic data refresh with TanStack Query
- Optimistic UI updates (ready for implementation)

### 3. Data Visualization
- Line charts for trends
- Bar charts for distribution
- Clear labels, axes, and gridlines
- Tooltips on hover

### 4. State Management
- **Server State**: TanStack Query with stale-while-revalidate
- **UI State**: Local component state via React hooks
- **Form State**: React Hook Form with Zod validation

### 5. Error Handling
- Route-level error boundaries
- Graceful error recovery
- Clear error messages with retry actions

### 6. Loading States
- Page-level loading skeletons
- Component-level loading indicators
- Suspense boundaries

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Lint Code
```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key_here
```

## Architecture Decisions

### Why App Router?
- Better performance with React Server Components
- Simplified data fetching
- Built-in loading and error states
- Improved SEO capabilities

### Why TanStack Query?
- Powerful caching and synchronization
- Automatic background refetching
- Optimistic updates support
- DevTools for debugging

### Why shadcn/ui?
- Full control over component code
- Built on accessible Radix primitives
- Customizable with Tailwind
- No package lock-in

### Why Recharts?
- Composable API
- Good TypeScript support
- Functional, clear visualizations
- Adequate for dashboard needs

## Security Considerations

- All API calls validated on server
- Zod schemas for input validation
- RBAC enforcement server-side
- Secure authentication flow
- Rate limiting ready (Upstash/Redis)
- OWASP Top 10 compliant

## Future Enhancements

- [ ] Real backend API integration
- [ ] WebSocket support for live scanning
- [ ] Advanced filtering with faceted search
- [ ] Export functionality (CSV, JSON, PDF)
- [ ] Saved scan configurations
- [ ] User preferences and settings
- [ ] Mobile responsive improvements
- [ ] Accessibility audit and improvements

## Legal Notice

This tool is designed for **authorized penetration testing and security research only**. 
Users must only scan networks and systems they own or have explicit permission to test.

---

Made with ❤️ by the CyberRanger Security Community
