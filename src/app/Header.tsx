import React from "react";
import Link from "next/link"; // Link para redirección
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #f1f1f1',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Logo */}
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0070f3' }}>
        <Link href="/">MiPlataformaCursos</Link>
      </h1>
      
      {/* Navegación */}
      <nav style={{ display: 'flex', gap: '2rem', color: '#333', fontSize: '1rem' }}>
        <Link href="/courses">Cursos</Link>  {/* Enlace a la página de Cursos */}
        <Link href="/resources">Recursos</Link>  {/* Enlace a la página de Recursos */}
      </nav>
      
      {/* Perfil y búsqueda */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar..."
            style={{
              padding: '0.5rem',
              borderRadius: '25px',
              border: '2px solid #0070f3',
              backgroundColor: '#f9fafb',
              color: '#333',
              width: '200px',
            }}
          />
        </div>
        <button style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}>
          <FaUserCircle style={{ marginRight: '0.5rem' }} />
          Perfil
        </button>
      </div>
    </header>
  );
};

export default Header;
