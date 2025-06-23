// Interfaces para los componentes de cursos
export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: string;
  instructor: string;
}

export interface CourseCardExploreProps extends Omit<CourseCardProps, 'progress'> {
  level: string;
  studentsCount: number;
}

// Interfaz para el menú desplegable de cursos
export interface CourseDropdownMenuProps {
  courseId: string;
  hasResources?: boolean;
  hasCertificate?: boolean;
}

// Otros tipos del sistema pueden agregarse aquí
