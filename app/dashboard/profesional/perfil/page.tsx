"use client";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMiPerfilProfesional, updateMiPerfilProfesional } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/common/toast-provider";

const schema = z.object({ description: z.string().min(10), baseRate: z.coerce.number().min(10), city: z.string().min(2) });

type FormValues = z.infer<typeof schema>;

export default function PerfilProfesionalPage() {
  const { pushToast } = useToast();
  const queryClient = useQueryClient();
  const initialized = useRef(false);
  const { data: profile, isLoading } = useQuery({ queryKey: ["mi-perfil"], queryFn: fetchMiPerfilProfesional });

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: "", baseRate: 30, city: "" },
  });

  useEffect(() => {
    if (!profile || initialized.current) return;
    reset({
      description: profile.description || "",
      baseRate: profile.baseRate || 30,
      city: profile.city || "",
    });
    initialized.current = true;
  }, [profile, reset]);

  const mutation = useMutation({
    mutationFn: updateMiPerfilProfesional,
    onSuccess: async () => {
      pushToast("Perfil actualizado", "Tu perfil ya está listo para recibir más solicitudes.");
      await queryClient.invalidateQueries({ queryKey: ["mi-perfil"] });
    },
  });

  if (isLoading) return <Card className="text-sm text-muted">Cargando tu perfil profesional...</Card>;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <Card>
        <h1 className="mb-4 text-2xl font-bold text-cream">Editar perfil profesional</h1>
        <form onSubmit={handleSubmit(async (v) => mutation.mutateAsync(v))} className="space-y-3">
          <div><Label>Descripción</Label><Input {...register("description")} /></div>
          <div><Label>Tarifa base</Label><Input type="number" {...register("baseRate")} /></div>
          <div><Label>Ciudad</Label><Input {...register("city")} /></div>
          <Button disabled={isSubmitting || mutation.isPending}>Guardar cambios</Button>
        </form>
      </Card>
      <Card>
        <h2 className="mb-2 text-lg font-semibold text-cream">Preview</h2>
        <p className="text-sm text-muted">Así verán tu perfil los clientes. Mantén descripción clara, servicios concretos y tarifa orientativa actualizada.</p>
      </Card>
    </div>
  );
}
