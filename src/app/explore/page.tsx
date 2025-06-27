"use client";

import React, { useEffect, useState } from "react";
import CourseCard from "@/modules/learning/components/dashboard/CourseCard";

const PAGE_SIZE = 10;

export default function ExplorePage() {
  const [materias, setMaterias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${process.env.NEXT_PUBLIC_DOCENTE_API_URL}/apidocentes/v1/materia/listar`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los cursos");
        return res.json();
      })
      .then((data) => setMaterias(Array.isArray(data.data) ? data.data : []))
      .catch((err) => setError(err.message || "Error desconocido"))
      .finally(() => setLoading(false));
  }, []);

  // Filtros de búsqueda y categoría
  const filteredMaterias = materias.filter((mat) => {
    const nombre = (mat.nombre_materia || "").toLowerCase();
    const nivel = (mat.nivel_estudio || "").toLowerCase();
    const docente = (mat.id_docente ? String(mat.id_docente) : "");
    const search = searchTerm.toLowerCase();
    const matchesSearch = nombre.includes(search) || nivel.includes(search) || docente.includes(search);
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "redes" && (nombre.includes("cisco") || nombre.includes("redes") || nivel.includes("redes"))) ||
      (selectedCategory === "programacion" && (nombre.includes("python") || nombre.includes("programacion") || nombre.includes("java") || nombre.includes("node.js") || nombre.includes("javascript")));
    return matchesSearch && matchesCategory;
  });

  // Paginación
  const totalPages = Math.ceil(filteredMaterias.length / PAGE_SIZE);
  const paginatedMaterias = filteredMaterias.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Resetear página si cambia el filtro o búsqueda
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

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

        {/* Barra de búsqueda */}
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
              placeholder="Buscar cursos por título, descripción o docente..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categorías */}
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
              <span>{filteredMaterias.length} cursos disponibles</span>
            </div>
          </div>
        </div>

        {/* Lista de cursos con paginación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-lg text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-lg text-red-500">{error}</div>
          ) : paginatedMaterias.length > 0 ? (
            paginatedMaterias.map((mat, index) => (
              <div 
                key={mat.id || mat._id || index} 
                className="group transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <CourseCard
                      id={String(mat.id || mat._id || index)}
                      title={mat.nombre_materia || `Materia ${mat.id || mat._id || index}`}
                      description={mat.nivel_estudio || ""}
                      progress={0}
                      duration={""}
                      instructor={`Docente ID: ${mat.id_docente}`}
                      disableActions={true}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
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

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="px-4 py-2">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
