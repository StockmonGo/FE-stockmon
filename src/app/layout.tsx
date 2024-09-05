import type { Metadata } from "next";
import "./globals.css";
import "./star.scss";
import { Noto_Sans_KR } from "next/font/google";
import { Providers } from "../components/providers";

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700", "900"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

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
      <body className={notoSansKr.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
