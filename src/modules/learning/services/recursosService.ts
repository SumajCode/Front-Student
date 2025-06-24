import { apiService } from '@/lib/api-service';

interface RecursoDto {
  id: string;
  nombre: string;
  tipo: 'PDF' | 'VIDEO' | 'CODIGO' | 'OTRO';
  url: string;
  descripcion?: string;
}

export class RecursosService {
  async obtenerRecursosModulo(moduloId: string): Promise<RecursoDto[]> {
    return apiService.get(`/api/modulos/${moduloId}/recursos`);
  }

  async obtenerRecurso(recursoId: string): Promise<RecursoDto> {
    return apiService.get(`/api/recursos/${recursoId}`);
  }

  async descargarRecurso(recursoId: string): Promise<Blob> {
    const response = await fetch(`${apiService.baseURL}/api/recursos/${recursoId}/descargar`, {
      headers: apiService.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Error al descargar el recurso');
    }

    return response.blob();
  }
}
