'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente para manejar autenticación externa con token en query string
 * Se ejecuta cuando el usuario es redirigido desde el Web Component de login
 */
export function ExternalAuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithExternalToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = searchParams.get('user');
    const redirectTo = searchParams.get('redirect') || '/learning/dashboard';

    if (token) {
      try {
        console.log('Token recibido desde Web Component:', token);
        
        let parsedUserData;
        
        // Si hay datos del usuario, procesarlos
        if (userData) {
          try {
            // Intentar decodificar los datos del usuario
            parsedUserData = JSON.parse(decodeURIComponent(userData));
            console.log('Datos del usuario recibidos:', parsedUserData);
          } catch (error) {
            console.warn('Error parseando datos del usuario:', error);
            // Si no se pueden parsear, crear un objeto básico
            parsedUserData = { 
              id: 'external_user', 
              nombre: 'Usuario Externo', 
              correo: 'usuario@ejemplo.com' 
            };
          }
        } else {
          // Si no hay datos del usuario, crear un objeto básico
          parsedUserData = { 
            id: 'external_user', 
            nombre: 'Usuario Externo', 
            correo: 'usuario@ejemplo.com' 
          };
        }

        // Usar el contexto de autenticación para hacer login
        const success = loginWithExternalToken(token, parsedUserData);
        
        if (success) {
          // Limpiar la URL de los parámetros de autenticación
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, '', cleanUrl);

          // El contexto ya se encarga del redirect, pero por si acaso
          setTimeout(() => {
            router.push(redirectTo);
          }, 100);
        } else {
          throw new Error('Falló el login con token externo');
        }
        
      } catch (error) {
        console.error('Error procesando autenticación externa:', error);
        
        // En caso de error, redirigir al home
        router.push('/');
      }
    } else {
      // Si no hay token, redirigir al home
      console.warn('No se recibió token en la URL');
      router.push('/');
    }
  }, [searchParams, router, loginWithExternalToken]);

  return null; // Este componente no renderiza nada visible
}
