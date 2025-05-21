export interface Lesson {
  number: number
  title: string
  duration: number
  completed: boolean
  type: "video" | "text"
  hasResources: boolean
}

export interface Section {
  title: string
  total: number
  completed: number
  duration: number
  lessons: Lesson[]
}

export interface CourseData {
  title: string
  sections: Section[]
}

export const courseData: CourseData = {
  title: "Aprende a crear un CRUD (Server Side) con PHP, PDO, Ajax y Datatables.js y Bootstrap 5",
  sections: [
    {
      title: "Introducción",
      total: 4,
      completed: 1,
      duration: 7,
      lessons: [
        {
          number: 1,
          title: "Demo del proyecto terminado",
          duration: 4,
          completed: true,
          type: "video",
          hasResources: false,
        },
        {
          number: 2,
          title: "Instalación de herramientas para el curso",
          duration: 2,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 3,
          title: "Fundamentos de PHP",
          duration: 1,
          completed: false,
          type: "video",
          hasResources: false,
        },
        {
          number: 4,
          title: "MIRA ESTA CLASE!!",
          duration: 1,
          completed: false,
          type: "video",
          hasResources: false,
        },
      ],
    },
    {
      title: "Configuración y Layout",
      total: 6,
      completed: 0,
      duration: 40,
      lessons: [
        {
          number: 1,
          title: "Configuración inicial",
          duration: 8,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 2,
          title: "Creación del layout principal",
          duration: 12,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 3,
          title: "Configuración de Bootstrap 5",
          duration: 5,
          completed: false,
          type: "video",
          hasResources: false,
        },
        {
          number: 4,
          title: "Configuración de la base de datos",
          duration: 7,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 5,
          title: "Creación de la clase de conexión PDO",
          duration: 5,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 6,
          title: "Configuración de Datatables.js",
          duration: 3,
          completed: false,
          type: "video",
          hasResources: false,
        },
      ],
    },
    {
      title: "Listar Registros",
      total: 2,
      completed: 0,
      duration: 26,
      lessons: [
        {
          number: 1,
          title: "Creación del endpoint para listar registros",
          duration: 15,
          completed: false,
          type: "video",
          hasResources: true,
        },
        {
          number: 2,
          title: "Implementación de Datatables con Ajax",
          duration: 11,
          completed: false,
          type: "video",
          hasResources: true,
        },
      ],
    },
    {
      title: "Crear Registro",
      total: 1,
      completed: 0,
      duration: 24,
      lessons: [
        {
          number: 1,
          title: "Formulario y lógica para crear registros",
          duration: 24,
          completed: false,
          type: "video",
          hasResources: true,
        },
      ],
    },
    {
      title: "Editar Registro",
      total: 2,
      completed: 0,
      duration: 14,
      lessons: [
        {
          number: 1,
          title: "Obtener datos para editar",
          duration: 6,
          completed: false,
          type: "video",
          hasResources: false,
        },
        {
          number: 2,
          title: "Actualizar registro en la base de datos",
          duration: 8,
          completed: false,
          type: "video",
          hasResources: true,
        },
      ],
    },
    {
      title: "Borrar Registro",
      total: 1,
      completed: 0,
      duration: 9,
      lessons: [
        {
          number: 1,
          title: "Implementación de eliminación de registros",
          duration: 9,
          completed: false,
          type: "video",
          hasResources: false,
        },
      ],
    },
    {
      title: "Ajustes Finales",
      total: 1,
      completed: 0,
      duration: 11,
      lessons: [
        {
          number: 1,
          title: "Mejoras y optimizaciones",
          duration: 11,
          completed: false,
          type: "video",
          hasResources: true,
        },
      ],
    },
    {
      title: "Siguiente Paso",
      total: 1,
      completed: 0,
      duration: 12,
      lessons: [
        {
          number: 1,
          title: "Recursos adicionales y próximos pasos",
          duration: 12,
          completed: false,
          type: "video",
          hasResources: true,
        },
      ],
    },
  ],
}
