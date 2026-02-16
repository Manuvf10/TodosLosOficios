import { Professional, Review, Solicitud, SolicitudEstado } from "@/types";

export async function fetchCategorias(): Promise<string[]> {
  const res = await fetch("/api/categories");
  if (!res.ok) throw new Error("Error cargando categorías");
  return res.json();
}

export async function fetchProfesionales(params: Record<string, string>) {
  const url = new URL("/api/professionals", window.location.origin);
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Error cargando profesionales");
  return (await res.json()) as Professional[];
}

export async function fetchProfesionalById(id: string): Promise<Professional> {
  const res = await fetch(`/api/professionals/${id}`);
  if (!res.ok) throw new Error("No encontrado");
  return res.json();
}

export async function fetchReviews(professionalId: string): Promise<Review[]> {
  const res = await fetch(`/api/reviews?professionalId=${professionalId}`);
  if (!res.ok) throw new Error("Error cargando reseñas");
  return res.json();
}

export async function createSolicitud(payload: { professionalId: string; message: string; preferredDate?: string }) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo enviar la solicitud");
  return res.json();
}

export async function listSolicitudesCliente(): Promise<Solicitud[]> {
  const res = await fetch("/api/leads/client", { cache: "no-store" });
  if (!res.ok) throw new Error("Error cargando solicitudes");
  return res.json();
}

export async function listSolicitudesProfesional(): Promise<Solicitud[]> {
  const res = await fetch("/api/leads/pro", { cache: "no-store" });
  if (!res.ok) throw new Error("Error cargando solicitudes");
  return res.json();
}

export async function updateSolicitudEstado(id: string, estado: SolicitudEstado) {
  const res = await fetch(`/api/leads/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  if (!res.ok) throw new Error("No se pudo actualizar estado");
  return res.json();
}

export async function fetchMiPerfilProfesional() {
  const res = await fetch("/api/professionals/me", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar tu perfil");
  return res.json() as Promise<{ id: string; city: string; postalCode: string; category: string; baseRate: number; description: string }>;
}

export async function updateMiPerfilProfesional(payload: { description: string; baseRate: number; city: string }) {
  const res = await fetch("/api/professionals/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No se pudo guardar tu perfil");
  return res.json();
}
