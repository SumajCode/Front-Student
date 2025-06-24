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
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left hidden md:block">
              <div className="text-sm font-medium">{displayName}</div>              <div className="text-xs text-gray-500">
                {estudianteData?.correo_estudiante || estudianteData?.correo || user.correo}
              </div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-medium">{displayName}</div>
              <div className="text-sm text-gray-500">
                {estudianteData?.correo || user.correo}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {/* Opciones del menú */}
        <DropdownMenuItem asChild>
          <Link href="/configuracion" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={logout}
          className="flex items-center gap-2 text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
