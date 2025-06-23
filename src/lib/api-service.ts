import { API_CONFIG } from './api-config';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get('content-type');
  let data;

  try {
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    throw new ApiError(
      response.status,
      'Error al procesar la respuesta del servidor'
    );
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      typeof data === 'string' ? data : data.message || 'Error del servidor',
      data
    );
  }

  return {
    success: true,
    data: data.data || data,
    message: data.message,
    status: response.status
  };
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: API_CONFIG.headers,
    cache: 'no-store'
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      500,
      error instanceof Error ? error.message : 'Error de conexión con el servidor'
    );
  }
}
