import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiyomaru | Technical PdM / PMO / SRE",
  description:
    "技術者出身のプロダクトマネージャー Kiyomaru のポートフォリオサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
