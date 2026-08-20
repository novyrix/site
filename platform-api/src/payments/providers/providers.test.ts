import assert from "node:assert/strict";
import test from "node:test";
import { BtcpayProvider } from "./btcpay.js";
import { PaystackProvider } from "./paystack.js";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("initializes Paystack on the server with minor units and verifies settlement", async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const fetcher = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    requests.push({ url, init });
    if (url.includes("/verify/")) {
      return jsonResponse({
        status: true,
        message: "Verification successful",
        data: {
          id: 91,
          status: "success",
          reference: "PSTK-ABC",
          amount: 125050,
          currency: "KES",
          channel: "mobile_money",
          paid_at: "2026-08-19T12:00:00.000Z",
        },
      });
    }
    return jsonResponse({
      status: true,
      message: "Authorization URL created",
      data: {
        authorization_url: "https://checkout.paystack.com/test",
        access_code: "access",
        reference: "PSTK-ABC",
      },
    });
  }) as typeof fetch;

  const provider = new PaystackProvider("secret", "https://api.paystack.co", fetcher);
  const initialized = await provider.initialize({
    amountMinor: 125050n,
    currency: "KES",
    customerEmail: "client@example.com",
    invoiceReference: "INV-001",
    attemptReference: "PSTK-ABC",
    returnUrl: "https://novyrix.com/pay/token",
  });
  const body = JSON.parse(String(requests[0].init?.body)) as { amount: number; currency: string };
  assert.equal(body.amount, 125050);
  assert.equal(body.currency, "KES");
  assert.equal(initialized.checkoutUrl, "https://checkout.paystack.com/test");

  const verified = await provider.verify("PSTK-ABC");
  assert.equal(verified.state, "paid");
  assert.equal(verified.amountMinor, 125050n);
  assert.equal(verified.channel, "mobile_money");
});

test("creates a BTCPay invoice in major units and normalizes settled status", async () => {
  const requests: Array<{ url: string; init?: RequestInit }> = [];
  const fetcher = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    requests.push({ url, init });
    if (init?.method === "POST") {
      return jsonResponse({
        id: "btcpay-invoice",
        status: "New",
        amount: "1250.50",
        currency: "KES",
        checkoutLink: "https://btcpay.example/i/test",
        expirationTime: 1787150000,
      });
    }
    return jsonResponse({
      id: "btcpay-invoice",
      status: "Settled",
      amount: "1250.50",
      currency: "KES",
      checkoutLink: "https://btcpay.example/i/test",
    });
  }) as typeof fetch;

  const provider = new BtcpayProvider("https://btcpay.example", "api-key", "store", fetcher);
  const initialized = await provider.initialize({
    amountMinor: 125050n,
    currency: "KES",
    customerEmail: "client@example.com",
    invoiceReference: "INV-001",
    attemptReference: "BTCP-ABC",
    returnUrl: "https://novyrix.com/pay/token",
  });
  const body = JSON.parse(String(requests[0].init?.body)) as { amount: string; currency: string };
  assert.equal(body.amount, "1250.50");
  assert.equal(body.currency, "KES");
  assert.equal(initialized.providerReference, "btcpay-invoice");

  const verified = await provider.verify("btcpay-invoice");
  assert.equal(verified.state, "paid");
  assert.equal(verified.amountMinor, 125050n);
  assert.equal(verified.channel, "bitcoin_lightning");
});
