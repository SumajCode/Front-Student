"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import Navigation from "./components/Navigation";
import UserMenu from "./components/UserMenu";
import MobileNavMenu from "./components/MobileNavMenu";

export default function Head() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Verificar si estamos en una ruta de aprendizaje
  const isLearningPath = pathname?.startsWith('/learning');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image 
              src="/file.svg" 
              width={32} 
              height={32} 
              alt="Logo" 
              className="transition-transform group-hover:scale-110" 
            />
          </div>
          <span className="font-bold text-purple-700 text-xl lg:text-2xl tracking-tight transition-colors group-hover:text-purple-600">
            SumajCode
          </span>
        </Link>

        {/* Navegación centrada - oculta en móvil */}
        <div className="hidden md:flex flex-1 justify-center">
          <Navigation loginData={user} isLearningPath={isLearningPath} />
        </div>

        {/* Menú de usuario o botón de login */}
        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu />
          ) : null}
          
          {/* Menú móvil para navegación */}
          <div className="md:hidden">
            <MobileNavMenu loginData={user} isLearningPath={isLearningPath} />
          </div>
        </div>
      </div>
    </header>
  );
}
