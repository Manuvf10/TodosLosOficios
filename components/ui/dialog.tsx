"use client";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/30" />
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
