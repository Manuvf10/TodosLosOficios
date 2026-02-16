"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { data } = useSession();
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">TodosLosOficios</Link>
        <div className="flex gap-3">
          <Link href="/buscar">Buscar</Link>
          <Link href="/como-funciona">Cómo funciona</Link>
          {data?.user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>Salir</Button>
            </>
          ) : (
            <Link href="/login">Entrar</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
