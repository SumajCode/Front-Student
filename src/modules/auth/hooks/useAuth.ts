'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '@/lib/api-service';
import { API_ROUTES } from '@/lib/api-config';
import type { LoginDto, PerfilDto } from '@/lib/api-config';
import { validateLoginResponse, validatePerfilResponse } from '@/lib/validations';

type User = {
  id: string;
  token: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (correo: string, contrasenia: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: PerfilDto) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const estudiante = localStorage.getItem('estudiante');

    if (token && estudiante) {
      try {
        const parsedEstudiante = JSON.parse(estudiante);
        setUser({ token, ...parsedEstudiante });
      } catch (error) {
        console.error('Error parseando datos del estudiante:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('estudiante');
      }
    }
    setLoading(false);
  }, []);

  const login = async (correo: string, contrasenia: string): Promise<boolean> => {
    try {
      const response = await apiRequest(API_ROUTES.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ correo, contrasenia } as LoginDto)
      });

      if (!validateLoginResponse(response)) {
        throw new Error('Respuesta inválida del servidor');
      }

      const { token, estudiante } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('estudiante', JSON.stringify(estudiante));
      setUser({ token, ...estudiante });

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

  const updateProfile = async (profileData: PerfilDto): Promise<boolean> => {
    try {
      if (!user?.token || !user?.id) {
        throw new Error('No hay sesión activa');
      }

      const response = await apiRequest(`${API_ROUTES.AUTH.PERFIL}?token=${user.token}&id=${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });

      if (!validatePerfilResponse(response)) {
        throw new Error('Respuesta inválida del servidor');
      }

      const updatedUser = { ...user, ...response.data };
      localStorage.setItem('estudiante', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };

  return React.createElement(AuthContext.Provider, {
    value: { user, loading, login, logout, updateProfile },
    children: props.children
  });
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
