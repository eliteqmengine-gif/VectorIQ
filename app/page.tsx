'use client';

import ScreenShell from './ScreenShell';
import MarketTicker from './MarketTicker';
import SignalCard from './SignalCard';
import BottomNav from './BottomNav';

const tickers = [
  { symbol: 'AAPL', price: 214.44, change: 1.82 },
  { symbol: 'NVDA', price: 121.62, change: 2.54 },
  { symbol: 'MSFT', price: 433.04, change: 0.86 },
  { symbol: 'BTC', price: 62790.98, change: -1.14 },
];

const signals = [
  { symbol: 'AAPL', signal: 1, confidence: 0.81, price: 214.44, strategyName: 'Momentum Breakout' },
  { symbol: 'NVDA', signal: 1, confidence: 0.76, price: 121.62, strategyName: 'Volatility Trend' },
  { symbol: 'TSLA', signal: -1, confidence: 0.68, price: 239.1, strategyName: 'Mean Reversion' },
];

export default function HomePage() {
  return (
    <ScreenShell title="Command Center" subtitle="AI-driven market intelligence">
      <div className="space-y-6">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Market Tickers</h2>
            <button className="text-xs text-cyan-400">View all</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {tickers.map((ticker) => (
              <MarketTicker key={ticker.symbol} {...ticker} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold">Signals</h2>
            <button className="text-xs text-cyan-400">Refresh</button>
          </div>
          {signals.map((signal) => (
            <SignalCard key={signal.symbol} {...signal} />
          ))}
        </section>
      </div>
      <BottomNav />
    </ScreenShell>
  );
}
