import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroBackground } from "@/components/site/hero-background";
import { Reveal } from "@/components/site/reveal";
import {
  fieldNotes,
  formatFieldNoteDate,
  getFieldNote,
} from "@/content/field-notes";

export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const note = getFieldNote((await params).slug);
  if (!note) return {};

  const path = `/blog/${note.slug}`;

  return {
    title: note.seoTitle,
    description: note.description,
    keywords: [note.primaryKeyword, note.category, "Novyrix field notes"],
    alternates: { canonical: path },
    authors: [{ name: "Novyrix", url: "https://novyrix.com" }],
    openGraph: {
      type: "article",
      siteName: "Novyrix",
      locale: "en_KE",
      title: `${note.seoTitle} | Novyrix`,
      description: note.description,
      url: path,
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt ?? note.publishedAt,
      authors: ["Novyrix"],
      section: note.category,
      tags: [note.primaryKeyword],
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
      title: `${note.seoTitle} | Novyrix`,
      description: note.description,
      images: ["/twitter-image"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const note = getFieldNote((await params).slug);
  if (!note) notFound();

  const articleUrl = `https://novyrix.com/blog/${note.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        headline: note.title,
        description: note.description,
        datePublished: note.publishedAt,
        dateModified: note.updatedAt ?? note.publishedAt,
        articleSection: note.category,
        keywords: [note.primaryKeyword],
        wordCount: note.sections.reduce(
          (count, section) =>
            count
            + section.paragraphs.join(" ").split(/\s+/).length
            + (section.points ?? []).reduce(
              (pointCount, point) => pointCount + `${point.title} ${point.body}`.split(/\s+/).length,
              0,
            ),
          note.introduction.join(" ").split(/\s+/).length,
        ),
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        image: "https://novyrix.com/opengraph-image",
        author: { "@id": "https://novyrix.com/#organisation" },
        publisher: { "@id": "https://novyrix.com/#organisation" },
        inLanguage: "en-KE",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://novyrix.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Field notes",
            item: "https://novyrix.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: note.title,
            item: articleUrl,
          },
        ],
      },
    ],
  };

  return (
    <main id="main-content">
      <header className="field-note-hero">
        <HeroBackground compact />
        <div className="site-shell field-note-hero__inner">
          <Reveal>
            <Link href="/blog" className="field-note-back mono">
              <ArrowLeft aria-hidden="true" weight="bold" />
              Field notes
            </Link>
            <div className="field-note-meta mono">
              <span>{note.category}</span>
              <time dateTime={note.publishedAt}>{formatFieldNoteDate(note.publishedAt)}</time>
              <span>{note.readMinutes} min read</span>
            </div>
            <h1>{note.title}</h1>
            <p className="field-note-hero__dek">{note.excerpt}</p>
          </Reveal>
          <Reveal className="field-note-hero__index" delay={0.12}>
            <span className="mono">Field note</span>
            <strong>{String(fieldNotes.indexOf(note) + 1).padStart(2, "0")}</strong>
            <span className="mono">Novyrix / Nairobi</span>
          </Reveal>
        </div>
      </header>

      <article className="field-note-body section">
        <div className="site-shell field-note-body__grid">
          <aside className="field-note-toc">
            <p className="eyebrow">On this page</p>
            <nav aria-label="Article contents">
              {note.sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </a>
              ))}
            </nav>
          </aside>

          <div className="field-note-copy">
            <Reveal className="field-note-lede">
              {note.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>

            {note.sections.map((section, index) => (
              <Reveal key={section.id} delay={Math.min(index * 0.04, 0.16)}>
                <section id={section.id} className="field-note-section">
                  <div className="field-note-section__heading">
                    <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                    <h2>{section.heading}</h2>
                  </div>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.points ? (
                    <ul className="field-note-points">
                      {section.points.map((point) => (
                        <li key={point.title}>
                          <strong>{point.title}</strong>
                          <span>{point.body}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.callout ? (
                    <aside className="field-note-callout">
                      <span className="mono">{section.callout.label}</span>
                      <p>{section.callout.body}</p>
                    </aside>
                  ) : null}
                </section>
              </Reveal>
            ))}

            <Reveal>
              <aside className="field-note-takeaway">
                <span className="eyebrow">Working conclusion</span>
                <p>{note.takeaway}</p>
              </aside>
            </Reveal>

            {note.sources.length ? (
              <Reveal>
                <section className="field-note-sources">
                  <p className="eyebrow">Primary references</p>
                  <h2>Documentation used for this note</h2>
                  <ol>
                    {note.sources.map((source) => (
                      <li key={source.href}>
                        <a href={source.href} target="_blank" rel="noreferrer">
                          <span>
                            <strong>{source.label}</strong>
                            <small>{source.publisher}</small>
                          </span>
                          <ArrowUpRight aria-hidden="true" weight="bold" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            ) : null}

            <Reveal>
              <section className="field-note-related">
                <p className="eyebrow">Related Novyrix work</p>
                <h2>Turn the operating model into a working system.</h2>
                <div>
                  {note.relatedServices.map((service) => (
                    <Link key={service.href} href={service.href}>
                      {service.label}
                      <ArrowUpRight aria-hidden="true" weight="bold" />
                    </Link>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
