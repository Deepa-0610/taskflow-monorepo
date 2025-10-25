# 🚀 Deployment Guide

## Vercel (Recommended for Next.js)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with your code
- Supabase project set up

### Step 1: Connect GitHub
1. Go to https://vercel.com/new
2. Select "Import Git Repository"
3. Choose your GitHub repository

### Step 2: Configure Environment Variables
In Vercel project settings, add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://cpikyhhtgvnjhdzdqfst.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=cpikyhhtgvnjhdzdqfst
```

### Step 3: Configure Build Settings
- **Build Command**: `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `pnpm install`

### Step 4: Deploy
Click "Deploy" - Vercel will automatically build and deploy your app!

## Docker (For Custom Deployments)

### Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files
COPY . .

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the app
RUN pnpm build

# Start the server
CMD ["pnpm", "start"]
```

### Build and Run
```bash
docker build -t taskflow .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_key \
  -e NEXT_PUBLIC_SUPABASE_PROJECT_ID=your_project_id \
  taskflow
```

## Environment Variables for Production

Ensure these are set in your deployment environment:

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=your_project_id
```

## Pre-Deployment Checklist

- ✅ All environment variables configured
- ✅ Supabase project is active and accessible
- ✅ Database tables are created (via migrations)
- ✅ Authentication is enabled in Supabase
- ✅ Run `pnpm build` locally to verify no errors
- ✅ Test the application thoroughly

## Post-Deployment

### Verify Deployment
1. Visit your deployed URL
2. Create a test account
3. Create a test task
4. Verify real-time sync works
5. Check error logging in Supabase

### Monitor Performance
- Use Vercel Analytics (if using Vercel)
- Monitor Supabase database in the console
- Set up error alerts

## Rollback Plan

If issues occur:
1. In Vercel: Click "Deployments" → select previous version → click "Promote"
2. In Docker: Deploy previous image version

## Support & Troubleshooting

- Check server logs for errors
- Verify Supabase connectivity
- Ensure all environment variables are set correctly
- Review CORS settings if frontend can't reach API

## Scaling Considerations

As your app grows:
1. Consider enabling Supabase connection pooling
2. Implement caching strategies
3. Optimize database queries with indexes
4. Monitor and optimize bundle size
5. Consider CDN for static assets

## Next Steps

Once deployed:
- Set up custom domain
- Enable HTTPS (automatic on most platforms)
- Configure backup strategies
- Set up monitoring and alerts