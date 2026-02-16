export type Role = "CLIENTE" | "PROFESIONAL";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  city: string;
  postalCode: string;
}

export interface Professional extends AppUser {
  category: string;
  categories: string[];
  baseRate: number;
  description: string;
  verified: boolean;
  urgent: boolean;
  rating: number;
  reviewsCount: number;
  photo: string;
  availability: string[];
  services: string[];
}

export interface Review {
  id: string;
  professionalId: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

export type SolicitudEstado = "enviado" | "aceptado" | "rechazado";

export interface Solicitud {
  id: string;
  professionalId: string;
  professionalName: string;
  clientId: string;
  clientName: string;
  message: string;
  preferredDate: string;
  createdAt: string;
  estado: SolicitudEstado;
}
