import { API_CONFIG } from './api-config';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Función para obtener headers con autenticación
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    ...API_CONFIG.headers
  };

  // Obtener datos de autenticación del localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const estudianteData = localStorage.getItem('estudiante');
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (estudianteData) {
      try {
        const estudiante = JSON.parse(estudianteData);
        if (estudiante.id || estudiante.id_estudiante) {
          headers['x-student-id'] = (estudiante.id || estudiante.id_estudiante).toString();
        }
      } catch (error) {
        console.warn('Error parsing estudiante data from localStorage:', error);
      }
    }
  }

  return headers;
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

    if (!response.ok) {
      throw new ApiError(response.status, data.message || 'Error en la petición', data);
    }

    return {
      success: true,
      data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(response.status, 'Error procesando la respuesta');
  }
}

async function get<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'GET',
    headers: getHeaders(),
    credentials: 'include',
  });
  return handleResponse<T>(response);
}

async function post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'PUT',
    headers: getHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function del<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'DELETE',
    headers: getHeaders(),
    credentials: 'include',
  });
  return handleResponse<T>(response);
}

export const apiService = {
  get,
  post,
  put,
  delete: del
};
