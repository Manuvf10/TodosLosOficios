"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schema = z.object({ description: z.string().min(10), baseRate: z.coerce.number().min(10), city: z.string().min(2) });

export default function PerfilProfesionalPage() {
  const { data } = useSession();
  const profile = storage.getProfessionalProfile(data?.user?.id || "");
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { description: profile?.description || "", baseRate: profile?.baseRate || 30, city: profile?.city || "" } });

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <Card>
        <h1 className="mb-4 text-2xl font-bold text-cream">Editar perfil profesional</h1>
        <form onSubmit={handleSubmit((v) => { if (!profile) return; storage.setProfessionalProfile({ ...profile, ...v }); alert("Perfil guardado"); })} className="space-y-3">
          <div><Label>Descripción</Label><Input {...register("description")} /></div>
          <div><Label>Tarifa base</Label><Input type="number" {...register("baseRate")} /></div>
          <div><Label>Ciudad</Label><Input {...register("city")} /></div>
          <Button>Guardar cambios</Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-2 text-lg font-semibold text-cream">Preview</h2>
        <p className="text-sm text-muted">Así verán tu perfil los clientes. Mantén descripción clara y precio competitivo.</p>
      </Card>
    </div>
  );
}
