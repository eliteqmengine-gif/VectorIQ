-- 003_data_sources.sql

-- Data Sources Configuration Table
CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL,
    data_type TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE',
    latency_ms INTEGER,
    api_endpoint TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert Initial Data Sources visible in your workspace UI
INSERT INTO data_sources (source_name, data_type, status, latency_ms)
VALUES
('Polygon.io', 'US Equities & Options', 'ACTIVE', 24),
('Alpaca Realtime', 'Paper / Live Feed', 'ACTIVE', 18),
('Binance WebSocket', 'Crypto Spot / Perps', 'ACTIVE', 45),
('Alternative.me', 'Crypto Fear & Greed Index', 'DEGRADED', 120)
ON CONFLICT (id) DO NOTHING;
