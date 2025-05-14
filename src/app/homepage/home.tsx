import React from "react";

export default function HomePage() {
  const cursos = [
    { title: "Curso de Java", image: "https://source.unsplash.com/400x200/?java" },
    { title: "Curso de Python", image: "https://source.unsplash.com/400x200/?python" },
    { title: "Lógica de Programación", image: "https://source.unsplash.com/400x200/?logic" },
    { title: "Programación Básica", image: "https://source.unsplash.com/400x200/?programming" },
  ];

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb' }}>
      {/* HERO SECTION */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#111' }}>
          Aprende lo que quieras, cuando quieras
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#555' }}>
          Accede a cientos de cursos online dictados por expertos del sector.
        </p>
      </section>

      {/* CURSOS */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {cursos.map((curso, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
              transition: 'transform 0.3s',
              textAlign: 'center',
            }}
          >
            <img
              src={curso.image}
              alt={curso.title}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
            <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0', color: '#222' }}>
              {curso.title}
            </h3>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>Instructor experto</p>
            <button
              style={{
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                marginTop: '1rem',
              }}
            >
              Ver Curso
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
