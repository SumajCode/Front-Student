import Header from "@/globals/layout/Head";
import "./globals.css";
import React from "react";
import Footer from "@/globals/layout/Footer";
import Link from "next/link";
import { Toaster } from "sonner";
import { AuthProvider } from "@/modules/auth/hooks/useAuth";

export const metadata = {
  title: "Curso Interactivo",
  description: "Plataforma estilo Udemy con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <AuthProvider>
          <Header />
          <Toaster position="top-right" richColors />

          {/* Menú móvil - solo visible en pantallas pequeñas */}
          <nav className="md:hidden bg-white border-b p-3 sticky top-0 z-10">
            <div className="container mx-auto flex justify-center space-x-6">
              <Link
                href="/explore"
                className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Explorar
              </Link>
              <Link
                href="/learning/dashboard"
                className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Mi aprendizaje
              </Link>
            </div>
          </nav>

          {/* Contenido principal */}
          <main className="flex-grow w-full">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
