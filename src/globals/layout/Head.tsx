"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from 'next/navigation';

interface LoginData {
  correo: string;
  contrasenia: string;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    correo: '',
    contrasenia: ''
  });

  useEffect(() => {
    // Verificar autenticación al cargar
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: loginData.correo,
          contrasenia: loginData.contrasenia
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('estudiante', JSON.stringify(data.data.estudiante));
        setIsAuthenticated(true);
        setIsLoginOpen(false);
        setLoginData({ correo: '', contrasenia: '' });
        router.push('/homepage');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 transition-all duration-200 ease-in-out">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent 
            transition-all duration-300 ease-in-out hover:opacity-80">
            SumajCode
          </span>
        </Link>
        
        {/* Navegación principal centrada */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">          <Link 
            href="/" 
            className={`group flex items-center gap-2 text-gray-700 hover:text-purple-600 text-[15px] font-medium
              transition-all duration-200 ease-in-out ${
              pathname === '/' ? 'text-purple-600' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="relative after:content-[''] after:absolute after:w-full after:h-0.5 
              after:bg-purple-600 after:left-0 after:bottom-[-4px] after:transform after:scale-x-0 
              after:transition-transform after:duration-200 group-hover:after:scale-x-100
              ${pathname === '/explorar' ? 'after:scale-x-100' : ''}">
              Explorar
            </span>
          </Link>
          <Link 
            href="/mi-aprendizaje"
            className={`group flex items-center gap-2 text-gray-700 hover:text-purple-600 text-[15px] font-medium
              transition-all duration-200 ease-in-out ${
              pathname === '/mi-aprendizaje' ? 'text-purple-600' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110 duration-200" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="relative after:content-[''] after:absolute after:w-full after:h-0.5 
              after:bg-purple-600 after:left-0 after:bottom-[-4px] after:transform after:scale-x-0 
              after:transition-transform after:duration-200 group-hover:after:scale-x-100
              ${pathname === '/mi-aprendizaje' ? 'after:scale-x-100' : ''}">
              Mi Aprendizaje
            </span>
          </Link>
        </nav>

        {/* Botones de acción */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative hover:bg-purple-50 transition-colors duration-200"
                  >
                    <Bell className="h-5 w-5 text-gray-700 hover:text-purple-600 transition-colors duration-200" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-purple-600 rounded-full animate-pulse"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">Notificaciones</h4>
                      <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 text-sm">
                        Marcar todo como leído
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">Nueva lección disponible</p>
                          <p className="text-xs text-gray-500">Python para Ciencia de Datos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button 
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsAuthenticated(false);
                  router.push('/');
                }}
                variant="ghost"
                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 font-medium 
                  transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Popover open={isLoginOpen} onOpenChange={setIsLoginOpen}>
              <PopoverTrigger asChild>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">
                  Login
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      value={loginData.correo}
                      onChange={(e) =>
                        setLoginData({ ...loginData, correo: e.target.value })
                      }
                      required
                      placeholder="ejemplo: mateo@gmail.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contraseña</label>
                    <input
                      type="password"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      value={loginData.contrasenia}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          contrasenia: e.target.value,
                        })
                      }
                      required
                      placeholder="ejemplo: hola123"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                      {error}
                    </p>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Iniciando...</span>
                      </div>
                    ) : (
                      "Iniciar sesión"
                    )}
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <Link
              href="/explorar"
              className={`block p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors ${
                pathname === '/explorar' ? 'bg-purple-50 text-purple-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explorar
            </Link>
            <Link
              href="/mi-aprendizaje"
              className={`block p-2 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors ${
                pathname === '/mi-aprendizaje' ? 'bg-purple-50 text-purple-600' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mi aprendizaje
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
