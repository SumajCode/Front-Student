"use client";

import { useState } from "react";
import Link from "next/link";
import { isValidDate, isValidEmail } from "@/lib/validations";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

interface LoginData {
  correo: string;
  contrasenia: string;
}

interface EstudianteInput {
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
  contrasenia: string;
  fecha_nacimiento?: string;
  numero_celular?: string;
  id_pais: number;
  id_ciudad: number;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    correo: '',
    contrasenia: ''
  });
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
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      // TODO: Implementar la lógica de login
      console.log('Login con:', loginData);
      setIsAuthenticated(true);
      setOpen(false);
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
        // Validar solo los campos realmente requeridos
      const requiredFields = ['nombre_estudiante', 'apellido_estudiante', 'correo_estudiante', 'contrasenia', 'fecha_nacimiento'];
      const missingFields = requiredFields.filter(field => {
        const value = formData[field as keyof EstudianteInput];
        return !value || value.toString().trim() === '';
      });
      
      if (missingFields.length > 0) {
        throw new Error('Todos los campos son obligatorios');
      }

      // Validar formato de correo
      if (!isValidEmail(formData.correo_estudiante)) {
        throw new Error('El formato del correo electrónico no es válido');
      }
      
      // Validar fecha de nacimiento
      if (!formData.fecha_nacimiento) {
        throw new Error('La fecha de nacimiento es requerida');
      }
      
      if (!isValidDate(formData.fecha_nacimiento)) {
        throw new Error('La fecha de nacimiento no es válida. Debes ser mayor de 5 años.');
      }

      const response = await fetch('/api/estudiantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Error al registrar estudiante');
      }

      setRegistroExitoso(true);
      setIsLogin(true);
      // Limpiar el formulario
      setFormData({
        nombre_estudiante: '',
        apellido_estudiante: '',
        correo_estudiante: '',
        contrasenia: '',
        fecha_nacimiento: '',
        numero_celular: '',
        id_pais: 1,
        id_ciudad: 1
      });
      
      setTimeout(() => {
        setRegistroExitoso(false);
      }, 2000);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al registrar estudiante');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData((prev: LoginData) => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData((prev: EstudianteInput) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto flex items-center justify-between h-20">
        {/* Logo y Nombre */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              {/* Puedes agregar un ícono o imagen aquí si lo deseas */}
            </div>
            <span className="font-bold text-xl">SumajCode</span>
          </Link>
        </div>

        {/* Navegación Central */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/explorar"
            className="text-gray-600 hover:text-gray-900"
          >
            Explorar
          </Link>
          <Link
            href="/estudiantes"
            className="text-gray-600 hover:text-gray-900"
          >
            Estudiantes
          </Link>
          <Link
            href="/mi-aprendizaje"
            className="text-gray-600 hover:text-gray-900"
          >
            Mi aprendizaje
          </Link>
        </nav>

        {/* Botones derecha */}
        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <HoverCard>
            <HoverCardTrigger>
              <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Notificaciones</h4>
                <p className="text-sm text-gray-500">No hay notificaciones nuevas</p>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Botón GO con Popover de autenticación */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button className="bg-[#9333EA] hover:bg-[#7E22CE] text-white rounded-lg px-4 py-2">
                GO
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4">
              {!isAuthenticated ? (
                <div className="space-y-4">                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                      {isLogin ? 'Iniciar Sesión' : 'Registro de Estudiante'}
                    </h3>
                    <button
                      type="button"
                      className="text-[#9333EA] hover:text-[#7E22CE] text-sm"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Registrarse' : 'Volver al login'}
                    </button>
                  </div>                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                      {error}
                    </div>
                  )}
                  
                  {!isLogin && !error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                      Los campos marcados son obligatorios
                    </div>
                  )}

                  {registroExitoso && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded text-sm">
                      ¡Registro exitoso! Por favor, inicia sesión.
                    </div>
                  )}

                  {isLogin ? (
                    // Formulario de Login
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                          type="email"
                          name="correo"
                          value={loginData.correo}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                          type="password"
                          name="contrasenia"
                          value={loginData.contrasenia}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white"
                      >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                      </Button>
                    </form>
                  ) : (
                    // Formulario de Registro
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Nombre</label>
                          <input
                            type="text"
                            name="nombre_estudiante"
                            value={formData.nombre_estudiante}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Apellido</label>
                          <input
                            type="text"
                            name="apellido_estudiante"
                            value={formData.apellido_estudiante}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                          type="email"
                          name="correo_estudiante"
                          value={formData.correo_estudiante}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                      </div>                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                          type="password"
                          name="contrasenia"
                          value={formData.contrasenia}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Número de Celular <span className="text-gray-500 text-xs">(Opcional)</span>
                        </label>
                        <input
                          type="tel"
                          name="numero_celular"
                          value={formData.numero_celular}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                          placeholder="Ej: 70123456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
                        <input
                          type="date"
                          name="fecha_nacimiento"
                          value={formData.fecha_nacimiento}
                          onChange={(e) => {
                            const inputDate = e.target.value;
                            // Asegurarnos de que la fecha esté en formato YYYY-MM-DD
                            if (inputDate) {
                              setFormData(prev => ({
                                ...prev,
                                fecha_nacimiento: inputDate // El input type="date" ya devuelve YYYY-MM-DD
                              }));
                            }
                          }}
                          required
                          max={new Date().toISOString().split('T')[0]} // Limitar a la fecha actual
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                        {formData.fecha_nacimiento && !isValidDate(formData.fecha_nacimiento) && (
                          <p className="text-red-500 text-xs mt-1">
                            La fecha de nacimiento no es válida. Debes ser mayor de 5 años.
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white"
                      >
                        {loading ? 'Registrando...' : 'Registrarse'}
                      </Button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Mi Perfil</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      {loginData.correo}
                    </p>
                    <Button
                      onClick={() => {
                        setIsAuthenticated(false);
                        setOpen(false);
                      }}
                      className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white"
                    >
                      Cerrar Sesión
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {isMenuOpen && (
          <nav className="border-t py-4">
            <div className="container mx-auto space-y-4">
              <Link href="/explorar" className="block text-gray-600 hover:text-gray-900">
                Explorar
              </Link>
              <Link href="/estudiantes" className="block text-gray-600 hover:text-gray-900">
                Estudiantes
              </Link>
              <Link href="/mi-aprendizaje" className="block text-gray-600 hover:text-gray-900">
                Mi aprendizaje
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
