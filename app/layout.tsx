import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "きよまる | Technical PdM / PMO",
  description:
    "技術者出身のプロダクトマネージャー きよまる のポートフォリオサイトです。",
  openGraph: {
    title: "きよまる | Technical PdM / PMO",
    description:
      "技術者出身のプロダクトマネージャー きよまる のポートフォリオサイトです。",
    url: "https://kiyomaruworks.com",
    siteName: "きよまる Portfolio",
    images: [
      {
        url: "https://kiyomaruworks.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "きよまる | Technical PdM / PMO",
    description:
      "技術者出身のプロダクトマネージャー きよまる のポートフォリオサイトです。",
    images: ["https://kiyomaruworks.com/og-image.jpg"],
  },
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
