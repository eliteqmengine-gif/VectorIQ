-- 003_data_sources.sql

CREATE TABLE IF NOT EXISTS data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name TEXT NOT NULL UNIQUE,
    data_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    latency_ms INTEGER,
    api_endpoint TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO data_sources (source_name, data_type, status, latency_ms, api_endpoint)
VALUES
    ('Polygon.io', 'US Equities & Options', 'ACTIVE', 24, 'https://api.polygon.io'),
    ('Alpaca Realtime', 'Paper / Live Feed', 'ACTIVE', 18, 'https://broker-api.sandbox.alpaca.markets'),
    ('Binance WebSocket', 'Crypto Spot / Perps', 'ACTIVE', 45, 'wss://stream.binance.com:9443/ws'),
    ('Alternative.me', 'Crypto Fear & Greed Index', 'DEGRADED', 120, 'https://api.alternative.me/fng/')
ON CONFLICT (source_name) DO UPDATE SET
    data_type = EXCLUDED.data_type,
    status = EXCLUDED.status,
    latency_ms = EXCLUDED.latency_ms,
    api_endpoint = EXCLUDED.api_endpoint,
    updated_at = now();
