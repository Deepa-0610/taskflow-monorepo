# ⚡ Taskflow Quick Start Guide

## 🎯 5-Minute Setup

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Verify Environment Variables
The following should already be configured in `packages/web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://cpikyhhtgvnjhdzdqfst.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_PROJECT_ID=cpikyhhtgvnjhdzdqfst
```

### Step 3: Start Development Server
```bash
pnpm dev
```

The application will be available at: **http://localhost:3000**

## 📋 Default User Credentials

You can create a new account at the sign-up page, or use the following:

**Note**: The Supabase instance is configured and ready to accept new user registrations.

## 🧭 Navigation Guide

1. **Home Page** (`/`) - Landing page with feature overview
2. **Auth Page** (`/auth`) - Create account or sign in
3. **Dashboard** (`/dashboard`) - Manage your tasks (protected, requires login)
4. **Profile** (`/profile`) - View your account info (protected, requires login)

## ✨ Try These Actions

1. **Sign up** with an email and password
2. **Create a task** - Type a task title and press Enter
3. **Toggle completion** - Click the checkbox on a task
4. **Edit a task** - Click on the task title to edit it inline
5. **Delete a task** - Click the trash icon
6. **Open in multiple tabs** - See real-time sync in action!

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -r node_modules packages/*/node_modules
pnpm install
```

### Environment variables not working?
Make sure you've set them in `packages/web/.env.local` (not the root `.env.local`)

## 📦 What's Included

- ✅ **Next.js 14** - Latest React framework
- ✅ **TypeScript** - Full type safety
- ✅ **Tailwind CSS** - Modern styling
- ✅ **Shadcn/ui** - 50+ pre-built components
- ✅ **Supabase** - PostgreSQL database + auth
- ✅ **Real-time** - Live updates via WebSockets
- ✅ **pnpm** - Fast monorepo management

## 🚀 Ready to Deploy?

The project is production-ready! See `DEPLOYMENT.md` for deployment instructions.

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com)