"use client";

import React, { useState, useEffect } from "react";
import { LogOut, User, Settings, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/ui/button";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { estudiantesService } from "@/lib/gateway-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import Link from "next/link";

interface EstudianteData {
  id: string;
  nombres?: string;
  apellidos?: string;
  correo?: string;
  telefono?: string;
  fechaNacimiento?: string;
  universidad?: string;
  carrera?: string;
  // Propiedades de la API real
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

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [estudianteData, setEstudianteData] = useState<EstudianteData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEstudianteData = async () => {
      if (!user?.id) return;
      
      setLoading(true);      try {
        // Usar id_estudiante en lugar de id genérico
        const estudianteId = user.id_estudiante?.toString() || user.id || '1';
        console.log('🔍 UserMenu: Obteniendo datos para estudiante ID:', estudianteId);
        console.log('🔍 UserMenu: Token being used:', user.token);
        
        const response = await estudiantesService.obtenerPorIdDirecto(estudianteId, user.token);
        console.log('🔍 UserMenu: Response received:', response);
        
        if (response.success && response.data) {
          setEstudianteData(response.data);
          console.log('✅ UserMenu: Datos del estudiante obtenidos:', response.data);
        } else {
          console.error('❌ UserMenu: Error obteniendo datos del estudiante:', response);
          console.log('🔍 UserMenu: Response completa:', response);
        }
      } catch (error) {
        console.error('Error al obtener datos del estudiante:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstudianteData();
  }, [user?.id, user?.id_estudiante, user?.token]);

  if (!user) {
    return null; // No mostrar nada si no hay usuario autenticado
  }  const displayName = estudianteData 
    ? `${estudianteData.nombre_estudiante || estudianteData.nombres || ''} ${estudianteData.apellido_estudiante || estudianteData.apellidos || ''}`.trim()
    : user.nombre_estudiante && user.apellido_estudiante 
      ? `${user.nombre_estudiante} ${user.apellido_estudiante}`
      : `${user.nombre} ${user.apellido || ''}`.trim() || user.correo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 h-auto p-2 rounded-xl hover:bg-purple-50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white transition-transform group-hover:scale-105">
                <User className="h-5 w-5 text-white" />
              </div>
              {/* Indicador de conexión */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-semibold text-gray-900">{displayName}</div>
              <div className="text-xs text-gray-500 truncate max-w-[120px]">
                {estudianteData?.correo_estudiante || estudianteData?.correo || user.correo}
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:rotate-180" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80 p-2 shadow-xl border-0 bg-white/95 backdrop-blur-md">
        <DropdownMenuLabel className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-base">{displayName}</div>
              <div className="text-sm text-gray-500 truncate">
                {estudianteData?.correo || user.correo}
              </div>
              <div className="text-xs text-purple-600 font-medium mt-1">
                Estudiante Activo
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-2" />
        
        {/* Opciones del menú */}
        <DropdownMenuItem asChild>
          <Link 
            href="/learning/dashboard" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Mis Cursos</div>
              <div className="text-xs text-gray-500">Ve tu progreso</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link 
            href="/configuracion" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">Configuración</div>
              <div className="text-xs text-gray-500">Ajusta tu perfil</div>
            </div>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuItem 
          onClick={logout}
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 focus:text-red-600 transition-colors"
        >
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
            <LogOut className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <div className="font-medium">Cerrar Sesión</div>
            <div className="text-xs text-red-500">Salir de tu cuenta</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
