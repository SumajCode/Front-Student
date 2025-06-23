export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://microservice-estudiante.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;

// Interfaces base
interface BaseDto {
  id: string;
}

// DTOs para autenticación y perfil
export interface LoginDto {
  correo: string;
  contrasenia: string;
}

export interface PerfilDto extends BaseDto {
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento?: string;
  numeroCelular?: string;
}

// DTOs para registro a cursos
export interface RegistroCursoDto {
  codigo: string;
  estudianteId: string;
}

export interface InvitacionCursoDto {
  codigoCurso: string;
  mensaje?: string;
  expiracion?: Date;
}

// DTOs para cursos y módulos
export interface ModuloBaseDto extends BaseDto {
  titulo: string;
  descripcion: string;
  contenido: string;
  videoUrl?: string;
  duration?: string | number;
  resources?: boolean;
  hasSubItems?: boolean;
}

export interface ModuloDto extends ModuloBaseDto {
  completado: boolean;
  progreso: number;
}

export interface CursoBaseDto extends BaseDto {
  titulo: string;
  descripcion: string;
  miniatura?: string;
  instructor?: string;
  codigoAcceso?: string;
}

export interface CursoDto extends CursoBaseDto {
  modulos: ModuloDto[];
  progreso: number;
}

export interface CursoResumenDto extends CursoBaseDto {
  progreso: number;
  duracion?: string;
  cantidadModulos: number;
}

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth',
    PERFIL: '/api/perfil',
    CAMBIAR_CONTRASENIA: '/api/cambiar-contrasenia'
  },
  CURSOS: {
    LISTA: '/api/estudiantes/cursos',
    DETALLE: (id: string) => `/api/estudiantes/cursos/${id}`,
    MODULOS: (cursoId: string) => `/api/estudiantes/cursos/${cursoId}/modulos`,
    MODULO: (cursoId: string, moduloId: string) => `/api/estudiantes/cursos/${cursoId}/modulos/${moduloId}`,
    PROGRESO: (cursoId: string, moduloId: string) => `/api/estudiantes/cursos/${cursoId}/modulos/${moduloId}/progreso`,
    UNIRSE: '/api/estudiantes/cursos/unirse',
    VALIDAR_CODIGO: '/api/estudiantes/cursos/validar-codigo'
  }
} as const;
