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

  return <p>Redirigiendo...</p>;
}
