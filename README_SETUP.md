# Taskflow - Complete Setup Guide

## 🚀 Quick Start

This is a **Next.js pnpm monorepo** application. The primary app is located in `packages/web/`.

### Prerequisites
- Node.js 18+ 
- pnpm 9+

### Installation & Running

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment variables
# Copy .env.local.example to packages/web/.env.local and fill in your Supabase credentials
cp packages/web/.env.local.example packages/web/.env.local

# 3. Start development server
pnpm dev

# 4. Open browser
# http://localhost:3000
```

### Development Commands

```bash
# Start all services in parallel
pnpm dev

# Build all packages
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Type checking
pnpm type-check
```

## 📁 Project Structure

```
taskflow/
├── packages/
│   ├── web/                    # Main Next.js 14 application
│   │   ├── src/app/            # Next.js App Router pages
│   │   ├── src/components/     # React components
│   │   ├── src/hooks/          # Custom hooks (useAuth)
│   │   ├── src/lib/            # Utilities
│   │   └── .env.local          # Environment variables
│   ├── api/                    # API utilities (future expansion)
│   └── shared/                 # Shared types & utilities
├── pnpm-workspace.yaml         # Monorepo configuration
└── package.json                # Root package.json
```

## 🔧 Environment Setup

In `packages/web/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=your_project_id
```

## ✨ Features Implemented

- ✅ **CRUD Operations**: Create, read, update, delete tasks
- ✅ **Real-time Sync**: Supabase realtime subscriptions
- ✅ **Authentication**: Sign-up, sign-in, sign-out with email/password
- ✅ **Protected Routes**: Automatic redirects for unauthorized users
- ✅ **Responsive Design**: Mobile, tablet, and desktop layouts
- ✅ **Animations**: Smooth fade-in and slide-up effects
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Error Handling**: Toast notifications for user feedback

## 📝 Pages

- `/` - Landing page with feature highlights
- `/auth` - Authentication (sign-up/sign-in)
- `/dashboard` - Task management interface
- `/profile` - User profile and settings

## 📦 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Monorepo**: pnpm workspaces
- **UI Components**: 50+ Shadcn/ui components pre-installed

## 🎯 Status

**✅ FULLY COMPLETE** - All features implemented and ready for production use.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)