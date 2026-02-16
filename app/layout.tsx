import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

export const metadata: Metadata = {
  title: "TodosLosOficios",
  description: "Marketplace de profesionales locales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl p-4">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
