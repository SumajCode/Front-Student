"use client";

export default function MisCursos() {
  const cursos = Array.from({ length: 6 });

  return (
    <div className="container mx-auto px-4">
      {/* Encabezado estilo Udemy */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900">Mis cursos</h1>
        <p className="text-lg text-gray-600">
          Todos los cursos que has empezado o comprado aparecen aquí.
        </p>
      </section>

      {/* Botones de filtrado (estáticos por ahora) */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Todos</button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Favoritos</button>
        <button className="px-4 py-2 border rounded-md hover:bg-gray-100">Completados</button>
      </div>

      {/* Grilla de cursos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cursos.map((_, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div className="aspect-video bg-gray-200" />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">Curso de ejemplo {i + 1}</h3>
              <p className="text-sm text-gray-500 mb-2">Instructor de ejemplo</p>
              <div className="flex items-center text-sm mb-1">
                <span className="text-yellow-500 font-bold mr-1">4.7</span>
                <div className="text-yellow-400">★★★★★</div>
                <span className="text-gray-500 ml-2">(1,234)</span>
              </div>
              <div className="font-bold">€14.99</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
