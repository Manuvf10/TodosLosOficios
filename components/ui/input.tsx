import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    className={cn(
      "h-11 w-full rounded-xl border border-sand/25 bg-cocoa/70 px-3 py-2 text-sm text-cream placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
