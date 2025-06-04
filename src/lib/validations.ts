export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  const timestamp = date.getTime();
  
  if (isNaN(timestamp)) return false;
  
  // Validar que la fecha no sea futura
  if (timestamp > Date.now()) return false;
  
  // Validar que la persona tenga al menos 5 años
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  if (timestamp > fiveYearsAgo.getTime()) return false;
  
  return true;
}

export interface StudentDataInput {
  nombre_estudiante: string;
  apellido_estudiante: string;
  correo_estudiante: string;
  contrasenia: string;
  fecha_nacimiento: string;
  numero_celular?: string | number;
  id_pais: string | number;
  id_ciudad: string | number;
}

export function sanitizeStudentData(data: StudentDataInput) {
  return {
    nombre_estudiante: String(data.nombre_estudiante).trim(),
    apellido_estudiante: String(data.apellido_estudiante).trim(),
    correo_estudiante: String(data.correo_estudiante).trim().toLowerCase(),
    contrasenia: String(data.contrasenia),
    fecha_nacimiento: String(data.fecha_nacimiento),
    numero_celular: data.numero_celular ? String(data.numero_celular).trim() : undefined,
    id_pais: Number(data.id_pais),
    id_ciudad: Number(data.id_ciudad)
  };
}
