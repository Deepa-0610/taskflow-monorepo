# Taskflow Monorepo Setup Guide

## ✅ What Has Been Done

Your project has been successfully converted from a Vite + React Router app to a **Next.js monorepo structure with pnpm workspaces**.

### Completed Tasks

1. **Created Monorepo Structure**
   - ✅ `pnpm-workspace.yaml` - Configured workspaces
   - ✅ Root `package.json` - Monorepo scripts
   - ✅ Base TypeScript configuration

2. **Set Up Three Packages**
   - ✅ `@taskflow/web` - Main Next.js application
   - ✅ `@taskflow/api` - API utilities and services
   - ✅ `@taskflow/shared` - Shared types and utilities

3. **Web Package Configuration**
   - ✅ Next.js 14 setup with App Router
   - ✅ TypeScript configuration
   - ✅ Tailwind CSS with design tokens
   - ✅ All shadcn/ui components copied
   - ✅ Environment variables setup

4. **Component Migration**
   - ✅ Converted React Router components to Next.js
   - ✅ Created page routes for auth, dashboard, and profile
   - ✅ Task management components (TaskForm, TaskList, TaskCard)
   - ✅ Navigation component updated for Next.js

5. **Authentication Setup**
   - ✅ Migrated useAuth hook from React Router context to Next.js
   - ✅ AuthProvider for all packages
   - ✅ ProtectedRoute component for Next.js

6. **Documentation**
   - ✅ Root README.md with complete guide
   - ✅ Package-specific READMEs
   - ✅ Repository info file

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Install pnpm globally if you don't have it
npm install -g pnpm

# Install all workspace dependencies
pnpm install
```

### 2. Set Environment Variables

The `.env.local` file is already set up in `packages/web/` with your Supabase credentials.

### 3. Run Development Server

```bash
# Start all development servers
pnpm dev

# Or run specific package
pnpm --filter @taskflow/web dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @taskflow/web build
```

### 5. Deploy

```bash
# Start production server (requires build first)
pnpm start
```

## 📁 File Structure

```
taskflow/
├── packages/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/              # Next.js pages
│   │   │   ├── components/       # React components
│   │   │   ├── hooks/            # Custom hooks
│   │   │   ├── styles/           # Global CSS
│   │   │   └── lib/              # Utilities
│   │   ├── .env.local            # ✅ Already configured
│   │   ├── next.config.js        # ✅ Next.js config
│   │   ├── tsconfig.json         # ✅ TypeScript config
│   │   └── package.json          # ✅ Web package config
│   ├── api/
│   │   └── src/
│   │       ├── services/         # Supabase client
│   │       └── lib/              # API utilities
│   └── shared/
│       └── src/
│           ├── types/            # TypeScript types
│           └── utils/            # Shared functions
├── pnpm-workspace.yaml           # ✅ Workspace config
├── tsconfig.base.json            # ✅ Base TS config
├── package.json                  # ✅ Root package config
└── README.md                      # ✅ Documentation

```

## 🔧 Available Commands

```bash
# Development
pnpm dev                 # Start all dev servers
pnpm dev --filter @taskflow/web  # Start specific package

# Building
pnpm build              # Build all packages
pnpm build --filter @taskflow/shared  # Build specific package

# Linting
pnpm lint               # Run linters

# Type checking
pnpm type-check         # TypeScript validation

# Production
pnpm start              # Start production server

# Clean up
pnpm clean              # Remove all node_modules (manual)
```

## 🔑 Important Notes

### Environment Variables
- The `.env.local` file in `packages/web/` contains your Supabase credentials
- All client-side variables must start with `NEXT_PUBLIC_` prefix
- Keep this file secure and never commit it to version control

### Package Dependencies
- `@taskflow/web` imports from `@taskflow/shared` and `@taskflow/api`
- `@taskflow/api` imports from `@taskflow/shared`
- Use `workspace:*` in package.json for internal dependencies

### Next.js App Router
- Your app uses Next.js App Router (not Pages Router)
- Pages are defined in `packages/web/src/app/`
- Use `next/link` and `next/navigation` for routing

### Tailwind CSS
- All styling is done with Tailwind CSS
- Configuration is in `packages/web/tailwind.config.ts`
- Global styles are in `packages/web/src/styles/globals.css`

## ⚠️ Next Steps

1. **Update Database Functions** (Optional)
   - The TaskForm, TaskCard, and TaskList components have TODO comments
   - Replace them with actual database operations using the Supabase client

2. **Add More Features**
   - Create new packages as needed
   - Share code between packages using `@taskflow/shared`

3. **Deploy**
   - Deploy to Vercel: `vercel deploy`
   - Or deploy using your preferred hosting platform

## 🆘 Troubleshooting

**Error: "Cannot find module '@taskflow/...'"**
- Run `pnpm install` in the root directory
- Check the import path matches the package name in its `package.json`

**Development server not starting**
- Make sure all dependencies are installed: `pnpm install`
- Clear cache: `pnpm clean` (you'll need to manually delete node_modules if this fails)
- Restart the development server

**Environment variables not loading**
- Make sure `.env.local` is in `packages/web/`
- Restart the development server after changing variables
- Variables must start with `NEXT_PUBLIC_` to be available in the browser

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/docs)

## ✨ Ready to Go!

Your monorepo is now ready to run! Start with:

```bash
pnpm install
pnpm dev
```

Then open your browser and navigate to `http://localhost:3000`

Happy coding! 🚀