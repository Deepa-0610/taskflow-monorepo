---
description: Repository Information Overview
alwaysApply: true
---

# Taskflow Information

## Summary
A modern task management application built with Next.js, TypeScript, Tailwind CSS, and Supabase, structured as a monorepo using pnpm workspaces.

## Structure
- **packages/web**: Main Next.js application
- **packages/api**: API utilities and backend logic
- **packages/shared**: Shared types and utilities
- **supabase**: Database migrations and configuration
- **.github**: CI/CD workflows

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.8+
**Build System**: Next.js
**Package Manager**: pnpm 8+

## Dependencies
**Main Dependencies**:
- Next.js 14.2.0
- React 18.3.1
- Supabase (auth & database)
- Tailwind CSS 3.4.17
- Shadcn/ui components
- React Query
- Zod (validation)

**Development Dependencies**:
- ESLint 9.32.0
- TypeScript 5.9.3
- Tailwind plugins

## Build & Installation
```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Start production
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Docker
No Docker configuration found in the repository.

## Testing
No dedicated testing framework configuration found.

## Database
**Provider**: Supabase (PostgreSQL)
**Schema**:
- tasks: User task management with RLS
- profiles: User profile information with RLS
- Migrations for table creation and security policies

## Project Structure
The project is organized as a pnpm monorepo with three main packages:

### @taskflow/web
- Next.js 14 application with App Router
- React components for task management
- Authentication flow with Supabase
- Tailwind CSS styling with Shadcn/ui components

### @taskflow/api
- Supabase client configuration
- API utilities for database operations
- Shared backend logic

### @taskflow/shared
- TypeScript types and interfaces
- Shared utilities and constants
- Zod validation schemas

## Environment Setup
Required environment variables in packages/web/.env.local:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```