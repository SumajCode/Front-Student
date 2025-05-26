import Header from "@/globals/layout/Head";
import "./globals.css";
import React from "react";
import Footer from "@/globals/layout/Footer";

export const metadata = {
  title: "Curso Interactivo",
  description: "Plataforma estilo Udemy con Next.js",
  icons: {
    icon: "/favicon.ico", // ✅ Esto carga tu favicon desde /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main className="min-h-screen py-8 px-4 md:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
