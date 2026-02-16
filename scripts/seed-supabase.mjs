import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !serviceKey) {
  console.error("Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY/SUPABASE_SECRET_KEY");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

const categories = ["Fontanería", "Electricidad", "Jardinería", "Pintura", "Carpintería", "Limpieza"];
const cities = [
  { city: "Alicante", postal: "03001" },
  { city: "Alicante", postal: "03002" },
  { city: "Alicante", postal: "03003" },
  { city: "Alicante", postal: "03004" },
  { city: "Elche", postal: "03201" },
  { city: "San Vicente del Raspeig", postal: "03690" },
  { city: "Madrid", postal: "28001" },
  { city: "Valencia", postal: "46001" },
  { city: "Murcia", postal: "30001" },
  { city: "Castellón", postal: "12001" },
];

const firstNames = ["Carlos", "Lucía", "Miguel", "Sofía", "Javier", "Elena", "Rubén", "Paula", "Andrés", "Marta"];
const lastNames = ["García", "López", "Martín", "Sánchez", "Fernández", "Ruiz", "Navarro", "Ortega", "Vidal", "Pascual"];

function buildPros(total = 30) {
  return Array.from({ length: total }).map((_, i) => {
    const cityObj = cities[i % cities.length];
    const catA = categories[i % categories.length];
    const catB = categories[(i + 1) % categories.length];
    const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
    return {
      email: `pro${String(i + 1).padStart(3, "0")}@todoslosoficios.demo`,
      password: "DemoPass123!",
      name,
      city: cityObj.city,
      postalCode: cityObj.postal,
      categories: [catA, catB],
      basePrice: 30 + i,
      bio: `Profesional de ${catA.toLowerCase()} en ${cityObj.city}. Presupuestos claros y respuesta rápida.`,
      verified: i % 2 === 0,
      emergency: i % 3 === 0,
      availability: i % 2 === 0 ? ["Lun", "Mar", "Mie", "Jue", "Vie"] : ["Sab", "Dom"],
      photo: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,
    };
  });
}

async function upsertPublicUser(userId, name) {
  const { error } = await supabase.from("users").upsert(
    {
      id: userId,
      role: "PROFESIONAL",
      name,
      pro_plan: "FREE",
    },
    { onConflict: "id" },
  );
  if (error) throw error;
}

async function upsertProfile(userId, p) {
  const { error } = await supabase.from("professional_profiles").upsert(
    {
      user_id: userId,
      city: p.city,
      postal_code: p.postalCode,
      categories: p.categories,
      base_price: p.basePrice,
      bio: p.bio,
      photo_url: p.photo,
      verified: p.verified,
      emergency: p.emergency,
      availability: p.availability,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}

async function createOrGetAuthUser(email, password, name) {
  const listed = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const existing = listed.data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (existing) return existing;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });
  if (error || !data.user) throw error || new Error("No se pudo crear usuario auth");
  return data.user;
}

async function main() {
  const pros = buildPros(30);
  console.log(`Seeding ${pros.length} profesionales demo...`);

  for (const p of pros) {
    const authUser = await createOrGetAuthUser(p.email, p.password, p.name);
    await upsertPublicUser(authUser.id, p.name);
    await upsertProfile(authUser.id, p);
    console.log(`✔ ${p.email} (${p.city})`);
  }

  console.log("Seed completado.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
