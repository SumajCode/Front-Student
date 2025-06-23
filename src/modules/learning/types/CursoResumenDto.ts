export interface CursoResumenDto {
    id: string;
    titulo: string;
    descripcion: string;
    progreso: number;
    duracion?: string;
    instructor?: string;
    cantidadModulos: number;
    codigoAcceso?: string;
    miniatura?: string;
}

export interface CursoDetalleDto extends CursoResumenDto {
    modulos: ModuloDto[];
    recursos?: RecursoDto[];
    certificadoDisponible?: boolean;
}

export interface ModuloDto {
    id: string;
    titulo: string;
    descripcion?: string;
    duracion?: string;
    orden: number;
    completado: boolean;
    subModulos?: ModuloDto[];
}

export interface RecursoDto {
    id: string;
    nombre: string;
    tipo: 'documento' | 'video' | 'enlace' | 'codigo';
    url: string;
    descripcion?: string;
}
