'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/gateway-service';

type User = {
  id: string;
  token: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  // Propiedades adicionales de la API de estudiantes
  id_estudiante?: number;
  nombre_estudiante?: string;
  apellido_estudiante?: string;
  correo_estudiante?: string;
  numero_celular?: string;
  es_universitario?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (correo: string, contrasenia: string) => Promise<boolean>;
  loginWithExternalToken: (token: string, userData: any) => boolean;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<boolean>;
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
        console.log('Usuario autenticado:', parsedEstudiante);
      } catch (error) {
        console.error('Error parseando datos del estudiante:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('estudiante');
      }
    }
    setLoading(false);
  }, []);

  // Nueva función para login externo (desde Web Component)
  const loginWithExternalToken = (token: string, _userData: any): boolean => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('estudiante', JSON.stringify(_userData));
      setUser({ token, ..._userData });
      // window.location.reload(); // Eliminado para evitar bucles
      return true;
    } catch (error) {
      console.error('Error en login externo:', error);
      return false;
    }
  };  const login = async (_correo: string, _contrasenia: string): Promise<boolean> => {
    try {
      console.log('🔍 useAuth: Iniciando login con correo:', _correo);
      const response = await authService.login({ correo: _correo, contrasenia: _contrasenia });
      console.log('🔍 useAuth: Respuesta del authService:', response);

      if (response.success && response.data) {
        // La respuesta viene en el formato: { status, message, token, estudiante }
        const { token, estudiante } = response.data as any;
        console.log('🔍 useAuth: Datos extraídos - token:', token ? 'exists' : 'missing', 'estudiante:', estudiante);
        
        if (token && estudiante) {
          localStorage.setItem('token', token);
          localStorage.setItem('estudiante', JSON.stringify(estudiante));
          setUser({ token, ...estudiante });
            console.log('✅ useAuth: Login exitoso, redirigiendo al dashboard');
          // Redirigir al dashboard después del login exitoso
          router.push('/learning/dashboard');
          return true;
        } else {
          console.error('❌ useAuth: No se recibió token o datos del estudiante');
          throw new Error('No se recibió token de autenticación o datos del estudiante');
        }
      } else {
        console.error('❌ useAuth: Respuesta no exitosa:', response);
        throw new Error((response.data as any)?.message || 'Credenciales inválidas');
      }
    } catch (error: any) {
      console.error('❌ useAuth: Error en login:', error);
      
      // Extraer mensaje de error más específico
      const errorMessage = error.response?.data?.message || 
                          error.data?.message || 
                          error.message || 
                          'Error al iniciar sesión';
      
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('estudiante');
    setUser(null);
    // Redirigir al login externo con logged_out=true
    window.location.href = 'https://front-loginv1.vercel.app/?logged_out=true';
  };
  const updateProfile = async (_profileData: any): Promise<boolean> => {
    try {
      if (!user?.token || !user?.id) {
        throw new Error('No hay sesión activa');
      }

      // Por ahora, simplemente actualizamos localmente
      // Cuando tengamos la API de perfil lista, usaremos el gateway service
      const updatedUser = { ...user, ..._profileData };
      localStorage.setItem('estudiante', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  };  return React.createElement(
    AuthContext.Provider,
    { value: { user, loading, login, loginWithExternalToken, logout, updateProfile } },
    props.children
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
