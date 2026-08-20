# Immediate Phase 1 Update

Last updated: 20 August 2026

## Completed

- Public site rebuild is complete locally.
- Light mode is default, with persistent dark theme support.
- Responsive visual QA passed across desktop and 390px mobile.
- Inquiry form writes to the platform API and sends notifications.
- PostgreSQL is hosted on the Linux VPS behind the platform API.
- Cloudflare Tunnel exposes `api.novyrix.com`; the database itself is private.
- Uptime Kuma monitoring is active for the API path.
- Operations Console is implemented locally for lead, fit, discovery, agreement, engagement, and invoice workflows.
- Paystack and BTCPay payment foundation is implemented with server-side verification and signed webhook handling.
- Production payment provider credentials are staged locally with `PAYMENTS_LIVE=false`.
- Local payment preview is running at `http://127.0.0.1:4173/pay/preview`.

## Still Gated

- Legal review before publishing the privacy and terms drafts.
- Vercel encrypted environment variables for production auth and platform API access.
- Fresh PostgreSQL backup before applying pending production migrations.
- Paystack live card and M-Pesa checks.
- BTCPay live Lightning and on-chain checks.
- `PAYMENTS_LIVE=true` activation.
- Vercel preview QA and explicit approval before production deployment.

## Next Action

Proceed with the production-readiness run in this order:

1. Prepare Vercel preview environment variables.
2. Validate PostgreSQL backup.
3. Apply the platform API migration during an approved window.
4. Run real low-value payment checks.
5. Deploy preview, run QA, then promote only after final approval.
