import { cityCoordinates } from "@/data/geo";

const toRad = (v: number) => (v * Math.PI) / 180;

function findPoint(value: string) {
  const q = value.toLowerCase();
  return cityCoordinates.find(
    (c) => c.city.toLowerCase() === q || c.postalCode.toLowerCase() === q,
  );
}

export function distanciaKm(origen: string, destino: string): number {
  const a = findPoint(origen);
  const b = findPoint(destino);
  if (!a || !b) return 999;

  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return Number((R * y).toFixed(1));
}
