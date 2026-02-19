import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  professionalEmail: z.string().email(),
  clientEmail: z.string().email(),
  professionalName: z.string(),
  clientName: z.string(),
  message: z.string(),
});

export async function POST(req: Request) {
  const body = schema.safeParse(await req.json());
  if (!body.success) {
    return NextResponse.json({ message: "payload inválido" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  // Si no hay API key, NO rompemos build ni runtime: simplemente “skip”
  if (!apiKey) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: body.data.professionalEmail,
    subject: "Nuevo cliente interesado en Alicante",
    html: `<p>Hola ${body.data.professionalName},</p><p>Tienes un nuevo lead: ${body.data.message}</p><p>Cliente: ${body.data.clientName}</p>`,
  });

  await resend.emails.send({
    from,
    to: body.data.clientEmail,
    subject: "Hemos enviado tu solicitud al profesional",
    html: `<p>Hola ${body.data.clientName},</p><p>Tu solicitud fue enviada correctamente.</p><p>Mensaje: ${body.data.message}</p>`,
  });

  return NextResponse.json({ ok: true });
}
