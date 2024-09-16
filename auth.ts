import NextAuth, { CredentialsSignin } from "next-auth"
import "next-auth/jwt"

import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { SIGN_IN } from "app/lib/routes"

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password"
}

const config = {
  pages: {
    signIn: "/auth/sign-in",
  },

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        throw new InvalidLoginError()
      },
    }),
  ],
  callbacks: {
    /* Callbacks are asynchronous functions you can use to control what happens when an action is performed.
    Callbacks allow you to implement access controls without a database and to integrate with external databases or APIs. */
    async signIn({ user, account, profile, email, credentials }) {
      /* Use the signIn() callback to control if a user is allowed to sign in. */
      // console.log({ user, account, profile, email, credentials })
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      /* The redirect callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
      By default only URLs on the same URL as the site are allowed, you can use the redirect callback to customise that behaviour.

      NOTE: The redirect callback may be invoked more than once in the same flow. */

      if (url === `${baseUrl}/${SIGN_IN}`) return baseUrl
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    authorized({ request, auth }) {
      // used in between signin and redirect
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },

    jwt({ token, trigger, session, account }) {
      /* jwt callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
      Requests to /api/auth/signin, /api/auth/session and calls to getSession(), getServerSession(), useSession() will invoke this function, but only if you are using a JWT session.      
      This method is not invoked when you persist sessions in a database.
      The returned value will be encrypted, and it is stored in a cookie. */
      // console.log({ token, trigger, session, account })
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.userId = account.userId
      }
      return token
    },
    async session({ session, token }) {
      /* The session callback is called whenever a session is checked. By default, only a subset of the token is returned for increased security. If you want to make something available you added to the token (like access_token and user.id from above) via the jwt() callback, you have to explicitly forward it here to make it available to the client. you will get all the keys from jwt() return and you can filter or add more keys to the session object.

      Invoked after e.g. getSession(), useSession(), /api/auth/session */
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
