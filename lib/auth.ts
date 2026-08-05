import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/**
 * PLACEHOLDER single-admin auth for the client portal shell.
 *
 * There are no real clients yet, so this deliberately does NOT build a full
 * multi-user system (no users table, no per-client accounts, no signup
 * flow). It authenticates exactly one operator — the founder — against two
 * env vars so he can log in and see the portal shell himself:
 *
 *   PORTAL_ADMIN_EMAIL           plain email, compared case-insensitively
 *   PORTAL_ADMIN_PASSWORD_HASH   bcrypt hash of the chosen password (never
 *                                 the plaintext password itself)
 *
 * Follow-up task, once real clients exist: replace this Credentials
 * provider with a real users table (Postgres) keyed by client account,
 * proper per-client role-based access, and a password-reset flow. Do not
 * extend this file into a general user-management system before that need
 * is real — see .env.local.example for setup instructions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/portal/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = typeof credentials?.email === "string" ? credentials.email.trim().toLowerCase() : "";
        const password = typeof credentials?.password === "string" ? credentials.password : "";

        const adminEmail = process.env.PORTAL_ADMIN_EMAIL?.trim().toLowerCase();
        const adminPasswordHash = process.env.PORTAL_ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) {
          // Fails closed if the env vars were never set (e.g. local dev
          // without .env.local configured) rather than silently allowing in.
          console.error(
            "[portal-auth] PORTAL_ADMIN_EMAIL or PORTAL_ADMIN_PASSWORD_HASH is not set — portal login is disabled until both are configured."
          );
          return null;
        }

        if (!email || !password || email !== adminEmail) {
          return null;
        }

        const isValid = await bcrypt.compare(password, adminPasswordHash);
        if (!isValid) {
          return null;
        }

        return { id: "portal-admin", email: adminEmail, name: "Ayava Creatives Admin" };
      },
    }),
  ],
});
