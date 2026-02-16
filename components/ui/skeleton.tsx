export function Skeleton({ className = "h-4 w-full" }: { className?: string }) {
  return (
    <div
      className={`rounded-xl bg-gradient-to-r from-white/5 via-white/20 to-white/5 bg-[length:200%_100%] animate-[pulse_1.8s_ease-in-out_infinite] ${className}`}
    />
  );
}
