"use client";
import { useState } from "react";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const cursos = Array.from({ length: 6 });

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Buscador */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Buscar cursos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Encabezado general */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900">
        Qué aprender ahora
      </h1>

      {/* Sección 1 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recomendaciones para ti
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cursos.map((_, i) => (
            <div
              key={`rec-${i}`}
              className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-3">
                <h3 className="text-sm font-semibold leading-tight mb-1">
                  Curso de ejemplo {i + 1}
                </h3>
                <p className="text-xs text-gray-500 mb-1">Victor Ramos</p>
                <div className="flex items-center text-xs mb-1">
                  <span className="text-yellow-500 font-bold mr-1">4.{i + 3}</span>
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-500 ml-1">({300 + i * 100})</span>
                </div>
                <div className="text-sm font-semibold">
                  9,99{" "}
                  <span className="line-through text-gray-400 text-xs ml-1">29,99</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 2 */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Porque visitaste <span className="text-purple-600">"Curso de Python "</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cursos.map((_, i) => (
            <div
              key={`visitado-${i}`}
              className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-3">
                <h3 className="text-sm font-semibold leading-tight mb-1">
                  Curso recomendado {i + 1}
                </h3>
                <p className="text-xs text-gray-500 mb-1">Victor Ramos</p>
                <div className="flex items-center text-xs mb-1">
                  <span className="text-yellow-500 font-bold mr-1">4.6</span>
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-gray-500 ml-1">(1,200)</span>
                </div>
                <div className="text-sm font-semibold">
                  9,99{" "}
                  <span className="line-through text-gray-400 text-xs ml-1">34,99</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
