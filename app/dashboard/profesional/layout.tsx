"use client";
import { RoleGuard } from "@/components/common/role-guard";

export default function ProfesionalAreaLayout({ children }: { children: React.ReactNode }) {
  return <RoleGuard role="PROFESIONAL">{children}</RoleGuard>;
}
