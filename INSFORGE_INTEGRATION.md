# InsForge Integration Checklist

This project utilizes the InsForge Integration Service to connect with Supabase securely.

## 1. Client Initialization
- [x] Client instantiated in `src/lib/insforge.ts`
- [x] **Fallback Implementation**: Mock Adapter active when `NEXT_PUBLIC_INSFORGE_API_KEY` is missing.
- [ ] **Action Required**: Set valid credentials in `.env.local` to switch to Live Mode.

## 2. Authentication Flows
- [x] **Login**: `/auth/login` -> `auth.signInWithPassword`
- [x] **Signup**: `/auth/signup` -> `auth.signUp` (Forces `gym_owner` role metadata)
- [x] **Session Handling**: `useUser` hook listens to `onAuthStateChange`.
- [ ] **Email Verification**: Enabled by default in backend settings.

## 3. Data Mappings & Endpoints
The following endpoints will be hit when Live Mode is active:

### Gym & Profile
- **Create Gym**: `gyms.insert` (at `/setup-gym`)
- **Link Profile**: `profiles.update` (at `/setup-gym`)
- **Fetch Profile**: `profiles.select` (in `useUser`)

### Dashboard (Admin)
- **Members Count**: `members.select(count)`
- **Revenue**: `invoices.select(amount)`
- **Workouts**: `workouts.select(count)`

### AI Features
- **Generate Workout**: Calls `ai.chat.completions.create` (Gemini Model)
- **Route**: `src/app/api/ai/generate`

## 4. Security
- [x] **RLS Policies**: Enforced on all tables.
- [x] **Middleware**: Protects `/dashboard` routes.
- [x] **API Route Protection**: `api/ai/generate` checks for session.

## 5. Next Steps
1.  Obtain API URL & Anon Key from InsForge Dashboard.
2.  Update `.env.local`.
3.  Restart server (`npm run dev`).
4.  Verify Real-time data sync.
