import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { authConfig } from "@/auth.config";
import { resolvePortalGoogleIdentity, verifyPortalCredentials } from "@/lib/portal-api";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "CLIENT" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "CLIENT" | "ADMIN";
  }
}

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;
const credentialsFallbackEnabled =
  process.env.AUTH_CREDENTIALS_FALLBACK === "true" && process.env.VERCEL !== "1";

function adminEmailAllowlist() {
  return new Set(
    (process.env.NOVYRIX_ADMIN_EMAIL || "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    ...(googleClientId && googleClientSecret
      ? [Google({ clientId: googleClientId, clientSecret: googleClientSecret })]
      : []),
    ...(credentialsFallbackEnabled ? [Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === "string"
          ? credentials.email.trim().toLowerCase()
          : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";
        const adminEmail = process.env.NOVYRIX_ADMIN_EMAIL?.trim().toLowerCase();
        const passwordHash = process.env.NOVYRIX_ADMIN_PASSWORD_HASH;

        if (!email || !password) return null;

        if (adminEmail && passwordHash && email === adminEmail) {
          const isPasswordValid = await bcrypt.compare(password, passwordHash);
          if (!isPasswordValid) return null;

          return {
            id: "novyrix-admin",
            email: adminEmail,
            name: "Edmund",
            role: "ADMIN",
          };
        }

        const portalUser = await verifyPortalCredentials(email, password);
        if (!portalUser) return null;

        return {
          id: portalUser.id,
          email: portalUser.email,
          name: portalUser.name,
          role: "CLIENT",
        };
      },
    })] : []),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return Boolean(user.role);
      if (account?.provider !== "google") return false;

      const googleProfile = profile as { email?: string; email_verified?: boolean } | undefined;
      const email = (googleProfile?.email || user.email || "").trim().toLowerCase();
      if (!email || googleProfile?.email_verified !== true) return false;

      if (adminEmailAllowlist().has(email)) {
        user.id = "novyrix-admin";
        user.email = email;
        user.role = "ADMIN";
        return true;
      }

      const portalUser = await resolvePortalGoogleIdentity(email);
      if (!portalUser) return false;

      user.id = portalUser.id;
      user.email = portalUser.email;
      user.name = portalUser.name;
      user.role = "CLIENT";
      return true;
    },
  },
});
