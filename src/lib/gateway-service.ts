import { apiService } from './api-service';
import { API_ROUTES, LoginDto } from './api-config';

// Servicio para autenticación
export const authService = {
  login: async (credentials: LoginDto) => {
    try {
      // Usar nuestro endpoint interno en lugar del gateway externo
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          data,
          status: response.status,
        };
      }

      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        success: false,
        data: { message: error instanceof Error ? error.message : 'Error de conexión' },
        status: 0,
      };
    }
  },
  
  cambiarContrasenia: (data: { correoElectronico: string; nuevaContrasenia: string }) =>
    apiService.post(API_ROUTES.AUTH.CAMBIAR_CONTRASENIA, data),
};

// Servicio para estudiantes
export const estudiantesService = {
  listar: () => 
    apiService.get(API_ROUTES.ESTUDIANTES.LISTAR),
  
  obtenerPorId: (id: string) => 
    apiService.get(API_ROUTES.ESTUDIANTES.OBTENER.replace('id', id)),
    // Servicio directo para obtener estudiante (sin gateway)
  obtenerPorIdDirecto: async (id: string, token?: string) => {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json'
      };

      // Si hay token, agregarlo a los headers
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://microservice-estudiante.onrender.com';
      const url = `${API_BASE}/api/estudiantes/${id}`;
      console.log('🔍 API Call: URL:', url);
      console.log('🔍 API Call: Headers:', headers);

      const response = await fetch(url, {
        method: 'GET',
        headers
      });

      console.log('🔍 API Response: Status:', response.status);
      console.log('🔍 API Response: OK:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('🔍 API Response: Raw result:', result);
        console.log('🔍 API Response: result.data:', result.data);
        return {
          success: true,
          status: response.status,
          data: result.data // La API devuelve los datos en result.data
        };
      } else {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Error desconocido' }
      };
    }
  },
  
  registrar: (estudiante: any) => 
    apiService.post(API_ROUTES.ESTUDIANTES.REGISTRAR, estudiante),
  
  actualizar: (id: string, estudiante: any) => 
    apiService.put(API_ROUTES.ESTUDIANTES.ACTUALIZAR.replace('id', id), estudiante),
  
  eliminar: (id: string) => 
    apiService.delete(API_ROUTES.ESTUDIANTES.ELIMINAR.replace('id', id)),
  
  registrarLote: (estudiantes: any[]) => 
    apiService.post(API_ROUTES.ESTUDIANTES.REGISTRAR_LOTE, { estudiantes }),
};

// Servicio para contenido (archivos y módulos)
export const contenidoService = {
  archivo: {
    crear: (archivo: any) => 
      apiService.post(API_ROUTES.CONTENIDO.ARCHIVO.CREAR, archivo),
    
    editar: (archivo: any) => 
      apiService.put(API_ROUTES.CONTENIDO.ARCHIVO.EDITAR, archivo),
    
    eliminar: (id: string) => 
      apiService.delete(`${API_ROUTES.CONTENIDO.ARCHIVO.ELIMINAR}/${id}`),
    
    listar: () => 
      apiService.get(API_ROUTES.CONTENIDO.ARCHIVO.LISTAR),
  },
  
  modulo: {
    crear: (modulo: any) => 
      apiService.post(API_ROUTES.CONTENIDO.MODULO.CREAR, modulo),
    
    editar: (modulo: any) => 
      apiService.put(API_ROUTES.CONTENIDO.MODULO.EDITAR, modulo),
    
    eliminar: (id: string) => 
      apiService.delete(`${API_ROUTES.CONTENIDO.MODULO.ELIMINAR}/${id}`),
    
    listar: () => 
      apiService.get(API_ROUTES.CONTENIDO.MODULO.LISTAR),
  }
};

// Servicio para docentes
export const docentesService = {
  crear: (docente: any) => 
    apiService.post(API_ROUTES.DOCENTES.CREAR, docente),
  
  listar: () => 
    apiService.get(API_ROUTES.DOCENTES.LISTAR),
  
  obtenerPorId: (id: string) => 
    apiService.get(`${API_ROUTES.DOCENTES.OBTENER}/${id}`),
  
  editar: (docente: any) => 
    apiService.put(API_ROUTES.DOCENTES.EDITAR, docente),
  
  eliminar: (id: string) => 
    apiService.delete(`${API_ROUTES.DOCENTES.ELIMINAR}/${id}`),
  
  eliminarTodo: () => 
    apiService.delete(API_ROUTES.DOCENTES.ELIMINAR_TODO),
  
  materias: (docenteId: string) => 
    apiService.get(`${API_ROUTES.DOCENTES.MATERIAS}/${docenteId}`),
};

// Servicio para materias
export const materiasService = {
  crear: (materia: any) => 
    apiService.post(API_ROUTES.MATERIAS.CREAR, materia),
  
  listar: () => 
    apiService.get(API_ROUTES.MATERIAS.LISTAR),
  
  editar: (materia: any) => 
    apiService.put(API_ROUTES.MATERIAS.EDITAR, materia),
  
  eliminar: (id: string) => 
    apiService.delete(`${API_ROUTES.MATERIAS.ELIMINAR}/${id}`),
  
  eliminarTodo: () => 
    apiService.delete(API_ROUTES.MATERIAS.ELIMINAR_TODO),
  
  docentes: (materiaId: string) => 
    apiService.get(`${API_ROUTES.MATERIAS.DOCENTES}/${materiaId}`),
};

// Servicio para matrículas
export const matriculasService = {
  crear: (matricula: any) => 
    apiService.post(API_ROUTES.MATRICULA.CREAR, matricula),
  
  crearMatriculas: (matriculas: any[]) => 
    apiService.post(API_ROUTES.MATRICULA.CREAR_MATRICULAS, { matriculas }),
  
  eliminar: (id: string) => 
    apiService.delete(`${API_ROUTES.MATRICULA.ELIMINAR}/${id}`),
  
  listarPorMateria: (materiaId: string) => 
    apiService.get(`${API_ROUTES.MATRICULA.LISTAR_POR_MATERIA}/${materiaId}`),
};

// Servicio para compilador
export const compiladorService = {
  compilar: (codigo: { codigo: string; lenguaje: string }) => 
    apiService.post(API_ROUTES.COMPILADOR.COMPILAR, codigo),
  
  evaluar: (codigo: { codigo: string; lenguaje: string; casos_prueba?: any[] }) => 
    apiService.post(API_ROUTES.COMPILADOR.EVALUAR, codigo),
};

// Servicio para compilador directo (sin gateway)
export const compiladorDirectoService = {
  compilar: async (codigo: { codigo: string; lenguaje: string }) => {
    try {
      const compilerBaseUrl = process.env.NEXT_PUBLIC_COMPILER_API_URL || 'https://microservicecompilador.onrender.com';
      
      // Mapear al formato que espera la API del compilador
      const payload = {
        code: codigo.codigo,
        lang: codigo.lenguaje
      };
      
      const response = await fetch(`${compilerBaseUrl}/apicompilador/v1/code/compilar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          status: response.status,
          data: data
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Error desconocido' }
      };
    }
  },
  
  evaluar: async (codigo: { 
    codigo: string; 
    lenguaje: string; 
    outputs?: any[]; 
    inputs?: any[]; 
    functionInvoke?: string;
    rules?: any;
  }) => {
    try {
      const compilerBaseUrl = process.env.NEXT_PUBLIC_COMPILER_API_URL || 'https://microservicecompilador.onrender.com';
      
      // Mapear al formato que espera la API del compilador para evaluar
      const payload = {
        code: codigo.codigo,
        lang: codigo.lenguaje,
        outputs: codigo.outputs || [],
        inputs: codigo.inputs || [],
        functionInvoke: codigo.functionInvoke || '',
        rules: codigo.rules || {
          functions: {
            functionNames: []
          }
        }
      };
      
      console.log('Enviando a /evaluar:', payload);
      
      const response = await fetch(`${compilerBaseUrl}/apicompilador/v1/code/evaluar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          status: response.status,
          data: data
        };
      } else {
        const errorData = await response.json();
        return {
          success: false,
          status: response.status,
          data: errorData
        };
      }
    } catch (error) {
      return {
        success: false,
        status: 0,
        data: { error: error instanceof Error ? error.message : 'Error desconocido' }
      };
    }
  }
};

// Servicio para probar la conectividad del gateway
export const gatewayService = {
  // Obtener información del gateway (rutas disponibles)
  info: () => 
    apiService.get('/'),
  
  // Verificar salud del gateway
  health: () => 
    apiService.get('/health'),
  
  // Probar conectividad con cada microservicio
  testConectividad: async () => {
    const tests = [
      { nombre: 'Estudiantes', test: () => estudiantesService.listar() },
      { nombre: 'Docentes', test: () => docentesService.listar() },
      { nombre: 'Materias', test: () => materiasService.listar() },
      { nombre: 'Contenido - Módulos', test: () => contenidoService.modulo.listar() },
      { nombre: 'Contenido - Archivos', test: () => contenidoService.archivo.listar() },
    ];

    const resultados = [];
    
    for (const { nombre, test } of tests) {
      try {
        const inicio = performance.now();
        await test();
        const tiempo = Math.round(performance.now() - inicio);
        resultados.push({ nombre, estado: 'OK', tiempo: `${tiempo}ms` });
      } catch (error) {
        resultados.push({ 
          nombre, 
          estado: 'ERROR', 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    }
    
    return resultados;
  }
};
