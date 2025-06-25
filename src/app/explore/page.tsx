"use client";

import React, { useEffect, useState } from "react";
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

  const _mapCourseToProps = (course: Course) => ({
    id: course.id,
    title: course.titulo,
    description: course.descripcion,
    progress: course.progreso,
    duration: course.duracion || "0h 0m",
    instructor: course.instructor || "Instructor",
    cantidadModulos: course.cantidadModulos
  });

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
                           (selectedCategory === "redes" && (course.titulo.toLowerCase().includes("cisco") || course.titulo.toLowerCase().includes("redes") || course.descripcion.toLowerCase().includes("redes"))) ||
                           (selectedCategory === "programacion" && (course.titulo.toLowerCase().includes("python") || course.titulo.toLowerCase().includes("programacion")));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent leading-tight">
              Explorar Cursos
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Descubre nuestra colección de cursos y desarrolla tus habilidades tecnológicas
            </p>
          </div>
        </div>

        {/* Barra de búsqueda mejorada */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar cursos por título, descripción o instructor..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categorías mejoradas */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-3 lg:gap-4 overflow-x-auto pb-2 px-4 sm:px-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white text-gray-600 hover:text-purple-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md"
              }`}
            >
              Todos los cursos
            </button>
            <button
              onClick={() => setSelectedCategory("redes")}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "redes"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white text-gray-600 hover:text-purple-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md"
              }`}
            >
              Redes
            </button>
            <button
              onClick={() => setSelectedCategory("programacion")}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "programacion"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white text-gray-600 hover:text-purple-700 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md"
              }`}
            >
              Programación
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-6 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>{filteredCourses.length} cursos disponibles</span>
            </div>
          </div>
        </div>

        {/* Lista de cursos con animaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <CourseCard {..._mapCourseToProps(course)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.7-2.6m11.4 0C16.29 13.99 14.34 15 12 15s-4.29-1.009-5.7-2.6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron cursos</h3>
              <p className="text-gray-600">Intenta ajustar tu búsqueda o explorar otras categorías</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
