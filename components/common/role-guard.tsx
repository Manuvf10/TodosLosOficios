"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Role } from "@/types";
import { useToast } from "@/components/common/toast-provider";

export function RoleGuard({ role, children }: { role: Role; children: React.ReactNode }) {
  const { data, status } = useSession();
  const router = useRouter();
  const { pushToast } = useToast();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (data.user.role !== role) {
      const target = data.user.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente";
      pushToast("Te llevamos a tu panel", "Esta sección está disponible para tu tipo de cuenta.");
      router.replace(target);
    }
  }, [data, role, router, status, pushToast]);

  if (status === "loading") return <div className="glass rounded-xl p-4 text-sm text-muted">Cargando tu panel...</div>;
  if (status === "authenticated" && data.user.role !== role) return null;

  return <>{children}</>;
}
