"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { storage } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const local = storage.listUsers().find((u) => u.email.toLowerCase() === values.email.toLowerCase()) ?? null;
    const res = await signIn("credentials", { ...values, localUserJson: local ? JSON.stringify(local) : "", redirect: false });
    if (res?.ok) router.push("/dashboard");
    else alert("Credenciales inválidas");
  };

  const googleEnabled = !!process.env.NEXT_PUBLIC_GOOGLE_ENABLED;

  return (
    <div className="mx-auto max-w-md">
      <div className="glass rounded-3xl p-6 md:p-8">
        <Badge className="mb-3">Acceso seguro</Badge>
        <h1 className="text-3xl font-bold text-cream">Bienvenido de nuevo</h1>
        <p className="mt-2 text-sm text-muted">Accede a tus solicitudes y gestiona tus presupuestos.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-terracotta">Introduce un email válido.</p>}
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && <p className="mt-1 text-sm text-terracotta">Mínimo 6 caracteres.</p>}
          </div>
          <Button disabled={isSubmitting} className="w-full" size="lg">Entrar</Button>
        </form>

        <Button variant="outline" className="mt-3 w-full" disabled={!googleEnabled} title={!googleEnabled ? "Google OAuth no configurado (placeholder)" : "Continuar con Google"}>Google (placeholder)</Button>
      </div>
    </div>
  );
}
