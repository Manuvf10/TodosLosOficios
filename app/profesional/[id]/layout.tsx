import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil profesional | TodosLosOficios",
  description: "Consulta servicios, zona de trabajo y reseñas antes de solicitar tu presupuesto.",
};

export default function ProfesionalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
