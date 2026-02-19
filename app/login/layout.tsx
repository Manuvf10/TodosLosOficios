import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso seguro | TodosLosOficios",
  description: "Inicia sesión para gestionar tus solicitudes y presupuestos de forma rápida y segura.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
export const dynamic = "force-dynamic";