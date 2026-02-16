import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-sand/25 bg-white/10 px-2.5 py-1 text-xs font-semibold text-cream", className)} {...props} />;
}
