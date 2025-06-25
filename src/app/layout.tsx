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

          {/* Contenido principal */}
          <main className="flex-grow w-full">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
