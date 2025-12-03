# 🎵 Artist Showcase

A modern React application showcasing albums and songs using the Last.fm API. Built with Next.js 15, TypeScript, Chakra UI v3, and Zustand for state management.

## 📋 Project Description

This application demonstrates a comprehensive music discovery platform with the following capabilities:

- **Album Overview**: Browse all albums by an artist with cover art, name, and year
- **Album Detail View**: View detailed album information with complete track listings
- **Search Functionality**: Search for tracks and albums with real-time results
- **Favorites System**: Add and manage favorite songs with persistent storage
- **Statistics & Analytics**: Visualize play count data with interactive charts
- **Responsive Design**: Optimized for desktop and mobile viewing

## ✨ Features Implemented

### Must-Have Features ✅

- [x] **Album Overview** - Display albums with cover, name, and year
- [x] **Sorting** - Sort albums by year or name
- [x] **Pagination** - Load more albums (50 per page)
- [x] **Album Detail View** - Complete track listings with album details
- [x] **Search** - Find tracks and albums with debounced search
- [x] **Favorites** - Add songs to favorites from search and album detail
- [x] **Favorites Overview** - Table view with title, duration, album, and favorite state

### Nice-to-Have Features ✅

- [x] **Remove from Favorites** - Manage favorite songs
- [x] **Search Bar in Favorites** - Quick filtering of favorite songs
- [x] **Click to Album Detail** - Navigate from favorites to album pages
- [x] **Best Played Graph** - Bar chart visualization of track play counts
- [x] **Album Search for Stats** - Find and analyze any album
- [x] **Custom 404 Page** - User-friendly not found page

### Technical Requirements ✅

- [x] **React with ES6+** - Modern JavaScript features
- [x] **TypeScript** - Full type safety throughout
- [x] **Chakra UI v3** - Component library for UI
- [x] **Modular Styling** - CSS Modules for component styles
- [x] **Zustand** - State management with persist middleware
- [x] **Error Handling** - Graceful error states
- [x] **Environment Config** - `.env.local` for API keys
- [x] **Lazy Loading** - Pagination and infinite scroll patterns
- [x] **Memoization** - Optimized re-renders with React hooks
- [x] **Responsive Design** - Mobile-first approach
- [x] **Linter Setup** - ESLint configuration

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd artist-showcase
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_LASTFM_API_KEY=***
   ```

   > **Note**: You can use the provided API key or create your own at [Last.fm API](https://www.last.fm/api)

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
artist-showcase/
├── app/
│   ├── albums/          # Album listing page
│   ├── album/           # Album detail page
│   ├── search/          # Search functionality
│   ├── favorites/       # Favorites management
│   ├── stats/           # Play count statistics
│   ├── not-found.tsx    # Custom 404 page
│   └── layout.tsx       # Root layout
├── components/
│   ├── Navigation/      # Main navigation
│   └── ui/              # Chakra UI components
├── lib/
│   └── lastfm.ts        # Last.fm API wrapper
├── store/
│   ├── albumStore.ts    # Album state management
│   ├── favoritesStore.ts # Favorites state
│   └── useAppStore.ts   # Combined store
├── types/
│   └── album.ts         # TypeScript interfaces
└── public/              # Static assets
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **State Management**: Zustand with persist middleware
- **Data Visualization**: Recharts
- **API**: Last.fm REST API
- **Styling**: CSS Modules + Chakra UI
- **Debouncing**: lodash.debounce

## 🎯 Key Features Explained

### Album Overview

- Server-side rendering for initial 50 albums
- Client-side pagination with "Load More"
- Responsive grid layout
- Sorting by name or year

### Search

- Real-time search with 600ms debounce
- Separate tabs for tracks and albums
- Pagination support for search results
- Add to favorites directly from search

### Favorites System

- Persistent storage using localStorage
- Add/remove functionality
- Search and filter favorites
- Navigate to album details from favorite tracks

### Statistics Graph

- Interactive bar chart of track play counts
- Color gradient based on popularity
- Tooltip with track details
- Search any album for analysis

### 404 Page

- Custom not found page with animations
- Gradient styling
- Quick navigation back to albums

## 🔧 Configuration

### Environment Variables

| Variable                     | Description     | Required |
| ---------------------------- | --------------- | -------- |
| `NEXT_PUBLIC_LASTFM_API_KEY` | Last.fm API key | Yes      |

### Artist Configuration

The default artist is set to "Eminem". To change this, update the `ARTIST_NAME` constant in:

- `lib/lastfm.ts`

## 📱 Responsive Design

The application is fully responsive with breakpoints for:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Styling Approach

- **CSS Modules**: Component-scoped styles for graph tooltips and 404 page
- **Chakra UI**: System design tokens and pre-built components
- **Dark Mode**: Automatic theme switching support

## 🚀 Performance Optimizations

- Server-side rendering for initial page load
- Debounced search to reduce API calls
- Memoized components to prevent unnecessary re-renders
- Lazy loading with pagination
- Image optimization with Next.js Image component

## 📝 Notes

- **Time-boxed Assignment**: Focused on core features and code quality
- **API Limitations**: Last.fm free tier has rate limits
- **Browser Compatibility**: Tested on modern browsers (Chrome, Firefox, Safari, Edge)

## 🤝 Contributing

This is a showcase project. For any questions or suggestions, please open an issue.

## 📄 License

This project is created for demonstration purposes.

---
