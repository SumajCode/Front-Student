import { apiService } from '@/lib/api-service';
import { API_ROUTES } from '@/lib/api-config';
import type { CursoDto, CursoResumenDto, ModuloDto } from '@/lib/api-config';

export class CursosService {
  async listarCursos(): Promise<CursoResumenDto[]> {
    const response = await apiService.get<CursoResumenDto[]>(API_ROUTES.CURSOS.LISTA);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al obtener la lista de cursos');
  }

  async obtenerCurso(cursoId: string): Promise<CursoDto> {
    const response = await apiService.get<CursoDto>(API_ROUTES.CURSOS.DETALLE(cursoId));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al obtener el curso');
  }

  async obtenerModulo(cursoId: string, moduloId: string): Promise<ModuloDto> {
    const response = await apiService.get<ModuloDto>(API_ROUTES.CURSOS.MODULO(cursoId, moduloId));
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al obtener el módulo');
  }

  async actualizarProgreso(cursoId: string, moduloId: string, progreso: number): Promise<void> {
    const response = await apiService.post<void>(API_ROUTES.CURSOS.PROGRESO(cursoId, moduloId), { progreso });
    if (!response.success) {
      throw new Error(response.message || 'Error al actualizar el progreso');
    }
  }

  // Método para compilar y ejecutar código
  async compilarCodigo(moduloId: string, codigo: string, lenguaje: string): Promise<{
    output: string;
    error?: string;
  }> {
    const response = await apiService.post<{ output: string; error?: string }>('/api/compilar', {
      moduloId,
      codigo,
      lenguaje
    });
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al compilar el código');
  }
}
