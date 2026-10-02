'use client';

import ScreenShell from '../components/ScreenShell';
import StrategyCard from '../components/StrategyCard';
import BottomNav from '../components/BottomNav';

const strategies = [
  { id: 1, name: 'Alpha Momentum', status: 'live', sharpeRatio: 1.84, maxDrawdown: 0.08 },
  { id: 2, name: 'Volatility Breakout', status: 'backtesting', sharpeRatio: 1.42, maxDrawdown: 0.11 },
  { id: 3, name: 'Mean Reversion Core', status: 'draft', sharpeRatio: 0.93, maxDrawdown: 0.05 },
];

export default function ResearchPage() {
  return (
    <ScreenShell title="Research" subtitle="Backtests, rankings, and alpha lab">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <p className="text-xs text-gray-400">Active Strategies</p>
            <p className="text-2xl font-black text-cyan-400">12</p>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
            <p className="text-xs text-gray-400">Avg Sharpe</p>
            <p className="text-2xl font-black text-green-400">1.67</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-900 p-4">
          <p className="text-sm text-gray-400 mb-2">Top Ranked Strategy</p>
          <h3 className="text-xl font-bold">Alpha Momentum</h3>
          <p className="text-green-400 mt-2">+18.4% portfolio return</p>
        </div>

        {strategies.map((strategy) => (
          <StrategyCard key={strategy.id} {...strategy} />
        ))}
      </div>
      <BottomNav />
    </ScreenShell>
  );
}
