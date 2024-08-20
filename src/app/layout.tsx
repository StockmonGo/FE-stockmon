import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stockmon world",
  description: "it`s Stockmon World",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
