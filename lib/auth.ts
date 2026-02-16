import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { seedUsers } from "@/data/users";
import { AppUser, Role } from "@/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userId: string;
      role: Role;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: Role;
  }
}

const googleConfigured = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {}, localUserJson: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        let localUser: AppUser | null = null;
        if (credentials.localUserJson) {
          try {
            localUser = JSON.parse(credentials.localUserJson as string) as AppUser;
          } catch {
            localUser = null;
          }
        }

        const users = [...seedUsers, ...(localUser ? [localUser] : [])];
        const user = users.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password,
        );

        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role } as never;
      },
    }),
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = (user as { role: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userId = (token.userId as string) ?? "";
        const role = (token.role as Role) ?? "CLIENTE";
        session.user.id = userId;
        session.user.userId = userId;
        session.user.role = role;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};

export { googleConfigured };
