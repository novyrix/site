import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { fieldNotes, formatFieldNoteDate } from "@/content/field-notes";
import { buildPageMetadata } from "@/lib/metadata";

const pageDescription =
  "Practical field notes from Novyrix on payment integration, operational software, workflow automation, systems architecture, and Bitcoin infrastructure.";

export const metadata = {
  ...buildPageMetadata({
    title: "Systems and Payment Engineering Field Notes",
    description: pageDescription,
    path: "/blog",
  }),
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
};

export default function BlogPage() {
  const [featuredNote, ...archiveNotes] = fieldNotes;

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://novyrix.com/blog#blog",
        name: "Novyrix Field Notes",
        description: pageDescription,
        url: "https://novyrix.com/blog",
        publisher: { "@id": "https://novyrix.com/#organisation" },
        blogPost: fieldNotes.map((note) => ({
          "@type": "BlogPosting",
          headline: note.title,
          url: `https://novyrix.com/blog/${note.slug}`,
          datePublished: note.publishedAt,
        })),
      },
      {
        "@type": "CollectionPage",
        name: "Novyrix Field Notes",
        url: "https://novyrix.com/blog",
        isPartOf: { "@id": "https://novyrix.com/blog#blog" },
      },
    ],
  };

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Field notes / Systems in practice"
        title="Notes for systems that have to work."
        description={pageDescription}
        aside="Written from delivery / Checked against operations"
      />

      <section className="field-notes-stage">
        <div className="site-shell">
          <Reveal className="field-note-feature">
            <div className="field-note-feature__signal" aria-hidden="true">
              <span>01</span>
              <div className="field-note-feature__trace">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <span>Verified</span>
            </div>
            <article className="field-note-feature__copy">
              <div className="field-note-meta mono">
                <span>{featuredNote.category}</span>
                <time dateTime={featuredNote.publishedAt}>
                  {formatFieldNoteDate(featuredNote.publishedAt)}
                </time>
                <span>{featuredNote.readMinutes} min read</span>
              </div>
              <p className="eyebrow">Latest field note</p>
              <h2>{featuredNote.title}</h2>
              <p>{featuredNote.excerpt}</p>
              <Link href={`/blog/${featuredNote.slug}`} className="arrow-link">
                Read the field note
                <ArrowUpRight aria-hidden="true" weight="bold" />
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="field-note-archive section">
        <div className="site-shell">
          <Reveal className="field-note-archive__heading">
            <div>
              <p className="eyebrow">The working archive</p>
              <h2>Evidence before opinion.</h2>
            </div>
            <p>
              Architecture choices, implementation controls, and the failure paths worth testing before a system becomes operationally important.
            </p>
          </Reveal>

          <div className="field-note-list">
            {archiveNotes.map((note, index) => (
              <Reveal key={note.slug} delay={index * 0.08}>
                <article className="field-note-list__item">
                  <span className="field-note-list__number mono">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="field-note-list__copy">
                    <div className="field-note-meta mono">
                      <span>{note.category}</span>
                      <time dateTime={note.publishedAt}>{formatFieldNoteDate(note.publishedAt)}</time>
                      <span>{note.readMinutes} min</span>
                    </div>
                    <h3>{note.title}</h3>
                    <p>{note.excerpt}</p>
                  </div>
                  <Link href={`/blog/${note.slug}`} aria-label={`Read ${note.title}`}>
                    <ArrowUpRight aria-hidden="true" weight="bold" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="field-note-method section--surface">
        <div className="site-shell field-note-method__grid">
          <Reveal>
            <p className="eyebrow">Editorial standard</p>
            <h2>No content quota. No borrowed certainty.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Each note starts with a delivery problem, names the operational tradeoffs, and links primary documentation where a provider or protocol matters.
            </p>
            <Link href="/inquire" className="button button--primary">
              Bring us a systems problem
              <ArrowUpRight aria-hidden="true" weight="bold" />
            </Link>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </main>
  );
}
