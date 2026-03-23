import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Besmak India",
    default: "Besmak India - Precision Manufacturing Solutions",
  },
  description:
    "Besmak India delivers high-quality industrial components, valves, pumps, and custom parts for B2B needs.",
  keywords: ["Industrial", "Manufacturing", "Valves", "Pumps", "Besmak India"],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#284B8C",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

import { Toaster } from "sonner";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import ThemeRegistry from "@/components/layout/ThemeRegistry";
import { getAllSettings } from "@/lib/settings";
import BackToTop from "@/components/ui/BackToTop";
import IndustrialLoader from "@/components/ui/IndustrialLoader";
import JsonLd from "@/components/seo/JsonLd";
import { Suspense } from "react";
async function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const settings = await getAllSettings();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://besmakindia.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Besmak India",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.png`,
    "sameAs": ["https://www.linkedin.com/company/besmak-india"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Besmak India",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/products?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <ThemeRegistry initialSettings={settings} />
      {children}
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <NextAuthProvider>
          <Suspense fallback={null}>
            <IndustrialLoader />
          </Suspense>
          <ThemeProviderWrapper>
            <Suspense fallback={<IndustrialLoader forceShow={true} />}>
              {children}
            </Suspense>
            <BackToTop />
            <Toaster richColors position="top-right" />
          </ThemeProviderWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
