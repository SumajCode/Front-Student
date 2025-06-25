"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, BookOpen } from "lucide-react";
import { Button } from "@/ui/button";

// Tipo compatible con ambos sistemas
type User = {
  id: string;
  token: string;
  nombre: string;
  apellido?: string;
  correo: string;
  telefono?: string;
} | null;

interface MobileNavMenuProps {
  loginData: User;
  isLearningPath?: boolean;
}

export default function MobileNavMenu({ loginData, isLearningPath = false }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón del menú móvil */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="h-10 w-10 hover:bg-purple-50"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </Button>

      {/* Overlay y menú deslizante */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={toggleMenu}
          />
          
          {/* Menú deslizante */}
          <div className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-2xl transform transition-transform">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Navegación</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="h-8 w-8 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              <Link
                href="/explore"
                onClick={toggleMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === "/explore" 
                    ? "text-purple-700 bg-purple-50 font-semibold shadow-sm" 
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                <Compass size={20} />
                <span>Explorar</span>
              </Link>
              
              <Link
                href="/learning/dashboard"
                onClick={toggleMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname.startsWith("/learning") 
                    ? "text-purple-700 bg-purple-50 font-semibold shadow-sm" 
                    : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
                }`}
              >
                <BookOpen size={20} />
                <span>Mis Cursos</span>
              </Link>
            </nav>

            {/* Información del usuario (si está logueado) */}
            {loginData && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-sm text-gray-600">
                  Hola, <span className="font-medium text-gray-900">{loginData.nombre}</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
