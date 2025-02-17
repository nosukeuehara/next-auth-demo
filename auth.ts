import NextAuth, { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export const config: NextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png"
  },
  providers: [Github({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHIB_CLIENT_SECRET
  })],
  basePath: "/api/auth", // apiのパス
  callbacks: {
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/protected-page") return !!auth;
        return true
      } catch (err) {
        console.log(err)
      }
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)