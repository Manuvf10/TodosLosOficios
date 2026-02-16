import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-primary text-white hover:bg-blue-700",
      outline: "border border-slate-300 bg-white hover:bg-slate-100",
      secondary: "bg-secondary text-white hover:bg-emerald-700",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, ...props }, ref) => (
  <button className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />
));
Button.displayName = "Button";
