import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta | TodosLosOficios",
  description: "Regístrate como cliente o profesional y empieza a gestionar solicitudes en minutos.",
};

export default function RegistroLayout({ children }: { children: React.ReactNode }) {
  return children;
}
