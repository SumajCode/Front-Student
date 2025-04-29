export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:text-blue-500 cursor-pointer">Cursos</li>
            <li className="hover:text-blue-500 cursor-pointer">Categorías</li>
            <li className="hover:text-blue-500 cursor-pointer">Recursos</li>
          </ul>
        </nav>
        <div className="text-2xl">👤</div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Streak Section */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">Empieza una racha semanal</h2>
          <p className="text-gray-600 mb-4">
            ¡Un anillo menos! Ahora, visualiza algún curso.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span>0 semanas</span>
            <span>Racha actual</span>
            <span>8/30 minutos del curso</span>
            <span>2/1 visita</span>
          </div>
          <a
            href="#activity"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            Ver toda la actividad
          </a>
        </section>

        {/* Courses Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🎥</div>
            <div>
              <h3 className="text-xl font-bold">
                Curso React y Next.js: Aprende Frontend
              </h3>
              <p className="text-gray-600">1. Introducción al curso de React y Next</p>
              <p className="text-sm text-gray-500">Lectura • 1 min</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Recomendar
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Compartir en MS Teams
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Añadir a vía de aprendizaje
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}