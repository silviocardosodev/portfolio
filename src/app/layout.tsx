import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = new URL("https://silviocardoso.dev");
const siteTitle = "Silvio Cardoso | Front-end Developer";
const siteDescription = "Professional portfolio of Silvio Cardoso, Front-end Developer and Graphic Designer.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | Silvio Cardoso",
  },
  description: siteDescription,
  applicationName: "Silvio Cardoso Portfolio",
  authors: [{ name: "Silvio Cardoso", url: siteUrl }],
  creator: "Silvio Cardoso",
  publisher: "Silvio Cardoso",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      pt: "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Silvio Cardoso Portfolio",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Silvio Cardoso portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
