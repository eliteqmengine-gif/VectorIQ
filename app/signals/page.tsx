'use client';

import { useState } from 'react';
import ScreenShell from '../components/ScreenShell';
import SignalCard from '../components/SignalCard';
import BottomNav from '../components/BottomNav';

const initialSignals = [
  { symbol: 'MSFT', signal: 1, confidence: 0.83, price: 433.04, strategyName: 'Trend Following' },
  { symbol: 'AAPL', signal: 1, confidence: 0.77, price: 214.44, strategyName: 'Momentum Breakout' },
  { symbol: 'QQQ', signal: 0, confidence: 0.58, price: 481.9, strategyName: 'Range Filter' },
  { symbol: 'TSLA', signal: -1, confidence: 0.72, price: 239.1, strategyName: 'Mean Reversion' },
];

export default function SignalsPage() {
  const [signals, setSignals] = useState(initialSignals);

  return (
    <ScreenShell title="Signals" subtitle="Live alpha generation and ranking">
      <div className="space-y-4">
        <div className="flex gap-2">
          <button className="flex-1 bg-cyan-600 text-white px-3 py-2 rounded font-semibold">Long Ideas</button>
          <button className="flex-1 bg-gray-900 text-gray-300 px-3 py-2 rounded font-semibold border border-gray-700">Short Ideas</button>
        </div>

        {signals.map((signal) => (
          <SignalCard key={signal.symbol} {...signal} />
        ))}

        <button
          onClick={() => setSignals([...signals, {
            symbol: 'META',
            signal: 1,
            confidence: 0.69,
            price: 514.1,
            strategyName: 'Sentiment Pulse',
          }])}
          className="w-full bg-gray-900 border border-cyan-500 text-cyan-400 py-2 rounded"
        >
          Add simulated signal
        </button>
      </div>
      <BottomNav />
    </ScreenShell>
  );
}
