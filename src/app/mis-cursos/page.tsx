//Ejemplo de que aqui van mis cursos
//esto se deberia ver al hacer click en mi aprendizaje
export default function Home() {
  return (
    <div className="container mx-auto">
      <section className="py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mis cursos</h1>
          <p className="text-xl text-gray-600"></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Curso de ejemplo {i}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  Instructor de ejemplo
                </p>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500 font-bold mr-1">4.7</span>
                  <div className="flex text-yellow-500">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <span className="text-gray-500 ml-1">(1,234)</span>
                </div>
                <div className="mt-2 font-bold">€14.99</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
