import type { Metadata } from "next";

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  path: `/${string}`;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Novyrix",
      title: `${title} | Novyrix`,
      description,
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Novyrix. Development, engineered.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Novyrix`,
      description,
      images: ["/twitter-image"],
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: true, nocache: true },
  };
}
