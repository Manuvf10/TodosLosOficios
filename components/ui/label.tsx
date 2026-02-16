import * as LabelPrimitive from "@radix-ui/react-label";

export function Label(props: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root className="mb-1 block text-sm font-medium" {...props} />;
}
