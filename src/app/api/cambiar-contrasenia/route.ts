import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE = 'https://microservice-estudiante.onrender.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { correo_estudiante, contrasenia_actual, nueva_contrasenia } = body;
    
    if (!correo_estudiante || !contrasenia_actual || !nueva_contrasenia) {
      return NextResponse.json({
        success: false,
        message: 'Correo del estudiante, contraseña actual y nueva contraseña son requeridas',
        status: 400
      }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/api/login/cambiarContrasenia`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correo_estudiante,
        contrasenia_actual,
        nueva_contrasenia
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || 'Error al cambiar contraseña',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Contraseña actualizada con éxito',
      data
    });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al cambiar contraseña',
      status: 500
    }, { status: 500 });
  }
}