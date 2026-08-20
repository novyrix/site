import type { PaymentCurrency } from "./types.js";

const minorUnitDigits: Record<PaymentCurrency, number> = {
  KES: 2,
  USD: 2,
};

export function formatMinorAmount(amountMinor: bigint, currency: PaymentCurrency) {
  const digits = minorUnitDigits[currency];
  const divisor = 10n ** BigInt(digits);
  const whole = amountMinor / divisor;
  const fraction = (amountMinor % divisor).toString().padStart(digits, "0");
  return `${whole}.${fraction}`;
}

export function parseMajorAmount(amount: string, currency: PaymentCurrency) {
  const digits = minorUnitDigits[currency];
  const match = amount.trim().match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) throw new Error("Provider returned an invalid amount.");

  const fraction = match[2] || "";
  if (fraction.length > digits && /[1-9]/.test(fraction.slice(digits))) {
    throw new Error("Provider amount has unsupported precision.");
  }

  const normalizedFraction = fraction.slice(0, digits).padEnd(digits, "0");
  return BigInt(match[1]) * 10n ** BigInt(digits) + BigInt(normalizedFraction || "0");
}

export function toSafeProviderInteger(amountMinor: bigint) {
  if (amountMinor <= 0n || amountMinor > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Invoice amount is outside the provider-safe range.");
  }
  return Number(amountMinor);
}
