import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://web3kiwi.xyz"),
  title: {
    default: "web3kiwi — Vibe Coding & Crypto",
    template: "%s | web3kiwi",
  },
  description:
    "바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널. Practical vibe coding tutorials, memes, and realistic crypto insights.",
  keywords: [
    "web3",
    "crypto",
    "vibe coding",
    "AI coding",
    "blockchain",
    "meme",
    "Claude",
    "Cursor",
    "바이브코딩",
    "크립토",
    "인공지능 코딩",
  ],
  authors: [{ name: "web3kiwi", url: "https://web3kiwi.xyz" }],
  creator: "web3kiwi",
  publisher: "web3kiwi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    url: "https://web3kiwi.xyz",
    siteName: "web3kiwi",
    title: "web3kiwi — Vibe Coding & Crypto",
    description: "바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "web3kiwi - Vibe Coding & Crypto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "web3kiwi — Vibe Coding & Crypto",
    description: "바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널",
    creator: "@web3kiwi",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://web3kiwi.xyz",
    languages: {
      "ko-KR": "https://web3kiwi.xyz",
      "en-US": "https://web3kiwi.xyz?lang=en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ABC44E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "web3kiwi",
              url: "https://web3kiwi.xyz",
              logo: "https://web3kiwi.xyz/favicon.svg",
              description:
                "바이브코딩의 활용법, 밈, 크립토를 현실적으로 알려주는 채널",
              sameAs: [
                "https://x.com/b_cryptojake",
                "https://www.youtube.com/@web3kiwi",
                "https://www.instagram.com/web3kiwi/",
                "https://t.me/b_cryptojake",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "web3boy.official@gmail.com",
                contactType: "customer service",
              },
            }),
          }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
