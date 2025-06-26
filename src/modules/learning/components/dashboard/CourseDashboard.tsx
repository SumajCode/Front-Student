"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "./CourseCard";

// Tipos para la matrícula y materia (ajusta según la respuesta real de la API)
type Modulo = {
  id: number;
  titulo: string;
};
type Materia = {
  nombre?: string;
  descripcion?: string;
  duracion?: string;
  instructor?: string;
  modulos?: Modulo[];
};
type Matricula = {
  id: number;
  id_estudiante: number;
  id_materia: number;
  materia?: Materia;
  progreso?: number;
};

export function CourseDashboard() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const estudianteData = localStorage.getItem("estudiante");
    if (!estudianteData) return;
    const { id, id_estudiante } = JSON.parse(estudianteData);
    const idEst = id_estudiante || id;
    if (!idEst) return;

    fetch(
      `https://microservice-docente.onrender.com/apidocentes/v1/matricula/listar/estudiante?id_estudiante=${idEst}`
    )
      .then((res) => res.json())
      .then((data) => setMatriculas(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  // Simulación temporal de un curso si la API no devuelve ninguno
  useEffect(() => {
    if (!loading && matriculas.length === 0) {
      setMatriculas([
        {
          id: 999,
          id_estudiante: 1,
          id_materia: 101,
          progreso: 40,
          materia: {
            nombre: "Simulación de Redes",
            descripcion: "Curso de ejemplo para pruebas de UI y lógica.",
            duracion: "12h",
            instructor: "Ing. Simulado",
            modulos: [
              { id: 1, titulo: "Introducción a la simulación" },
              { id: 2, titulo: "Protocolos básicos" },
              { id: 3, titulo: "Laboratorio virtual" },
            ],
          },
        },
      ]);
    }
  }, [loading, matriculas.length]);

  // Filtrado por progreso (cuando la API lo soporte)
  const cursosFiltrados = (Array.isArray(matriculas) ? matriculas : [])
    .filter((mat) => {
      if (filter === "all") return true;
      if (filter === "inProgress")
        return mat.progreso && mat.progreso > 0 && mat.progreso < 100;
      if (filter === "completed") return mat.progreso === 100;
      return true;
    });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 min-h-[60vh] relative">
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
      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {filter === "all"
            ? "Todos los Cursos"
            : filter === "inProgress"
            ? "Cursos en Progreso"
            : "Cursos Completados"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative min-h-[200px]">
          {(!loading && cursosFiltrados.length === 0) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-60 z-0">
              <span className="text-3xl mb-2">📚</span>
              <span className="text-lg text-gray-400 font-medium">
                No estás inscrito a ningún curso
              </span>
            </div>
          )}
          {cursosFiltrados.map((mat) => (
            <Link
              key={mat.id}
              href={`/learning/viewer/${mat.id_materia}`}
              className="block group transform transition-transform hover:-translate-y-1 z-10"
              legacyBehavior
            >
              <a>
                <CourseCard
                  id={String(mat.id_materia)}
                  title={mat.materia?.nombre || `Materia ${mat.id_materia}`}
                  description={mat.materia?.descripcion || ""}
                  progress={mat.progreso || 0}
                  duration={mat.materia?.duracion || ""}
                  instructor={mat.materia?.instructor || ""}
                />
                {/* Mostrar módulos si existen */}
                {mat.materia?.modulos && mat.materia.modulos.length > 0 && (
                  <div className="mt-2 ml-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 mb-1">
                      Módulos:
                    </div>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {mat.materia.modulos.map((mod) => (
                        <li key={mod.id}>{mod.titulo}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
