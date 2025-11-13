import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/preloader";
import { SessionProvider } from "@/components/session-provider";
import { ToastProvider } from "@/components/ui/toast";
import { CookieConsent } from "@/components/cookie-consent";
import { auth } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novyrix | Digital IT Solutions in Kenya",
  description: "Build world-class software, websites and digital workflows for Kenyan companies. Transparent pricing, modern tech, exceptional results.",
  keywords: ["web development kenya", "software development", "workflow automation", "IT solutions kenya"],
  authors: [{ name: "Novyrix" }],
  openGraph: {
    title: "Novyrix | Digital IT Solutions in Kenya",
    description: "Build world-class software, websites and digital workflows for Kenyan companies.",
    url: "https://novyrix.com",
    siteName: "Novyrix",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novyrix | Digital IT Solutions in Kenya",
    description: "Build world-class software, websites and digital workflows for Kenyan companies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <SessionProvider session={session}>
          <ToastProvider>
            <Preloader />
            <Navigation />
            {children}
            <Footer />
            <CookieConsent />
          </ToastProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
