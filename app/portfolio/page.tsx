'use client';

import ScreenShell from '../components/ScreenShell';
import PortfolioSummary from '../components/PortfolioSummary';
import PositionCard from '../components/PositionCard';
import OrderForm, { type OrderData } from '../components/OrderForm';
import BottomNav from '../components/BottomNav';

const positions = [
  { symbol: 'AAPL', qty: 52, avgFillPrice: 206.4, currentPrice: 214.44, unrealizedPL: 417.28, unrealizedPLPct: 3.89 },
  { symbol: 'NVDA', qty: 18, avgFillPrice: 108.5, currentPrice: 121.62, unrealizedPL: 236.16, unrealizedPLPct: 12.11 },
  { symbol: 'MSFT', qty: 10, avgFillPrice: 420.0, currentPrice: 433.04, unrealizedPL: 130.4, unrealizedPLPct: 3.1 },
];

export default function PortfolioPage() {
  const handleSubmitOrder = (order: OrderData) => {
    console.log('Submit order', order);
    alert(`${order.side.toUpperCase()} ${order.qty} ${order.symbol} @ ${order.orderType}`);
  };

  return (
    <ScreenShell title="Portfolio" subtitle="Positions, cash, and execution">
      <div className="space-y-4">
        <PortfolioSummary
          cashBalance={43750.32}
          equityValue={25640.18}
          totalValue={69490.5}
          dayPL={1280.75}
          totalPL={5460.82}
        />

        <OrderForm onSubmit={handleSubmitOrder} />

        <div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Open Positions</h3>
          </div>
          {positions.map((position) => (
            <PositionCard key={position.symbol} {...position} />
          ))}
        </div>
      </div>
      <BottomNav />
    </ScreenShell>
  );
}
