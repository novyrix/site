import type { MetadataRoute } from "next";
import { fieldNotes } from "@/content/field-notes";
import { services } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://novyrix.com";
  const lastModified = new Date("2026-08-20T00:00:00.000Z");
  const routes = ["", "/services", "/work", "/pricing", "/inquire", "/about", "/blog"];
  const legalRoutes = ["/privacy", "/terms"];

  return [
    ...routes.map((route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: (route === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: index === 0 ? 1 : route === "/inquire" ? 0.95 : 0.8,
    })),
    ...legalRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: service.status === "live" ? 0.75 : 0.4,
    })),
    ...fieldNotes.map((note) => ({
      url: `${baseUrl}/blog/${note.slug}`,
      lastModified: new Date(`${note.updatedAt ?? note.publishedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
