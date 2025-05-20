'use client';  // Aseguramos que este componente se renderice en el cliente

import React, { useState } from "react";

// Lista de cursos simulada
const courses = [
  {
    title: "Introducción a JavaScript",
    description: "Aprende los fundamentos de JavaScript con ejercicios prácticos.",
    category: "JavaScript",
    level: "Principiante",
    rating: 4.6,
    link: "https://www.example.com/javascript-course",
  },
  {
    title: "Python para todos",
    description: "Curso de Python desde cero para aprender a programar.",
    category: "Python",
    level: "Principiante",
    rating: 4.8,
    link: "https://www.example.com/python-course",
  },
  {
    title: "Desarrollo Web con React",
    description: "Curso completo sobre React, desde lo básico hasta avanzado.",
    category: "React",
    level: "Intermedio",
    rating: 4.7,
    link: "https://www.example.com/react-course",
  },
  {
    title: "Fundamentos de Programación Orientada a Objetos",
    description: "Curso de POO con ejemplos prácticos en Java.",
    category: "Java",
    level: "Avanzado",
    rating: 4.9,
    link: "https://www.example.com/java-course",
  },
];

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar cursos por categoría y búsqueda
  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "Todos" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 bg-gray-100">
      {/* Banner de bienvenida */}
      <section className="text-center mb-12">
        <h2 className="text-4xl mb-2 text-gray-900">
          Encuentra el curso perfecto para ti
        </h2>
        <p className="text-xl text-gray-600">
          Cursos en desarrollo web, programación y más. Filtra y encuentra el que más te interese.
        </p>
      </section>

      {/* Barra de búsqueda */}
      <section className="mb-8 text-center">
        <input
          type="text"
          placeholder="Buscar curso..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="py-2 px-4 rounded-full border-2 border-blue-500 bg-gray-50 text-gray-800 w-72 text-base"
        />
      </section>

      {/* Filtros de cursos */}
      <section className="mb-8 text-center">
        <h3 className="text-2xl text-gray-800">Filtrar por categoría</h3>
        <div className="flex gap-4 justify-center mt-4">
          {["Todos", "JavaScript", "Python", "React", "Java"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded ${
                selectedCategory === category 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-800"
              } border-none cursor-pointer text-base`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Lista de cursos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md text-center"
          >
            <h3 className="text-xl text-gray-900">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-blue-500 font-bold">
              Categoría: {course.category}
            </p>
            <p className="text-blue-500 font-bold">
              Nivel: {course.level}
            </p>
            <a
              href={course.link}
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded mt-4 no-underline"
            >
              Ir al curso
            </a>
            <div className="mt-4">
              <span className="text-yellow-500">★ {course.rating}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Enlaces externos */}
      <section className="mt-12 text-center">
        <h3 className="text-2xl text-gray-800">Enlaces Externos Útiles</h3>
        <div className="mt-4">
          <a
            href="https://www.youtube.com"
            target="_blank"
            className="text-blue-500 no-underline"
          >
            YouTube
          </a>{" "}
          |{" "}
          <a
            href="https://www.coursera.org"
            target="_blank"
            className="text-blue-500 no-underline"
          >
            Coursera
          </a>{" "}
          |{" "}
          <a
            href="https://github.com"
            target="_blank"
            className="text-blue-500 no-underline"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
