import { Professional, Review, Solicitud, SolicitudEstado } from "@/types";
import { storage } from "@/lib/storage";

export async function fetchCategorias(): Promise<string[]> {
  const res = await fetch("/api/mock/categorias");
  if (!res.ok) throw new Error("Error cargando categorías");
  return res.json();
}

export async function fetchProfesionales(params: Record<string, string>) {
  const url = new URL("/api/mock/profesionales", window.location.origin);
  Object.entries(params).forEach(([k, v]) => v && url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Error cargando profesionales");
  return (await res.json()) as Professional[];
}

export async function fetchProfesionalById(id: string): Promise<Professional> {
  const res = await fetch(`/api/mock/profesionales/${id}`);
  if (!res.ok) throw new Error("No encontrado");
  return res.json();
}

export async function fetchReviews(profesionalId: string): Promise<Review[]> {
  const res = await fetch(`/api/mock/resenas?profesionalId=${profesionalId}`);
  if (!res.ok) throw new Error("Error cargando reseñas");
  return res.json();
}

export function createSolicitud(solicitud: Solicitud) { storage.createSolicitud(solicitud); }
export function listSolicitudesCliente(clientId: string) { return storage.listSolicitudes().filter((s) => s.clientId === clientId); }
export function listSolicitudesProfesional(professionalId: string) { return storage.listSolicitudes().filter((s) => s.professionalId === professionalId); }
export function updateSolicitudEstado(id: string, estado: SolicitudEstado) { storage.updateSolicitudEstado(id, estado); }
