# RealTalk - Database Setup & Deployment Guide

## Phase 1: Supabase Database Setup (45 minutes)

### Step 1: Create Supabase Project (10 minutes)
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Choose organization and set:
   - **Name**: `realtalk-hackathon`
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your location
5. Wait for project creation (2-3 minutes)

### Step 2: Get Environment Variables (5 minutes)
1. In your Supabase dashboard, go to **Settings > API**
2. Copy these values:
   - **Project URL** (starts with https://...)
   - **anon/public key** (starts with eyJ...)

### Step 3: Configure Local Environment (5 minutes)
1. Create `.env.local` file in project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Run Database Migrations (10 minutes)
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire content from `supabase/migrations/20250629101751_sweet_heart.sql`
4. Paste and click **Run**
5. Verify tables are created in **Table Editor**

### Step 5: Test Authentication (10 minutes)
1. Restart your dev server: `npm run dev`
2. Go to signup page and create a test account
3. Verify user appears in **Authentication > Users**
4. Test login/logout functionality

### Step 6: Verify Database Connection (5 minutes)
1. Complete onboarding flow (select personality)
2. Check if profile is created in **Table Editor > profiles**
3. Test matching system
4. Verify data is being saved

## Phase 2: Deployment Setup (45 minutes)

### Option A: Netlify Deployment (Recommended)

#### Step 1: Prepare for Deployment (10 minutes)
1. Commit all changes to git:
```bash
git add .
git commit -m "Prepare for deployment"
```

2. Push to GitHub repository

#### Step 2: Deploy to Netlify (15 minutes)
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "New site from Git"
4. Choose your repository
5. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Add environment variables in **Site settings > Environment variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Step 3: Test Live Site (15 minutes)
1. Wait for deployment to complete
2. Test full user journey on live URL
3. Create demo accounts
4. Verify all features work

#### Step 4: Custom Domain (5 minutes)
1. In Netlify, go to **Domain settings**
2. Change site name to something memorable
3. Note the final URL for submission

### Option B: Vercel Deployment (Alternative)

#### Step 1: Deploy to Vercel (20 minutes)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts to link to project
4. Add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```
5. Deploy: `vercel --prod`

## Phase 3: Demo Preparation (30 minutes)

### Create Demo Accounts (10 minutes)
1. Create 3 demo accounts with different personalities:
   - `demo-realme@realtalk.com` (Real Me personality)
   - `demo-mask@realtalk.com` (My Mask personality)  
   - `demo-crazy@realtalk.com` (Crazy Self personality)
2. Complete onboarding for each
3. Test matching between accounts

### Test Complete User Journey (15 minutes)
1. **Landing Page** → Sign up
2. **Authentication** → Login
3. **Onboarding** → Select personality
4. **Dashboard** → View personalized content
5. **Matching** → Find a match
6. **Conversation** → Test voice interface
7. **History** → View past conversations

### Prepare Presentation Materials (5 minutes)
1. Take screenshots of key features
2. Note the live URL
3. Prepare demo script
4. List key features for judges

## Troubleshooting

### Common Issues:
1. **Build fails**: Check for TypeScript errors
2. **Supabase connection fails**: Verify environment variables
3. **Authentication not working**: Check RLS policies
4. **Deployment timeout**: Try deploying again

### Quick Fixes:
- Clear `.next` cache: `rm -rf .next`
- Restart dev server: `npm run dev`
- Check browser console for errors
- Verify environment variables are set

## Final Checklist

### Before Submission:
- [ ] Live URL is working
- [ ] Demo accounts are created
- [ ] All core features tested
- [ ] Screenshots taken
- [ ] Presentation prepared
- [ ] Team knows the demo flow

### Submission Requirements:
- **Live URL**: `https://your-site.netlify.app`
- **GitHub Repository**: Link to code
- **Demo Video**: Optional but recommended
- **Feature List**: What we built
- **Tech Stack**: Next.js, Supabase, TypeScript

## Team Roles for Final Sprint

### Developer 1: Database Setup
- Set up Supabase project
- Configure environment variables
- Run migrations and test

### Developer 2: Deployment
- Handle Netlify/Vercel deployment
- Configure production environment
- Test live functionality

### Developer 3: Demo Preparation
- Create demo accounts
- Test user journeys
- Prepare presentation materials
- Take screenshots/videos

### Project Manager: Coordination
- Track progress against timeline
- Coordinate between team members
- Prepare final submission
- Handle any blockers

## Success Metrics

By the end of 3.5 hours, we should have:
1. ✅ Live, working application
2. ✅ Database with real user data
3. ✅ Demo accounts ready
4. ✅ All core features functional
5. ✅ Presentation materials ready
6. ✅ Submission completed

Let's make this happen! 🚀