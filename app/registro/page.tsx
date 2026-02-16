"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { storage } from "@/lib/storage";
import { signIn } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  category: z.string().optional(),
  baseRate: z.coerce.number().optional(),
  description: z.string().optional(),
  terms: z.boolean().refine((v) => v, { message: "Debes aceptar términos" }),
});

type FormValues = z.infer<typeof schema>;

export default function RegistroPage() {
  const params = useSearchParams();
  const router = useRouter();
  const role = (params.get("role") as "CLIENTE" | "PROFESIONAL") || "CLIENTE";
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { terms: false } });

  const onSubmit = async (v: FormValues) => {
    const id = `${role.toLowerCase()}-${Date.now()}`;
    storage.saveUser({ id, name: v.name, email: v.email, password: v.password, role, city: v.city, postalCode: v.postalCode });
    if (role === "PROFESIONAL") {
      storage.setProfessionalProfile({ id, name: v.name, email: v.email, password: v.password, role, city: v.city, postalCode: v.postalCode, category: v.category || "General", categories: [v.category || "General"], baseRate: v.baseRate || 30, description: v.description || "", verified: false, urgent: false, rating: 5, reviewsCount: 0, photo: "https://placehold.co/400x300", availability: ["Lun"], services: ["Servicio general"] });
    }
    const local = storage.listUsers().find((u) => u.email.toLowerCase() === v.email.toLowerCase()) ?? null;
    await signIn("credentials", { email: v.email, password: v.password, localUserJson: local ? JSON.stringify(local) : "", redirect: false });
    router.push("/dashboard");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass rounded-3xl p-6 md:p-8">
        <Badge className="mb-3">Registro {role}</Badge>
        <h1 className="text-3xl font-bold text-slate-100">Crea tu cuenta</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Datos personales</h2></div>
          <div><Label>Nombre</Label><Input {...register("name")} /></div>
          <div><Label>Email</Label><Input {...register("email")} /></div>
          <div><Label>Contraseña</Label><Input type="password" {...register("password")} /></div>
          <div><Label>Ciudad</Label><Input {...register("city")} /></div>
          <div><Label>Código postal</Label><Input {...register("postalCode")} /></div>

          {role === "PROFESIONAL" && (
            <>
              <div className="md:col-span-2 mt-2"><h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Perfil profesional</h2></div>
              <div><Label>Oficio</Label><Input {...register("category")} /></div>
              <div><Label>Tarifa base</Label><Input type="number" {...register("baseRate")} /></div>
              <div className="md:col-span-2"><Label>Descripción</Label><Input {...register("description")} /></div>
            </>
          )}

          <label className="md:col-span-2 mt-1 flex items-center gap-2 text-sm text-slate-300">
            <Checkbox checked={watch("terms")} onCheckedChange={(v) => setValue("terms", !!v)} />Acepto términos y política de privacidad
          </label>
          {errors.terms && <p className="md:col-span-2 text-sm text-red-300">{errors.terms.message}</p>}
          <Button className="md:col-span-2" size="lg">Crear cuenta</Button>
        </form>
      </div>
    </div>
  );
}
