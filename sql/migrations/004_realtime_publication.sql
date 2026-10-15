-- 004_realtime_publication.sql

-- Enable Realtime replication for your risk tables
-- Requires a publication named 'supabase_realtime' to exist (Supabase-managed)
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS portfolio_limits;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS model_exposure_limits;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS drawdown_caps;
ALTER PUBLICATION supabase_realtime ADD TABLE IF NOT EXISTS system_kill_switch;
