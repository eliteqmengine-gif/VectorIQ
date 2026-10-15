-- 001_create_risk_tables.sql

-- 1. Portfolio Limits Table
CREATE TABLE IF NOT EXISTS portfolio_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    limit_type TEXT NOT NULL,
    current_value NUMERIC NOT NULL DEFAULT 0,
    configured_limit NUMERIC NOT NULL,
    utilization_pct NUMERIC GENERATED ALWAYS AS ((current_value / NULLIF(configured_limit, 0)) * 100) STORED,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Model Exposure Limits Table
CREATE TABLE IF NOT EXISTS model_exposure_limits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    max_exposure_usd NUMERIC NOT NULL,
    current_exposure_usd NUMERIC DEFAULT 0,
    is_paused BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Drawdown Caps Table
CREATE TABLE IF NOT EXISTS drawdown_caps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    timeframe TEXT NOT NULL,
    cap_pct NUMERIC NOT NULL,
    current_drawdown_pct NUMERIC DEFAULT 0,
    status TEXT DEFAULT 'NORMAL'
);

-- 4. System Kill-Switch Table
CREATE TABLE IF NOT EXISTS system_kill_switch (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    triggered_by TEXT,
    triggered_at TIMESTAMPTZ
);
