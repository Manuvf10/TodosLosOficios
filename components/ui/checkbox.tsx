"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export function Checkbox(props: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root className="h-4 w-4 rounded border border-slate-400 data-[state=checked]:bg-primary data-[state=checked]:text-white" {...props}>
      <CheckboxPrimitive.Indicator><Check className="h-3 w-3" /></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
