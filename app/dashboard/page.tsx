"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardIndex() {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data?.user) return;
    router.replace(data.user.role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  }, [data, router]);

  return <div className="glass rounded-2xl p-6 text-muted">Redirigiendo a tu panel...</div>;
}
