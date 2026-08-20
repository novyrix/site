import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Novyrix",
    short_name: "Novyrix",
    description:
      "Software systems, AI automation, payment integrations, and Bitcoin infrastructure from Nairobi.",
    start_url: "/",
    display: "minimal-ui",
    background_color: "#f7f7f7",
    theme_color: "#fd6304",
    icons: [
      {
        src: "/brand/novyrix-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
