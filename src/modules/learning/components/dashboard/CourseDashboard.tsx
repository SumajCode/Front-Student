"use client";
import React, { useState } from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";
import type { CursoResumenDto } from "@/lib/api-config";

export function CourseDashboard({ courses = [] }: { courses: CursoResumenDto[] }) {
  const [filter, setFilter] = useState("all");

  const mapCourseToProps = (course: CursoResumenDto) => ({
    id: course.id,
    title: course.titulo,
    description: course.descripcion,
    progress: course.progreso,
    duration: course.duracion || "0h 0m",
    instructor: course.instructor || "Instructor",
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
          Mi Aprendizaje
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Continúa tu viaje de aprendizaje en redes Cisco
        </p>
      </header>

      {/* Filtros */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg ${
            filter === "all"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("inProgress")}
          className={`px-4 py-2 rounded-lg ${
            filter === "inProgress"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          En Progreso
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg ${
            filter === "completed"
              ? "bg-purple-600 text-white"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >

          Completados
        </button>
      </div>

      {/* Cursos Filtrados */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {filter === "all"
            ? "Todos los Cursos"
            : filter === "inProgress"
            ? "Cursos en Progreso"
            : "Cursos Completados"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses
            .filter(course => filter === "all" || 
              (filter === "inProgress" && course.progreso > 0 && course.progreso < 100) ||
              (filter === "completed" && course.progreso === 100))
            .map((course) => (
              <Link 
                key={course.id}
                href={`/learning/viewer/${course.id}`}
                className="block group transform transition-transform hover:-translate-y-1"
              >
                <CourseCard {...mapCourseToProps(course)} />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
