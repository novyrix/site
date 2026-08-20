import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.NOVYRIX_AUDIT_URL || "http://127.0.0.1:4173";
const outputDir = path.resolve(process.env.NOVYRIX_QA_OUTPUT || "../_design/release");

const serviceSlugs = [
  "systems-architecture",
  "custom-platform-engineering",
  "ai-automation",
  "data-platforms",
  "cloud-infrastructure",
  "bitcoin-infrastructure",
  "payment-integrations",
  "security-engineering",
  "technical-advisory",
  "vulnerability-assessment",
];

const fieldNoteSlugs = [
  "mpesa-payment-reconciliation-kenya",
  "workflow-automation-audit-trail",
  "btcpay-lightning-invoice-states",
];

const publicRoutes = [
  { path: "/", index: true, schema: ["ProfessionalService", "Person"] },
  { path: "/services", index: true },
  ...serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    index: true,
    schema: ["Service", "FAQPage"],
  })),
  { path: "/work", index: true },
  { path: "/pricing", index: true },
  { path: "/inquire", index: true },
  { path: "/about", index: true },
  { path: "/privacy", index: true },
  { path: "/terms", index: true },
  { path: "/blog", index: true, schema: ["Blog", "CollectionPage"] },
  ...fieldNoteSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    index: true,
    schema: ["Article", "BreadcrumbList"],
  })),
];

const redirects = [
  ["/contact", "/inquire"],
  ["/register", "/inquire"],
  ["/calculators/software", "/pricing"],
  ["/portfolio/legacy-work", "/work"],
  ["/services/web-development", "/services/custom-platform-engineering"],
];

const requiredHeaders = [
  "content-security-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
  "permissions-policy",
  "referrer-policy",
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
];

function parseAttributes(tag) {
  return Object.fromEntries(
    Array.from(tag.matchAll(/([:\w-]+)=["']([^"']*)["']/g), (match) => [match[1], match[2]]),
  );
}

function tags(html, name) {
  return Array.from(html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi")), (match) =>
    parseAttributes(match[0]),
  );
}

function meta(html, key) {
  const item = tags(html, "meta").find(
    (attributes) => attributes.name === key || attributes.property === key,
  );
  return item?.content || "";
}

function canonical(html) {
  return tags(html, "link").find((attributes) => attributes.rel === "canonical")?.href || "";
}

function title(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";
}

function renderedText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#x20;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ");
}

function schemaTypes(html) {
  const types = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const visit = (item) => {
        if (!item || typeof item !== "object") return;
        if (typeof item["@type"] === "string") types.push(item["@type"]);
        for (const nested of Object.values(item)) {
          if (Array.isArray(nested)) nested.forEach(visit);
          else if (nested && typeof nested === "object") visit(nested);
        }
      };
      visit(value);
    } catch {
      types.push("INVALID_JSON_LD");
    }
  }
  return [...new Set(types)];
}

function pushCheck(checks, route, check, passed, evidence) {
  checks.push({ route, check, passed, evidence });
}

await mkdir(outputDir, { recursive: true });

const checks = [];
const pages = [];

for (const route of publicRoutes) {
  const response = await fetch(`${baseUrl}${route.path}`, { redirect: "manual" });
  const html = await response.text();
  const pageTitle = title(html);
  const description = meta(html, "description");
  const canonicalUrl = canonical(html);
  const robots = meta(html, "robots").toLowerCase();
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  const types = schemaTypes(html);
  const text = renderedText(html);
  const currencyLeak = text.match(/(?:KES|KSH|KSh|USD|US\$|\$)\s*[0-9][0-9,.]*|[0-9][0-9,.]*\s*(?:KES|KSH|KSh|USD)/i)?.[0] || null;
  const expectedCanonical = `https://novyrix.com${route.path === "/" ? "" : route.path}`;

  pushCheck(checks, route.path, "HTTP 200", response.status === 200, response.status);
  pushCheck(checks, route.path, "One H1", h1Count === 1, h1Count);
  pushCheck(checks, route.path, "Main landmark target", html.includes('id="main-content"'), "#main-content");
  pushCheck(checks, route.path, "Title length", pageTitle.length >= 20 && pageTitle.length <= 65, pageTitle);
  pushCheck(
    checks,
    route.path,
    "Meta description",
    description.length >= 70 && description.length <= 180,
    `${description.length} chars`,
  );
  pushCheck(checks, route.path, "Canonical", canonicalUrl === expectedCanonical, canonicalUrl);
  pushCheck(
    checks,
    route.path,
    "Index directive",
    route.index ? !robots.includes("noindex") : robots.includes("noindex"),
    robots || "default index",
  );
  pushCheck(checks, route.path, "Open Graph title", Boolean(meta(html, "og:title")), meta(html, "og:title"));
  pushCheck(checks, route.path, "Open Graph URL", Boolean(meta(html, "og:url")), meta(html, "og:url"));
  pushCheck(checks, route.path, "Open Graph image", Boolean(meta(html, "og:image")), meta(html, "og:image"));
  pushCheck(checks, route.path, "Twitter card", meta(html, "twitter:card") === "summary_large_image", meta(html, "twitter:card"));
  pushCheck(checks, route.path, "No public currency figure", !currencyLeak, currencyLeak || "clean");

  for (const expectedType of route.schema || []) {
    pushCheck(checks, route.path, `Schema ${expectedType}`, types.includes(expectedType), types.join(", "));
  }

  for (const header of requiredHeaders) {
    pushCheck(checks, route.path, `Header ${header}`, response.headers.has(header), response.headers.get(header) || "missing");
  }

  pages.push({
    path: route.path,
    status: response.status,
    title: pageTitle,
    descriptionLength: description.length,
    canonical: canonicalUrl,
    robots,
    h1Count,
    schemaTypes: types,
    currencyLeak,
  });
}

for (const [source, destination] of redirects) {
  const response = await fetch(`${baseUrl}${source}`, { redirect: "manual" });
  const location = response.headers.get("location") || "";
  pushCheck(checks, source, "Legacy redirect", [307, 308].includes(response.status) && location.endsWith(destination), `${response.status} ${location}`);
}

for (const endpoint of ["/api/ai-consultant", "/api/chat", "/api/contact", "/api/quotes"]) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
    redirect: "manual",
  });
  pushCheck(checks, endpoint, "Legacy API retired", response.status === 410, response.status);
}

const notFoundResponse = await fetch(`${baseUrl}/release-audit-missing-route`);
const notFoundHtml = await notFoundResponse.text();
pushCheck(checks, "/404", "Branded not found status", notFoundResponse.status === 404, notFoundResponse.status);
pushCheck(checks, "/404", "Branded not found heading", (notFoundHtml.match(/<h1\b/gi) || []).length === 1, "one H1");
pushCheck(checks, "/404", "Not found excluded from search", meta(notFoundHtml, "robots").toLowerCase().includes("noindex"), meta(notFoundHtml, "robots"));
pushCheck(checks, "/404", "Not found main target", notFoundHtml.includes('id="main-content"'), "#main-content");

const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
const robotsText = await robotsResponse.text();
for (const directive of ["Disallow: /admin/", "Disallow: /api/", "Disallow: /login", "Disallow: /pay/"]) {
  pushCheck(checks, "/robots.txt", directive, robotsText.includes(directive), robotsText);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
const sitemap = await sitemapResponse.text();
for (const route of publicRoutes.filter((item) => item.index)) {
  const expected = `https://novyrix.com${route.path === "/" ? "" : route.path}`;
  pushCheck(checks, "/sitemap.xml", `Includes ${route.path}`, sitemap.includes(`<loc>${expected}</loc>`), expected);
}
for (const excluded of ["/admin", "/login", "/pay/"]) {
  pushCheck(checks, "/sitemap.xml", `Excludes ${excluded}`, !sitemap.includes(`https://novyrix.com${excluded}`), excluded);
}

for (const asset of ["/manifest.webmanifest", "/opengraph-image", "/twitter-image"]) {
  const response = await fetch(`${baseUrl}${asset}`, { redirect: "manual" });
  pushCheck(checks, asset, "Metadata asset available", response.status === 200, `${response.status} ${response.headers.get("content-type")}`);
}

const failures = checks.filter((check) => !check.passed);
const report = {
  auditedAt: new Date().toISOString(),
  baseUrl,
  summary: {
    checks: checks.length,
    passed: checks.length - failures.length,
    failed: failures.length,
  },
  failures,
  pages,
  checks,
};

await writeFile(
  path.join(outputDir, "release-audit-report.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);

process.stdout.write(`${JSON.stringify(report.summary, null, 2)}\n`);
if (failures.length) {
  process.stderr.write(`${JSON.stringify(failures, null, 2)}\n`);
  process.exitCode = 1;
}
