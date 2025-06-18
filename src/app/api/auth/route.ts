import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE = 'https://microservice-estudiante.onrender.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.correo || !body.contrasenia) {
      return NextResponse.json({
        status: 400,
        message: 'Correo y contraseña son obligatorios'
      });
    }

    // Llamar al endpoint de login del backend
    const response = await fetch(`${API_BASE}/estudiantes/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo_estudiante: body.correo,
        contrasenia: body.contrasenia
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        status: response.status,
        message: data.message || 'Error de autenticación'
      });
    }

    // Si la autenticación es exitosa, devolver los datos
    return NextResponse.json({
      status: 200,
      message: 'Login exitoso',
      data: {
        token: data.data?.token || data.token,
        estudiante: {
          id: data.data?.id_estudiante || data.id_estudiante,
          nombre: data.data?.nombre_estudiante || data.nombre_estudiante,
          correo: data.data?.correo_estudiante || data.correo_estudiante
        }
      }
    });

  } catch (error) {
    console.error('Error en autenticación:', error);
    return NextResponse.json({
      status: 500,
      message: error instanceof Error ? error.message : 'Error interno del servidor'
    });
  }
}
