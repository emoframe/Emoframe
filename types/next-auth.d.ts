import NextAuth from "next-auth"
import { Account } from "@/types/users"
//import NextAuth, { Account } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Account
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    type: string,
    user: Account
  }
}