"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, BookOpen } from "lucide-react";

// Tipo compatible con ambos sistemas
type User = {
  id: string;
  token: string;
  nombre: string;
  apellido?: string;
  correo: string;
  telefono?: string;
} | null;

interface NavigationProps {
  loginData: User;
  isLearningPath?: boolean;
}

export default function Navigation({ loginData, isLearningPath = false }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 lg:gap-2">
      <Link
        href="/explore"
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm lg:text-base group ${
          pathname === "/explore" 
            ? "text-purple-700 bg-purple-50 shadow-sm ring-1 ring-purple-200" 
            : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
        }`}
      >
        <Compass 
          size={18} 
          className={`transition-transform group-hover:scale-110 ${
            pathname === "/explore" ? "text-purple-600" : "text-gray-500"
          }`} 
        />
        <span>Explorar</span>
      </Link>
      
      <Link
        href="/learning/dashboard"
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm lg:text-base group ${
          pathname.startsWith("/learning") 
            ? "text-purple-700 bg-purple-50 shadow-sm ring-1 ring-purple-200" 
            : "text-gray-700 hover:text-purple-700 hover:bg-purple-50"
        }`}
      >
        <BookOpen 
          size={18} 
          className={`transition-transform group-hover:scale-110 ${
            pathname.startsWith("/learning") ? "text-purple-600" : "text-gray-500"
          }`} 
        />
        <span>Mis Cursos</span>
      </Link>
    </nav>
  );
}
