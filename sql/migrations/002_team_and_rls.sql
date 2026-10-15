-- 002_team_and_rls.sql

-- Create Enum for User Roles
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
ALTER TABLE IF EXISTS strategies ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow members to view team strategies"
ON strategies FOR SELECT
USING (
    auth.uid() IN (SELECT id FROM team_members WHERE is_active = true)
);

CREATE POLICY IF NOT EXISTS "Allow admins and researchers to modify strategies"
ON strategies FOR ALL
USING (
    auth.uid() IN (
        SELECT id FROM team_members 
        WHERE role IN ('admin', 'lead_researcher') AND is_active = true
    )
);
