# ADR-001: Repository-backed field notes

- Status: Accepted
- Date: 2026-08-20
- Decision owners: Novyrix

## Context

Phase 3 of the Novyrix platform requires an indexed publication with useful technical writing, stable metadata, structured data, and a low-friction review path. The site does not yet need multi-author workflows, scheduled publishing, or a separate editorial application.

Introducing a CMS now would add another runtime dependency, authentication surface, deployment concern, and content migration before the publishing workflow has earned that complexity.

## Decision

Field notes will use a typed, repository-backed content model in `src/content/field-notes.ts`.

Each note contains:

- SEO title, description, keyword, canonical slug, and publication dates
- A short editorial summary and structured article sections
- Optional implementation checkpoints and primary sources
- Related Novyrix services for useful internal navigation

The site renders this model through a static index, statically generated article routes, JSON-LD, RSS, and the XML sitemap. Content changes therefore follow the same pull request, preview, and release QA process as application changes.

## Consequences

Benefits:

- No new runtime service, secret, or database dependency
- Type-checked content and predictable static generation
- Metadata, schema, RSS, and sitemap output share one source of truth
- Every publication receives a Vercel preview and existing release checks

Tradeoffs:

- Editors currently work through the repository
- Rich media and scheduled publishing require code-level changes
- A larger archive may eventually make the single content module unwieldy

## Migration path

The route components consume exported query functions rather than importing individual notes. A future CMS adapter can preserve those functions and page contracts while replacing the underlying storage. Reconsider the decision when publishing requires non-technical authors, scheduled releases, localization, or more than roughly fifty active notes.
