import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Role } from "@/types";
import { createServerSupabaseAnon, createServerSupabaseAdmin } from "@/lib/supabase/server";

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
      credentials: { email: {}, password: {}, selectedRole: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = createServerSupabaseAnon();
        const admin = createServerSupabaseAdmin();

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (authError || !authData.user) return null;

        const { data: appUser } = await admin
          .from("users")
          .select("id, role, name")
          .eq("id", authData.user.id)
          .maybeSingle();

        if (!appUser) return null;

        const selectedRole = credentials.selectedRole as Role | undefined;
        if (selectedRole && appUser.role !== selectedRole) return null;

        return {
          id: appUser.id,
          email: credentials.email,
          name: appUser.name,
          role: appUser.role,
        } as never;
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
