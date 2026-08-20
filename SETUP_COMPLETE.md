# Novyrix Setup Status

Last updated: 20 August 2026

## Current Setup

The old starter setup is superseded. The active Novyrix build is now the Phase 1 platform described in `PROJECT_STATUS.md`, `MILESTONES.md`, `DATABASE_SETUP.md`, and `DEPLOYMENT.md`.

## What Is Ready Locally

- Next.js 16 public site and operations frontend.
- Fastify platform API in `platform-api`.
- PostgreSQL platform schema in `platform-api/prisma/schema.prisma`.
- Local production preview at `http://127.0.0.1:4173/pay/preview`.
- Server-only platform API integration through `NOVYRIX_API_URL` and `NOVYRIX_API_TOKEN`.
- Payment provider code for Paystack and BTCPay, activation-gated with `PAYMENTS_LIVE=false`.

## What Changed From The Starter Plan

- The old root MySQL schema is not the production data plane.
- Quote calculators and self-serve registration are retired for Phase 1.
- Public pricing figures are intentionally removed.
- Phase 1 uses a scoped inquiry, manual proposal, agreement confirmation, itemized invoice, and private payment-link flow.
- Phase 2 client portal work is deferred until 2-3 signed engagements.

## Verification

Use the current verification commands:

```powershell
npx tsc --noEmit
npm run build
npm run start -- --hostname 127.0.0.1 --port 4173
npm run audit:release
npm run audit:browser
Push-Location platform-api
npm test
Pop-Location
```

The authoritative phase tracker is `MILESTONES.md`.
