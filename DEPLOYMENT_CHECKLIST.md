# RealTalk - Production Deployment Checklist

## 🎯 **Quick Deployment Guide (30 minutes)**

### Phase 1: Database Setup (10 minutes)

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Set project name: `realtalk-production`
4. Choose region closest to you
5. Set strong database password (save it!)

#### Step 2: Get Environment Variables
1. In Supabase dashboard → **Settings > API**
2. Copy:
   - **Project URL** 
   - **anon/public key**

#### Step 3: Update Environment
Create `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

#### Step 4: Run Database Migrations
1. Go to **SQL Editor** in Supabase
2. Run migration 1: Copy content from `supabase/migrations/20250629101751_sweet_heart.sql`
3. Run migration 2: Copy content from `supabase/migrations/20250706161240_wild_sun.sql`
4. Verify tables created in **Table Editor**

### Phase 2: Production Build (10 minutes)

#### Step 1: Test Local Build
```bash
npm run build
```

#### Step 2: Fix Any Build Errors
- Check TypeScript errors
- Verify all imports
- Test environment variables

### Phase 3: Netlify Deployment (10 minutes)

#### Step 1: Prepare Repository
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

#### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. "New site from Git" → Connect GitHub
3. Select your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy site

#### Step 3: Test Live Site
1. Wait for deployment to complete
2. Test complete user flow
3. Create demo accounts
4. Verify all features work

## ✅ **Success Checklist**

### Database Working:
- [ ] Supabase project created
- [ ] Environment variables set
- [ ] Migrations run successfully
- [ ] Tables visible in Supabase

### Build Working:
- [ ] Local build succeeds
- [ ] No TypeScript errors
- [ ] All imports resolved

### Deployment Working:
- [ ] Netlify deployment successful
- [ ] Live URL accessible
- [ ] Authentication working
- [ ] Database connection working
- [ ] All pages loading

### User Flow Working:
- [ ] Landing page loads
- [ ] Sign up works
- [ ] Onboarding works
- [ ] Dashboard loads
- [ ] Feed works
- [ ] Profile works

## 🚨 **Common Issues & Fixes**

### Build Fails:
```bash
# Clear cache and retry
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Environment Variables Not Working:
- Verify `.env.local` exists
- Check variable names match exactly
- Restart dev server after changes

### Supabase Connection Fails:
- Verify URL and key are correct
- Check if project is paused (free tier)
- Ensure RLS policies are set up

### Netlify Build Fails:
- Check build logs for specific errors
- Verify environment variables in Netlify
- Ensure all dependencies are in package.json

## 🎉 **Final Steps**

### After Successful Deployment:
1. **Test Everything**: Complete user journey
2. **Create Demo Accounts**: For testing and demos
3. **Document Live URL**: Save for sharing
4. **Monitor Performance**: Check for any issues

### Demo Accounts to Create:
- `demo@realtalk.com` / `demo123` (Roots persona)
- `test@realtalk.com` / `test123` (Mask persona)
- `spark@realtalk.com` / `spark123` (Spark persona)

## 📱 **Live URL**
Once deployed, your app will be available at:
`https://your-site-name.netlify.app`

---

**Ready to go live! 🚀**