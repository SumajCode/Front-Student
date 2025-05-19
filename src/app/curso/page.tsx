'use client';

import styles from './page.module.css';
import styled from 'styled-components';

const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export default function CoursePage() {
  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Mi Plataforma</div>
        <nav aria-label="Menú de navegación principal">
          <ul className={styles.navList}>
            <li className={styles.navItem}>Inicio</li>
            <li className={styles.navItem}>Mis Cursos</li>
            <li className={styles.navItem}>Perfil</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Course Section */}
        <section className={styles.courseSection}>
          {/* Video */}
          <div className={styles.videoContainer}>
            <VideoFrame
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Introducción al curso de React y Next.js"
              allowFullScreen
            />
          </div>

          {/* Título y descripción */}
          <h1 className={styles.courseTitle}>Curso de React y Next.js</h1>
          <p className={styles.courseDesc}>
            Aprende a construir aplicaciones modernas con React y Next.js. Este curso te llevará desde los conceptos básicos hasta técnicas avanzadas.
          </p>

          {/* Contenido del curso */}
          <h2 className={styles.sectionTitle}>Contenido del curso</h2>
          <ul className={styles.courseContentList}>
            <li className={styles.itemContenido}>Introducción al curso</li>
            <li className={styles.itemContenido}>Configuración del entorno</li>
            <li className={styles.itemContenido}>Componentes y Props en React</li>
            <li className={styles.itemContenido}>Rutas dinámicas con Next.js</li>
            <li className={styles.itemContenido}>Despliegue de la aplicación</li>
          </ul>
        </section>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
  <h2 className={styles.sidebarTitle}>Información del curso</h2>
  <ul className={styles.sidebarList}>
    <li><strong>Instructor:</strong> Kevin Verduguez</li>
    <li><strong>Duración:</strong> 5 horas</li>
    <li><strong>Nivel:</strong> Intermedio</li>
    <li><strong>Idioma:</strong> Español</li>
    <li><strong>Progreso:</strong> 20% completado</li>
    <li><strong>Finalización estimada:</strong> 25 de mayo</li>
  </ul>
  <div className={styles.progressBar}>
    <div className={styles.progressFill}></div>
  </div>
  <button className={styles.botonPrincipal}>Continuar Curso</button>
</aside>

      </main>
    </div>
  );
}
