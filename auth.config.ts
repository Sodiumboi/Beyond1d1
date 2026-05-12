import type { NextAuthConfig } from 'next-auth'
import Discord from 'next-auth/providers/discord'

export const authConfig = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthPage = nextUrl.pathname.startsWith('/login')

      if (!isLoggedIn && !isAuthPage) return false
      if (isLoggedIn && isAuthPage) {
        return Response.redirect(new URL('/characters', nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
