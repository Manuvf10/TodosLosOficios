"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string().min(2), email: z.string().email(), password: z.string().min(6), city: z.string().min(2), postalCode: z.string().min(4),
  category: z.string().optional(), baseRate: z.coerce.number().optional(), description: z.string().optional(),
  terms: z.boolean().refine((v) => v, { message: "Debes aceptar términos" }),
});

type FormValues = z.infer<typeof schema>;




export default function RegistroPage() {
  const params = useSearchParams();
  const router = useRouter();
  const role = (params.get("role") as "CLIENTE" | "PROFESIONAL") || "CLIENTE";
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { terms: false } });

  const onSubmit = async (v: FormValues) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, role }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({ message: "No se pudo registrar" }));
      alert(body.message || "No se pudo registrar");
      return;
    }

    await signIn("credentials", { email: v.email, password: v.password, selectedRole: role, redirect: false });
    router.push(role === "PROFESIONAL" ? "/dashboard/profesional" : "/dashboard/cliente");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass rounded-3xl p-6 md:p-8">
        <Badge className="mb-3">Registro {role}</Badge>
        <h1>{role === "CLIENTE" ? "Solicita presupuestos en minutos" : "Recibe solicitudes de clientes de tu zona"}</h1>
        <p className="mt-2 text-sm text-muted">{role === "CLIENTE" ? "Crea tu cuenta para guardar búsquedas y seguir tus solicitudes." : "Publica tu perfil, recibe leads y gestiona tu bandeja desde un panel sencillo."}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><h2 className="mb-2 text-base font-semibold text-cream">Datos de acceso</h2></div>
          <div><Label>Nombre</Label><Input {...register("name")} /></div>
          <div><Label>Correo electrónico</Label><Input {...register("email")} /></div>
          <div><Label>Contraseña</Label><Input type="password" {...register("password")} /></div>
          <div><Label>Ciudad</Label><Input {...register("city")} /></div>
          <div><Label>Código postal</Label><Input {...register("postalCode")} /></div>

          {role === "PROFESIONAL" && <>
            <div className="md:col-span-2 mt-2"><h2 className="mb-2 text-base font-semibold text-cream">Perfil profesional</h2></div>
            <div><Label>Oficio principal</Label><Input {...register("category")} /></div>
            <div><Label>Tarifa base estimada</Label><Input type="number" {...register("baseRate")} /></div>
            <div className="md:col-span-2"><Label>Descripción de tu servicio</Label><Input {...register("description")} placeholder="Ej: instalaciones eléctricas, averías y mantenimiento" /></div>
          </>}

          <label className="md:col-span-2 mt-1 flex items-center gap-2 text-sm text-muted"><Checkbox checked={watch("terms")} onCheckedChange={(v) => setValue("terms", !!v)} />Acepto los términos de uso y la política de privacidad (demo).</label>
          {errors.terms && <p className="md:col-span-2 text-sm text-terracotta">{errors.terms.message}</p>}
          <Button disabled={isSubmitting} className="md:col-span-2" size="lg">Crear cuenta y continuar</Button>
        </form>
      </div>
    </div>
  );
}
