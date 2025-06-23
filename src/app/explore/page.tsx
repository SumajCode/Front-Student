"use client";

import { useEffect, useState, useMemo } from "react";
import CourseCard from "@/modules/learning/components/dashboard/CourseCard";

interface Course {
  id: string;
  titulo: string;
  descripcion: string;
  duracion?: string;
  instructor?: string;
  progreso: number;
  cantidadModulos: number;
  codigoAcceso?: string;
}

export default function ExplorePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Simulación de carga de cursos
    const mockCourses: Course[] = [
      {
        id: "1",
        titulo: "Python para Ciencia de Datos",
        descripcion: "Domina Python y sus librerías principales para análisis de datos y machine learning.",
        progreso: 30,
        duracion: "12h 15m",
        instructor: "Ana Martínez",
        cantidadModulos: 24,
      },
      {
        id: "2",
        titulo: "Introducción a Redes Cisco",
        descripcion: "Fundamentos de redes y conceptos básicos de networking con Cisco",
        progreso: 0,
        duracion: "8 horas",
        instructor: "John Doe",
        cantidadModulos: 8
      },
      {
        id: "3",
        titulo: "Configuración de Routers Cisco",
        descripcion: "Aprende a configurar y administrar routers Cisco paso a paso",
        progreso: 0,
        duracion: "12 horas",
        instructor: "Jane Smith",
        cantidadModulos: 10
      },
      {
        id: "4",
        titulo: "Seguridad en Redes Cisco",
        descripcion: "Implementación de medidas de seguridad en redes empresariales",
        progreso: 0,
        duracion: "10 horas",
        instructor: "Mike Johnson",
        cantidadModulos: 6
      },
      {
        id: "5",
        titulo: "Administración de Switches Cisco",
        descripcion: "Aprende a configurar y gestionar switches en redes empresariales",
        progreso: 0,
        duracion: "15 horas",
        instructor: "Sarah Wilson",
        cantidadModulos: 12
      },
      {
        id: "6",
        titulo: "CCNA: Preparación para la Certificación",
        descripcion: "Curso completo para prepararte para el examen de certificación CCNA",
        progreso: 0,
        duracion: "40 horas",
        instructor: "David Anderson",
        cantidadModulos: 20
      },
      {
        id: "7",
        titulo: "Troubleshooting en Redes Cisco",
        descripcion: "Aprende a identificar y resolver problemas comunes en redes",
        progreso: 0,
        duracion: "16 horas",
        instructor: "Emma Brown",
        cantidadModulos: 14
      },
      {
        id: "8",
        titulo: "Virtualización de Redes con Cisco",
        descripcion: "Implementación de redes virtuales y SDN con tecnología Cisco",
        progreso: 0,
        duracion: "20 horas",
        instructor: "Alex Turner",
        cantidadModulos: 15
      },
      {
        id: "9",
        titulo: "Cisco Wireless Networks",
        descripcion: "Diseño e implementación de redes inalámbricas empresariales",
        progreso: 0,
        duracion: "18 horas",
        instructor: "Laura Martinez",
        cantidadModulos: 12
      }
    ];
    setCourses(mockCourses);
  }, []);

  const mapCourseToProps = (course: Course) => ({
    id: course.id,
    title: course.titulo,
    description: course.descripcion,
    progress: course.progreso,
    duration: course.duracion || "0h 0m",
    instructor: course.instructor || "Instructor",
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || true; // Implementar filtro por categoría

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16 mt-16">
      <div className="container mx-auto px-4 sm:px-6">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
            Explorar Cursos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Descubre nuestra colección de cursos de redes Cisco
          </p>
        </header>

        {/* Barra de búsqueda */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full max-w-xl px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categorías */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todos los cursos
          </button>
          {/* Agregar más categorías según sea necesario */}
        </div>

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="transform transition-transform hover:-translate-y-1">
              <CourseCard {...mapCourseToProps(course)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
