'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cursos } from '@/data/cursos';
import styles from '@/styles/page.module.css';
import styled from 'styled-components';

const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export default function CoursePage() {
  const params = useParams();

  const nombreCurso = typeof params.nombre === 'string' ? params.nombre : '';
  const idModuloStr = typeof params.idModulo === 'string' ? params.idModulo : '1';
  const idModulo = parseInt(idModuloStr);

  const curso = cursos[nombreCurso as keyof typeof cursos];

  if (!curso) return <div>Curso no encontrado</div>;
  const modulo = curso.modulos.find((m) => m.id === idModulo);
  if (!modulo) return <div>Módulo no encontrado</div>;

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
              title={modulo.titulo}
              allowFullScreen
            />
          </div>

          {/* Título y descripción */}
          <h1 className={styles.courseTitle}>{curso.nombre}</h1>
          <p className={styles.courseDesc}>{modulo.contenido}</p>

          {/* Contenido del curso */}
          <h2 className={styles.sectionTitle}>Contenido del curso</h2>
          <ul className={styles.courseContentList}>
            {curso.modulos.map((m) => (
              <li key={m.id} className={styles.itemContenido}>
                Módulo {m.id}: {m.titulo}
              </li>
            ))}
          </ul>
        </section>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Información del curso</h2>
          <ul className={styles.sidebarList}>
            <li><strong>Instructor:</strong> Kevin Verduguez</li>
            <li><strong>Duración:</strong> {curso.modulos.length * 1} horas</li>
            <li><strong>Nivel:</strong> Intermedio</li>
            <li><strong>Idioma:</strong> Español</li>
            <li><strong>Progreso:</strong> {Math.round((idModulo / curso.modulos.length) * 100)}%</li>
            <li><strong>Finalización estimada:</strong> 25 de mayo</li>
          </ul>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(idModulo / curso.modulos.length) * 100}%` }}
            ></div>
          </div>

          {/* Botón continuar */}
          {curso.modulos.length > idModulo && (
            <Link href={`/curso/${nombreCurso}/modulo/${idModulo + 1}`}>
              <button className={styles.botonPrincipal}>Continuar Curso →</button>
            </Link>
          )}
        </aside>
      </main>
    </div>
  );
}
