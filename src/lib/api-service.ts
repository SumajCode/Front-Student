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
    headers: API_CONFIG.headers,
    credentials: 'include',
  });
  return handleResponse<T>(response);
}

async function post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'POST',
    headers: API_CONFIG.headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'PUT',
    headers: API_CONFIG.headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse<T>(response);
}

async function del<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(API_CONFIG.baseURL + url, {
    method: 'DELETE',
    headers: API_CONFIG.headers,
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
