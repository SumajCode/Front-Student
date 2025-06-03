"use client";
import CourseCard from "@/components/CourseCard";

//Ejemplo de como se ven los cursos en la pagina principal
//esto se deberia ver al hacer click en explorar o el logo
// ruta raiz  " / " 

//Repito este solo es un ejemplo de como se veria la pagina principal
// Datos de ejemplo de los cursos
const FEATURED_COURSES = [
  {
    id: '1',
    title: 'Desarrollo Web con React y Next.js',
    description: 'Aprende a construir aplicaciones web modernas con React y Next.js desde cero.',
    thumbnail: '/course-thumbnails/react-next.jpg',
    progress: 0,
    duration: '8h 30m',
    instructor: 'Kevin Verduguez',
    rating: 4.7,
    totalRatings: 1234,
    
  },
  {
    id: '2',
    title: 'Python para Ciencia de Datos',
    description: 'Domina Python y sus librerías principales para análisis de datos y machine learning.',
    thumbnail: '/course-thumbnails/python.jpg',
    progress: 0,
    duration: '12h 15m',
    instructor: 'Ana Martínez',
    rating: 4.7,
    totalRatings: 1234,

  },
  {
    id: '3',
    title: 'TypeScript Avanzado',
    description: 'Lleva tus habilidades de TypeScript al siguiente nivel con patrones avanzados.',
    thumbnail: '/course-thumbnails/typescript.jpg',
    progress: 0,
    duration: '6h 45m',
    instructor: 'Carlos Ruiz',
    rating: 4.7,
    totalRatings: 1234,
  },
  {
    id: '4',
    title: 'JavaScript Moderno',
    description: 'Domina las últimas características de JavaScript y mejora tus habilidades de programación.',
    thumbnail: '/course-thumbnails/javascript.jpg',
    progress: 0,
    duration: '10h 20m',
    instructor: 'María García',
    rating: 4.7,
    totalRatings: 1234,
  },
  {
    id: '5',
    title: 'Introducción a Data Science',
    description: 'Aprende los fundamentos del análisis de datos y la ciencia de datos.',
    thumbnail: '/course-thumbnails/data-science.jpg',
    progress: 0,
    duration: '15h 45m',
    instructor: 'David López',
    rating: 4.7,
    totalRatings: 1234,
  },
  {
    id: '6',
    title: 'Machine Learning Práctico',
    description: 'Implementa modelos de machine learning con Python y scikit-learn.',
    thumbnail: '/course-thumbnails/machine-learning.jpg',
    progress: 0,
    duration: '18h 30m',
    instructor: 'Laura Ramírez',
    rating: 4.7,
    totalRatings: 1234,
  }
];

export default function Home() {
  return (
    <div className="container mx-auto">
      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Aprende las habilidades del futuro
          </h1>
          <p className="text-xl text-gray-600">
            Miles de cursos impartidos por expertos. Aprende a tu ritmo.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </section>
    </div>
  );
}
