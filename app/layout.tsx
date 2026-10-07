import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VectorIQ | Quantitative Intelligence",
  description: "AI-driven quantitative trading intelligence platform",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
