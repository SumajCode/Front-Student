"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import Navigation from "./components/Navigation";
import UserMenu from "./components/UserMenu";
import MobileMenu from "./components/MobileMenu";

export default function Head() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Verificar si estamos en una ruta de aprendizaje
  const isLearningPath = pathname?.startsWith('/learning');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        {/* Logo a la izquierda */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/file.svg" width={28} height={28} alt="Logo" />
          <span className="font-bold text-purple-700 text-xl">SumajCode</span>
        </Link>

        {/* Navegación centrada */}
        <div className="flex-1 flex justify-center">
          <Navigation loginData={user} isLearningPath={isLearningPath} />
        </div>        {/* Menú de usuario o botón de login temporal */}
        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-2">
              {/* Comentado temporalmente hasta que llegue el Web Component externo */}
              {/* <Button
                onClick={() => window.open('http://localhost:3001/login', '_blank')}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Iniciar sesión (Externo)
              </Button> */}
              {/* Login temporal usando API real de estudiantes */}
              <Link href="/login">
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Iniciar sesión
                </Button>
              </Link>
              
              <Link 
                href="/test-login"
                className="text-sm text-gray-600 hover:text-purple-700 underline"
              >
                Test Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
