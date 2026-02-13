# SoluGrow - Onboarding & Admin Guide

Welcome to SoluGrow! This guide explains how to operate your Gym Management SaaS.

## 🚀 How to Start
1. **Apply Schema**: Use the provided `supabase/migrations/20260213_init.sql` to initialize your database.
2. **Set Env Vars**: Update `.env.local` with your InsForge API URL, Anon Key, and Gemini API Key.
3. **Run App**: `npm run dev` to start locally.

## 🏢 New Gym Onboarding
1. **Sign Up**: A new user signs up via `/auth/signup`.
2. **Role Assignment**: By default, users are 'member'. Change role to 'gym_owner' in the `profiles` table to grant admin access.
3. **Gym Setup**: Gym owners without a gym are redirected to `/setup-gym` to enter their facility details.

## 👨‍💼 Dashboards
- **Platform Admin (`/dashboard/super-admin`)**: Manage all tenants, monitor revenue and growth.
- **Gym Owner (`/dashboard/admin`)**: Manage members, trainers, classes, and payments for a specific gym.
- **Member Portal (`/dashboard/member`)**: Members can view their plans, attendance, and AI-suggested workouts.

## 🤖 AI Assistant (Master Coach)
- Located at `/api/ai/generate`.
- Integrates with Gemini to provide workout plans and diet suggestions.
- Can be used by owners for business growth strategies.

## 💳 Payments & Subscriptions
- Configuration in `src/lib/payments.ts`.
- Supports Stripe and Razorpay (logic ready for webhook integration).

## 🛠️ API Usage Examples
- **Get All Gyms**: `GET /api/database/records/gyms`
- **Add Member**: `POST /api/database/records/members`
- **Link Class**: `GET /api/database/records/classes?select=*,trainer:trainers(*)`

## 🔒 Security (RLS)
- Every table has RLS enabled.
- Data is isolated by `gym_id`.
- Only `platform_admin` can see across all gyms.

---
*Support: solugrow@gmail.com | +91 9719408937*
