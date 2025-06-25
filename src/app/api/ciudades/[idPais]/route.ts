import { NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://microservice-estudiante.onrender.com';

export async function GET(
  request: Request,
  { params }: { params: { idPais: string } }
) {
  try {
    const { idPais } = params;
    
    if (!idPais) {
      return NextResponse.json({
        success: false,
        message: 'ID del país es requerido',
        status: 400
      }, { status: 400 });
    }

    const response = await fetch(`${API_BASE}/api/ciudades/${idPais}`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        message: data.message || 'Error al obtener ciudades',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      data: data.data,
      message: data.message || 'Ciudades obtenidas con éxito'
    });
  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al obtener ciudades',
      status: 500
    }, { status: 500 });
  }
}
