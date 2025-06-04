export const API_ROUTES = {
  ESTUDIANTES: {
    LISTAR: '/api/estudiantes',
    REGISTRAR: '/api/estudiantes/registrar',
    ACTUALIZAR: (id: string) => `/api/estudiantes/actualizar/${id}`,
    ELIMINAR: (id: string) => `/api/estudiantes/eliminar/${id}`,
    REGISTRAR_LOTE: '/api/registrarLoteEstudiantes'
  },
  AUTH: {
    LOGIN: '/api/login',
    CAMBIAR_CONTRASENIA: '/api/login/cambiarContrasenia'
  }
} as const;

export interface EstudianteResponse {
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

export interface RegistroEstudianteDto {
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
  contrasenia: string;
  fecha_nacimiento?: string;
  numero_celular?: string;
  id_pais: number;
  id_ciudad: number;
}

export interface LoginDto {
  correo_estudiante: string;
  contrasenia: string;
}

export interface CambiarContraseniaDto {
  correo_estudiante: string;
  contrasenia_actual: string;
  nueva_contrasenia: string;
}

export const API_CONFIG = {
  baseURL: process.env.BACKEND_URL || 'https://microservice-estudiante.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;
