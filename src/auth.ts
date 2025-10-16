import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${
            process.env.URL_API || "https://ecommerce.routemisr.com/api/v1"
          }/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const payload: SuccessLoginResponse | FailedLoginResponse =
          await res.json();

        if ("token" in payload) {
          return {
            id: payload.user._id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message);
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.token = token.token;
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
