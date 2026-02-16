const stats = [
  { label: "Profesionales activos", value: "+30" },
  { label: "Valoración media", value: "4,8/5" },
  { label: "Solicitudes gestionadas", value: "+1.200" },
  { label: "Tiempo medio de respuesta", value: "< 2 horas" },
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
