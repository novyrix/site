# Phase 1 Payment Operations

This runbook covers Novyrix itemized invoices paid through Paystack or BTCPay Server. It does not introduce public pricing or automatic quoting. An invoice can only follow a lead marked `FIT`, an accepted proposal, a confirmed agreement, and an active engagement.

## Safety Model

- Keep every provider credential in the platform API environment. Never add a provider secret to a `NEXT_PUBLIC_` variable or browser request.
- Keep `PAYMENTS_LIVE=false` until Paystack and BTCPay are both configured and their sandbox or low-value production checks pass.
- Use a dedicated random `PAYMENT_LINK_SECRET`. Changing it invalidates every existing private payment link.
- Back up PostgreSQL before applying the payment migration.
- Treat payment links as private client records. They are high-entropy bearer links and are marked `noindex`, `noarchive`, and `no-referrer` on the site.
- Do not mark an invoice paid from a browser return alone. The API records settlement only after provider verification or a valid signed webhook.

## Required Configuration

Platform API:

```dotenv
PAYMENTS_LIVE=false
PAYMENT_SITE_URL=https://pay.novyrix.com
PAYMENT_LINK_SECRET=<distinct-random-secret>
PAYSTACK_SECRET_KEY=<paystack-secret-key>
PAYSTACK_BASE_URL=https://api.paystack.co
BTCPAY_BASE_URL=https://pay.insats.org
BTCPAY_API_KEY=<greenfield-api-key>
BTCPAY_STORE_ID=<store-id>
BTCPAY_WEBHOOK_SECRET=<webhook-secret>
```

Vercel server environment:

```dotenv
NOVYRIX_API_URL=https://api.novyrix.com
NOVYRIX_API_TOKEN=<platform-api-shared-secret>
```

The Vercel variables are server-only. The Next.js payment page reads invoices on the server and proxies checkout mutations to the platform API.

## Paystack Connection

1. Add the Paystack secret key to the platform API environment.
2. Register `https://pay.novyrix.com/webhooks/paystack` as the public webhook URL.
3. Register `https://pay.novyrix.com/paystack/callback` as the dashboard callback URL. Checkout initialization still passes a private callback query so the browser can return to the correct invoice.
4. Confirm Paystack can initialize KES and USD test transactions from the API.
5. Complete card and M-Pesa checks where the account and test environment support them.
6. Confirm a signed `charge.success` event records one payment and a replay does not create another payment.
7. Confirm the browser return triggers status reconciliation but cannot mark an unpaid invoice paid.

## BTCPay Server Connection

1. Create a dedicated Greenfield API key for the Novyrix store with only the invoice permissions needed to create and view invoices.
2. Add the BTCPay base URL, API key, store ID, and webhook secret to the platform API environment.
3. Register `https://pay.novyrix.com/webhooks/btcpay` for invoice payment and settlement events.
4. Create a test invoice and verify its hosted `checkoutLink` opens over HTTPS.
5. Complete Lightning and on-chain checks as applicable to the store.
6. Confirm a valid `BTCPay-Sig` event reconciles the invoice and a replay remains idempotent.

## Activation Gate

Run the authenticated readiness check:

```bash
curl -sS https://api.novyrix.com/v1/admin/payments/readiness \
  -H "Authorization: Bearer $NOVYRIX_API_TOKEN"
```

Expected before activation:

```json
{
  "paymentsLive": false,
  "allReady": false,
  "paystack": { "configured": true, "ready": false },
  "btcpay": { "configured": true, "ready": false }
}
```

After both provider checks pass, set `PAYMENTS_LIVE=true`, restart only the platform API service, and repeat the readiness check. `allReady` must be `true` before sending a payment link to a client.

## Reconciliation Checks

- The provider amount and currency must exactly match the stored invoice.
- The first verified payment moves an invoice to `PAID` and sends one receipt.
- A second successful rail is recorded without loss and moves the invoice to `OVERPAID` for manual reconciliation.
- Raw webhook payload hashes prevent duplicate event processing.
- A failed receipt email does not reverse or hide a verified payment.
- Provider dashboards, the `Payment` record, the invoice status, and the client receipt should agree before closing an incident.

## Rollback

Set `PAYMENTS_LIVE=false` and restart the platform API. Existing invoices remain visible, but neither provider can initialize a new checkout. Do not delete payment attempts, payments, or webhook events. Preserve them for reconciliation and audit.

## Local Credential Staging

Production provider keys supplied on 20 August 2026 are stored in the ignored local file:

```text
X:\novyrix\_ops\secrets\payment-providers.env
```

Load them into the current PowerShell process only when running controlled provider checks:

```powershell
. X:\novyrix\_ops\secrets\load-payment-providers.ps1
```

The staged file keeps `PAYMENTS_LIVE=false`. Enabling live checkout remains a separate activation step after the real Paystack and BTCPay checks above pass.
