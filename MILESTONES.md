# Novyrix Platform Milestones

This tracker follows the Phase 1 sequence in `Novyrix-Platform-PRD-v1.1.md`. A visual or local prototype is not counted as production complete until its data, payment, and release requirements are verified.

## Phase 1 Public Site

| Milestone | Status | Evidence or remaining work |
| --- | --- | --- |
| Design token system | Complete locally | Light and dark theme tokens, typography, spacing, surfaces, motion, focus states, and responsive rules are implemented. |
| Public site rebuilt | Complete locally | Public routes, responsive layouts, legal pages, metadata, structured data, social images, crawler controls, redirects, and a branded 404 are implemented and verified. Production publishing approval remains. |
| Inquiry form creates Lead records | Complete locally | The browser-facing route proxies through a server-only credential to the public tunnel endpoint. Reference `NVX-D93DFC48` was verified in PostgreSQL with KES resolution and `SENT` notification status. |
| Paystack payment flow | Credentials staged locally | Server-only initialization, verification, signed webhook handling, idempotent settlement, callback routing, private checkout UI, and offline provider tests are complete. Real card and M-Pesa checks remain before activation. |
| BTCPay Server payment flow | Credentials staged locally | Greenfield invoice creation, verification, signed webhook handling, idempotent settlement, webhook routing, private checkout UI, and offline provider tests are complete. Real Lightning or on-chain checks remain before activation. |
| No public prices QA | Complete locally | The pricing route explains engagement models without publishing figures, legacy pricing paths redirect, and the automated runtime scan passes. |

## Current Refinement Pass

- [x] Make light mode the default while keeping a persistent dark theme option.
- [x] Replace long service-detail display copy with concise propositions.
- [x] Tighten desktop and mobile section spacing, title scale, and content padding.
- [x] Add current project, general, and founder email addresses with clear roles.
- [x] Expand service content using current search language without keyword stuffing.
- [x] Add unique service metadata, canonical URLs, Service schema, and FAQ schema.
- [x] Complete desktop and mobile screenshot review after implementation.
- [x] Resolve any P0, P1, or P2 visual findings before handoff.

## Release Hardening

- [x] Replace inherited privacy and terms pages with current inquiry, engagement, provider, retention, and payment handling language.
- [x] Add canonical metadata, Open Graph and Twitter images, robots directives, sitemap coverage, a web manifest, and ProfessionalService, Person, Service, and FAQ schema.
- [x] Add a skip link, current-page navigation state, inert closed mobile navigation, Escape focus return, form-error focus, step-heading focus, and reduced-motion behavior.
- [x] Add CSP, frame protection, referrer policy, cross-origin isolation headers, and private no-store and no-index headers for admin, login, API, and payment surfaces.
- [x] Pass 515 production HTTP checks covering public routes, field notes, metadata, schemas, headers, retired APIs, redirects, crawler assets, the 404 page, and public currency figures.
- [x] Pass 22 production browser audits across desktop and 390px mobile, including the custom 404, light and dark field notes, menu, inquiry, theme, scroll-reveal, and reduced-motion interactions with zero browser errors.
- [x] Reach local mobile Lighthouse scores of 83 performance, 100 accessibility, 100 best practices, and 100 SEO with zero layout shift.
- [x] Replace stale MySQL-era setup and analysis documents with current VPS PostgreSQL, Cloudflare Tunnel, payment, and production-gate status.
- [x] Draft review-copy privacy and terms policies under `docs/legal` for owner and qualified legal review.
- [ ] Obtain qualified Kenyan legal review of the operational privacy and terms drafts before production publishing.
- [ ] Recheck Core Web Vitals and Lighthouse on the Vercel preview, where CDN, telemetry, and production network behavior can be measured.

## Platform Infrastructure

- [x] Confirm `linux-vps` capacity, Docker availability, firewall rules, and public exposure.
- [x] Create `/srv/novyrix` without changing existing services or archives.
- [x] Deploy PostgreSQL on an internal Docker network with no published database port.
- [x] Deploy the Novyrix API on `127.0.0.1:8080` with authenticated inquiry writes.
- [x] Apply and verify the Phase 1 Organization and Lead migration.
- [x] Create a dedicated Cloudflare Tunnel and verify four healthy edge connections.
- [x] Enable private daily PostgreSQL backups with 14-day retention and validate the dump catalog.
- [x] Install Uptime Kuma 2.5.0 on the independent `afribit1` VM.
- [x] Verify a Resend monitoring notification to `connect@novyrix.com`.
- [x] Join the independent monitoring VM to the Novyrix tailnet.
- [x] Expose `/health` through tailnet-only HTTPS without changing the existing Funnel service.
- [x] Activate the API and PostgreSQL health monitor and verify a `200 OK` heartbeat.
- [x] Verify the local Next.js inquiry proxy through the tailnet-only HTTPS endpoint.
- [x] Create a dedicated tunnel in the DNS-owning Cloudflare account and activate `api.novyrix.com`.
- [x] Verify public DNS, TLS, tunnel routing, API health, PostgreSQL access, and Resend delivery together.
- [x] Add an independent public API monitor while retaining the tailnet-only platform monitor.
- [x] Replace the broad interactive Tailscale SSH `check` path for `linux-vps` with a least-privilege `accept` rule from `novyrix@github` to `tag:novyrix-server` as Unix user `novyrix`; keep root denied and retain interactive checks for other self devices.
- [x] Validate and retain a pre-change Tailscale policy backup, a mode-600 platform source archive, and a catalog-tested PostgreSQL custom dump before the production schema rollout.
- [x] Establish versioned homes for future scheduled jobs, validators, private working files, exports, and uploads on `linux-vps`; standardize systemd timers instead of ad hoc root crontabs.
- [x] Stage a root-only Restic and Rclone configuration plus a version-controlled validation, retention, and off-site backup service without enabling a failing timer.
- [ ] Enable R2 for the active Cloudflare account, initialize the private `novyrix-backups` repository, run `restic check`, and only then enable the off-site timer. Cloudflare currently returns API error `10042`: `Please enable R2 through the Cloudflare Dashboard.`

## Phase 1 Operations Console

- [x] Replace the inherited MySQL user lookup and password flow with verified Google identity, an administrator email allowlist, and membership-backed client access.
- [x] Keep the platform API shared secret server-only behind an authenticated, same-origin operations proxy.
- [x] Add lead overview, filtering, detail, fit decision, discovery outcome, and discovery notes.
- [x] Require a confirmed agreement reference before recording an active engagement.
- [x] Build itemized invoice creation with inherited currency and two-provider readiness gating.
- [x] Retire self-service registration and the legacy quote, chat, AI consultant, contact, profile, and client-portal APIs.
- [x] Add dedicated no-index metadata for login and admin surfaces.
- [x] Complete authenticated desktop light/dark and 390px mobile browser QA with no overflow or runtime exceptions.
- [x] Add production and preview `AUTH_SECRET`, platform API URL, platform API token, and administrator allowlist through Vercel environment variables.
- [x] Add the Google OAuth web-client ID and secret as Vercel Sensitive variables for Preview and Production, rebuild the protected preview, and verify provider discovery, CSRF issuance, Google authorization routing, and the stable callback URI.
- [x] Apply and verify the discovery and payment migrations after a fresh, validated PostgreSQL backup and approval.
- [ ] Deploy the Operations Console only after preview review and explicit approval.

## Payment Foundation

- [x] Model accepted proposals, engagements, itemized invoices, attempts, payments, and webhook events.
- [x] Persist the signed-agreement reference and confirmation time before creating an active engagement.
- [x] Keep invoice currency inherited from the lead organisation and calculate totals from approved line items.
- [x] Add config-gated Paystack and BTCPay adapters with server-side verification.
- [x] Add signed webhook handling, replay protection, transaction locking, and overpayment preservation.
- [x] Add private no-index payment links with itemized invoice details and responsive provider selection.
- [x] Add receipt delivery through the existing Resend service after verified settlement.
- [x] Send the itemized private invoice through Resend and record delivery success or failure honestly.
- [x] Add offline tests for amount handling, signatures, payment tokens, and provider contracts.
- [x] Stage production Paystack and BTCPay credentials in ignored local operations secrets with `PAYMENTS_LIVE=false`.
- [x] Add `pay.novyrix.com` callback and webhook route support for Paystack and BTCPay.
- [x] Apply the payment migration after a fresh production database backup and verify existing organisation and lead counts are unchanged.
- [ ] Connect Paystack credentials and complete real card and M-Pesa verification.
- [ ] Connect BTCPay credentials and complete real Lightning and on-chain verification.
- [ ] Enable payments only after both provider readiness checks pass.

## Phase 2 Client Portal

- [x] Add PostgreSQL models and migration for portal users, memberships, engagement milestones, deliverables, and project messages.
- [x] Add verified Google identity resolution through the platform API and role-aware NextAuth `CLIENT` sessions backed by existing organisation memberships.
- [x] Protect portal routes with role-aware Next proxy rules and a same-origin authenticated portal API proxy.
- [x] Build `/portal`, `/portal/dashboard`, `/portal/project/[reference]`, `/portal/invoices`, and `/portal/messages` with no-index metadata.
- [x] Show milestone progress from engagement records, not free-text project status.
- [x] Show itemized invoice history with receipt records and portal-native Paystack or BTCPay checkout initialization.
- [x] Add the single logged message channel per engagement.
- [x] Extend the Operations Console with client provisioning, milestone creation/status updates, deliverable sharing, and admin portal messages.
- [x] Add local fixture preview at `/portal?preview=qa`, gated by `NOVYRIX_PORTAL_PREVIEW_ENABLED` and disabled on Vercel.
- [x] Replace the first portal visual pass with a calmer shared shell, compact active navigation, bounded background treatment, shorter invoice masthead, and native light/dark controls.
- [x] Rebuild invoice presentation around a structured reference header, amount and due-date summary, line-item ledger, and one shared settlement component.
- [x] Unify Paystack and BTCPay actions with equal geometry, provider hierarchy, responsive states, and safe local-preview feedback.
- [x] Pass 10 dedicated portal route, theme, and breakpoint audits across dashboard, project, invoice, message, and dark invoice states with no overflow, clipped amounts, browser errors, or unequal payment actions.
- [x] Apply the Phase 2 portal and Google identity migrations after a fresh production PostgreSQL backup and verify the nullable password column.
- [ ] Provision the first real client account only after legal review, Vercel preview review, and production environment verification.

## Phase 3 Authority and Content

- [x] Replace the no-index blog scaffold with an indexed field-notes publication and primary navigation entry.
- [x] Add a typed repository-backed content model with a documented path to a future CMS adapter.
- [x] Publish three substantive launch notes covering M-Pesa reconciliation, auditable workflow automation, and BTCPay or Lightning invoice-state design.
- [x] Add article metadata, canonical URLs, Article and BreadcrumbList schema, Blog and CollectionPage schema, RSS, sitemap coverage, and related-service links.
- [x] Complete light and dark screenshot critique at 1440px and 390px, including article-body typography and reduced-motion behavior.
- [ ] Continue the editorial cadence after owner review of the launch notes and search positioning.
- [ ] Build the Adopting Bitcoin Nairobi 2026 visibility campaign only after event timing, participation, and proof assets are confirmed.
- [ ] Formalize Service 10 only when its offer, credentials, evidence, and delivery readiness satisfy the PRD gate.

## Production Gates

- [x] Persist inquiry submissions as Lead records.
- [x] Send inquiry notifications and verify delivery.
- [x] Publish and monitor the authenticated platform API through `api.novyrix.com`.
- [ ] Complete Paystack credential, webhook, card, and M-Pesa tests. Server-side verification is implemented locally.
- [ ] Complete BTCPay credential, signed callback, Lightning, and on-chain tests. Reconciliation is implemented locally.
- [x] Redirect obsolete public routes and render protected database pages dynamically so the production build completes cleanly.
- [x] Run final local accessibility, performance, SEO, and no-public-pricing checks. Preview-level Core Web Vitals remain a deployment gate.
- [x] Pass the local Operations Console, payment, portal, type, production build, release-audit, and browser visual-QA gates.
- [x] Publish a protected Vercel preview at `novyrix-preview.vercel.app` without changing production aliases or DNS.
- [x] Upgrade Next.js, React, Auth.js, Resend, and Prisma patch dependencies before preview deployment; remove all critical audit findings and pass a fresh 65-route Vercel build.
- [x] Correct the Tailscale SSH policy, apply the Google identity migration, deploy the platform resolver, and verify local and public API health plus fail-closed identity resolution.
- [x] Add Google OAuth credentials and verify the protected preview reaches Google with the registered stable callback URI.
- [ ] Complete one browser-interactive sign-in with an allowlisted Google account, finish preview readiness checks, and obtain explicit approval before promoting the preview or changing production DNS.
