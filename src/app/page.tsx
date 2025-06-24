"use client";

import React from "react";
import Link from "next/link";
import CourseCard from "@/modules/learning/components/dashboard/CourseCard";
import type { CourseCardProps } from "@/lib/types";

// Datos de ejemplo de los cursos
const FEATURED_COURSES: CourseCardProps[] = [
	{
		id: '1',
		title: 'Desarrollo Web con React y Next.js',
		description: 'Aprende a construir aplicaciones web modernas con React y Next.js desde cero.',
		progress: 0,
		duration: '8h 30m',
		instructor: 'Kevin Verduguez'
	},
	{
		id: '2',
		title: 'Python para Ciencia de Datos',
		description: 'Domina Python y sus librerías principales para análisis de datos y machine learning.',
		progress: 0,
		duration: '12h 15m',
		instructor: 'Ana Martínez'
	},
	{
		id: '3',
		title: 'TypeScript Avanzado',
		description: 'Lleva tus habilidades de TypeScript al siguiente nivel con patrones avanzados.',
		progress: 0,
		duration: '6h 45m',
		instructor: 'Carlos Ruiz'
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
