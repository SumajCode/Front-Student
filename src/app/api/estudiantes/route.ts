import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiService } from '@/lib/api-service';
import { API_ROUTES } from '@/lib/api-config';
import { isValidEmail, isValidDate } from '@/lib/validations';

interface EstudianteData {
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
  contrasenia?: string;
  fecha_nacimiento: string;
  numero_celular: string;
  id_pais: number;
  id_ciudad: number;
  es_universitario?: boolean;
  fecha_registro?: string;
  fecha_ultimo_acceso?: string | null;
}

// Obtener la lista de estudiantes
export async function GET() {
  try {
    // Verificar que tenemos acceso a la variable de entorno
    if (!process.env.BACKEND_URL) {
      console.error('BACKEND_URL no está definida');
      throw new Error('Configuración del backend no encontrada');
    }

    console.log('Iniciando request al backend...');
    const url = `${process.env.BACKEND_URL}/api/estudiantes`;
    console.log('URL completa:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error del backend:', errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log('Respuesta del backend:', data);

    return NextResponse.json({
      success: true,
      data: Array.isArray(data?.data) ? data.data : [],
      message: data?.message || 'Estudiantes obtenidos con éxito'
    });
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: error instanceof Error ? error.message : 'Error desconocido',
        status: 500
      },
      { status: 500 }
    );
  }
}

// Registrar un nuevo estudiante
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Iniciando registro de estudiante');
    
    // Verificar que tenemos acceso a la variable de entorno
    if (!process.env.BACKEND_URL) {
      console.error('❌ BACKEND_URL no está configurada');
      throw new Error('Configuración del backend no encontrada');
    }

    const body = await request.json();
    console.log('📦 Datos recibidos:', JSON.stringify(body, null, 2));
    
    // Validar campos requeridos según documentación
    const requiredFields = [
      'nombre_estudiante',
      'apellido_estudiante',
      'correo_estudiante',
      'contrasenia',
      'fecha_nacimiento',
      'numero_celular',
      'id_pais',
      'id_ciudad'
    ];
    console.log('🔍 Validando campos requeridos:', requiredFields);
    const missingFields = requiredFields.filter(field => {
      const value = body[field];
      return value === undefined || value === null || value === '';
    });
    
    if (missingFields.length > 0) {
      console.error('❌ Campos faltantes:', missingFields);      return NextResponse.json({
        status: 400,
        message: "Faltan campos obligatorios",
        errors: missingFields.reduce((acc, field) => ({
          ...acc,
          [field]: "Este campo es requerido."
        }), {})
      }, { status: 400 });
    }

    // Validar formato de los campos
    if (!isValidEmail(body.correo_estudiante)) {
      console.error('❌ Formato de correo inválido:', body.correo_estudiante);
      return NextResponse.json({
        success: false,
        message: 'El formato del correo electrónico no es válido',
        status: 400
      }, { status: 400 });
    }

    // Validar formato de fecha y convertir si es necesario
    if (body.fecha_nacimiento) {
      // Verificar si la fecha está en formato DD-MM-YYYY
      const dateMatch = body.fecha_nacimiento.match(/^(\d{2})-(\d{2})-(\d{4})$/);
      if (dateMatch) {
        // Convertir a formato YYYY-MM-DD
        const [, day, month, year] = dateMatch;
        body.fecha_nacimiento = `${year}-${month}-${day}`;
      }
    }

    // Validar formato de fecha
    if (!isValidDate(body.fecha_nacimiento)) {
      return NextResponse.json({
        success: false,
        message: 'Formato de fecha inválido o fecha no válida',
        status: 400
      }, { status: 400 });
    }    // Sanitizar y validar los datos
    const sanitizedData = {
      nombre_estudiante: body.nombre_estudiante.trim(),
      apellido_estudiante: body.apellido_estudiante.trim(),
      correo_estudiante: body.correo_estudiante.trim().toLowerCase(),
      contrasenia: body.contrasenia,
      fecha_nacimiento: body.fecha_nacimiento,
      numero_celular: body.numero_celular || '',
      id_pais: Number(body.id_pais) || 1,
      id_ciudad: Number(body.id_ciudad) || 1,
      es_universitario: false
    };

    const url = `${process.env.BACKEND_URL}/api/estudiantes/registrar`;
    console.log('🎯 URL completa:', url);
    console.log('📤 Datos a enviar:', JSON.stringify(sanitizedData, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sanitizedData)
    });

    console.log('📥 Status de la respuesta:', response.status);
    console.log('📥 Headers de la respuesta:', Object.fromEntries(response.headers));
    
    let responseData;
    try {
      const responseText = await response.text();
      console.log('📥 Respuesta texto crudo:', responseText);
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ Error al parsear la respuesta:', parseError);
      throw new Error('Error al procesar la respuesta del servidor');
    }

    if (!response.ok) {
      console.error('❌ Error del backend:', responseData);
      return NextResponse.json({
        success: false,
        message: responseData.message || 'Error al registrar estudiante',
        status: response.status
      }, { status: response.status });
    }    return NextResponse.json({
      status: 201,
      message: "Estudiante creado exitosamente",
      data: responseData.data
    }, { status: 201 });
  } catch (error) {
    console.error('Error en el registro:', error);    return NextResponse.json({
      status: 500,
      message: "Error interno del servidor",
      error: error instanceof Error ? error.message : 'Error al registrar estudiante'
    }, { status: 500 });
  }
}

// La función isValidDate ahora se importa desde @/lib/validations

// Actualizar datos de un estudiante
export async function PUT(request: NextRequest) {
  try {
    if (!process.env.BACKEND_URL) {
      console.error('❌ BACKEND_URL no está configurada');
      throw new Error('Configuración del backend no encontrada');
    }

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID de estudiante no proporcionado',
        status: 400
      }, { status: 400 });
    }

    // Validar campos proporcionados
    const updateableFields = [
      'nombre_estudiante',
      'apellido_estudiante',
      'correo_estudiante',
      'fecha_nacimiento'
    ] as const;

    const updates: Partial<EstudianteData> = {};
    let hasValidUpdates = false;    // Validar y actualizar cada campo permitido
    updateableFields.forEach((field) => {
      const value = body[field];
      if (value !== undefined && value !== null && value !== '') {
        switch (field) {
          case 'nombre_estudiante':
            updates.nombre_estudiante = value;
            hasValidUpdates = true;
            break;
          case 'apellido_estudiante':
            updates.apellido_estudiante = value;
            hasValidUpdates = true;
            break;
          case 'correo_estudiante':
            updates.correo_estudiante = value;
            hasValidUpdates = true;
            break;
          case 'fecha_nacimiento':
            updates.fecha_nacimiento = value;
            hasValidUpdates = true;
            break;
        }
      }
    });

    if (!hasValidUpdates) {
      return NextResponse.json({
        success: false,
        message: 'No se proporcionaron datos válidos para actualizar',
        status: 400
      }, { status: 400 });
    }

    // Validar formato de correo si se proporciona
    if (updates.correo_estudiante && !isValidEmail(updates.correo_estudiante)) {
      return NextResponse.json({
        success: false,
        message: 'El formato del correo electrónico no es válido',
        status: 400
      }, { status: 400 });
    }

    // Validar formato de fecha si se proporciona
    if (updates.fecha_nacimiento && !isValidDate(updates.fecha_nacimiento)) {
      return NextResponse.json({
        success: false,
        message: 'Formato de fecha inválido. Use YYYY-MM-DD',
        status: 400
      }, { status: 400 });
    }    // Asignar valores por defecto para los campos requeridos por el backend
    const dataToUpdate = {
      ...updates,
      id_pais: '1', // Valor por defecto
      id_ciudad: '1', // Valor por defecto
      contrasenia: updates.contrasenia || '' // La contraseña no se actualiza en PUT
    } as StudentDataInput;

    // Sanitizar los datos de actualización
    const sanitizedData = sanitizeStudentData(dataToUpdate);
    
    const url = `${process.env.BACKEND_URL}/api/estudiantes/${id}`;
    console.log('🔄 Intentando actualizar estudiante:', url);
    console.log('📤 Datos de actualización:', sanitizedData);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(sanitizedData)
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error('❌ Error al parsear la respuesta del backend:', parseError);
      throw new Error('Error al procesar la respuesta del servidor');
    }

    if (!response.ok) {
      console.error('❌ Error del backend:', responseData);
      return NextResponse.json({
        success: false,
        message: responseData.message || 'Error al actualizar estudiante',
        status: response.status
      }, { status: response.status });
    }

    return NextResponse.json({
      success: true,
      data: responseData.data,
      message: 'Estudiante actualizado con éxito'
    });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al actualizar estudiante',
      status: 500
    }, { status: 500 });
  }
}

// Eliminar un estudiante
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID de estudiante no proporcionado',
        status: 400
      }, { status: 400 });
    }
    
    await apiRequest(
      API_ROUTES.ESTUDIANTES.ELIMINAR(id),
      { method: 'DELETE' }
    );

    return NextResponse.json({
      success: true,
      message: 'Estudiante eliminado correctamente',
      status: 204
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Error al eliminar estudiante',
      status: 500
    }, { status: 500 });
  }
}
