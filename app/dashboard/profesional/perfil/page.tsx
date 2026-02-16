"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const schema = z.object({ description: z.string().min(10), baseRate: z.coerce.number().min(10), city: z.string().min(2) });

export default function PerfilProfesionalPage() {
  const { data } = useSession();
  const profile = storage.getProfessionalProfile(data?.user?.id || "");
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { description: profile?.description || "", baseRate: profile?.baseRate || 30, city: profile?.city || "" } });

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-3xl font-bold">Editar perfil profesional</h1>
      <form onSubmit={handleSubmit((v) => {
        if (!profile) return;
        storage.setProfessionalProfile({ ...profile, ...v });
        alert("Perfil guardado");
      })} className="space-y-3 rounded bg-white p-4">
        <div><Label>Descripción</Label><Input {...register("description")} /></div>
        <div><Label>Tarifa base</Label><Input type="number" {...register("baseRate")} /></div>
        <div><Label>Ciudad</Label><Input {...register("city")} /></div>
        <Button>Guardar cambios</Button>
      </form>
    </div>
  );
}
