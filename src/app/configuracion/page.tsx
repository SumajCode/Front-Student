'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { User, Mail, Phone, Lock, Save, ArrowLeft, Eye, EyeOff, Settings } from 'lucide-react';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/card';
import Link from 'next/link';

interface EstudianteData {
  id_estudiante?: number;
  nombre_estudiante?: string;
  apellido_estudiante?: string;
  correo_estudiante?: string;
  numero_celular?: string;
  es_universitario?: boolean;
  fecha_registro?: string;
  fecha_ultimo_acceso?: string;
  fecha_nacimiento?: string;
  id_ciudad?: number;
  id_pais?: number;
}

interface CambioContrasenia {
  contrasenia_actual: string;
  nueva_contrasenia: string;
  confirmar_contrasenia: string;
}

interface Pais {
  id_pais: number;
  nombre_pais: string;
  codigo_telefono: string;
}

interface Ciudad {
  id_ciudad: number;
  id_pais: number;
  nombre_ciudad: string;
}

export default function ConfiguracionPage() {
  const { user } = useAuth();
  const [estudianteData, setEstudianteData] = useState<EstudianteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paises, setPaises] = useState<Pais[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [loadingCiudades, setLoadingCiudades] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    actual: false,
    nueva: false,
    confirmar: false
  });

  // Estados para el formulario de datos
  const [editData, setEditData] = useState({
    nombre_estudiante: '',
    apellido_estudiante: '',
    numero_celular: '',
    fecha_nacimiento: '',
    id_pais: '',
    id_ciudad: ''
  });

  // Estados para el formulario de contraseña
  const [passwordData, setPasswordData] = useState<CambioContrasenia>({
    contrasenia_actual: '',
    nueva_contrasenia: '',
    confirmar_contrasenia: ''
  });

  // Cargar datos del estudiante
  useEffect(() => {
    const fetchEstudianteData = async () => {
      if (!user?.id || !user?.token) {
        setError('No hay usuario autenticado');
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        const estudianteId = user.id_estudiante?.toString() || user.id || '1';
        
        const response = await fetch(`/api/perfil?token=${user.token}&id=${estudianteId}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setEstudianteData(result.data);
          // Inicializar formulario con datos existentes
          setEditData({
            nombre_estudiante: result.data.nombre_estudiante || '',
            apellido_estudiante: result.data.apellido_estudiante || '',
            numero_celular: result.data.numero_celular || '',
            fecha_nacimiento: result.data.fecha_nacimiento || '',
            id_pais: result.data.id_pais?.toString() || '',
            id_ciudad: result.data.id_ciudad?.toString() || ''
          });
        } else {
          setError(result.message || 'No se pudieron cargar los datos del estudiante');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
        console.error('Error al obtener datos del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudianteData();
  }, [user]);

  // Cargar países
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('/api/paises');
        const result = await response.json();
        
        if (result.success && result.data) {
          setPaises(result.data);
        }
      } catch (error) {
        console.error('Error al cargar países:', error);
      }
    };

    fetchPaises();
  }, []);

  // Cargar ciudades cuando cambia el país
  useEffect(() => {
    const fetchCiudades = async () => {
      if (!editData.id_pais) {
        setCiudades([]);
        return;
      }

      setLoadingCiudades(true);
      try {
        const response = await fetch(`/api/ciudades/${editData.id_pais}`);
        const result = await response.json();
        
        if (result.success && result.data) {
          setCiudades(result.data);
        } else {
          setCiudades([]);
        }
      } catch (error) {
        console.error('Error al cargar ciudades:', error);
        setCiudades([]);
      } finally {
        setLoadingCiudades(false);
      }
    };

    fetchCiudades();
  }, [editData.id_pais]);

  // Manejar cambio de país
  const handlePaisChange = (paisId: string) => {
    setEditData(prev => ({
      ...prev,
      id_pais: paisId,
      id_ciudad: '' // Resetear ciudad cuando cambia el país
    }));
  };

  // Actualizar datos del estudiante
  const handleUpdateData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.token) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const estudianteId = user.id_estudiante?.toString() || user.id || '1';
      
      // Preparar datos para enviar, convirtiendo strings vacíos a null y números
      const dataToSend = {
        nombre_estudiante: editData.nombre_estudiante || null,
        apellido_estudiante: editData.apellido_estudiante || null,
        numero_celular: editData.numero_celular || null,
        fecha_nacimiento: editData.fecha_nacimiento || null,
        id_pais: editData.id_pais ? parseInt(editData.id_pais) : null,
        id_ciudad: editData.id_ciudad ? parseInt(editData.id_ciudad) : null
      };
      
      const response = await fetch(`/api/perfil?token=${user.token}&id=${estudianteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Datos actualizados correctamente');
        // Recargar datos
        if (result.data) {
          setEstudianteData(result.data);
        }
      } else {
        setError(result.message || 'Error al actualizar los datos');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al actualizar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.token) return;

    // Obtener el correo del estudiante de diferentes fuentes posibles
    const correoEstudiante = estudianteData?.correo_estudiante || user?.correo_estudiante || user?.correo;
    
    if (!correoEstudiante) {
      setError('No se puede cambiar la contraseña: correo del estudiante no disponible');
      return;
    }

    if (passwordData.nueva_contrasenia !== passwordData.confirmar_contrasenia) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (passwordData.nueva_contrasenia.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoadingPassword(true);
    setError('');
    setSuccess('');

    try {
      // Log para depuración
      console.log('Datos que se enviarán para cambio de contraseña:', {
        correo_estudiante: correoEstudiante,
        contrasenia_actual: passwordData.contrasenia_actual ? 'PRESENTE' : 'AUSENTE',
        nueva_contrasenia: passwordData.nueva_contrasenia ? 'PRESENTE' : 'AUSENTE'
      });
      
      const response = await fetch('/api/cambiar-contrasenia', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo_estudiante: correoEstudiante,
          contrasenia_actual: passwordData.contrasenia_actual,
          nueva_contrasenia: passwordData.nueva_contrasenia
        })
      });

      const result = await response.json();

      if (result.success) {
        setSuccess('Contraseña cambiada correctamente');
        setPasswordData({
          contrasenia_actual: '',
          nueva_contrasenia: '',
          confirmar_contrasenia: ''
        });
      } else {
        setError(result.message || 'Error al cambiar la contraseña');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      console.error('Error al cambiar contraseña:', error);
    } finally {
      setLoadingPassword(false);
    }
  };

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
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-purple-600" />
            Configuración
          </h1>
          <p className="text-gray-600">Gestiona tu perfil y contraseña</p>
        </div>
      </div>

      {/* Mensajes de estado */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario de datos personales */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Datos Personales
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Actualiza tu información personal
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateData} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre
                </label>
                <Input
                  type="text"
                  value={editData.nombre_estudiante}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    nombre_estudiante: e.target.value
                  }))}
                  className="w-full"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Apellido
                </label>
                <Input
                  type="text"
                  value={editData.apellido_estudiante}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    apellido_estudiante: e.target.value
                  }))}
                  className="w-full"
                  placeholder="Tu apellido"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Correo Electrónico
                </label>
                <Input
                  type="email"
                  value={estudianteData?.correo_estudiante || ''}
                  className="w-full bg-gray-100"
                  placeholder="tu@email.com"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">El correo no se puede modificar</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Teléfono
                </label>
                <Input
                  type="tel"
                  value={editData.numero_celular}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    numero_celular: e.target.value
                  }))}
                  className="w-full"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Fecha de Nacimiento
                </label>
                <Input
                  type="date"
                  value={editData.fecha_nacimiento}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    fecha_nacimiento: e.target.value
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País
                </label>
                <select
                  value={editData.id_pais}
                  onChange={(e) => handlePaisChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Selecciona un país</option>
                  {paises.map((pais) => (
                    <option key={pais.id_pais} value={pais.id_pais.toString()}>
                      {pais.nombre_pais} ({pais.codigo_telefono})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Ciudad
                </label>
                <select
                  value={editData.id_ciudad}
                  onChange={(e) => setEditData(prev => ({
                    ...prev,
                    id_ciudad: e.target.value
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={!editData.id_pais || loadingCiudades}
                >
                  <option value="">
                    {!editData.id_pais 
                      ? 'Primero selecciona un país' 
                      : loadingCiudades 
                        ? 'Cargando ciudades...' 
                        : 'Selecciona una ciudad'
                    }
                  </option>
                  {ciudades.map((ciudad) => (
                    <option key={ciudad.id_ciudad} value={ciudad.id_ciudad.toString()}>
                      {ciudad.nombre_ciudad}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Guardando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Guardar Cambios
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Formulario de cambio de contraseña */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-purple-600" />
              Cambiar Contraseña
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Actualiza tu contraseña para mantener tu cuenta segura
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Contraseña Actual
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.actual ? "text" : "password"}
                    value={passwordData.contrasenia_actual}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      contrasenia_actual: e.target.value
                    }))}
                    className="w-full pr-10"
                    placeholder="Tu contraseña actual"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({
                      ...prev,
                      actual: !prev.actual
                    }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.actual ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nueva Contraseña
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.nueva ? "text" : "password"}
                    value={passwordData.nueva_contrasenia}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      nueva_contrasenia: e.target.value
                    }))}
                    className="w-full pr-10"
                    placeholder="Nueva contraseña (min. 6 caracteres)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({
                      ...prev,
                      nueva: !prev.nueva
                    }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.nueva ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Confirmar Nueva Contraseña
                </label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirmar ? "text" : "password"}
                    value={passwordData.confirmar_contrasenia}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirmar_contrasenia: e.target.value
                    }))}
                    className="w-full pr-10"
                    placeholder="Confirma tu nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({
                      ...prev,
                      confirmar: !prev.confirmar
                    }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPasswords.confirmar ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={loadingPassword}
              >
                {loadingPassword ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Cambiando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Cambiar Contraseña
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional del estudiante */}
      {estudianteData && (
        <Card className="p-6 mt-6">
          <CardHeader>
            <CardTitle>Información Adicional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">ID de Estudiante:</span>
                <span className="ml-2">{estudianteData.id_estudiante}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Es Universitario:</span>
                <span className="ml-2">{estudianteData.es_universitario ? 'Sí' : 'No'}</span>
              </div>
              {estudianteData.fecha_registro && (
                <div>
                  <span className="font-medium text-gray-700">Fecha de Registro:</span>
                  <span className="ml-2">
                    {new Date(estudianteData.fecha_registro).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
              {estudianteData.fecha_ultimo_acceso && (
                <div>
                  <span className="font-medium text-gray-700">Último Acceso:</span>
                  <span className="ml-2">
                    {new Date(estudianteData.fecha_ultimo_acceso).toLocaleDateString('es-ES')}
                  </span>
                </div>
              )}
              {estudianteData.id_pais && (
                <div>
                  <span className="font-medium text-gray-700">País:</span>
                  <span className="ml-2">
                    {paises.find(p => p.id_pais === estudianteData.id_pais)?.nombre_pais || `ID: ${estudianteData.id_pais}`}
                  </span>
                </div>
              )}
              {estudianteData.id_ciudad && (
                <div>
                  <span className="font-medium text-gray-700">Ciudad:</span>
                  <span className="ml-2">
                    {ciudades.find(c => c.id_ciudad === estudianteData.id_ciudad)?.nombre_ciudad || `ID: ${estudianteData.id_ciudad}`}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
