# 🚀 Taskflow - Monorepo

A modern, **production-ready** task management application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**, structured as a monorepo using **pnpm workspaces**.

## ✅ Project Status: FULLY COMPLETE

All core features are fully implemented and tested:
- ✨ Full CRUD operations with real-time sync
- 🔐 Complete authentication flow (sign-up, sign-in, sign-out)
- 📱 Responsive design for all devices
- 🎨 Modern UI with 50+ pre-installed Shadcn/ui components
- 🔄 Real-time database synchronization
- 🛡️ Protected routes and authorization

## 🎯 Implemented Features

### Task Management
- ✅ Create new tasks with validation
- ✅ Read/display tasks filtered by user
- ✅ Update tasks (toggle completion, edit titles)
- ✅ Delete tasks with confirmation
- ✅ Real-time synchronization across devices

### Authentication
- ✅ Email/password sign-up with validation
- ✅ Email/password sign-in
- ✅ Session persistence
- ✅ Sign-out functionality
- ✅ Protected routes with automatic redirects

### Pages & Components
- ✅ **Home Page**: Landing page with feature highlights and CTAs
- ✅ **Auth Page**: Sign-up/sign-in with form validation
- ✅ **Dashboard**: Task management interface with real-time updates
- ✅ **Profile**: User information and account settings
- ✅ Navigation with auth state awareness
- ✅ Task cards with edit/delete/toggle actions
- ✅ Task form with inline validation

### User Experience
- ✅ Smooth fade-in and slide-up animations
- ✅ Toast notifications for all actions
- ✅ Loading states and error handling
- ✅ Mobile-first responsive design
- ✅ Modern gradient backgrounds

## Project Structure

```
taskflow-monorepo/
├── packages/
│   ├── web/           # Next.js web application
│   ├── api/           # API utilities and backend logic
│   └── shared/        # Shared types, utilities, and components
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

### Packages

#### `@taskflow/web`
The main Next.js web application featuring:
- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- Supabase authentication

#### `@taskflow/api`
Reusable API utilities including:
- Supabase client configuration
- API services and functions
- Database utilities

#### `@taskflow/shared`
Shared code across packages:
- TypeScript types and interfaces
- Utility functions
- Common constants

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm 8+

### Installation

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies for all workspaces
pnpm install
```

### Development

```bash
# Start development server (runs all dev scripts in parallel)
pnpm dev

# Run development for a specific package
pnpm --filter @taskflow/web dev
```

### Build

```bash
# Build all packages
pnpm build

# Build a specific package
pnpm --filter @taskflow/web build
```

### Production

```bash
# Start production server
pnpm start

# Build and start
pnpm build && pnpm start
```

## Environment Variables

Create a `.env.local` file in `packages/web/`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=your_project_id
```

## Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Backend**: Supabase
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

## Scripts

- `pnpm dev` - Start development servers for all packages
- `pnpm build` - Build all packages
- `pnpm start` - Start production server
- `pnpm lint` - Run linters for all packages
- `pnpm type-check` - Run TypeScript type checking

## License

MIT