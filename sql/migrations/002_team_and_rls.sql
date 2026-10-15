-- 002_team_and_rls.sql

-- Create Enum for User Roles (idempotent)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'lead_researcher', 'trader', 'viewer');
    END IF;
END$$;

-- Team Profiles Table extending Supabase Auth
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role user_role DEFAULT 'viewer',
    department TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Row-Level Security (RLS) Policy Example for Strategies Table
-- NOTE: Adjust the following policies to match your strategies table schema (e.g. owner_id) and your org's access model.
ALTER TABLE IF EXISTS strategies ENABLE ROW LEVEL SECURITY;

-- Allow active team members to SELECT strategies
CREATE POLICY IF NOT EXISTS allow_view_strategies
ON strategies FOR SELECT
USING (
    auth.uid() IN (SELECT id FROM team_members WHERE is_active = true)
);

-- Allow admins and lead_researchers to INSERT/UPDATE/DELETE strategies
CREATE POLICY IF NOT EXISTS allow_modify_strategies
ON strategies FOR INSERT, UPDATE, DELETE
USING (
    auth.uid() IN (
        SELECT id FROM team_members
        WHERE role IN ('admin', 'lead_researcher') AND is_active = true
    )
);

-- Optionally allow creators (owner_id) to modify their own strategies. Uncomment and adjust if strategies.owner_id exists:
-- CREATE POLICY IF NOT EXISTS allow_owner_modify
-- ON strategies FOR UPDATE, DELETE
-- USING (
--     auth.uid() = owner_id
-- );

-- Grant usage on team_members view/table to authenticated users if desired (adjust as needed):
-- GRANT SELECT ON team_members TO authenticated;
