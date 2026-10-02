import './globals.css';

export const metadata = {
  title: 'VectorIQ | Quantitative Intelligence',
  description: 'AI-driven quantitative trading intelligence platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
