"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <SelectPrimitive.Item value={value} className="relative cursor-pointer rounded-lg px-8 py-2 text-sm text-cream outline-none hover:bg-white/10">
    <SelectPrimitive.ItemIndicator className="absolute left-2 top-2.5"><Check className="h-4 w-4" /></SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Trigger className="flex h-11 w-full items-center justify-between rounded-xl border border-sand/25 bg-cocoa/70 px-3 py-2 text-sm text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60">
      {children}
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="glass z-50 w-[var(--radix-select-trigger-width)] rounded-xl p-1">
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
