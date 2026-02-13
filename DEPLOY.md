# Deployment Guide for SoluGrow SaaS

## Prerequisites
- Node.js 18+
- Git
- Supabase Account
- Netlify or Vercel Account

## 1. Local Setup
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
    ```env
    NEXT_PUBLIC_INSFORGE_API_URL=https://your-project.supabase.co
    NEXT_PUBLIC_INSFORGE_API_KEY=your-anon-key
    ```

## 2. Database Setup (Supabase)
1.  Go to your Supabase Dashboard -> SQL Editor.
2.  Open `supabase/migrations/20260213_init.sql` from this project.
3.  Copy and Paste the entire SQL content into the editor and **Run**.
    - This will create all tables (Gyms, Profiles, etc.) and set up RLS policies.
4.  Go to **Storage** and create two buckets:
    - `avatars` (Public)
    - `gym_documents` (Private)

## 3. Production Deployment (Netlify/Vercel)
1.  Push your code to a GitHub repository.
2.  Log in to Netlify or Vercel and "Import Project from GitHub".
3.  Select the repository `solugym-soft`.
4.  **Build Settings**:
    - Framework: Next.js
    - Build Command: `npm run build`
    - Output Directory: `.next`
5.  **Environment Variables**:
    - Add the same variables from your `.env.local` to the deployment settings.
6.  Click **Deploy**.

## 4. Post-Deployment Verification
- Visit your live URL.
- Sign up as a new Gym Owner.
- Check if you get redirected to the dashboard.
- Test the "AI Workout Generator" feature.

## Troubleshooting
- **Build Errors**: Ensure `npm install` ran successfully and all dependencies are present.
- **Database Errors**: Check RLS policies if you can't see data. Default policy is Deny All, so explicit policies are required (which are included in the SQL script).
