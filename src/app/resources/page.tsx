'use client';
import React, { useState } from "react";

const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const resources = [
    {
      title: "Curso de JavaScript",
      description: "Un excelente curso interactivo sobre JavaScript para principiantes.",
      category: "Tutorial",
      link: "https://www.example.com/javascript-course",
      rating: 4.5,
    },
    {
      title: "Recomendaciones de libros de Programación",
      description: "Una lista de libros recomendados para aprender programación.",
      category: "Libros",
      link: "https://www.example.com/books",
      rating: 4.8,
    },
    {
      title: "Video sobre estructuras de datos",
      description: "Video tutorial sobre las estructuras de datos más comunes.",
      category: "Videos",
      link: "https://www.example.com/data-structures-video",
      rating: 4.2,
    },
    {
      title: "Herramientas de desarrollo web",
      description: "Lista de herramientas útiles para desarrolladores web.",
      category: "Herramientas",
      link: "https://www.example.com/web-dev-tools",
      rating: 4.7,
    },
    
  ];

  const filteredResources = resources.filter((resource) =>
    selectedCategory === "Todos" ? true : resource.category === selectedCategory
  );

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}> {/* Fondo claro */}
      {/* Banner de bienvenida */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#111" }}>
          Encuentra los mejores recursos para aprender y mejorar tus habilidades.
        </h2>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Explora tutoriales, libros, videos y herramientas para avanzar en tu aprendizaje.
        </p>
      </section>

      {/* Filtros de recursos */}
      <section style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.8rem", color: "#333" }}>Filtrar por categoría</h3>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
          {["Todos", "Tutorial", "Libros", "Videos", "Herramientas"].map((category) => (
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

      {/* Lista de recursos */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredResources.map((resource, index) => (
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
            <h3 style={{ fontSize: "1.3rem", color: "#222" }}>{resource.title}</h3>
            <p style={{ color: "#666" }}>{resource.description}</p>
            <p style={{ color: "#0070f3", fontWeight: "bold" }}>Categoría: {resource.category}</p>
            <a
              href={resource.link}
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
              Ir al recurso
            </a>
            <div style={{ marginTop: "1rem" }}>
              <span style={{ color: "#f39c12" }}>★ {resource.rating}</span>
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

      {/* Botón de descarga (si tienes PDFs o documentos descargables) */}
      <section style={{ marginTop: "3rem", textAlign: "center" }}>
        <a href="/downloads/guide.pdf" download>
          <button
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "5px",
            }}
          >
            Descargar Guía Rápida
          </button>
        </a>
      </section>
    </div>
  );
};

export default ResourcesPage;
