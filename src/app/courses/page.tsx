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
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
      {/* Banner de bienvenida */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#111" }}>
          Encuentra el curso perfecto para ti
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Cursos en desarrollo web, programación y más. Filtra y encuentra el que más te interese.
        </p>
      </section>

      {/* Barra de búsqueda */}
      <section style={{ marginBottom: "2rem", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Buscar curso..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "25px",
            border: "2px solid #0070f3",
            backgroundColor: "#f9fafb",
            color: "#333",
            width: "300px",
            fontSize: "1rem",
          }}
        />
      </section>

      {/* Filtros de cursos */}
      <section style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.8rem", color: "#333" }}>Filtrar por categoría</h3>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          {["Todos", "JavaScript", "Python", "React", "Java"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: selectedCategory === category ? "#0070f3" : "#f0f0f0",
                color: selectedCategory === category ? "#fff" : "#333",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Lista de cursos */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredCourses.map((course, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "1rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", color: "#222" }}>{course.title}</h3>
            <p style={{ color: "#666" }}>{course.description}</p>
            <p style={{ color: "#0070f3", fontWeight: "bold" }}>
              Categoría: {course.category}
            </p>
            <p style={{ color: "#0070f3", fontWeight: "bold" }}>
              Nivel: {course.level}
            </p>
            <a
              href={course.link}
              style={{
                display: "inline-block",
                backgroundColor: "#0070f3",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                marginTop: "1rem",
                textDecoration: "none",
              }}
            >
              Ir al curso
            </a>
            <div style={{ marginTop: "1rem" }}>
              <span style={{ color: "#f39c12" }}>★ {course.rating}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Enlaces externos */}
      <section style={{ marginTop: "3rem", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.8rem", color: "#333" }}>Enlaces Externos Útiles</h3>
        <div style={{ marginTop: "1rem" }}>
          <a
            href="https://www.youtube.com"
            target="_blank"
            style={{ color: "#0070f3", textDecoration: "none" }}
          >
            YouTube
          </a>{" "}
          |{" "}
          <a
            href="https://www.coursera.org"
            target="_blank"
            style={{ color: "#0070f3", textDecoration: "none" }}
          >
            Coursera
          </a>{" "}
          |{" "}
          <a
            href="https://github.com"
            target="_blank"
            style={{ color: "#0070f3", textDecoration: "none" }}
          >
            GitHub
          </a>
        </div>
      </section>

    </div>
  );
};

export default CoursesPage;
