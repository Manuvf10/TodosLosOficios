import Link from "next/link";
import { LayoutDashboard, UserRound, Briefcase, FileText } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/dashboard/cliente", label: "Cliente", icon: UserRound },
  { href: "/dashboard/profesional", label: "Profesional", icon: Briefcase },
  { href: "/dashboard/profesional/perfil", label: "Mi perfil", icon: FileText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid gap-4 lg:grid-cols-[240px_1fr]">
      <aside className="glass h-fit rounded-2xl p-3 lg:sticky lg:top-20">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Dashboard</p>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                <Icon className="h-4 w-4" />{link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div>{children}</div>
    </section>
  );
}
