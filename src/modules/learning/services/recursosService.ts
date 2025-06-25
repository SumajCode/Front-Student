import { apiService } from '@/lib/api-service';
import { API_CONFIG } from '@/lib/api-config';

interface RecursoDto {
  id: string;
  nombre: string;
  tipo: 'PDF' | 'VIDEO' | 'CODIGO' | 'OTRO';
  url: string;
  descripcion?: string;
}

export class RecursosService {
  async obtenerRecursosModulo(moduloId: string): Promise<RecursoDto[]> {
    const response = await apiService.get<RecursoDto[]>(`/api/modulos/${moduloId}/recursos`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al obtener recursos del módulo');
  }

  async obtenerRecurso(recursoId: string): Promise<RecursoDto> {
    const response = await apiService.get<RecursoDto>(`/api/recursos/${recursoId}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Error al obtener el recurso');
  }

  async descargarRecurso(recursoId: string): Promise<Blob> {
    const response = await fetch(`${API_CONFIG.baseURL}/api/recursos/${recursoId}/descargar`, {
      headers: API_CONFIG.headers
    });

    if (!response.ok) {
      throw new Error('Error al descargar el recurso');
    }

    return response.blob();
  }
}
