'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { estudiantesService } from '@/lib/gateway-service';
import { User, Mail, Phone, Calendar, School, BookOpen, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/ui/button';
import Link from 'next/link';

interface EstudianteData {
  id: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  fechaNacimiento?: string;
  universidad?: string;
  carrera?: string;
  // Datos adicionales de la API
  id_estudiante?: number;
  nombre_estudiante?: string;
  apellido_estudiante?: string;
  correo_estudiante?: string;
  numero_celular?: string;
  es_universitario?: boolean;
  fecha_registro?: string;
  fecha_ultimo_acceso?: string;
  id_ciudad?: number;
  id_pais?: number;
}

export default function ConfiguracionPage() {
  const { user, logout } = useAuth();
  const [estudianteData, setEstudianteData] = useState<EstudianteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchEstudianteData = async () => {
      if (!user?.id) {
        console.log('🔍 No hay usuario o ID disponible');
        return;
      }
      
      setLoading(true);
      setError('');
        try {
        const estudianteId = user.id_estudiante?.toString() || user.id || '1';
        console.log('🔍 Obteniendo datos para estudiante ID:', estudianteId);
        console.log('🔍 Datos del usuario actual:', user);
        
        const response = await estudiantesService.obtenerPorIdDirecto(estudianteId, user.token);
        console.log('🔍 Respuesta de obtenerPorIdDirecto:', response);
        
        if (response.success && response.data) {
          setEstudianteData(response.data);
          console.log('✅ Datos del estudiante obtenidos:', response.data);
        } else {
          setError(`No se pudieron cargar los datos del estudiante. Status: ${response.status}`);
          console.error('❌ Error obteniendo datos del estudiante:', response);
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
        console.error('❌ Error al obtener datos del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudianteData();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver la configuración.</p>
          <Link href="/login">
            <Button className="bg-purple-600 text-white hover:bg-purple-700">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/learning/dashboard">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Configuración Temporal</h1>
          <p className="text-gray-600">Información del estudiante autenticado</p>
        </div>
      </div>

      {/* Estado de carga */}
      {loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Cargando información del estudiante...
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Datos del usuario autenticado */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-purple-600" />
            Datos de Autenticación
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Token</label>
              <div className="bg-gray-50 p-3 rounded text-sm font-mono break-all">
                {user.token ? `${user.token.substring(0, 20)}...` : 'No disponible'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">ID de Usuario</label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {user.id || 'No disponible'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Nombre (Auth)</label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {user.nombre_estudiante || user.nombre || 'No disponible'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Apellido (Auth)</label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {user.apellido_estudiante || user.apellido || 'No disponible'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-500">Correo (Auth)</label>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {user.correo_estudiante || user.correo || 'No disponible'}
              </div>
            </div>
          </div>
        </div>

        {/* Datos detallados del estudiante */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-600" />
            Datos del Estudiante (API)
          </h2>
          
          {estudianteData ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">ID Estudiante</label>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {estudianteData.id_estudiante || estudianteData.id || 'No disponible'}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Nombre Completo</label>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {`${estudianteData.nombre_estudiante || estudianteData.nombres || ''} ${estudianteData.apellido_estudiante || estudianteData.apellidos || ''}`.trim() || 'No disponible'}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Correo Electrónico</label>
                <div className="bg-gray-50 p-3 rounded text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  {estudianteData.correo_estudiante || estudianteData.correo || 'No disponible'}
                </div>
              </div>
              
              {(estudianteData.numero_celular || estudianteData.telefono) && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Teléfono</label>
                  <div className="bg-gray-50 p-3 rounded text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {estudianteData.numero_celular || estudianteData.telefono}
                  </div>
                </div>
              )}
              
              {estudianteData.es_universitario !== undefined && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Es Universitario</label>
                  <div className="bg-gray-50 p-3 rounded text-sm flex items-center gap-2">
                    <School className="h-4 w-4 text-gray-500" />
                    {estudianteData.es_universitario ? 'Sí' : 'No'}
                  </div>
                </div>
              )}
              
              {estudianteData.fecha_registro && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Fecha de Registro</label>
                  <div className="bg-gray-50 p-3 rounded text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {new Date(estudianteData.fecha_registro).toLocaleDateString('es-ES')}
                  </div>
                </div>
              )}
              
              {(estudianteData.id_ciudad || estudianteData.id_pais) && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Ubicación</label>
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    Ciudad ID: {estudianteData.id_ciudad || 'N/A'} | País ID: {estudianteData.id_pais || 'N/A'}
                  </div>
                </div>
              )}
            </div>
          ) : !loading && (
            <div className="text-gray-500 text-center py-8">
              No se pudieron cargar los datos detallados del estudiante
            </div>
          )}
        </div>
      </div>

      {/* JSON Raw Data para debugging */}
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5 text-purple-600" />
          Datos Raw (Debugging)
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Usuario Autenticado:</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-auto max-h-48">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Datos del Estudiante (API):</h3>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-xs overflow-auto max-h-48">
              {estudianteData ? JSON.stringify(estudianteData, null, 2) : 'null'}
            </pre>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex gap-4">
        <Link href="/auth/status">
          <Button variant="outline">Ver Estado de Auth</Button>
        </Link>
        <Link href="/test-estudiante">
          <Button variant="outline">Test API Estudiante</Button>
        </Link>
        <Button 
          onClick={logout} 
          variant="destructive"
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
