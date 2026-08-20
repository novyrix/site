# Novyrix Platform

The Novyrix website and Phase 1 operations platform. The public experience is built in Next.js. Inquiry, engagement, invoice, and payment records are owned by a separate Fastify API backed by PostgreSQL.

Production deployment is approval-gated. Local completion does not authorize a Vercel deployment, DNS change, database migration, or payment activation.

## Current Scope

- Responsive public site with light mode by default and a persistent dark theme.
- Search-focused service, work, pricing, about, blog, and inquiry routes.
- Indexed field notes with typed content, Article schema, RSS, sitemap discovery, and related-service pathways.
- Public inquiry capture through a server-only platform API credential.
- Single-operator Operations Console for fit, discovery, agreement, engagement, invoicing, and portal provisioning.
- Phase 2 client portal for engagement status, milestones, deliverables, invoice history, portal-native checkout, and logged project messages.
- Private payment links with Paystack and BTCPay adapters kept disabled until both providers are verified.
- Legacy registration, quote, chat, AI consultant, profile, and client-portal endpoints retired.

## Architecture

- `novyrix.com`: Next.js 16 on Vercel.
- `api.novyrix.com`: Fastify platform API on the Novyrix Linux host through Cloudflare Tunnel.
- PostgreSQL: private Docker network with no published database port.
- Resend: inquiry, invoice, receipt, and monitoring email.
- Uptime Kuma: independent public and tailnet-only health monitoring.
- Paystack and BTCPay Server: server-side providers, activation-gated.

The browser never receives database, platform API, email, payment-provider, Cloudflare, or Tailscale credentials.
The inherited root MySQL Prisma schema is kept only so retired pages can compile; Phase 1 records are stored in the platform API PostgreSQL database on the VPS.

## Repository Map

```text
src/app/                     Next.js routes
src/app/admin/               Private Operations Console
src/app/api/inquiry/         Public same-origin inquiry proxy
src/app/api/admin/           Authenticated operations proxy
src/app/api/payments/        Private payment actions
src/app/api/portal/          Authenticated client portal proxy
src/app/portal/              Private client portal routes
src/app/blog/                Field-notes index, article routes, and RSS
src/content/field-notes.ts   Typed editorial source of truth
src/components/site/         Public design system and interactions
src/components/admin/        Operations workflow components
src/components/portal/       Client portal workflow components
platform-api/                Fastify, Prisma, PostgreSQL, payments, email
deploy/                      Reviewed infrastructure and operating guides
scripts/                     Browser visual-QA harnesses
docs/architecture/           Recorded platform architecture decisions
MILESTONES.md                PRD phase tracker
design-qa.md                 Screenshot review and evidence
```

## Local Setup

Requirements:

- Node.js 20 or newer
- npm
- Access to a development platform API, or the local admin `preview=qa` fixtures for interface QA

Install dependencies:

```powershell
npm ci
Push-Location platform-api
npm ci
Pop-Location
```

Create `.env.local` from `.env.example` and provide only local or approved encrypted values:

```dotenv
AUTH_SECRET=<long-random-auth-secret>
NOVYRIX_ADMIN_EMAIL=spira@novyrix.com
NOVYRIX_ADMIN_PASSWORD_HASH=<bcrypt-password-hash>
NOVYRIX_API_URL=<platform-api-url>
NOVYRIX_API_TOKEN=<platform-api-shared-secret>
```

When a bcrypt hash is stored in a local dotenv file, escape each dollar sign as `\$` so dotenv expansion preserves the hash. Store the raw hash without backslashes in the Vercel environment-variable interface.

Start the frontend:

```powershell
npm run dev
```

Start or test the API from `platform-api` using its documented environment and commands. Do not run production migrations from the frontend directory.

## Verification

Frontend:

```powershell
npx tsc --noEmit
npm run build
npm run start -- --hostname 127.0.0.1 --port 4173
npm run audit:release
npm run audit:browser
$env:NOVYRIX_PORTAL_PREVIEW_ENABLED="true"; npm run audit:portal
```

The release audits expect the built site at `http://127.0.0.1:4173`. Reports and screenshots are written under `X:\novyrix\_design`.

Platform API:

```powershell
Push-Location platform-api
npx prisma validate
npm test
Pop-Location
```

The repository contains inherited, redirected UI modules with a known lint backlog. Use focused ESLint checks for changed surfaces until that archive cleanup is completed. A production build and the platform API test suite remain required release gates.

## Operations Sequence

1. A public inquiry creates an Organization and Lead.
2. The administrator records fit and discovery outcome.
3. An accepted scope records its agreement reference before an engagement becomes active.
4. An itemized invoice inherits the organisation currency.
5. Invoice delivery stays disabled until Paystack and BTCPay both report ready.
6. The administrator provisions portal access after an accepted engagement.
7. Portal milestones, deliverables, invoices, and messages stay tied to the engagement record.
8. Provider callbacks are verified and settlement is recorded idempotently.

## Release Safety

- Keep `PAYMENTS_LIVE=false` until both real provider test matrices pass.
- Back up PostgreSQL and validate the backup before applying payment or portal migrations.
- Keep all secrets in ignored local files or encrypted provider environments.
- Run the source secret scan, `audit:release`, `audit:browser`, Lighthouse, and the production build.
- Obtain explicit approval before Vercel deployment, DNS changes, or production migration.

See [DEPLOYMENT.md](DEPLOYMENT.md), [MILESTONES.md](MILESTONES.md), and [design-qa.md](design-qa.md) for the current release state.
