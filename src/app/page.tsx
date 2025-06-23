"use client";
import React from 'react';
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

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 md:py-24">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto text-center">
						<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
							Aprende Redes con SumajCode
						</h1>
						<p className="text-lg md:text-xl lg:text-2xl mb-8 text-purple-100">
							Descubre nuestros cursos de redes y empieza tu camino en el mundo de
							la conectividad
						</p>
						<Link
							href="/learning/dashboard"
							className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Explorar Cursos
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Courses */}
			<section className="py-12 md:py-16 -mt-8">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
							Cursos en Progreso
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
							{FEATURED_COURSES.map((course) => (
								<Link
									key={course.id}
									href={`/learning/viewer/${course.id}`}
									className="block group transform transition-transform hover:-translate-y-1"
								>
									<CourseCard {...course} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
