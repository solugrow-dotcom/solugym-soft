-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Users)
create type user_role as enum ('super_admin', 'gym_owner', 'staff', 'member');

create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  avatar_url text,
  role user_role default 'member',
  gym_id uuid, -- For staff/members, links to their gym. For gym_owner, links to their OWNED gym.
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GYMS (Tenants)
create table gyms (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text,
  city text,
  state text,
  phone text,
  owner_id uuid references profiles(id) not null,
  subscription_plan text default 'basic', -- basic, pro, enterprise
  subscription_status text default 'active', -- active, past_due, canceled
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MEMBERS (Link Users to Gyms with status)
create table members (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  user_id uuid references profiles(id) not null,
  status text default 'active', -- active, inactive, pending
  join_date date default current_date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SUBSCRIPTIONS (Gym's subscription to SaaS)
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  plan_id text not null,
  start_date timestamp with time zone default now(),
  end_date timestamp with time zone,
  status text default 'active',
  stripe_subscription_id text,
  razorpay_subscription_id text
);

-- WORKOUTS
create table workouts (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  member_id uuid references profiles(id) not null,
  creator_id uuid references profiles(id) not null, -- Trainer or AI
  name text,
  description text,
  exercises jsonb, -- structured workout data
  scheduled_date date,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DIETS
create table diets (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  member_id uuid references profiles(id) not null,
  creator_id uuid references profiles(id) not null,
  name text,
  description text,
  meals jsonb, -- structured diet data
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ATTENDANCE
create table attendance (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  member_id uuid references profiles(id) not null,
  date date default current_date,
  check_in_time timestamp with time zone,
  check_out_time timestamp with time zone,
  status text default 'present'
);

-- INVOICES (Generated for Gyms)
create table invoices (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  amount decimal(10,2) not null,
  currency text default 'INR',
  status text default 'paid',
  invoice_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- NOTIFICATIONS
create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) not null,
  type text not null, -- 'payment', 'workout', 'promo', 'system'
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SECRETS VAULT (Encrypted keys for integrations)
create table secrets_vault (
  id uuid default uuid_generate_v4() primary key,
  gym_id uuid references gyms(id) not null,
  key_name text not null, -- 'RAZORPAY_KEY', 'WHATSAPP_API_KEY'
  encrypted_value text not null,
  updated_at timestamp with time zone default now()
);

-- ROW LEVEL SECURITY (RLS)
alter table profiles enable row level security;
alter table gyms enable row level security;
alter table members enable row level security;
alter table subscriptions enable row level security;
alter table workouts enable row level security;
alter table diets enable row level security;
alter table attendance enable row level security;
alter table invoices enable row level security;
alter table notifications enable row level security;
alter table secrets_vault enable row level security;

-- POLICIES

-- PROFILES
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- GYMS
create policy "Gyms viewable by owner" on gyms for select using (auth.uid() = owner_id);
create policy "Gyms updateable by owner" on gyms for update using (auth.uid() = owner_id);
create policy "Super Admin can view all gyms" on gyms for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'super_admin')
);

-- MEMBERS
create policy "Members viewable by gym owner and staff" on members for select using (
  exists (select 1 from profiles where id = auth.uid() and gym_id = members.gym_id and role in ('gym_owner', 'staff'))
);
create policy "Members viewable by self" on members for select using (auth.uid() = user_id);

-- WORKOUTS
create policy "Workouts viewable by gym owner/staff" on workouts for select using (
  exists (select 1 from profiles where id = auth.uid() and gym_id = workouts.gym_id and role in ('gym_owner', 'staff'))
);
create policy "Workouts viewable by self" on workouts for select using (auth.uid() = member_id);

-- DIETS (Similar to Workouts)
create policy "Diets viewable by gym owner/staff" on diets for select using (
  exists (select 1 from profiles where id = auth.uid() and gym_id = diets.gym_id and role in ('gym_owner', 'staff'))
);
create policy "Diets viewable by self" on diets for select using (auth.uid() = member_id);

-- STORAGE BUCKETS (Managed via API mostly, but policies here if needed)
-- (Supabase storage policies are separate usually, but we'll assume standard buckets 'avatars', 'documents')

-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'member'); -- Default to member, update manually for owner
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
