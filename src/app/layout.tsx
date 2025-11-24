import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./glassmorphic-button.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SessionProvider } from "@/components/session-provider";
import { ToastProvider } from "@/components/ui/toast";
import { CookieConsent } from "@/components/cookie-consent";
import { auth } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ChatWidget } from "@/components/ui/chat-widget";

// Modern, professional fonts - Geist is Vercel's design system font
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://novyrix.com'),
  title: {
    default: "Novyrix | Custom Web Development & Automation Solutions Kenya",
    template: "%s | Novyrix"
  },
  description: "Transform your business with transparent, custom web applications and workflow automation. Powered by Novy AI for instant quotes. Node.js experts serving Kenyan SMEs, startups & enterprises.",
  keywords: [
    "custom web development Kenya", "web application development Nairobi", "workflow automation Kenya",
    "Node.js developers Kenya", "React developers Nairobi", "API integration services",
    "KRA eTIMS integration", "M-Pesa API integration", "e-commerce platform development",
    "SaaS development Kenya", "digital transformation Kenya", "transparent pricing software",
    "AI-powered quotations", "Nairobi software company", "SME digital solutions"
  ],
  authors: [{ name: "Novyrix Digital", url: "https://novyrix.com" }],
  creator: "Novyrix",
  publisher: "Novyrix Digital",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://novyrix.com",
    siteName: "Novyrix",
    title: "Novyrix | Custom Web Development & Automation Solutions Kenya",
    description: "Transform your business with transparent, custom web applications. Get instant quotes with Novy AI.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Novyrix - Custom Web Development" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Novyrix | Custom Web Development & Automation Kenya",
    description: "Transform your business with transparent, custom web applications. Get instant quotes with Novy AI.",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://novyrix.com",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Novyrix",
              description: "Custom web development and workflow automation for Kenyan businesses",
              url: "https://novyrix.com",
              logo: "https://novyrix.com/logo.png",
              address: { "@type": "PostalAddress", addressCountry: "KE", addressLocality: "Nairobi" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "30" }
            })
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SessionProvider session={session}>
          <ToastProvider>
            <Navigation />
            {children}
            <Footer />
            <CookieConsent />
            <ChatWidget />
          </ToastProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
