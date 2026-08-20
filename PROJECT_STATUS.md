# Novyrix Project Status

Last updated: 20 August 2026

## Executive Summary

Phase 1 is locally built and verified across the public site, platform API, infrastructure, operations console, and payment foundation. Phase 2 client portal code is implemented locally. The Phase 3 authority-content foundation is also complete locally with three indexed field notes, structured data, RSS, sitemap coverage, and responsive light and dark QA. The remaining platform work is production-gated, while campaign-specific Phase 3 work still needs confirmed event and proof inputs.

The database architecture is the VPS PostgreSQL platform API. The root Next.js MySQL Prisma schema is retained only for inherited, retired pages so the app can compile.

Local preview:

```text
http://127.0.0.1:4173/pay/preview
http://127.0.0.1:4173/portal?preview=qa
http://127.0.0.1:4173/blog
```

## Phase Status

| Area | Status | Notes |
| --- | --- | --- |
| Public site | Complete locally | Light default, dark theme, responsive pages, SEO metadata, structured data, legal drafts, crawler controls, no public rate card, and release QA are complete. |
| Platform infrastructure | Complete | PostgreSQL runs on the Linux VPS private Docker network. Cloudflare Tunnel exposes the API at `api.novyrix.com`; the database port is not public. |
| Inquiry flow | Complete | Public inquiry submissions create Organization and Lead records through the authenticated platform API and send Resend notifications. |
| Operations console | Complete locally | Admin lead review, fit status, discovery notes, agreement capture, engagement creation, and itemized invoice creation are implemented and browser-tested. |
| Payment foundation | Code complete, activation pending | Paystack and BTCPay credentials are staged locally with `PAYMENTS_LIVE=false`. Server-side checkout, verification, signed webhooks, replay protection, receipt delivery, and payment preview QA are implemented. |
| Phase 2 portal | Complete locally, activation pending | PostgreSQL models, migration, platform API routes, client NextAuth login, protected portal proxy, dashboard, project, invoice, message screens, portal-native checkout, and admin provisioning controls are implemented. Production migration and real client provisioning remain approval-gated. |
| Phase 3 content | Foundation complete locally | Indexed field-notes archive, three launch articles, typed content, Article schema, RSS, sitemap discovery, internal service paths, and light or dark responsive QA are complete. Editorial cadence and campaign work continue after owner review. |
| Production release | Pending approval gates | Vercel preview, production env setup, fresh PostgreSQL backup, migration, legal review, provider checks, and final deployment remain. |

## Completed This Cycle

- Archived the inherited site and kept the current rebuilt workspace separate.
- Rebuilt Novyrix around the PRD positioning: custom platforms, AI automation, data systems, Bitcoin infrastructure, security engineering, and technical advisory.
- Built a responsive visual system with light and dark theme support.
- Removed public pricing figures and replaced legacy calculator flows with inquiry-led conversion.
- Deployed the platform API and PostgreSQL architecture on the VPS through Cloudflare Tunnel.
- Added Uptime Kuma monitoring and Resend notification paths.
- Added the single-operator operations console for Phase 1 administration.
- Added private invoice pages and payment-provider abstractions for Paystack and BTCPay.
- Staged production payment provider credentials in ignored local ops secrets.
- Added `pay.novyrix.com` callback and webhook route support.
- Added the Phase 2 client portal with protected client login, engagement dashboard, milestones, deliverables, invoice ledger, portal-native checkout, message log, and admin provisioning controls.
- Added review-copy privacy and terms policy drafts under `docs/legal`.
- Replaced the blog scaffold with an indexed field-notes system and three practical launch articles on M-Pesa reconciliation, workflow audit trails, and BTCPay or Lightning invoice states.
- Added typed editorial content, an architecture decision record, Blog and Article schema, canonical metadata, RSS, sitemap entries, and related-service paths.
- Fixed the build so it no longer requires a misleading local `DATABASE_URL`.

## Verification Snapshot

| Check | Result |
| --- | --- |
| Public API health | `https://api.novyrix.com/health` returned `{"status":"ok"}`. |
| Production build | Passed with Next.js 16 and 64 app routes generated. |
| TypeScript | `npx tsc --noEmit` passed. |
| Platform API tests | 12 of 12 passed. |
| Focused ESLint | Passed on changed payment and theme surfaces. |
| Payment visual QA | Passed, zero browser errors, no overflow, safe preview click confirmed. |
| Portal visual QA | Passed 10 of 10 portal route, theme, and breakpoint audits with zero browser errors and safe preview actions. |
| Release HTTP audit | Current full run passed 515 of 515 checks. |
| Release browser audit | Current full run passed all 20 desktop, mobile, light, and dark route audits. |
| Lighthouse local mobile | 83 performance, 100 accessibility, 100 best practices, 100 SEO, zero CLS. |
| Secret scan | No live provider keys found in tracked source. |

## Open Gates

1. Qualified Kenyan legal review of privacy and terms drafts.
2. Add production `AUTH_SECRET`, admin password hash, and frontend API token in Vercel encrypted env vars.
3. Fresh PostgreSQL backup and validation before applying the discovery, payment, and portal migrations.
4. Apply production migrations on the VPS and verify API, monitoring, inquiry, admin, invoice, and portal flows.
5. Register Paystack and BTCPay webhooks against the final public payment host.
6. Complete real low-value Paystack card, M-Pesa, BTCPay Lightning, and BTCPay on-chain checks.
7. Enable `PAYMENTS_LIVE=true` only after both payment providers pass readiness and reconciliation checks.
8. Review the three launch field notes and confirm timing and proof assets before event-specific campaign work.
9. Deploy a Vercel preview, run Core Web Vitals and release QA, then promote only after approval.

## Current Recommendation

The public, portal, payment, and authority-content foundations are complete locally. The safest next sequence is: owner review of the field notes, legal review, Vercel preview setup, production env review, database backup, migration window, payment provider checks with tiny amounts, portal client provisioning test, then production promotion. Event campaign work should begin only after its participation and proof inputs are confirmed.
