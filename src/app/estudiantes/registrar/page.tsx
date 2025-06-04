'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { estudiantesService, type EstudianteInput } from '@/services/estudiantes';

export default function RegistrarEstudiantePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<EstudianteInput>({
    nombre_estudiante: '',
    apellido_estudiante: '',
    correo_estudiante: '',
    contrasenia: '',
    fecha_nacimiento: '',
    numero_celular: '',
    id_pais: 1,
    id_ciudad: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await estudiantesService.registrarEstudiante(formData);
      router.push('/estudiantes');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al registrar estudiante');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Registrar Estudiante</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre_estudiante">
              Nombre
            </label>
            <input
              type="text"
              id="nombre_estudiante"
              name="nombre_estudiante"
              value={formData.nombre_estudiante}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido_estudiante">
              Apellido
            </label>
            <input
              type="text"
              id="apellido_estudiante"
              name="apellido_estudiante"
              value={formData.apellido_estudiante}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo_estudiante">
              Correo
            </label>
            <input
              type="email"
              id="correo_estudiante"
              name="correo_estudiante"
              value={formData.correo_estudiante}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contrasenia">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasenia"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_nacimiento">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numero_celular">
              Número de Celular
            </label>
            <input
              type="tel"
              id="numero_celular"
              name="numero_celular"
              value={formData.numero_celular}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_pais">
              País
            </label>
            <select
              id="id_pais"
              name="id_pais"
              value={formData.id_pais}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">Bolivia</option>
              {/* Agregar más países según sea necesario */}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id_ciudad">
              Ciudad
            </label>
            <select
              id="id_ciudad"
              name="id_ciudad"
              value={formData.id_ciudad}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="1">Cochabamba</option>
              {/* Agregar más ciudades según sea necesario */}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Registrando...' : 'Registrar Estudiante'}
          </button>
        </div>
      </form>
    </div>
  );
}
