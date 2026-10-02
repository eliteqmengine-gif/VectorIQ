'use client';

import type { ReactNode } from 'react';

interface ScreenShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function ScreenShell({ title, subtitle, children }: ScreenShellProps) {
  return (
    <main className="min-h-screen bg-black text-white pb-24 px-4 pt-6">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">VectorIQ</p>
        <h1 className="text-3xl font-black tracking-tight mt-2">{title}</h1>
        {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
      </header>
      {children}
    </main>
  );
}
