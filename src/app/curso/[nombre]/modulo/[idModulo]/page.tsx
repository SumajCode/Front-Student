'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { cursos } from '@/data/cursos';
import styles from '@/styles/page.module.css';
import { useEffect } from 'react';

export default function CoursePage() {
  const params = useParams();

  const nombreCurso = typeof params.nombre === 'string' ? params.nombre : '';
  const idModuloStr = typeof params.idModulo === 'string' ? params.idModulo : '1';
  const idModulo = parseInt(idModuloStr);

  const curso = cursos[nombreCurso as keyof typeof cursos];
  if (!curso) return <div>❌ Curso no encontrado</div>;

  const modulo = curso.modulos.find((m) => m.id === idModulo);
  if (!modulo) return <div>❌ Módulo no encontrado</div>;

  useEffect(() => {
    localStorage.setItem(nombreCurso, idModulo.toString());
  }, [nombreCurso, idModulo]);

  const indexActual = curso.modulos.findIndex((m) => m.id === idModulo);
  const siguienteModulo = curso.modulos[indexActual + 1];

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
        <div className={styles.contentWrapper}>
          <section className={styles.courseSection}>
            <h1 className={styles.courseTitle}>{curso.nombre}</h1>
            <h2 className={styles.sectionTitle}>
              Módulo {modulo.id}: {modulo.titulo}
            </h2>
            <p className={styles.courseDesc}>{modulo.contenido}</p>

            {/* Video */}
            {modulo.video ? (
              <div className={styles.videoWrapper}>
                <iframe
                  className={styles.videoIframe}
                  src={modulo.video}
                  title={modulo.titulo}
                  allowFullScreen
                />
              </div>
            ) : (
              <p style={{ color: 'gray' }}>⚠️ Este módulo no tiene video.</p>
            )}

            {/* Contenido del curso */}
            <h2 className={styles.sectionTitle}>Contenido del curso</h2>
            <ul className={styles.courseContentList}>
              {curso.modulos.map((m) => (
                <li key={m.id} className={styles.itemContenido}>
                  <Link href={`/curso/${nombreCurso}/modulo/${m.id}`}>
                    Módulo {m.id}: {m.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Información del curso</h2>
            <ul className={styles.sidebarList}>
              <li><strong>Instructor:</strong> Kevin Verduguez</li>
              <li><strong>Duración:</strong> {curso.modulos.length} horas</li>
              <li><strong>Nivel:</strong> Intermedio</li>
              <li><strong>Idioma:</strong> Español</li>
              <li><strong>Progreso:</strong> {Math.round((idModulo / curso.modulos.length) * 100)}%</li>
            </ul>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(idModulo / curso.modulos.length) * 100}%` }}
              ></div>
            </div>

            {siguienteModulo && (
              <Link href={`/curso/${nombreCurso}/modulo/${siguienteModulo.id}`}>
                <button className={styles.botonPrincipal}>Continuar Curso →</button>
              </Link>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
