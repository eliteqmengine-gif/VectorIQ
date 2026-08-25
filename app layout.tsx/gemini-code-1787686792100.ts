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