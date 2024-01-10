import NextAuth from "next-auth"
import { Account, Specialist, User } from "@/types/users"
//import NextAuth, { Account } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: Specialist | User
  
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Specialist | User
  }
}