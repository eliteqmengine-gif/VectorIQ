# Add Supabase + Recharts, risk-control SQL migrations, and demo live chart

This pull request adds the Supabase client and Recharts charting library, a demo realtime chart component that subscribes to portfolio_limits via Supabase Realtime, and SQL migrations to support risk controls and team RLS.

Summary of changes
- Adds dependencies: `@supabase/supabase-js`, `recharts`
- Adds demo realtime chart component: `components/LiveRiskChart.tsx`
- Adds demo page mounting the chart: `pages/risk-live.tsx`
- Adds SQL migrations under `sql/migrations/`:
  - `001_create_risk_tables.sql` — portfolio_limits, model_exposure_limits, drawdown_caps, system_kill_switch
  - `002_team_and_rls.sql` — team_members and RLS policies (idempotent; adjust to match your strategies schema)
  - `003_data_sources.sql` — data_sources and seed rows
  - `004_realtime_publication.sql` — publication ALTERs for realtime replication

Notes
- A best-effort `package-lock.json` has been included with placeholder integrity hashes. Please run `npm install` locally on the branch and commit the generated `package-lock.json` before merging.
- Verify and adjust the SQL/RLS policies to match your production schemas and permissions (e.g., strategies table schema and owner fields).
- Confirm the `supabase_realtime` publication exists and that you have privileges to modify it (Supabase-managed projects typically have this publication).
- Set the following environment variables prior to running the demo page:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Checklist
- [ ] Run `npm install` and commit generated `package-lock.json`
- [ ] Verify and adjust SQL/RLS policies to match production schemas & permissions
- [ ] Confirm `supabase_realtime` publication exists and DB privileges
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in environment

Suggested reviewers/assignees
- @lead_researcher (replace with actual GitHub username)
- @devops (replace with actual GitHub username)
- DB migrations/security owner
