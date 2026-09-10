import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { env } from "./env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({ clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  },
  callbacks: {
    authorized: ({ auth }) => auth?.user?.email === env.GITHUB_ALLOWED_EMAIL,
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
});
