import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar profesionales | TodosLosOficios",
  description: "Filtra por ciudad, oficio y distancia para encontrar profesionales fiables y solicitar presupuesto sin compromiso.",
};

export default function BuscarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
