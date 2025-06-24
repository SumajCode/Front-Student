export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://hono.raulparedesld.worker.dev',
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
    LOGIN: '/api/login',
    PERFIL: '/api/estudiantes/id', // Para obtener perfil por ID
    CAMBIAR_CONTRASENIA: '/api/login/cambiarContrasenia'
  },
  ESTUDIANTES: {
    LISTAR: '/api/estudiantes',
    OBTENER: '/api/estudiantes/id',
    REGISTRAR: '/api/estudiantes/registrar',
    ACTUALIZAR: '/api/estudiantes/actualizar/id',
    ELIMINAR: '/api/estudiantes/eliminar/id',
    REGISTRAR_LOTE: '/api/registrarLoteEstudiantes'
  },
  CONTENIDO: {
    ARCHIVO: {
      CREAR: '/apicontenido/v1/archivo/crear',
      EDITAR: '/apicontenido/v1/archivo/editar',
      ELIMINAR: '/apicontenido/v1/archivo/eliminar',
      LISTAR: '/apicontenido/v1/archivo/listar'
    },
    MODULO: {
      CREAR: '/apicontenido/v1/modulo/crear',
      EDITAR: '/apicontenido/v1/modulo/editar',
      ELIMINAR: '/apicontenido/v1/modulo/eliminar',
      LISTAR: '/apicontenido/v1/modulo/listar'
    }
  },
  DOCENTES: {
    CREAR: '/apidocentes/v1/docente/crear',
    LISTAR: '/apidocentes/v1/docente/listar',
    OBTENER: '/apidocentes/v1/docente/listar/id',
    EDITAR: '/apidocentes/v1/docente/editar',
    ELIMINAR: '/apidocentes/v1/docente/eliminar',
    ELIMINAR_TODO: '/apidocentes/v1/docente/eliminar/todo',
    MATERIAS: '/apidocentes/v1/docente/materias'
  },
  MATERIAS: {
    CREAR: '/apidocentes/v1/materia/crear',
    LISTAR: '/apidocentes/v1/materia/listar',
    EDITAR: '/apidocentes/v1/materia/editar',
    ELIMINAR: '/apidocentes/v1/materia/eliminar',
    ELIMINAR_TODO: '/apidocentes/v1/materia/eliminar/todo',
    DOCENTES: '/apidocentes/v1/materia/docentes'
  },
  MATRICULA: {
    CREAR: '/apidocentes/v1/matricula/crear',
    CREAR_MATRICULAS: '/apidocentes/v1/matricula/crear/matriculas',
    ELIMINAR: '/apidocentes/v1/matricula/eliminar',
    LISTAR_POR_MATERIA: '/apidocentes/v1/matricula/listar/materia'
  },
  COMPILADOR: {
    COMPILAR: '/apicompilador/v1/code/compilar',
    EVALUAR: '/apicompilador/v1/code/evaluar'
  },
  // Mantengo las rutas legacy para compatibilidad
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
