# Apartments.Web

React + TypeScript frontend for the renting app.

Requirements
- Node 18+ / npm 8+ (or matching versions from engines in package.json)
- Recommended: pnpm if you prefer

Quick start
1. Install dependencies
   npm install

2. Run development server
   npm run dev
   Open http://localhost:5173

3. Build and preview
   npm run build
   npm run preview

Project notes
- Vite + React (SWC) for fast dev cycle. Config: vite.config.ts
- API clients are under src/app/api (base: src/app/api/base.api.ts)
- SignalR notifications: src/hooks/notifications.ts
- UI primitives and components are organized under src/components and src/ui

Scripts
- npm run dev — start dev server
- npm run build — create production build
- npm run preview — preview production build locally
- npm run lint — run ESLint

Contributing
- Follow existing TypeScript and lint rules.
- Ensure the API base URL (runtime) points to your backend (see env or runtime config).

License
- See repository LICENSE if present.

## Configuration

Create a .env file from .env.example:

VITE_API_BASE_URL=https://api.example.com
VITE_SIGNALR_URL=wss://api.example.com/hubs/notifications

Do not commit .env files.

## Run
npm install
npm run dev
