'use client';

import { useState, useEffect } from 'react';

interface Estudiante {
  id_estudiante: number;
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
  es_universitario: boolean;
  fecha_nacimiento: string | null;
  fecha_registro: string;
  fecha_ultimo_acceso: string | null;
  id_ciudad: number;
  id_pais: number;
  numero_celular: string | null;
}


export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarEstudiantes();
  }, []);
  const cargarEstudiantes = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Iniciando carga de estudiantes...');
      const response = await fetch('/api/estudiantes', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Status de la respuesta:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers));

      const responseText = await response.text();
      console.log('Respuesta raw:', responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Error al parsear JSON:', e);
        throw new Error('Error al procesar la respuesta del servidor');
      }

      console.log('Respuesta parseada:', result);

      if (!response.ok) {
        throw new Error(result.message || `Error ${response.status}: ${result.status || 'Error desconocido'}`);
      }

      if (!result.success) {
        throw new Error(result.message || 'Error al cargar los estudiantes');
      }

      setEstudiantes(result.data || []);
    } catch (error) {
      console.error('Error completo:', error);
      const message = error instanceof Error 
        ? `Error al cargar estudiantes: ${error.message}`
        : 'Error desconocido al cargar estudiantes';
      setError(message);
      setEstudiantes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Lista de Estudiantes</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={cargarEstudiantes}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Intentar nuevamente
          </button>
        </div>
      ) : estudiantes.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No hay estudiantes registrados
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {estudiantes.map((estudiante) => (
            <div
              key={estudiante.id_estudiante}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {estudiante.nombre_estudiante} {estudiante.apellido_estudiante}
              </h2>
              <p className="text-gray-600 mt-2">{estudiante.correo_estudiante}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Registrado: {new Date(estudiante.fecha_registro).toLocaleDateString()}</p>
                {estudiante.es_universitario && (
                  <p className="mt-1">
                    <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded">
                      Universitario
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

