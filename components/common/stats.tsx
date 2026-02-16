const stats = [
  { label: "Profesionales activos", value: "+30" },
  { label: "Valoración promedio", value: "4.8⭐" },
  { label: "Solicitudes enviadas", value: "+1.2K" },
  { label: "Tasa de respuesta", value: "92%" },
];

export function Stats() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => (
        <article key={item.label} className="glass rounded-2xl p-4">
          <p className="text-2xl font-bold text-amber">{item.value}</p>
          <p className="text-sm text-muted">{item.label}</p>
        </article>
      ))}
    </section>
  );
}
