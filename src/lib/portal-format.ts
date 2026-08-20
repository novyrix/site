import type { PortalCurrency } from "@/lib/portal-types";

export function formatPortalAmount(amountMinor: string, currency: PortalCurrency) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(Number(BigInt(amountMinor)) / 100);
}

export function formatPortalDate(value: string | null) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export function formatPortalDateTime(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

export function humanizePortalStatus(status: string) {
  return status.toLowerCase().replaceAll("_", " ");
}
