"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => (
  <SelectPrimitive.Item value={value} className="cursor-pointer px-2 py-1 text-sm outline-none hover:bg-slate-100">
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Trigger className="flex w-full items-center justify-between rounded-md border border-slate-300 px-3 py-2 text-sm">
      {children}
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className="rounded-md border bg-white p-1 shadow">
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
