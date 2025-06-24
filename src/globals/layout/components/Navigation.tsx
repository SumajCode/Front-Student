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
    <nav className="flex gap-8 justify-center">
      <Link
        href="/explore"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-700 hover:text-purple-700 hover:bg-purple-50 ${
          pathname === "/explore" ? "text-purple-700 font-semibold bg-purple-50" : ""
        }`}
      >
        <Compass size={20} />
        Explorar
      </Link>
      <Link
        href="/learning/dashboard"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-gray-700 hover:text-purple-700 hover:bg-purple-50 ${
          pathname.startsWith("/learning") ? "text-purple-700 font-semibold bg-purple-50" : ""
        }`}
      >
        <BookOpen size={20} />
        Mis Cursos
      </Link>
    </nav>
  );
}
