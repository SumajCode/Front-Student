import styles from './page.module.css';

export default function CoursePage() {
  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>Mi Plataforma</div>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}>Inicio</li>
            <li className={styles.navItem}>Mis Cursos</li>
            <li className={styles.navItem}>Perfil</li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Video and Course Details */}
        <section className={styles.courseSection}>
          {/* Video Section */}
          <div className={styles.videoContainer}>
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video del curso"
              allowFullScreen
            ></iframe>
          </div>

          {/* Course Title and Description */}
          <h1 className={styles.courseTitle}>Curso de React y Next.js</h1>
          <p className={styles.courseDesc}>
            Aprende a construir aplicaciones modernas con React y Next.js. Este curso te llevará desde los conceptos básicos hasta técnicas avanzadas.
          </p>

          {/* Course Content */}
          <h2 className={styles.sectionTitle}>Contenido del curso</h2>
          <ul>
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
          </ul>
          <button className={styles.botonPrincipal}>Continuar Curso</button>
        </aside>
      </main>
    </div>
  );
}