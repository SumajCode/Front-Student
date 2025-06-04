import Header from "@/globals/layout/Head";
import "./globals.css";
import React from "react";
import Footer from "@/globals/layout/Footer";
import Link from "next/link";

export const metadata = {
  title: "Curso Interactivo",
  description: "Plataforma estilo Udemy con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {  return (
    <html lang="es">
      <body>
        <Header />
        {/* Menú móvil - solo visible en pantallas pequeñas */}
        <nav className="md:hidden">
          <Link href="/explorar">Explorar</Link>
          <Link href="/mi-aprendizaje">Mi aprendizaje</Link>
          <Link href="/estudiantes" className="ml-4">Estudiantes</Link>
        </nav>

        {/* Contenido principal */}
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
