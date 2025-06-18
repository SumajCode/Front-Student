'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const token = localStorage.getItem('token');
    const estudiante = localStorage.getItem('estudiante');

    if (token && estudiante) {
      setUser({ token, ...JSON.parse(estudiante) });
    }
    setLoading(false);
  }, []);

  const login = async (correo, contrasenia) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasenia })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('estudiante', JSON.stringify(data.data.estudiante));
      
      setUser({ token: data.data.token, ...data.data.estudiante });
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('estudiante');
    setUser(null);
    router.push('/');
  };

  const updateProfile = async (profileData) => {
    try {
      if (!user?.token || !user?.id) {
        throw new Error('No hay sesión activa');
      }

      const response = await fetch(`/api/perfil?token=${user.token}&id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar perfil');
      }

      const updatedUser = { ...user, ...data.data };
      localStorage.setItem('estudiante', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}