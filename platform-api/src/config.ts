import { z } from "zod";

const optionalString = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().trim().min(1).optional(),
);

const optionalUrl = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.url().optional(),
);

const schema = z.object({
  DATABASE_URL: z.string().min(1),
  API_SHARED_SECRET: z.string().min(32),
  RESEND_API_KEY: z.string().min(20),
  RESEND_FROM_EMAIL: z.string().min(3).default("Novyrix <notifications@mailbox.novyrix.com>"),
  ADMIN_EMAIL: z.email().default("connect@novyrix.com"),
  PORT: z.coerce.number().int().positive().default(8080),
  PAYMENTS_LIVE: z.enum(["true", "false"]).default("false").transform((value) => value === "true"),
  PAYMENT_SITE_URL: z.url().default("http://localhost:3000"),
  PAYMENT_LINK_SECRET: optionalString,
  PAYSTACK_SECRET_KEY: optionalString,
  PAYSTACK_BASE_URL: z.url().default("https://api.paystack.co"),
  BTCPAY_BASE_URL: optionalUrl,
  BTCPAY_API_KEY: optionalString,
  BTCPAY_STORE_ID: optionalString,
  BTCPAY_WEBHOOK_SECRET: optionalString,
});

const parsed = schema.parse(process.env);

export const env = {
  ...parsed,
  PAYMENT_LINK_SECRET: parsed.PAYMENT_LINK_SECRET || parsed.API_SHARED_SECRET,
};

export type PlatformEnvironment = typeof env;
