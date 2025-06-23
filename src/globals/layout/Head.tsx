"use client";

import React, { useState } from "react";
import Link from "next/link";
import { isValidEmail } from "@/lib/validations";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isLearningPath = pathname?.startsWith('/learning');

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
        // Validar que la fecha no esté vacía
      if (!formData.fecha_nacimiento) {
        throw new Error('La fecha de nacimiento es requerida');
      }console.log('Datos a enviar:', JSON.stringify(formData, null, 2));
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
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">          {/* Logo */}
          <Link 
            href={isAuthenticated ? "/learning/dashboard" : "/explore"} 
            className="text-xl font-bold text-purple-600"
          >
            SumajCode
          </Link>

          {/* Desktop Navigation */}          <Navigation 
            isLearningPath={isLearningPath}
            isAuthenticated={isAuthenticated}
          />

          {/* Authentication Buttons */}
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />

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
                        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>                        <input
                          type="text"
                          name="fecha_nacimiento"
                          placeholder="DD-MM-YYYY"
                          value={formData.fecha_nacimiento}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Permitir solo números y guiones
                            if (value === '' || /^[\d-]*$/.test(value)) {
                              // Formatear automáticamente con guiones
                              let formatted = value.replace(/\D/g, ''); // Remover no-dígitos
                              if (formatted.length > 4) {
                                formatted = formatted.slice(0, 2) + '-' + formatted.slice(2, 4) + '-' + formatted.slice(4, 8);
                              } else if (formatted.length > 2) {
                                formatted = formatted.slice(0, 2) + '-' + formatted.slice(2);
                              }
                              // Solo actualizar si la longitud es correcta o está borrando
                              if (formatted.length <= 10) {
                                setFormData(prev => ({
                                  ...prev,
                                  fecha_nacimiento: formatted
                                }));
                              }
                            }
                          }}
                          required
                          max={new Date().toISOString().split('T')[0]} // Limitar a la fecha actual                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
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

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
}
