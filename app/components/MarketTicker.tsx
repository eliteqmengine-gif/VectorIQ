'use client';

import { useEffect, useState } from 'react';

interface MarketTickerProps {
  symbol: string;
  price: number;
  change: number;
}

export default function MarketTicker({ symbol, price, change }: MarketTickerProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-900/70 p-3 min-w-[150px]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs uppercase tracking-widest text-gray-400">{symbol}</span>
        <span className={`text-xs font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
      <p className="text-lg font-bold">${price.toFixed(2)}</p>
    </div>
  );
}
