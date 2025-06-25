import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://microservice-estudiante.onrender.com';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Iniciando proceso de autenticación...');
    
    const body = await request.json();
    console.log('🔍 Datos recibidos:', { correo: body.correo, contrasenia: body.contrasenia ? '[HIDDEN]' : 'undefined' });
    
    if (!body.correo || !body.contrasenia) {
      console.log('❌ Faltan credenciales');
      return NextResponse.json({
        status: 400,
        message: 'Correo y contraseña son obligatorios'
      }, { status: 400 });
    }

    // PASO 1: Autenticar al usuario y obtener su ID
    console.log('🔍 PASO 1: Autenticando usuario...');
    const loginResponse = await fetch(`${API_BASE}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        correo_estudiante: body.correo,
        contrasenia: body.contrasenia
      })
    });

    console.log('🔍 Respuesta del login - Status:', loginResponse.status);

    if (!loginResponse.ok) {
      const loginError = await loginResponse.json();
      console.log('❌ Login fallido - Status:', loginResponse.status, 'Message:', loginError.message);
      return NextResponse.json({
        status: loginResponse.status,
        message: loginError.message || 'Credenciales inválidas'
      }, { status: loginResponse.status });
    }

    const loginData = await loginResponse.json();
    console.log('🔍 Datos del login:', JSON.stringify(loginData, null, 2));

    // Extraer el ID del estudiante de la respuesta del login
    const estudianteId = loginData.data?.id_estudiante;
    if (!estudianteId) {
      console.error('❌ No se encontró el ID del estudiante en la respuesta del login');
      return NextResponse.json({
        status: 400,
        message: 'No se pudo obtener el ID del estudiante'
      }, { status: 400 });
    }

    console.log('✅ Login exitoso, ID del estudiante:', estudianteId);

    // PASO 2: Obtener los datos completos del estudiante usando el ID
    console.log('🔍 PASO 2: Obteniendo datos completos del estudiante...');
    const estudianteResponse = await fetch(`${API_BASE}/api/estudiantes/${estudianteId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    console.log('🔍 Respuesta de datos del estudiante - Status:', estudianteResponse.status);

    if (!estudianteResponse.ok) {
      const estudianteError = await estudianteResponse.json();
      console.log('❌ Error obteniendo datos del estudiante:', estudianteError);
      return NextResponse.json({
        status: estudianteResponse.status,
        message: 'No se pudieron obtener los datos completos del estudiante'
      }, { status: estudianteResponse.status });
    }

    const estudianteData = await estudianteResponse.json();
    console.log('🔍 Datos completos del estudiante:', JSON.stringify(estudianteData, null, 2));

    // Extraer los datos del estudiante
    const estudiante = estudianteData.data;
    if (!estudiante) {
      console.error('❌ No se encontraron datos del estudiante');
      return NextResponse.json({
        status: 400,
        message: 'No se pudieron obtener los datos del estudiante'
      }, { status: 400 });
    }

    console.log('✅ Datos completos del estudiante obtenidos exitosamente');

    // DEBUG: Log de cada campo individual
    console.log('🔍 Validación de campos:');
    console.log('  - id_estudiante:', estudiante.id_estudiante);
    console.log('  - nombre_estudiante:', estudiante.nombre_estudiante);
    console.log('  - apellido_estudiante:', estudiante.apellido_estudiante);
    console.log('  - correo_estudiante:', estudiante.correo_estudiante);
    console.log('  - numero_celular:', estudiante.numero_celular);
    console.log('  - es_universitario:', estudiante.es_universitario);
    console.log('  - fecha_nacimiento:', estudiante.fecha_nacimiento);
    console.log('  - fecha_registro:', estudiante.fecha_registro);
    console.log('  - fecha_ultimo_acceso:', estudiante.fecha_ultimo_acceso);
    console.log('  - id_ciudad:', estudiante.id_ciudad);
    console.log('  - id_pais:', estudiante.id_pais);
    
    // Validar y mapear cada campo específicamente
    const mappedData = {
      id: estudiante.id_estudiante?.toString() || null,
      id_estudiante: estudiante.id_estudiante || null,
      nombre: estudiante.nombre_estudiante || 'No disponible',
      nombre_estudiante: estudiante.nombre_estudiante || 'No disponible',
      apellido: estudiante.apellido_estudiante || estudiante.apellido || 'No disponible',
      apellido_estudiante: estudiante.apellido_estudiante || estudiante.apellido || 'No disponible',
      correo: estudiante.correo_estudiante || 'No disponible',
      correo_estudiante: estudiante.correo_estudiante || 'No disponible',
      telefono: estudiante.numero_celular || estudiante.telefono || 'No disponible',
      numero_celular: estudiante.numero_celular || estudiante.telefono || 'No disponible',
      es_universitario: estudiante.es_universitario,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      fecha_registro: estudiante.fecha_registro,
      fecha_ultimo_acceso: estudiante.fecha_ultimo_acceso,
      id_ciudad: estudiante.id_ciudad,
      id_pais: estudiante.id_pais
    };

    // Si la autenticación es exitosa, devolver los datos en el formato correcto
    const responseData = {
      status: 200,
      message: 'Login exitoso',
      token: `auth_token_${estudiante.id_estudiante}_${Date.now()}`, // Token temporal hasta tener uno real
      estudiante: mappedData
    };
    
    // DEBUG: Log para ver el objeto final que se envía
    console.log('🔍 Objeto final de respuesta:', JSON.stringify(responseData, null, 2));
    console.log('✅ Login completado exitosamente');
    
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ Error crítico en autenticación:', error);
    console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack available');
    return NextResponse.json({
      status: 500,
      message: error instanceof Error ? error.message : 'Error interno del servidor'
    }, { status: 500 });
  }
}