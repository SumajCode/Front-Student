'use client';
import React from 'react';
import Link from 'next/link';
import CourseCard from '@/components/CourseCard';

// Datos de ejemplo para los cursos
const EXAMPLE_COURSES = [
  {
    id: '1',
    title: 'Desarrollo Web con React y Next.js',
    description: 'Aprende a construir aplicaciones web modernas con React y Next.js desde cero.',
    thumbnail: '/course-thumbnails/react-next.jpg',
    progress: 60,
    duration: '8h 30m',
    instructor: 'Kevin Verduguez'
  },
  {
    id: '2',
    title: 'Python para Ciencia de Datos',
    description: 'Domina Python y sus librerías principales para análisis de datos y machine learning.',
    thumbnail: '/course-thumbnails/python.jpg',
    progress: 30,
    duration: '12h 15m',
    instructor: 'Ana Martínez'
  },
  {
    id: '3',
    title: 'TypeScript Avanzado',
    description: 'Lleva tus habilidades de TypeScript al siguiente nivel con patrones avanzados.',
    thumbnail: '/course-thumbnails/typescript.jpg',
    progress: 15,
    duration: '6h 45m',
    instructor: 'Carlos Ruiz'
  },
  {
    id: '4',
    title: 'JavaScript Moderno',
    description: 'Domina las últimas características de JavaScript y mejora tus habilidades de programación.',
    thumbnail: '/course-thumbnails/javascript.jpg',
    progress: 45,
    duration: '10h 20m',
    instructor: 'María García'
  },
  {
    id: '5',
    title: 'Introducción a Data Science',
    description: 'Aprende los fundamentos del análisis de datos y la ciencia de datos.',
    thumbnail: '/course-thumbnails/data-science.jpg',
    progress: 75,
    duration: '15h 45m',
    instructor: 'David López'
  },
  {
    id: '6',
    title: 'Machine Learning Práctico',
    description: 'Implementa modelos de machine learning con Python y scikit-learn.',
    thumbnail: '/course-thumbnails/machine-learning.jpg',
    progress: 20,
    duration: '18h 30m',
    instructor: 'Laura Ramírez'
  }
];

export default function MiAprendizajePage() {
  const visualizedMinutes = 24;

  return (
    <div className="min-h-screen bg-white">
      {/* Header con título y tiempo visualizado */}
      <div className="bg-gray-900 text-white py-12 px-8">
        <h1 className="text-4xl font-bold mb-4">Mi aprendizaje</h1>
        <div className="flex items-center gap-2">
          <span>{visualizedMinutes} min visualizados</span>
          <span className="mx-2">•</span>
          <Link href="/actividad" className="text-purple-400 hover:underline">
            Ver toda la actividad
          </Link>
        </div>
      </div>

      {/* Navegación */}
      <nav className="border-b border-gray-200">
        <div className="px-8">
          <ul className="flex gap-8">
            <li className="border-b-2 border-purple-600 py-4">
              <a href="#" className="text-purple-600">Todos los cursos</a>
            </li>
            <li className="py-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">Vías de aprendizaje</a>
            </li>
            <li className="py-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">Certificaciones</a>
            </li>
            <li className="py-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">Archivados</a>
            </li>
            <li className="py-4">
              <a href="#" className="text-gray-600 hover:text-purple-600">Herramientas de aprendizaje</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="px-8 py-6">
        {/* Sección de planificación */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Programa un tiempo de aprendizaje</h2>
              <p className="text-gray-600 mb-4">
                Aprender un poco cada día marca la diferencia. Hay estudios que muestran que los estudiantes que hacen del aprendizaje un
                hábito tienen una mayor probabilidad de alcanzar sus objetivos. Reserva tiempo para aprender y recibe recordatorios con la
                herramienta de planificación del aprendizaje.
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                  Empezar
                </button>
                <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-md">
                  Descartar
                </button>
              </div>
            </div>
          </div>
        </div>        {/* Lista de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMPLE_COURSES.map(course => (
            <CourseCard 
              key={course.id}
              {...course}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
