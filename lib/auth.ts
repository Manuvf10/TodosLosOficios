import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { seedUsers } from "@/data/users";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CLIENTE" | "PROFESIONAL";
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: "CLIENTE" | "PROFESIONAL";
  }
}

const googleConfigured = !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {}, localUsers: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const localUsers = credentials.localUsers ? JSON.parse(credentials.localUsers as string) : [];
        const users = [...seedUsers, ...localUsers];
        const user = users.find(
          (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password,
        );
        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
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
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string) ?? "";
        session.user.role = (token.role as "CLIENTE" | "PROFESIONAL") ?? "CLIENTE";
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
};

export { googleConfigured };
