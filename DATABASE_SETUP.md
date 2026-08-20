# Novyrix Database Setup

Last updated: 20 August 2026

## Current Architecture

Phase 1 data lives in the platform API PostgreSQL database on the Linux VPS. The database runs inside Docker on a private network and is not exposed directly to the public internet.

Public access path:

```text
browser -> novyrix.com -> Next.js server routes -> api.novyrix.com -> Fastify platform API -> private PostgreSQL
```

Cloudflare Tunnel exposes the API hostname, not the raw PostgreSQL port.

## Source Of Truth

Use this schema for Phase 1 records:

```text
platform-api/prisma/schema.prisma
```

This schema owns:

- Organization
- Lead
- Proposal
- Engagement
- Invoice
- PaymentAttempt
- Payment
- WebhookEvent

The root schema at `prisma/schema.prisma` is legacy MySQL scaffolding retained only so inherited redirected pages can compile. Do not use the root schema for new Phase 1 production data.

## Local Frontend Environment

The frontend should talk to the platform API through server-only variables:

```dotenv
NOVYRIX_API_URL=https://api.novyrix.com
NOVYRIX_API_TOKEN=<platform-api-shared-secret>
```

Do not put database credentials in Vercel frontend env unless a future server-only route explicitly requires it. The current frontend does not need raw database access for Phase 1 workflows.

## Platform API Environment

The platform API host needs:

```dotenv
DATABASE_URL=postgresql://<user>:<password>@postgres:5432/<db>
API_SHARED_SECRET=<shared-secret>
RESEND_API_KEY=<resend-key>
RESEND_FROM_EMAIL=<from-address>
ADMIN_EMAIL=connect@novyrix.com
PAYMENTS_LIVE=false
PAYMENT_SITE_URL=https://pay.novyrix.com
PAYMENT_LINK_SECRET=<distinct-random-secret>
PAYSTACK_SECRET_KEY=<paystack-secret>
BTCPAY_BASE_URL=https://pay.insats.org
BTCPAY_API_KEY=<btcpay-api-key>
BTCPAY_STORE_ID=<btcpay-store-id>
BTCPAY_WEBHOOK_SECRET=<btcpay-webhook-secret>
```

Production provider credentials are staged locally in:

```text
X:\novyrix\_ops\secrets\payment-providers.env
```

They remain activation-gated with `PAYMENTS_LIVE=false`.

## Migration Rules

Production migration sequence:

1. Confirm the latest scheduled PostgreSQL backup completed.
2. Create a fresh pre-change backup.
3. Validate the backup catalog entry.
4. Copy reviewed platform API source and migrations to the VPS.
5. Keep `PAYMENTS_LIVE=false`.
6. Run `npx prisma migrate deploy` from the platform API migration container.
7. Restart only the platform API service.
8. Verify `/health`, inquiry persistence, admin readiness, Uptime Kuma, and payment readiness.

Do not run `npm run prisma:push` from the frontend root against production. That command belongs to the legacy schema and is not part of the Phase 1 data plane.

## Health Checks

Public API:

```powershell
Invoke-RestMethod https://api.novyrix.com/health
```

Expected response:

```json
{"status":"ok"}
```

VPS service status:

```bash
cd /srv/novyrix/deploy/novyrix-platform
docker compose ps
```

Database exposure expectation:

```text
PostgreSQL listens inside Docker only. External clients should not connect to port 5432.
```
