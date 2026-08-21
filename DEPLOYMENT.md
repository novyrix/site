# Novyrix Deployment Guide

Production deployment remains approval-gated. This guide contains placeholders only. Never place a live secret in this file, a commit, a browser environment variable, or a command transcript.

## Architecture

- `novyrix.com`: Next.js frontend on Vercel.
- `api.novyrix.com`: Fastify platform API on the Novyrix Linux host through Cloudflare Tunnel.
- PostgreSQL: private Docker network on the Linux host with no published database port.
- Resend: inquiry, invoice, receipt, and monitoring notifications.
- Paystack and BTCPay Server: platform API integrations enabled only after both pass real transaction checks.
- Uptime Kuma: independent health monitoring for the public and tailnet-only API endpoints.

## Vercel Environment

Set these as encrypted server-side variables. Do not prefix them with `NEXT_PUBLIC_`.

```dotenv
AUTH_SECRET=<long-random-auth-secret>
AUTH_GOOGLE_ID=<google-web-oauth-client-id>
AUTH_GOOGLE_SECRET=<google-web-oauth-client-secret>
NOVYRIX_ADMIN_EMAIL=spira@novyrix.com
AUTH_CREDENTIALS_FALLBACK=false
NOVYRIX_API_URL=https://api.novyrix.com
NOVYRIX_API_TOKEN=<platform-api-shared-secret>
```

Create the web OAuth client in Google Auth Platform using the origins and callback URIs in `docs/deployment/google-auth-platform.md`. Store its secret only in encrypted Vercel variables.

No Paystack, BTCPay, Cloudflare, database, Tailscale, or Resend secret belongs in the Vercel frontend environment unless a server-only Next.js route explicitly requires it. The current payment design keeps provider and Resend credentials in the platform API.

## Platform API Environment

Use the protected server environment file documented in `deploy/novyrix-platform/.env.example`. Required categories are:

- PostgreSQL connection
- API shared secret
- Resend delivery
- payment-link signing
- Paystack server credentials
- BTCPay Greenfield and webhook credentials
- Cloudflare Tunnel token

Keep `PAYMENTS_LIVE=false` until the checks in `deploy/novyrix-platform/PAYMENTS.md` pass.

## Local Release Checks

From the repository root:

```bash
npm ci
npm run build
npm run start -- --hostname 127.0.0.1 --port 4173
npm run audit:release
npm run audit:browser
```

From `platform-api`:

```bash
npm ci
npx prisma validate
npm test
```

Also complete:

- desktop and mobile browser QA in both themes
- no-public-pricing scan
- payment-link privacy header check
- accessibility and keyboard review
- redirect and protected-route checks
- repository secret scan
- qualified Kenyan legal review of the privacy and terms drafts
- Lighthouse and Core Web Vitals check against the Vercel preview

## Platform Migration

1. Confirm the latest private PostgreSQL backup completed successfully.
2. Create an additional pre-change backup and validate its catalog entry.
3. Copy the reviewed API source and migration to the Linux host.
4. Keep `PAYMENTS_LIVE=false`.
5. Run `npx prisma migrate deploy` in the migration container.
6. Rebuild and restart only the platform API service.
7. Verify database health, public API health, Uptime Kuma, and inquiry persistence.
8. Verify the admin readiness endpoint reports both payment providers disabled.

Production status on 21 August 2026:

- The custom-format backup `/srv/novyrix/backups/postgres/novyrix-20260821T053116Z.dump` passed `pg_restore --list` validation before migration.
- The payments, admin operations, Phase 2 portal, and Google identity migrations applied successfully. Prisma reports all five migrations up to date.
- Existing data counts remained at three organisations and three leads. `PortalUser.passwordHash` is nullable as required by Google identity authentication.
- The reviewed API image is deployed and both loopback and `https://api.novyrix.com/health` return `200`.
- A synthetic unprovisioned Google identity reaches the new resolver and returns `401`, confirming that the route exists and fails closed.
- `PAYMENTS_LIVE` remains false. Provider activation is still a separate controlled change.

## Vercel Release

1. Obtain explicit approval to deploy.
2. Confirm the intended Git commit and clean secret scan.
3. Add encrypted environment variables in Vercel.
4. Deploy a preview first.
5. Run browser, form, redirect, privacy-header, and performance checks against the preview.
6. Promote only after approval.
7. Change production DNS only if separately approved and required.

## Payment Activation

Payment activation is a separate change after deployment:

1. Connect Paystack and BTCPay credentials on the platform API host.
2. Register both signed webhook endpoints.
3. Complete low-value card, M-Pesa, Lightning, and on-chain checks as applicable.
4. Reconcile provider records, database records, invoice state, and receipts.
5. Set `PAYMENTS_LIVE=true` only when both adapters report ready.

## Rollback

- Frontend: promote the last known-good Vercel deployment.
- Platform API: set `PAYMENTS_LIVE=false`, restore the previous API image, and preserve all payment records.
- Database: restore only through the documented backup procedure after confirming the migration cannot be corrected forward.
- DNS: do not change or roll back records without explicit approval.
