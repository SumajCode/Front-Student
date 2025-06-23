import Image from "next/image";
import CourseCard from "../components/CourseCard";
import { courses } from "@/modules/course/data/course-data";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        {/* Logo y Título */}
        <div className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold">Mi Proyecto</span>
        </div>

        {/* Barra de Navegación */}
        <nav>
          <ul className="flex space-x-6">
            <li className="hover:text-blue-500 cursor-pointer">Cursos</li>
            <li className="hover:text-blue-500 cursor-pointer">Categorías</li>
            <li className="hover:text-blue-500 cursor-pointer">Recursos</li>
          </ul>
        </nav>

        {/* Icono de Perfil */}
        <div className="text-2xl cursor-pointer hover:text-blue-500">👤</div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Streak Section */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Empieza una racha semanal</h2>
          <p className="text-gray-600 mb-4">
            ¡Un anillo menos! Ahora, visualiza algún curso.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>0 semanas</span>
            <span>Racha actual</span>
            <span>8/30 minutos del curso</span>
            <span>2/1 visita</span>
          </div>
          <a
            href="#activity"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Ver toda la actividad
          </a>
        </section>

        {/* Courses Section */}
          <section className="space-y-6">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </section>

      </main>
    </div>
  );
}