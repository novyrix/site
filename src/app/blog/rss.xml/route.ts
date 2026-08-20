import { fieldNotes } from "@/content/field-notes";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = fieldNotes
    .map((note) => {
      const url = `https://novyrix.com/blog/${note.slug}`;
      return `
    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(note.excerpt)}</description>
      <category>${escapeXml(note.category)}</category>
      <pubDate>${new Date(`${note.publishedAt}T12:00:00+03:00`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const latestDate = new Date(`${fieldNotes[0].publishedAt}T12:00:00+03:00`).toUTCString();
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Novyrix Field Notes</title>
    <link>https://novyrix.com/blog</link>
    <description>Practical notes on payment systems, operational software, workflow automation, and Bitcoin infrastructure.</description>
    <language>en-KE</language>
    <lastBuildDate>${latestDate}</lastBuildDate>
    <atom:link href="https://novyrix.com/blog/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
