import type { NextConfig } from "next";

const scriptSources = [
  "'self'",
  "'unsafe-inline'",
  "https://vercel.live",
  "https://va.vercel-scripts.com",
];

if (process.env.NODE_ENV === "development") scriptSources.push("'unsafe-eval'");

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  images: {
    domains: [],
    qualities: [75, 78],
  },
  async redirects() {
    return [
      { source: "/ai-consultant", destination: "/inquire", permanent: true },
      { source: "/register", destination: "/inquire", permanent: true },
      { source: "/contact", destination: "/inquire", permanent: true },
      { source: "/dashboard", destination: "/inquire", permanent: false },
      { source: "/quotes/:path*", destination: "/inquire", permanent: false },
      { source: "/projects/:path*", destination: "/inquire", permanent: false },
      { source: "/profile", destination: "/inquire", permanent: false },
      { source: "/settings/:path*", destination: "/inquire", permanent: false },
      { source: "/admin/analytics", destination: "/admin", permanent: false },
      { source: "/admin/clients", destination: "/admin/leads", permanent: false },
      { source: "/admin/projects", destination: "/admin", permanent: false },
      { source: "/admin/quotes", destination: "/admin/leads", permanent: false },
      { source: "/admin/unmapped-queries", destination: "/admin", permanent: false },
      { source: "/calculators", destination: "/pricing", permanent: true },
      { source: "/calculators/:path*", destination: "/pricing", permanent: true },
      { source: "/pricing/automation", destination: "/pricing", permanent: true },
      { source: "/pricing/software-development", destination: "/pricing", permanent: true },
      { source: "/pricing/web-development", destination: "/pricing", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/portfolio/:path*", destination: "/work", permanent: true },
      {
        source: "/services/api-integration",
        destination: "/services/data-platforms",
        permanent: true,
      },
      {
        source: "/services/automation",
        destination: "/services/ai-automation",
        permanent: true,
      },
      {
        source: "/services/database",
        destination: "/services/data-platforms",
        permanent: true,
      },
      {
        source: "/services/mobile",
        destination: "/services/custom-platform-engineering",
        permanent: true,
      },
      {
        source: "/services/security",
        destination: "/services/security-engineering",
        permanent: true,
      },
      {
        source: "/services/web-development",
        destination: "/services/custom-platform-engineering",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src ${scriptSources.join(" ")}`,
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://vercel.live https://vitals.vercel-insights.com",
              "frame-src 'self' https://vercel.live",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "block-all-mixed-content",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      {
        source: "/pay/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      {
        source: "/paystack/callback",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      {
        source: "/webhooks/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
      {
        source: "/login",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" },
        ],
      },
    ];
  },
};

export default nextConfig;
