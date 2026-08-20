"use client";

import {
  ArrowClockwise,
  ArrowUpRight,
  CheckCircle,
  CreditCard,
  CurrencyBtc,
  LockKey,
  SpinnerGap,
  WarningCircle,
} from "@phosphor-icons/react";
import { useEffect, useEffectEvent, useRef, useState, startTransition } from "react";
import type {
  CheckoutResponse,
  PaymentInvoice,
  PaymentProviderName,
} from "@/lib/payment-types";

type PaymentCheckoutProps = {
  initialInvoice: PaymentInvoice;
  paymentToken: string;
  returnedProvider?: string;
};

const providerDetails = {
  PAYSTACK: {
    key: "paystack" as const,
    eyebrow: "Local and international",
    description: "Pay securely by card or M-Pesa through Paystack.",
    Icon: CreditCard,
  },
  BTCPAY: {
    key: "btcpay" as const,
    eyebrow: "Self-hosted settlement",
    description: "Pay with Bitcoin on-chain or over the Lightning Network.",
    Icon: CurrencyBtc,
  },
};

function formatAmount(amountMinor: string, currency: PaymentInvoice["currency"]) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Number(BigInt(amountMinor)) / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

function statusCopy(invoice: PaymentInvoice) {
  switch (invoice.status) {
    case "PAID":
      return "Payment received";
    case "OVERPAID":
      return "Payment received. Our team will reconcile the additional settlement.";
    case "OVERDUE":
      return "Past due. Payment is still available.";
    case "VOID":
      return "This invoice is no longer payable.";
    default:
      return `Due ${formatDate(invoice.dueAt)}`;
  }
}

export function PaymentCheckout({
  initialInvoice,
  paymentToken,
  returnedProvider,
}: PaymentCheckoutProps) {
  const [invoice, setInvoice] = useState(initialInvoice);
  const [pendingProvider, setPendingProvider] = useState<PaymentProviderName | null>(null);
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const returnChecked = useRef(false);
  const payable = invoice.status === "PENDING" || invoice.status === "OVERDUE";
  const providerReady = invoice.providers.paystack.available && invoice.providers.btcpay.available;
  const previewMode = paymentToken === "preview";

  async function refreshStatus(quiet = false) {
    if (!quiet) setChecking(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/payments/${encodeURIComponent(paymentToken)}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const result = (await response.json()) as PaymentInvoice & { error?: string };
      if (!response.ok) throw new Error(result.error || "Payment status could not be checked.");

      startTransition(() => setInvoice(result));
      if (result.status === "PENDING" || result.status === "OVERDUE") {
        setMessage("No completed settlement is recorded yet. You can check again in a moment.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Payment status could not be checked.");
    } finally {
      setChecking(false);
    }
  }

  const refreshAfterReturn = useEffectEvent(() => {
    void refreshStatus(true);
  });

  useEffect(() => {
    if (!returnedProvider || returnChecked.current || paymentToken === "preview") return;
    returnChecked.current = true;
    refreshAfterReturn();
  }, [paymentToken, returnedProvider]);

  async function beginCheckout(provider: PaymentProviderName) {
    if (previewMode) {
      setMessage(
        provider === "PAYSTACK"
          ? "Preview mode only. Paystack checkout was not started."
          : "Preview mode only. BTCPay checkout was not started.",
      );
      return;
    }

    setPendingProvider(provider);
    setMessage(null);

    try {
      const response = await fetch(`/api/payments/${encodeURIComponent(paymentToken)}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });
      const result = (await response.json()) as CheckoutResponse & { error?: string };
      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || "Checkout could not be started.");
      }

      const checkoutUrl = new URL(result.checkoutUrl);
      if (checkoutUrl.protocol !== "https:") throw new Error("The checkout address is invalid.");
      window.location.assign(checkoutUrl.toString());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout could not be started.");
      setPendingProvider(null);
    }
  }

  return (
    <main id="main-content" className="payment-page">
      <div className="payment-page__signal" aria-hidden="true">
        <span>NVX / SETTLEMENT</span>
        <span>SECURE PAYMENT LINK</span>
        <span>{invoice.currency}</span>
      </div>

      <section className="site-shell payment-hero" aria-labelledby="invoice-title">
        <div className="payment-hero__intro">
          <p className="eyebrow">Invoice / {invoice.reference}</p>
          <h1 id="invoice-title">Complete your project payment.</h1>
          <p>
            Review the agreed work, choose a payment route, and finish settlement on the provider&apos;s
            secure checkout.
          </p>
        </div>

        <div className={`payment-state payment-state--${invoice.status.toLowerCase()}`}>
          {invoice.status === "PAID" || invoice.status === "OVERPAID" ? (
            <CheckCircle aria-hidden="true" weight="fill" />
          ) : invoice.status === "VOID" ? (
            <WarningCircle aria-hidden="true" weight="fill" />
          ) : (
            <span className="payment-state__pulse" aria-hidden="true" />
          )}
          <span>{statusCopy(invoice)}</span>
        </div>
      </section>

      <section className="payment-ledger">
        <div className="site-shell payment-ledger__grid">
          <div className="payment-invoice">
            <div className="payment-invoice__parties">
              <div>
                <span className="mono">Prepared for</span>
                <strong>{invoice.organizationName}</strong>
              </div>
              <div>
                <span className="mono">Engagement</span>
                <strong>{invoice.serviceType}</strong>
              </div>
              <div>
                <span className="mono">Due date</span>
                <strong>{formatDate(invoice.dueAt)}</strong>
              </div>
            </div>

            <div className="payment-lines" role="table" aria-label="Invoice line items">
              <div className="payment-lines__head" role="row">
                <span role="columnheader">Description</span>
                <span role="columnheader">Qty</span>
                <span role="columnheader">Amount</span>
              </div>
              {invoice.lineItems.map((item) => (
                <div className="payment-lines__item" role="row" key={item.description}>
                  <span role="cell">{item.description}</span>
                  <span role="cell" className="mono">{item.quantity}</span>
                  <span role="cell">{formatAmount(item.totalAmountMinor, invoice.currency)}</span>
                </div>
              ))}
              <div className="payment-lines__total" role="row">
                <span role="cell">Total due</span>
                <strong role="cell">{formatAmount(invoice.totalAmountMinor, invoice.currency)}</strong>
              </div>
            </div>

            <div className="payment-invoice__note">
              <LockKey aria-hidden="true" weight="bold" />
              <p>
                This private link contains invoice details. Novyrix does not collect or store card,
                M-Pesa PIN, wallet seed, or private key information.
              </p>
            </div>
          </div>

          <aside className="payment-methods" aria-labelledby="payment-methods-title">
            <div className="payment-methods__heading">
              <p className="eyebrow">Settlement route</p>
              <h2 id="payment-methods-title">
                {payable ? "Choose how to pay." : "Invoice status."}
              </h2>
              <p>
                {payable
                  ? "Your reference and invoice amount are carried into checkout automatically."
                  : statusCopy(invoice)}
              </p>
            </div>

            {payable && (
              <div className="payment-methods__list">
                {(Object.keys(providerDetails) as PaymentProviderName[]).map((provider) => {
                  const details = providerDetails[provider];
                  const availability = invoice.providers[details.key].available;
                  const loading = pendingProvider === provider;
                  const Icon = details.Icon;

                  return (
                    <button
                      type="button"
                      className="payment-method"
                      key={provider}
                      disabled={!availability || Boolean(pendingProvider)}
                      onClick={() => void beginCheckout(provider)}
                    >
                      <span className="payment-method__icon"><Icon aria-hidden="true" weight="bold" /></span>
                      <span className="payment-method__copy">
                        <span className="mono">{details.eyebrow}</span>
                        <strong>{invoice.providers[details.key].label}</strong>
                        <small>{availability ? details.description : "Credentials pending connection."}</small>
                      </span>
                      {loading ? (
                        <SpinnerGap className="payment-spinner" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight aria-hidden="true" weight="bold" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!providerReady && payable && (
              <div className="payment-setup-note">
                <span className="mono">Payment setup in progress</span>
                <p>
                  Online settlement is not active yet. Contact
                  {" "}<a href={`mailto:connect@novyrix.com?subject=${encodeURIComponent(invoice.reference)}`}>connect@novyrix.com</a>
                  {" "}and include invoice {invoice.reference}.
                </p>
              </div>
            )}

            {(returnedProvider || invoice.status === "PAID" || invoice.status === "OVERPAID") && (
              <button
                type="button"
                className="payment-refresh"
                onClick={() => void refreshStatus()}
                disabled={checking || paymentToken === "preview"}
              >
                <ArrowClockwise className={checking ? "payment-spinner" : undefined} aria-hidden="true" />
                {checking ? "Checking payment" : "Check payment status"}
              </button>
            )}

            {message && <p className="payment-message" role="status">{message}</p>}
            <p className="payment-support mono">Payment support / connect@novyrix.com</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
