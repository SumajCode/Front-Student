import React from "react";

export default function HomePage() {
  const cursos = [
    { title: "Curso de Java", image: "https://source.unsplash.com/400x200/?java" },
    { title: "Curso de Python", image: "https://source.unsplash.com/400x200/?python" },
    { title: "Lógica de Programación", image: "https://source.unsplash.com/400x200/?logic" },
    { title: "Programación Básica", image: "https://source.unsplash.com/400x200/?programming" },
  ];

  return (
    <div className="p-8 bg-gray-50">
      {/* HERO SECTION */}
      <section className="text-center mb-12">
        <h2 className="text-4xl mb-2 text-gray-900">
          Aprende lo que quieras, cuando quieras
        </h2>
        <p className="text-xl text-gray-600">
          Accede a cientos de cursos online dictados por expertos del sector.
        </p>
      </section>

      {/* CURSOS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cursos.map((curso, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md transition-transform duration-300 text-center"
          >
            <img
              src={curso.image}
              alt={curso.title}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="text-xl my-2 text-gray-900">
              {curso.title}
            </h3>
            <p className="text-gray-600 mb-2">Instructor experto</p>
            <button
              className="bg-blue-500 text-white border-none py-2 px-4 rounded flex items-center mt-4 mx-auto"
            >
              Ver Curso
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
