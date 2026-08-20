"use client";

import { ArrowUpRight, CurrencyBtc, CreditCard, SpinnerGap } from "@phosphor-icons/react";
import { startTransition, useState } from "react";
import type { CheckoutResponse, PaymentProviderName } from "@/lib/payment-types";
import type { PortalInvoiceStatus } from "@/lib/portal-types";

type PortalInvoiceActionsProps = {
  invoiceReference: string;
  status: PortalInvoiceStatus;
  preview?: boolean;
  compact?: boolean;
};

const providers = [
  {
    name: "PAYSTACK" as const,
    provider: "Paystack",
    label: "Card and M-Pesa",
    description: "Pay securely by card or M-Pesa.",
    Icon: CreditCard,
  },
  {
    name: "BTCPAY" as const,
    provider: "BTCPay Server",
    label: "Bitcoin and Lightning",
    description: "Settle on-chain or over Lightning.",
    Icon: CurrencyBtc,
  },
];

export function PortalInvoiceActions({
  invoiceReference,
  status,
  preview = false,
  compact = false,
}: PortalInvoiceActionsProps) {
  const [pendingProvider, setPendingProvider] = useState<PaymentProviderName | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const payable = status === "PENDING" || status === "OVERDUE";

  async function beginCheckout(provider: PaymentProviderName) {
    if (preview) {
      setMessage("Preview mode only. No live checkout was started.");
      return;
    }

    setPendingProvider(provider);
    setMessage(null);
    try {
      const response = await fetch(`/api/portal/invoices/${encodeURIComponent(invoiceReference)}/checkout`, {
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
      startTransition(() => {
        setMessage(error instanceof Error ? error.message : "Checkout could not be started.");
        setPendingProvider(null);
      });
    }
  }

  if (!payable) {
    return <p className="portal-payment-note mono">No payment action is available for this status.</p>;
  }

  return (
    <div className={`portal-payment-block ${compact ? "portal-payment-block--compact" : ""}`}>
      <div className="portal-payment-block__heading">
        <span className="mono">Settlement routes</span>
        <p>Choose how you want to settle this invoice.</p>
      </div>
      <div className="portal-pay-actions">
        {providers.map(({ name, provider, label, description, Icon }) => (
          <button
            type="button"
            className={`portal-pay-route portal-pay-route--${name.toLowerCase()}`}
            key={name}
            onClick={() => void beginCheckout(name)}
            disabled={Boolean(pendingProvider)}
            aria-label={`Pay ${invoiceReference} using ${label}`}
          >
            <span className="portal-pay-route__icon">
              <Icon aria-hidden="true" weight="bold" />
            </span>
            <span className="portal-pay-route__copy">
              <small>{provider}</small>
              <strong>{label}</strong>
              <span>{description}</span>
            </span>
            <span className="portal-pay-route__arrow" aria-hidden="true">
              {pendingProvider === name ? (
                <SpinnerGap className="payment-spinner" />
              ) : (
                <ArrowUpRight />
              )}
            </span>
          </button>
        ))}
      </div>
      {message && <p className="portal-feedback" role="status">{message}</p>}
    </div>
  );
}
