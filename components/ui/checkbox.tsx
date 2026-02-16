"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export function Checkbox(props: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root className="h-4 w-4 rounded border border-white/40 bg-slate-900 data-[state=checked]:border-cyan-300 data-[state=checked]:bg-cyan-400 data-[state=checked]:text-slate-950" {...props}>
      <CheckboxPrimitive.Indicator>
        <Check className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
