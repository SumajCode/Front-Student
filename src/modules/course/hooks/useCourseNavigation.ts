"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Datos del curso
const courseData = {
  nombre: 'Git GitHub Actions, Buenas Prácticas de Integración Continua',
  modulos: [
    {
      id: 1,
      titulo: 'Introducción al curso',
      contenido: 'Bienvenido al curso. En este módulo aprenderás los fundamentos de Git y GitHub Actions.',
      video: 'https://www.youtube.com/embed/sl4GO6pgRas',
    },
    {
      id: 2,
      titulo: 'Configuración del entorno',
      contenido: 'Aquí configuraremos nuestro entorno de desarrollo: Git, GitHub y las herramientas necesarias.',
      video: 'https://www.youtube.com/embed/sl4GO6pgRas',
    },
    {
      id: 3,
      titulo: 'Primer proyecto',
      contenido: 'Crearemos nuestro primer workflow de GitHub Actions.',
      video: 'https://www.youtube.com/embed/sl4GO6pgRas',
    },
    {
      id: 4,
      titulo: 'Resumen final',
      contenido: 'Repasaremos los conceptos aprendidos y veremos los siguientes pasos.',
      video: 'https://www.youtube.com/embed/sl4GO6pgRas',
    },
  ]
};

// Mapeo de slugs a IDs
const slugToId: { [key: string]: number } = {
  "introduccion": 1,
  "configuracion": 2,
  "primer-proyecto": 3,
  "resumen": 4,
};

const idToSlug: { [key: number]: string } = {
  1: "introduccion",
  2: "configuracion",
  3: "primer-proyecto",
  4: "resumen",
};

export function useCourseNavigation() {
  const router = useRouter();
  const params = useParams();
  const [currentModuleId, setCurrentModuleId] = useState(1);

  useEffect(() => {
    const slug = params?.slug as string;
    if (slug && slugToId[slug]) {
      setCurrentModuleId(slugToId[slug]);
    }
  }, [params]);  const navigateToNextModule = () => {
    if (currentModuleId < Object.keys(idToSlug).length) {
      const nextModuleId = currentModuleId + 1;
      setCurrentModuleId(nextModuleId);
      router.push(`/course/${idToSlug[nextModuleId]}`);
    }
  };

  const navigateToPreviousModule = () => {
    if (currentModuleId > 1) {
      const previousModuleId = currentModuleId - 1;
      setCurrentModuleId(previousModuleId);
      router.push(`/course/${idToSlug[previousModuleId]}`);
    }
  };

  const navigateToModule = (moduleId: number) => {
    if (idToSlug[moduleId]) {
      setCurrentModuleId(moduleId);
      router.push(`/course/${idToSlug[moduleId]}`);
    }
  };
  const modules = courseData.modulos.map(mod => ({
    id: mod.id,
    title: mod.titulo,
    path: `/course/${idToSlug[mod.id]}`,
    video: mod.video,
    contenido: mod.contenido
  }));
  return {
    modules,
    currentModuleId,
    navigateToModule,
    navigateToNextModule,
    navigateToPreviousModule,
    currentModule: modules.find(mod => mod.id === currentModuleId)
  };
}
