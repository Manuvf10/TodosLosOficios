"use client";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export function Checkbox(props: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root className="h-4 w-4 rounded border border-sand/40 bg-cocoa data-[state=checked]:border-amber data-[state=checked]:bg-copper data-[state=checked]:text-cream" {...props}>
      <CheckboxPrimitive.Indicator><Check className="h-3 w-3" /></CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
