# 🚀 RealTalk - Deployment Guide

## Quick Deploy (15 minutes)

### 1. Database Setup (5 minutes)
1. Create Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run both migration files:
   - `supabase/migrations/20250629101751_sweet_heart.sql`
   - `supabase/migrations/20250706161240_wild_sun.sql`
3. Get your credentials from Settings > API

### 2. Environment Variables (2 minutes)
Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Test Build (3 minutes)
```bash
npm install
npm run build
```

### 4. Deploy to Netlify (5 minutes)
1. Push to GitHub
2. Connect to Netlify
3. Build settings:
   - Command: `npm run build`
   - Directory: `out`
4. Add environment variables
5. Deploy!

## ✅ Success Checklist
- [ ] Database migrations run
- [ ] Environment variables set
- [ ] Build succeeds locally
- [ ] Netlify deployment works
- [ ] Live site accessible
- [ ] User registration works

## 🎯 Demo Accounts
Create these for testing:
- `roots@realtalk.com` / `demo123` (Roots persona)
- `mask@realtalk.com` / `demo123` (Mask persona)
- `spark@realtalk.com` / `demo123` (Spark persona)

## 🔧 Troubleshooting
- **Build fails**: Clear `.next` and `node_modules`, reinstall
- **Env vars not working**: Check spelling, restart dev server
- **Supabase issues**: Verify URL/key, check RLS policies

Your app will be live at: `https://your-site.netlify.app` 🎉