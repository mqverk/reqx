import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reqx.dev'),
  title: {
    default: "reqx - Free Online API Testing Tool | Postman Alternative",
    template: "%s | reqx"
  },
  description: "Free online API testing tool and Postman alternative. Test REST APIs instantly with GET, POST, PUT, DELETE requests. No installation required. Built with Next.js 16.",
  keywords: [
    "reqx",
    "api testing tool",
    "rest api tester",
    "http client",
    "api testing online",
    "postman alternative",
    "api request tool",
    "rest client",
    "http request tool",
    "web api tester",
    "api development tool",
    "test rest api",
    "api testing free"
  ],
  authors: [{ name: "reqx" }],
  creator: "reqx",
  publisher: "reqx",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reqx.dev",
    title: "reqx - Free Online API Testing Tool | Postman Alternative",
    description: "Free online API testing tool and Postman alternative. Test REST APIs instantly with GET, POST, PUT, DELETE requests. No installation required.",
    siteName: "reqx",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "reqx - API Testing Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "reqx - Free Online API Testing Tool",
    description: "Free online API testing tool and Postman alternative. Test REST APIs instantly. No installation required.",
    images: ["/og-image.png"],
    creator: "@yourtwitterhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "googleab8c6904ff2e19ca.html",
    other: {
      'msvalidate.01': '8F784BB40F80B47C03A73E12CDF4AB07',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
