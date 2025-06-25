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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const studentId = request.headers.get('x-student-id');
    const { id } = params;
    
    if (!token || !studentId) {
      return NextResponse.json({
        success: false,
        message: 'Token e ID del estudiante son requeridos en headers',
        status: 401
      }, { status: 401 });
    }

    // Verificar que el ID del estudiante coincida con el del token
    if (studentId !== id) {
      return NextResponse.json({
        success: false,
        message: 'No autorizado para actualizar este perfil',
        status: 403
      }, { status: 403 });
    }

    const updateData: EstudianteUpdate = await request.json();

    // Validar que solo se incluyan campos permitidos
    const allowedFields = [
      'nombre_estudiante',
      'apellido_estudiante', 
      'fecha_nacimiento',
      'numero_celular',
      'id_pais',
      'id_ciudad'
    ];

    const filteredData: any = {};
    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key as keyof EstudianteUpdate];
      }
    });

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No hay campos válidos para actualizar',
        status: 400
      }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/api/estudiantes/actualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(filteredData)
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
      data: data.estudiante || data,
      message: 'Datos del estudiante actualizados con éxito'
    });

  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error interno del servidor',
      status: 500
    }, { status: 500 });
  }
}
