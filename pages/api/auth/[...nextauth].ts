import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth, getById } from "@/lib/firebase";

const MINUTE = 60;
const HOUR = 60 * MINUTE;

export const authOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return { uid: userCredential.user.uid };
            }
            return new Error('invalid credentials');
          })
          .catch(error => (console.log(error)))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
        });
      }
    })
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    maxAge: 8 * HOUR
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const userData = await getById(user.uid, "user");
        user.email = userData.email;
        user.type = userData.type;
        user.name = userData.name;
        user.surname = userData.surname;

        userData.social_name && (user.social_name = userData.social_name);

        token.user = user;
      }
      
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return Promise.resolve(session)
    },
  },
}
export default NextAuth(authOptions)