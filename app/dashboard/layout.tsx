import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border bg-white p-4">
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/dashboard" className="text-primary underline-offset-2 hover:underline">Inicio dashboard</Link>
          <Link href="/dashboard/cliente" className="text-primary underline-offset-2 hover:underline">Vista cliente</Link>
          <Link href="/dashboard/profesional" className="text-primary underline-offset-2 hover:underline">Vista profesional</Link>
          <Link href="/dashboard/profesional/perfil" className="text-primary underline-offset-2 hover:underline">Editar perfil</Link>
        </nav>
      </div>
      {children}
    </section>
  );
}
