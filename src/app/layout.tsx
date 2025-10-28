import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import { AppProvider } from "@/providers/AppContext";
import { Suspense } from "react";
import { DrawerBackHandler } from "@/components/DrawerBackHandler";

const WRG = localFont({
  src: "../assets/fonts/WRG.ttf",
  variable: "--font-wrg",
  display: "swap",
});

const GTW = localFont({
  src: "../assets/fonts/GTW.ttf",
  variable: "--font-gtw",
  display: "swap",
});

const SF = localFont({
  src: "../assets/fonts/SF.ttf",
  variable: "--font-sf",
  display: "swap",
});

const baseUrl = "https://gratisfolio.web.app";

export const metadata: Metadata = {
  title: "Gratisfolio – Free Resume Builder",
  description:
    "Gratisfolio helps you create modern, ATS-friendly resumes in minutes. 100% free, customizable, and responsive — built for professionals and students alike.",
  keywords: [
    "free resume builder",
    "ATS resume",
    "Next.js CV builder",
    "modern CV generator",
    "gratisfolio",
    "resume templates",
    "professional",
  ],
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Gratisfolio – Free Resume Builder",
    description:
      "Create modern, professional resumes in minutes. Gratisfolio is completely free, fast, and responsive.",
    url: baseUrl,
    siteName: "Gratisfolio",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Gratisfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratisfolio – Free Resume Builder",
    description:
      "Build your perfect resume for free. Modern templates, clean design, and instant PDF downloads.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@ByrrusApps",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  applicationName: "Gratisfolio",
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
         <meta id="meta-theme" name="theme-color" content="#0a050f" />
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        {/* JSON-LD Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Gratisfolio",
              url: baseUrl,
              description:
                "Gratisfolio is a free, modern resume builder that helps you create beautiful and ATS-friendly CVs.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              author: {
                "@type": "Organization",
                name: "Byrrus Apps Ltd",
                email: "byrrusapps@gmail.com",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>

      <body className={`${SF.variable} ${GTW.variable} ${WRG.variable}`}>
        <AppProvider>
          <Suspense fallback={null}>
            <DrawerBackHandler />
          </Suspense>
          <AppWrapper>{children}</AppWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
