import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId:
        process.env.AUTH_GOOGLE_ID ||
        process.env.GOOGLE_CLIENT_ID ||
        process.env.GOOGLE_ID,
      clientSecret:
        process.env.AUTH_GOOGLE_SECRET ||
        process.env.GOOGLE_CLIENT_SECRET ||
        process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId:
        process.env.AUTH_GITHUB_ID ||
        process.env.GITHUB_CLIENT_ID ||
        process.env.GITHUB_ID,
      clientSecret:
        process.env.AUTH_GITHUB_SECRET ||
        process.env.GITHUB_CLIENT_SECRET ||
        process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await db.user.findUnique({
          where: { email: email as string },
        });

        if (!user || user.provider !== "credentials") {
          throw new Error("The Email or the Password is incorrect");
        }

        const isValid = await bcrypt.compare(
          password as string,
          user.password as string
        );
        if (!isValid) {
          throw new Error("The Email or the Password is incorrect");
        }

        return {
          id: user.id,
          // email: user.email,
          // name: user.username,
          // imageUrl: user.imageUrl,
          // provider: "credentials",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        if (account.provider !== "credentials") {
          const providerAccountId = account.providerAccountId;
          const provider = account.provider;

          let existingUser = await db.user.findFirst({
            where: {
              provider: provider as string,
              providerAccountId: providerAccountId as string,
            },
          });

          if (!existingUser) {
            const baseUsername =
              user?.name?.trim().replace(/\s+/g, "_").toLowerCase() ||
              user?.email?.split("@")[0] ||
              `user_${providerAccountId?.slice(0, 8) || Date.now()}`;

            let username = baseUsername;
            let counter = 1;
            while (await db.user.findUnique({ where: { username } })) {
              username = `${baseUsername}_${counter++}`;
            }

            const email = user?.email
              ? `${user.email} ${provider}`
              : `${providerAccountId || Date.now()}@${provider}.oauth`;

            existingUser = await db.user.create({
              data: {
                username,
                email,
                imageUrl: user?.image as string,
                provider,
                providerAccountId,
              },
            });
          }

          token.sub = existingUser.id;
        }
      }
      if (account?.provider === "credentials") {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
