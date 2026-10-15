import React from 'react';
import LiveRiskChart from '../components/LiveRiskChart';

export default function RiskLivePage() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px', background: '#0b1220' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontFamily: 'sans-serif', marginBottom: '20px' }}>Risk Live Feed</h1>
        <p style={{ color: '#9CA3AF', marginBottom: '12px' }}>This demo page mounts the LiveRiskChart component which subscribes to portfolio_limits via Supabase Realtime.</p>
        <LiveRiskChart />
      </div>
    </div>
  );
}
