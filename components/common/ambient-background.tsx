export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="animate-drift absolute -left-16 top-8 h-80 w-80 rounded-full bg-copper/20 blur-3xl" />
      <div className="animate-drift absolute right-0 top-1/3 h-96 w-96 rounded-full bg-amber/15 blur-3xl [animation-delay:2s]" />
      <div className="animate-drift absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-terracotta/20 blur-3xl [animation-delay:4s]" />
    </div>
  );
}
