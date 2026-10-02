'use client';

import ScreenShell from '../components/ScreenShell';
import BottomNav from '../components/BottomNav';

export default function AccountPage() {
  return (
    <ScreenShell title="Account" subtitle="Preferences and trading profile">
      <div className="space-y-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Account</p>
          <h3 className="text-2xl font-bold mt-2">Retail Trader</h3>
          <p className="text-cyan-400 mt-2">Tier 2 access</p>
        </div>

        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 space-y-3">
          <div className="flex justify-between"><span className="text-gray-400">Risk profile</span><span>Moderate</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Max drawdown</span><span>8.0%</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Broker</span><span>Alpaca Paper</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Notifications</span><span>Enabled</span></div>
        </div>
      </div>
      <BottomNav />
    </ScreenShell>
  );
}
