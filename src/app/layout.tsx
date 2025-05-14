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
        <footer style={{
          textAlign: 'center',
          padding: '1rem 0',
          backgroundColor: '#f9fafb',
          marginTop: '2rem',
          color: '#333',
        }}>
          <p>&copy; 2025 MiPlataformaCursos</p>
        </footer>
      </body>
    </html>
  );
}
