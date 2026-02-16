import { AppUser, Professional, Solicitud, SolicitudEstado } from "@/types";

const K = {
  users: "tlo_users",
  solicitudes: "tlo_solicitudes",
  profiles: "tlo_prof_profiles",
};

const safe = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};

const set = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const storage = {
  listUsers: () => safe<AppUser[]>(K.users, []),
  saveUser: (user: AppUser) => {
    const users = storage.listUsers();
    set(K.users, [...users.filter((u) => u.email !== user.email), user]);
  },
  listSolicitudes: () => safe<Solicitud[]>(K.solicitudes, []),
  createSolicitud: (sol: Solicitud) => set(K.solicitudes, [sol, ...storage.listSolicitudes()]),
  updateSolicitudEstado: (id: string, estado: SolicitudEstado) => {
    const rows = storage.listSolicitudes().map((s) => (s.id === id ? { ...s, estado } : s));
    set(K.solicitudes, rows);
  },
  setProfessionalProfile: (profile: Professional) => {
    const rows = safe<Professional[]>(K.profiles, []);
    set(K.profiles, [...rows.filter((p) => p.id !== profile.id), profile]);
  },
  getProfessionalProfile: (id: string) => safe<Professional[]>(K.profiles, []).find((p) => p.id === id),
};
