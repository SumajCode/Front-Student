export interface Resource {
  title: string;
  type: "download" | "link" | "code";
  url: string;
}

export type LessonType = "video" | "text";

export interface Lesson {
  id?: number;
  number: number;
  title: string;
  duration: number;
  completed: boolean;
  type: LessonType;
  hasResources: boolean;
  resources?: Resource[];
}

export interface Section {
  title: string;
  total: number;
  completed: number;
  duration: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  lesson: string;
  duration: string;
  videoUrl: string;
}

export interface CourseData {
  title: string;
  sections: Section[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Curso Python 3 desde cero",
    lesson: "Curso de programación profesional",
    duration: "Lectura • 1 min",
    videoUrl: "https://www.youtube.com/embed/mENHDQ8SLsI",
  },
  {
    id: 2,
    title: "Curso Python 3 desde cero #1",
    lesson: "Introducción e instalación de Python",
    duration: "Lectura • 13 min",
    videoUrl: "https://www.youtube.com/embed/DAdRO6ByBoU",
  }
];

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
          id: 1,
          number: 1,
          title: "Demo del proyecto terminado",
          duration: 4,
          completed: true,
          type: "video" as const,
          hasResources: false
        },
        {
          id: 2,
          number: 2,
          title: "Instalación de herramientas para el curso",
          duration: 2,
          completed: false,
          type: "video" as const,
          hasResources: true,
          resources: [
            {
              title: "Lista de herramientas",
              type: "download",
              url: "/resources/herramientas.pdf"
            },
            {
              title: "Código de configuración",
              type: "code",
              url: "https://github.com/sumajcode/setup"
            }
          ]
        },
        {
          id: 3,
          number: 3,
          title: "Fundamentos de PHP",
          duration: 1,
          completed: false,
          type: "video" as const,
          hasResources: true,
          resources: [
            {
              title: "Documentación PHP",
              type: "link",
              url: "https://www.php.net/docs.php"
            }
          ]
        },
        {
          id: 4,
          number: 4,
          title: "MIRA ESTA CLASE!!",
          duration: 1,
          completed: false,
          type: "video" as const,
          hasResources: false
        }
      ]
    },
    {
      title: "Configuración y Layout",
      total: 6,
      completed: 0,
      duration: 40,
      lessons: [
        {
          id: 5,
          number: 1,
          title: "Configuración inicial",
          duration: 8,
          completed: false,
          type: "video" as const,
          hasResources: true,
        },
        {
          id: 6,
          number: 2,
          title: "Creación del layout principal",
          duration: 12,
          completed: false,
          type: "video" as const,
          hasResources: true,
        },
        {
          id: 7,
          number: 3,
          title: "Configuración de Bootstrap 5",
          duration: 5,
          completed: false,
          type: "video" as const,
          hasResources: false,
        },
        {
          id: 8,
          number: 4,
          title: "Configuración de la base de datos",
          duration: 7,
          completed: false,
          type: "video" as const,
          hasResources: true,
        },
        {
          id: 9,
          number: 5,
          title: "Creación de la clase de conexión PDO",
          duration: 5,
          completed: false,
          type: "video" as const,
          hasResources: true,
        },
        {
          id: 10,
          number: 6,
          title: "Configuración de Datatables.js",
          duration: 3,
          completed: false,
          type: "video" as const,
          hasResources: false,
        }
      ]
    },
    {
      title: "Listar Registros",
      total: 2,
      completed: 0,
      duration: 26,
      lessons: [
        {
          id: 11,
          number: 1,
          title: "Creación del endpoint para listar registros",
          duration: 15,
          completed: false,
          type: "video" as const,
          hasResources: true,
        },
        {
          id: 12,
          number: 2,
          title: "Implementación de Datatables con Ajax",
          duration: 11,
          completed: false,
          type: "video" as const,
          hasResources: true,
        }
      ]
    },
    {
      title: "Crear Registro",
      total: 1,
      completed: 0,
      duration: 24,
      lessons: [
        {
          id: 13,
          number: 1,
          title: "Formulario y lógica para crear registros",
          duration: 24,
          completed: false,
          type: "video" as const,
          hasResources: true,
        }
      ]
    },
    {
      title: "Editar Registro",
      total: 2,
      completed: 0,
      duration: 14,
      lessons: [
        {
          id: 14,
          number: 1,
          title: "Obtener datos para editar",
          duration: 6,
          completed: false,
          type: "video" as const,
          hasResources: false,
        },
        {
          id: 15,
          number: 2,
          title: "Actualizar registro en la base de datos",
          duration: 8,
          completed: false,
          type: "video" as const,
          hasResources: true,
        }
      ]
    },
    {
      title: "Borrar Registro",
      total: 1,
      completed: 0,
      duration: 9,
      lessons: [
        {
          id: 16,
          number: 1,
          title: "Implementación de eliminación de registros",
          duration: 9,
          completed: false,
          type: "video" as const,
          hasResources: false,
        }
      ]
    },
    {
      title: "Ajustes Finales",
      total: 1,
      completed: 0,
      duration: 11,
      lessons: [
        {
          id: 17,
          number: 1,
          title: "Mejoras y optimizaciones",
          duration: 11,
          completed: false,
          type: "video" as const,
          hasResources: true,
        }
      ]
    },
    {
      title: "Siguiente Paso",
      total: 1,
      completed: 0,
      duration: 12,
      lessons: [
        {
          id: 18,
          number: 1,
          title: "Recursos adicionales y próximos pasos",
          duration: 12,
          completed: false,
          type: "video" as const,
          hasResources: true,
        }
      ]
    }
  ]
}
