import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15",
        className,
      )}
      {...props}
    />
  );
}
