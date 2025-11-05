# Apartments.Web

A modern, responsive web application for managing apartments, built with React and TypeScript. This platform allows users (tenants, owners, and admins) to handle apartment listings, user profiles, photo uploads, reports, and more. It features real-time updates via SignalR, secure authentication, and an intuitive UI powered by Tailwind CSS and shadcn/ui components.

## Features

- **User Authentication & Management**: Login, registration, email verification, password reset, and profile updates (including avatar uploads).
- **Apartment Management**: Create, edit, and manage apartment listings with photo uploads (up to 4 photos per apartment).
- **Dashboard**: Admin dashboard with charts (e.g., reports by month using Recharts), user statistics, and navigation.
- **Photo Handling**: Upload, delete, and view apartment photos with a custom carousel component.
- **Real-Time Communication**: Integrated SignalR for live updates (e.g., notifications).
- **Responsive Design**: Mobile-friendly UI with dark/light theme support.
- **Admin Tools**: User role management (tenants, owners, admins), reports, and detailed user profiles.
- **Form Validation**: Robust validation using Zod schemas and React Hook Form.
- **API Integration**: Axios-based API client with JWT authentication and error handling.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components (Radix UI primitives)
- **State Management**: Zustand for global state (e.g., auth, profile)
- **Data Fetching**: TanStack Query (React Query) for API calls
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Real-Time**: Microsoft SignalR
- **Routing**: React Router DOM
- **Build Tools**: Vite, ESLint, TypeScript
- **Other Libraries**: Lucide React (icons), Sonner (toasts), Embla Carousel

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A backend API server (configured via `VITE_API_BASE_URL` in `.env`)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd apartments.web.public
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (copy from `.env.example`):
   ```env
   VITE_API_BASE_URL=https://your-api-endpoint.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Authentication**: Navigate to `/auth/login` to log in or `/auth/register` to sign up. Supports email verification and password reset.
- **Dashboard**: Admins can access `/admin/dashboard` for stats and charts.
- **Apartment Management**: Owners/tenants can create apartments at `/apartment/create`, upload photos, and manage listings.
- **Account Settings**: Update profile, password, email, or avatar via `/account`.
- **Admin Panel**: Manage users, view reports, and details at `/admin/*` routes.
- **Photo Upload**: Use the `ApartmentPhotoManager` component to add/remove photos (max 4 per apartment).
- **Themes**: Toggle between light/dark modes using the theme provider.

## Project Structure

```
src/
├── app/
│   ├── api/          # API client and endpoints (e.g., auth.api.ts, user.api.ts)
│   ├── models/       # TypeScript models and schemas (e.g., user.schemas.ts)
│   ├── pages/        # Page components (e.g., dashboard, auth, account)
│   ├── routes/       # Routing configuration (e.g., admin.routes.tsx)
│   ├── services/     # Queries and mutations (e.g., dashboard.queries)
│   └── schemas/      # Zod validation schemas
├── components/
│   ├── common/       # Shared components (e.g., carousel-custom.tsx, theme-provider)
│   ├── ui/           # shadcn/ui components (e.g., chart.tsx, input.tsx)
│   └── data-table/   # Data table components
├── hooks/            # Custom hooks (e.g., signalr-setup.tsx, notifications.ts)
├── lib/              # Utilities (e.g., utils.ts)
├── assets/           # Static assets
└── main.tsx          # App entry point
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

