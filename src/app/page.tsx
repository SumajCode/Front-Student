import React from 'react';

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', padding: '2rem' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem 0',
        borderBottom: '1px solid #ddd',
      }}>
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Mi Plataforma de Cursos</h1>
        <nav>
          <a href="#" style={{ margin: '0 1rem', textDecoration: 'none', color: '#0070f3' }}>Inicio</a>
          <a href="#" style={{ margin: '0 1rem', textDecoration: 'none', color: '#0070f3' }}>Cursos</a>
          <a href="#" style={{ margin: '0 1rem', textDecoration: 'none', color: '#0070f3' }}>Contacto</a>
        </nav>
      </header>

      <main>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#222' }}>Aprende a tu ritmo</h2>
          <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '600px', margin: '1rem auto' }}>
            Encuentra cursos de desarrollo, diseño, marketing y más. Aprende de instructores expertos desde cualquier lugar.
          </p>
        </section>

        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {['React para Principiantes', 'Curso de Next.js', 'Diseño UX/UI', 'Marketing Digital'].map((course, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <img src={`https://source.unsplash.com/400x200/?technology,course,${index}`} alt="Curso" style={{ width: '100%', borderRadius: '4px' }} />
              <h3 style={{ fontSize: '1.2rem', marginTop: '1rem' }}>{course}</h3>
              <p style={{ color: '#666' }}>Instructor experto - Acceso de por vida</p>
              <button style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}>Ver Curso</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
