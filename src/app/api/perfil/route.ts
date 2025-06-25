import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

interface EstudianteUpdate {
  nombre_estudiante?: string;
  apellido_estudiante?: string;
  fecha_nacimiento?: string;
  numero_celular?: string;
  id_pais?: number;
  id_ciudad?: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://microservice-estudiante.onrender.com';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const id = request.headers.get('x-student-id');
    
    if (!token || !id) {
      return NextResponse.json({
        success: false,
        message: 'Token e ID del estudiante son requeridos en headers',
        status: 401
      }, { status: 401 });
    }

    const response = await fetch(`${API_BASE}/api/estudiantes/${id}/perfil`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || 'Error al obtener datos del estudiante',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      data: data.estudiante,
      message: 'Datos del estudiante obtenidos con éxito'
    });
  } catch (error) {
    console.error('Error al obtener datos del estudiante:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener datos del estudiante',
      status: 500
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const id = request.headers.get('x-student-id');
    
    if (!token || !id) {
      return NextResponse.json({
        success: false,
        message: 'Token e ID del estudiante son requeridos en headers',
        status: 401
      }, { status: 401 });
    }

    const body: EstudianteUpdate = await request.json();

    const response = await fetch(`${API_BASE}/api/estudiantes/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || 'Error al actualizar datos del estudiante',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      data: data.estudiante,
      message: 'Datos del estudiante actualizados con éxito'
    });
  } catch (error) {
    console.error('Error al actualizar datos del estudiante:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar datos del estudiante',
      status: 500
    }, { status: 500 });
  }
}
