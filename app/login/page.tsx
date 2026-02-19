"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/types";

import { useToast } from "@/components/common/toast-provider";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });
const ROLE_KEY = "tlo_login_role";

function RoleCard({ role, selected, onSelect }: { role: Role; selected: boolean; onSelect: (role: Role) => void }) {
  const copy = role === "CLIENTE" ? "Quiero solicitar presupuestos y comparar profesionales." : "Quiero recibir solicitudes y gestionar mis leads.";
  return (
    <button type="button" onClick={() => onSelect(role)} className={`glass w-full rounded-xl p-4 text-left transition hover:-translate-y-0.5 ${selected ? "ring-2 ring-amber/60" : ""}`}>
      <p className="font-semibold text-cream">Soy {role === "CLIENTE" ? "cliente" : "profesional"}</p>
      <p className="mt-1 text-xs text-muted">{copy}</p>
    </button>
  );
}


export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { pushToast } = useToast();
  const [selectedRole, setSelectedRole] = useState<Role>("CLIENTE");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const googleEnabled = !!process.env.NEXT_PUBLIC_GOOGLE_ENABLED;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const queryRole = params.get("role");
    if (queryRole === "CLIENTE" || queryRole === "PROFESIONAL") {
      setSelectedRole(queryRole);
      localStorage.setItem(ROLE_KEY, queryRole);
      return;
    }
    const remembered = localStorage.getItem(ROLE_KEY);
    if (remembered === "CLIENTE" || remembered === "PROFESIONAL") setSelectedRole(remembered);
  }, [params]);

  const callbackUrl = useMemo(() => params.get("callbackUrl"), [params]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setErrorMsg(null);

    const roleRes = await fetch(`/api/auth/role?email=${encodeURIComponent(values.email)}`);
    const roleJson = await roleRes.json();
    if (roleJson.role && roleJson.role !== selectedRole) {
      setErrorMsg(`Esta cuenta es de ${roleJson.role === "PROFESIONAL" ? "Profesional" : "Cliente"}. Cambia el tipo de acceso o usa otra cuenta.`);
      return;
    }

    localStorage.setItem(ROLE_KEY, selectedRole);

    const res = await signIn("credentials", {
      ...values,
      selectedRole,
      redirect: false,
    });

    if (!res?.ok) {
      setErrorMsg("No se pudo iniciar sesión. Revisa tus datos e inténtalo de nuevo.");
      return;
    }

    pushToast("Sesión iniciada", selectedRole === "CLIENTE" ? "Te llevamos a tu panel de cliente." : "Te llevamos a tu panel profesional.");
    if (callbackUrl) router.push(callbackUrl);
    else router.push(selectedRole === "CLIENTE" ? "/dashboard/cliente" : "/dashboard/profesional");
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass rounded-3xl p-6 md:p-8">
        <Badge className="mb-3">Acceso seguro</Badge>
        <h1>Entrar en tu cuenta</h1>
        <p className="mt-2 text-sm text-muted">Elige tu tipo de cuenta para llevarte al panel correcto. No enviamos spam (demo).</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <RoleCard role="CLIENTE" selected={selectedRole === "CLIENTE"} onSelect={setSelectedRole} />
          <RoleCard role="PROFESIONAL" selected={selectedRole === "PROFESIONAL"} onSelect={setSelectedRole} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-terracotta">Introduce un correo válido.</p>}
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" autoComplete="current-password" type="password" {...register("password")} />
            {errors.password && <p className="mt-1 text-sm text-terracotta">La contraseña debe tener al menos 6 caracteres.</p>}
          </div>

          {errorMsg && <p className="rounded-lg border border-terracotta/40 bg-terracotta/10 px-3 py-2 text-sm text-terracotta">{errorMsg}</p>}

          <Button disabled={isSubmitting} className="w-full" size="lg">Entrar como {selectedRole === "CLIENTE" ? "cliente" : "profesional"}</Button>
        </form>

        <Button variant="outline" className="mt-3 w-full" title={googleEnabled ? "El rol se elegirá después de autenticar" : "Google OAuth no configurado"} disabled={!googleEnabled}>
          Continuar con Google (rol se elegirá luego)
        </Button>

        <p className="mt-3 text-center text-xs text-muted">¿Aún no tienes cuenta? <Link className="text-amber underline" href={`/registro?role=${selectedRole}`}>Crear cuenta {selectedRole === "CLIENTE" ? "de cliente" : "profesional"}</Link></p>
      </div>
    </div>
  );
}
