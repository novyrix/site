import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { ThemeProvider } from "@/components/site/theme-provider";
import { ThemePreview } from "@/components/site/theme-preview";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novyrix.com"),
  title: {
    default: "Custom Software Development in Kenya | Novyrix",
    template: "%s | Novyrix",
  },
  description:
    "Nairobi software engineering practice building custom platforms, AI automation, M-Pesa integrations, and Bitcoin infrastructure across Kenya and beyond.",
  keywords: [
    "systems architecture Kenya",
    "AI automation Kenya",
    "Bitcoin infrastructure Africa",
    "custom software development Nairobi",
    "M-Pesa API integration Kenya",
    "data integration services Kenya",
    "technical advisory Nairobi",
  ],
  authors: [{ name: "Novyrix", url: "https://novyrix.com" }],
  creator: "Novyrix",
  publisher: "Novyrix",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://novyrix.com",
    siteName: "Novyrix",
    title: "Custom Software Development in Kenya | Novyrix",
    description:
      "Nairobi software engineering practice building custom platforms, AI automation, payment integrations, and Bitcoin infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development in Kenya | Novyrix",
    description:
      "Custom software, AI automation, payment integrations, and Bitcoin infrastructure from Nairobi.",
  },
  robots: { index: true, follow: true },
};

const vercelInsightsEnabled = process.env.VERCEL === "1";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://novyrix.com/#organisation",
      name: "Novyrix",
      slogan: "Development, engineered.",
      url: "https://novyrix.com",
      logo: "https://novyrix.com/brand/novyrix-icon.svg",
      email: "connect@novyrix.com",
      founder: { "@id": "https://novyrix.com/#founder" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "new projects",
          email: "connect@novyrix.com",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          contactType: "general enquiries",
          email: "contact@novyrix.com",
          availableLanguage: ["English"],
        },
      ],
      areaServed: ["Kenya", "East Africa", "International"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
    },
    {
      "@type": "Person",
      "@id": "https://novyrix.com/#founder",
      name: "Edmund",
      email: "spira@novyrix.com",
      url: "https://edmund.novyrix.com",
      jobTitle: "Founder and systems engineer",
      worksFor: { "@id": "https://novyrix.com/#organisation" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <ThemePreview />
          <SmoothScroll />
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {vercelInsightsEnabled ? <Analytics /> : null}
        {vercelInsightsEnabled ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
