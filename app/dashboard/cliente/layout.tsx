"use client";
import { RoleGuard } from "@/components/common/role-guard";

export default function ClienteAreaLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard role="CLIENTE">{children}</RoleGuard>;
}
