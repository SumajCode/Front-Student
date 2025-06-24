import { NextResponse } from 'next/server';

const API_BASE = 'https://microservice-estudiante.onrender.com';

export async function GET() {
  try {
    const response = await fetch(`${API_BASE}/api/paises`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || 'Error al obtener países',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      data: data.data,
      message: data.message || 'Países obtenidos con éxito'
    });
  } catch (error) {
    console.error('Error al obtener países:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener países',
      status: 500
    }, { status: 500 });
  }
}
