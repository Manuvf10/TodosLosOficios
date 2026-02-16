import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { AmbientBackground } from "@/components/common/ambient-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TodosLosOficios",
  description: "Marketplace local para encontrar profesionales fiables y solicitar presupuestos sin compromiso.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} noise`}>
        <AmbientBackground />
        <Providers>
          <Navbar />
          <main className="app-shell py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
