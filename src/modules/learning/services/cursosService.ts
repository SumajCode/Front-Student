import { apiService } from '@/lib/api-service';
import { API_ROUTES } from '@/lib/api-config';
import type { CursoDto, CursoResumenDto, ModuloDto } from '@/lib/api-config';

export class CursosService {
  async listarCursos(): Promise<CursoResumenDto[]> {
    return apiService.get(API_ROUTES.CURSOS.LISTA);
  }

  async obtenerCurso(cursoId: string): Promise<CursoDto> {
    return apiService.get(API_ROUTES.CURSOS.DETALLE(cursoId));
  }

  async obtenerModulo(cursoId: string, moduloId: string): Promise<ModuloDto> {
    return apiService.get(API_ROUTES.CURSOS.MODULO(cursoId, moduloId));
  }

  async actualizarProgreso(cursoId: string, moduloId: string, progreso: number): Promise<void> {
    return apiService.post(API_ROUTES.CURSOS.PROGRESO(cursoId, moduloId), { progreso });
  }

  // Método para compilar y ejecutar código
  async compilarCodigo(moduloId: string, codigo: string, lenguaje: string): Promise<{
    output: string;
    error?: string;
  }> {
    return apiService.post('/api/compilar', {
      moduloId,
      codigo,
      lenguaje
    });
  }
}
