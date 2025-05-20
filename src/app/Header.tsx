import React from "react";
import Link from "next/link"; // Link para redirección
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white border-b-2 border-gray-100 shadow-md">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-500">
        <Link href="/">MiPlataformaCursos</Link>
      </h1>
      
      {/* Navegación */}
      <nav className="flex gap-8 text-gray-800 text-base">
        <Link href="/courses">Cursos</Link>
        <Link href="/resources">Recursos</Link>
      </nav>
      
      {/* Perfil y búsqueda */}
      <div className="flex gap-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="py-2 px-4 rounded-full border-2 border-blue-500 bg-gray-50 text-gray-800 w-52"
          />
        </div>
        <button className="bg-blue-500 text-white border-none rounded-full py-2 px-4 cursor-pointer flex items-center">
          <FaUserCircle className="mr-2" />
          Perfil
        </button>
      </div>
    </header>
  );
};

export default Header;
