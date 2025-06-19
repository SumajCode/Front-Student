"use client";
import CourseCard from "@/components/CourseCard";

const FEATURED_COURSES = [
	{
		id: "1",
		title: "Desarrollo Web con React y Next.js",
		description:
			"Aprende a construir aplicaciones web modernas con React y Next.js desde cero.",
		thumbnail: "/course-thumbnails/react-next.svg",
		progress: 60,
		duration: "8h 30m",
		instructor: "Kevin Verduguez",
		rating: 4.7,
		totalRatings: 1234,
	},
	{
		id: "2",
		title: "Python para Ciencia de Datos",
		description:
			"Domina Python y sus librerías principales para análisis de datos y machine learning.",
		thumbnail: "/course-thumbnails/python.svg",
		progress: 30,
		duration: "12h 15m",
		instructor: "Ana Martínez",
		rating: 4.8,
		totalRatings: 956,
	},
	{
		id: "3",
		title: "TypeScript Avanzado",
		description:
			"Lleva tus habilidades de TypeScript al siguiente nivel con patrones avanzados.",
		thumbnail: "/course-thumbnails/typescript.svg",
		progress: 15,
		duration: "6h 45m",
		instructor: "Carlos Ruiz",
		rating: 4.9,
		totalRatings: 789,
	},
	{
		id: "4",
		title: "JavaScript Moderno",
		description:
			"Domina las últimas características de JavaScript y mejora tus habilidades de programación.",
		thumbnail: "/course-thumbnails/javascript.svg",
		progress: 0,
		duration: "10h 20m",
		instructor: "María García",
		rating: 4.6,
		totalRatings: 1567,
	},
];

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Espaciador para el header fijo */}
			<div className="h-16"></div>

			<main className="container mx-auto px-4 py-8">
				{/* Navegación secundaria */}
				<nav className="mb-8 border-b border-gray-200">
					<ul className="flex space-x-8">
						<li>
							<a
								href="#"
								className="inline-block px-1 py-4 text-purple-600 border-b-2 border-purple-600"
							>
								Todos los cursos
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block px-1 py-4 text-gray-500 hover:text-gray-700"
							>
								Certificaciones
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block px-1 py-4 text-gray-500 hover:text-gray-700"
							>
								Archivados
							</a>
						</li>
						<li>
							<a
								href="#"
								className="inline-block px-1 py-4 text-gray-500 hover:text-gray-700"
							>
								Recursos
							</a>
						</li>
					</ul>
				</nav>

				{/* Sección de planificación */}
				<section className="mb-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
					<div className="flex items-start gap-4">
						<div className="p-3 bg-purple-100 rounded-full">
							<svg
								className="w-6 h-6 text-purple-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div className="flex-1">
							<h2 className="text-xl font-semibold mb-2">
								Programa un tiempo de aprendizaje
							</h2>
							<p className="text-gray-600 mb-4">
								Aprender un poco cada día marca la diferencia. Hay estudios que
								muestran que los estudiantes que hacen del aprendizaje un hábito
								tienen una mayor probabilidad de alcanzar sus objetivos.
							</p>
							<div className="flex gap-3">
								<button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
									Empezar
								</button>
								<button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
									Descartar
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Grid de cursos */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{FEATURED_COURSES.map((course) => (
						<div
							key={course.id}
							className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<CourseCard {...course} />
						</div>
					))}
				</section>
			</main>
		</div>
	);
}
