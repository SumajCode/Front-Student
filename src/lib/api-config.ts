export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth',
    PERFIL: '/api/perfil',
    CAMBIAR_CONTRASENIA: '/api/cambiar-contrasenia'
  }
} as const;

export interface LoginDto {
  correo: string;
  contrasenia: string;
}

export interface PerfilDto {
  nombre?: string;
  apellido?: string;
  correo?: string;
  fecha_nacimiento?: string;
  numero_celular?: string;
}

export const API_CONFIG = {
  baseURL: 'https://microservice-estudiante.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;
