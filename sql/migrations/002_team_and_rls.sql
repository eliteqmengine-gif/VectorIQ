-- 002_team_and_rls.sql

-- Create enum for user roles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'user_role'
    ) THEN
        CREATE TYPE user_role AS ENUM ('admin', 'lead_researcher', 'trader', 'viewer');
    END IF;
END $$;

-- Team profiles extending Supabase auth.users
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'viewer',
    department TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable row-level security for strategies if the table exists
ALTER TABLE IF EXISTS public.strategies ENABLE ROW LEVEL SECURITY;

-- Allow active team members to read strategies
CREATE POLICY "team_members_select_strategies"
ON public.strategies
FOR SELECT
USING (
    auth.uid() IN (
        SELECT id
        FROM public.team_members
        WHERE is_active = true
    )
);

-- Restrict writes to admins and lead researchers
CREATE POLICY "team_members_manage_strategies"
ON public.strategies
FOR ALL
USING (
    auth.uid() IN (
        SELECT id
        FROM public.team_members
        WHERE role IN ('admin', 'lead_researcher')
          AND is_active = true
    )
)
WITH CHECK (
    auth.uid() IN (
        SELECT id
        FROM public.team_members
        WHERE role IN ('admin', 'lead_researcher')
          AND is_active = true
    )
);
