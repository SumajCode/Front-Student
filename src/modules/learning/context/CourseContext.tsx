"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// Servicios - Se implementarán cuando la API esté lista
// import { CursosService } from '../services/cursosService';

interface Module {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  content: string;
  videoUrl?: string;
  duration?: string | number;
  resources?: boolean;
  hasSubItems?: boolean;
}

interface CourseContextType {
  currentModuleId: number;
  currentModule: Module | undefined;
  modules: Module[];
  navigateToModule: (moduleId: number) => void;
  courseName: string;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Estado inicial y datos de ejemplo mientras no hay API
// const cursosService = new CursosService(); // Se implementará cuando la API esté lista
const courseData = {
  name: 'Cisco Networking Basics',
  modules: [    {
      id: 1,
      title: 'Introducción a las Redes',
      description: 'Conceptos fundamentales de redes',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/OVeC3v2oLiI?autoplay=0&rel=0&modestbranding=1&showinfo=0',
      content: 'En este módulo aprenderemos los conceptos básicos de redes de computadoras, incluyendo:\n\n- Tipos de redes\n- Topologías de red\n- Protocolos básicos\n- Modelo OSI\n- Dispositivos de red',
      duration: '45 min',
      resources: true,
      hasSubItems: true
    },    {
      id: 2,
      title: 'Configuración Básica de Router',
      description: 'Primeros pasos con routers Cisco',
      completed: false,
      content: 'Aprenderemos a configurar un router Cisco desde cero, cubriendo:\n\n- Acceso a la línea de comandos\n- Configuración inicial\n- Configuración de interfaces\n- Enrutamiento básico',
      duration: '30 min',
      resources: true,
      hasSubItems: true
    },    {
      id: 3,
      title: 'Protocolos de Enrutamiento',
      description: 'OSPF, EIGRP y otros protocolos',
      completed: false,
      content: 'Estudiaremos los diferentes protocolos de enrutamiento:\n\n- RIP v2\n- OSPF\n- EIGRP\n- BGP\n- Configuración y troubleshooting',
      duration: '60 min',
      resources: true,
      hasSubItems: true
    },    {
      id: 4,
      title: 'Seguridad en Redes',
      description: 'Configuración de seguridad básica',
      completed: false,
      duration: '50 min',
      resources: true,
      hasSubItems: true,
      content: 'Implementaremos medidas de seguridad en nuestra red:\n\n- ACLs (Access Control Lists)\n- VLANs\n- Port Security\n- SSH\n- Best practices'
    }
  ] as Module[]
};

interface CourseProviderProps {
  children: React.ReactNode;
  initialModuleId: number;
}

export function CourseProvider({ children, initialModuleId }: CourseProviderProps) {
  const router = useRouter();
  const [currentModuleId, setCurrentModuleId] = useState(initialModuleId);

  const currentModule = courseData.modules.find(m => m.id === currentModuleId);

  const navigateToModule = useCallback((moduleId: number) => {
    if (moduleId >= 1 && moduleId <= courseData.modules.length) {
      setCurrentModuleId(moduleId);
      router.push(`/learning/viewer/${moduleId}`, { scroll: false });
    }
  }, [router]);

  const value = {
    currentModuleId,
    currentModule,
    modules: courseData.modules,
    navigateToModule,
    courseName: courseData.name
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseNavigation() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseNavigation must be used within a CourseProvider');
  }
  return context;
}
