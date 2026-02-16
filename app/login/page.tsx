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

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const local = storage.listUsers().find((u) => u.email.toLowerCase() === values.email.toLowerCase()) ?? null;
    const res = await signIn("credentials", {
      ...values,
      localUserJson: local ? JSON.stringify(local) : "",
      redirect: false,
    });

    if (res?.ok) router.push("/dashboard");
    else alert("Credenciales inválidas");
  };

  const googleEnabled = !!process.env.NEXT_PUBLIC_GOOGLE_ENABLED;

  return (
    <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Iniciar sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-600">Email inválido</p>}
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>
        <Button disabled={isSubmitting} className="w-full">
          Entrar
        </Button>
      </form>
      <Button
        variant="outline"
        className="mt-3 w-full"
        disabled={!googleEnabled}
        title={!googleEnabled ? "Configura GOOGLE_CLIENT_ID/SECRET" : "Continuar con Google"}
      >
        Google (placeholder)
      </Button>
    </div>
  );
}
