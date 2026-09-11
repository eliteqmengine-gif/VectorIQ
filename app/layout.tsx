import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VectorIQ | Quantitative Intelligence",
  description: "AI-driven quantitative trading intelligence platform",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
import "./globals.css";

export const metadata = {
  title: "VectorIQ",
  description: "AI-driven quantitative trading platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
}
