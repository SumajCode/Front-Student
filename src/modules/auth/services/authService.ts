import { apiService } from '@/lib/api-service';
import { API_ROUTES } from '@/lib/api-config';
import type { LoginDto, PerfilDto } from '@/lib/api-config';

export class AuthService {
  async login(credentials: LoginDto): Promise<{ token: string; user: PerfilDto }> {
    return apiService.post(API_ROUTES.AUTH.LOGIN, credentials);
  }

  async getProfile(): Promise<PerfilDto> {
    return apiService.get(API_ROUTES.AUTH.PERFIL);
  }

  async updateProfile(profile: Partial<PerfilDto>): Promise<PerfilDto> {
    return apiService.put(API_ROUTES.AUTH.PERFIL, profile);
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return apiService.post(API_ROUTES.AUTH.CAMBIAR_CONTRASENIA, {
      contraseniaAntigua: oldPassword,
      contraseniaNueva: newPassword,
    });
  }

  logout() {
    apiService.clearToken();
    // Aquí podrías agregar cualquier otra lógica de limpieza necesaria
  }
}
