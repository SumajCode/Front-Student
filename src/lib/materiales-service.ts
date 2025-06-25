import { API_CONFIG, API_ROUTES, MaterialCursoDto, ProgramaCursoDto } from '@/lib/api-config';

/// <reference lib="dom" />

class MaterialesService {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_CONFIG.baseURL}${url}`, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Obtener materiales de un curso
  async obtenerMateriales(cursoId: string): Promise<MaterialCursoDto[]> {
    try {
      return await this.request<MaterialCursoDto[]>(
        API_ROUTES.CURSOS.MATERIALES(cursoId)
      );
    } catch (error) {
      console.error('Error al obtener materiales:', error);
      throw error;
    }
  }

  // Obtener programa del curso
  async obtenerPrograma(cursoId: string): Promise<ProgramaCursoDto> {
    try {
      return await this.request<ProgramaCursoDto>(
        API_ROUTES.CURSOS.PROGRAMA(cursoId)
      );
    } catch (error) {
      console.error('Error al obtener programa:', error);
      throw error;
    }
  }

  // Descargar recursos del curso
  async descargarRecursos(cursoId: string): Promise<Blob> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ROUTES.CURSOS.DESCARGAR_RECURSOS(cursoId)}`,
        {
          headers: API_CONFIG.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Error al descargar recursos:', error);
      throw error;
    }
  }

  // Descargar material específico
  async descargarMaterial(materialUrl: string, nombreArchivo: string): Promise<void> {
    try {
      const response = await fetch(materialUrl);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar material:', error);
      throw error;
    }
  }

  // Obtener certificado del curso
  async obtenerCertificado(cursoId: string): Promise<Blob> {
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_ROUTES.CURSOS.CERTIFICADO(cursoId)}`,
        {
          headers: API_CONFIG.headers,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Error al obtener certificado:', error);
      throw error;
    }
  }

  // Formatear tamaño de archivo
  formatearTamaño(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Obtener icono según tipo de archivo
  obtenerIconoTipo(tipo: MaterialCursoDto['tipo']): string {
    const iconos = {
      pdf: '📄',
      video: '🎬',
      documento: '📝',
      zip: '📦',
      imagen: '🖼️',
      otro: '📎'
    };
    
    return iconos[tipo] || iconos.otro;
  }
}

export const materialesService = new MaterialesService();
