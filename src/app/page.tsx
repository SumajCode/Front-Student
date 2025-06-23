"use client";
import React from "react";
import Link from "next/link";
import { CourseCard } from "@/modules/learning/components/dashboard/CourseCard";
import type { CursoResumenDto } from "@/lib/api-config";

const FEATURED_COURSES: CursoResumenDto[] = [
	{
		id: "1",
		titulo: "Introducción a Redes Cisco",
		descripcion:
			"Fundamentos de redes y conceptos básicos de networking con Cisco",
		miniatura: "/course-thumbnails/react-next.svg",
		progreso: 75,
		duracion: "8 horas",
		instructor: "John Doe",
		cantidadModulos: 8,
	},
	{
		id: "2",
		titulo: "Configuración de Routers Cisco",
		descripcion: "Aprende a configurar y administrar routers Cisco paso a paso",
		miniatura: "/course-thumbnails/github.svg",
		progreso: 30,
		duracion: "12 horas",
		instructor: "Jane Smith",
		cantidadModulos: 10,
	},
	{
		id: "3",
		titulo: "Seguridad en Redes Cisco",
		descripcion: "Implementación de medidas de seguridad en redes empresariales",
		miniatura: "/course-thumbnails/python.svg",
		progreso: 45,
		duracion: "10 horas",
		instructor: "Mike Johnson",
		cantidadModulos: 6,
	},
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
