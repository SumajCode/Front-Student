import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./Header"; // Importar el Header
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiPlataformaCursos",
  description: "Cursos online dictados por expertos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Header importado */}
        <Header />

        {/* Contenido principal */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="text-center py-4 bg-gray-50 mt-8 text-gray-800">
          <p>&copy; 2025 MiPlataformaCursos</p>
        </footer>
      </body>
    </html>
  );
}
