export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  const timestamp = date.getTime();
  
  if (isNaN(timestamp)) return false;
  
  // Validar que la fecha no sea futura
  if (timestamp > Date.now()) return false;
  
  // Validar que la persona tenga al menos 5 años
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  if (timestamp > fiveYearsAgo.getTime()) return false;
  
  return true;
}

interface LoginInput {
  correo: string;
  contrasenia: string;
}

export function sanitizeLoginData(data: LoginInput) {
  return {
    correo: String(data.correo).trim().toLowerCase(),
    contrasenia: String(data.contrasenia)
  };
}

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  status?: number;
}

interface LoginResponseData {
  token: string;
  estudiante: {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono?: string;
  };
}

interface PerfilResponseData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
}

export function validateApiResponse<T>(response: ApiResponse<T>): boolean {
  return (
    response &&
    typeof response.success === 'boolean' &&
    (!response.data || typeof response.data === 'object') &&
    (!response.message || typeof response.message === 'string') &&
    (!response.status || typeof response.status === 'number')
  );
}

export function validateLoginResponse(response: unknown): response is ApiResponse<LoginResponseData> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    typeof (response as ApiResponse<LoginResponseData>).success === 'boolean' &&
    'data' in response &&
    typeof (response as ApiResponse<LoginResponseData>).data === 'object' &&
    (response as ApiResponse<LoginResponseData>).data !== null &&
    'token' in (response as ApiResponse<LoginResponseData>).data! &&
    typeof (response as ApiResponse<LoginResponseData>).data!.token === 'string' &&
    'estudiante' in (response as ApiResponse<LoginResponseData>).data! &&
    typeof (response as ApiResponse<LoginResponseData>).data!.estudiante === 'object'
  );
}

export function validatePerfilResponse(response: unknown): response is ApiResponse<PerfilResponseData> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'success' in response &&
    typeof (response as ApiResponse<PerfilResponseData>).success === 'boolean' &&
    'data' in response &&
    typeof (response as ApiResponse<PerfilResponseData>).data === 'object' &&
    (response as ApiResponse<PerfilResponseData>).data !== null &&
    'nombre' in (response as ApiResponse<PerfilResponseData>).data! &&
    typeof (response as ApiResponse<PerfilResponseData>).data!.nombre === 'string' &&
    'apellido' in (response as ApiResponse<PerfilResponseData>).data! &&
    typeof (response as ApiResponse<PerfilResponseData>).data!.apellido === 'string' &&
    'correo' in (response as ApiResponse<PerfilResponseData>).data! &&
    typeof (response as ApiResponse<PerfilResponseData>).data!.correo === 'string'
  );
}
