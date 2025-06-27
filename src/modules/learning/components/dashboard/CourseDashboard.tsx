"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CourseCard from "./CourseCard";

// Tipos según el nuevo formato de la API
interface ContenidoModulo {
  _id: string;
  id_contenido: string;
  id_modulo: string;
  title: string;
  type: string;
  content?: { description?: string; points?: number; status?: string; rules?: any };
  points?: number;
  status?: string;
  time_deliver?: string;
  timestamp?: string;
  files?: string[];
}

interface Modulo {
  id_modulo?: string; // <-- Añadido para soporte de id único si existe en la API
  title: string;
  desciption?: string;
  id_materia: number;
  contenido: ContenidoModulo[];
}

interface MateriaModulos {
  id_materia: number;
  modulos: Modulo[];
}

interface Matricula {
  id: number;
  id_materia: number;
  nombre_materia: string;
  modulos: MateriaModulos;
}

export function CourseDashboard() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    // Intentar obtener el id del estudiante desde localStorage
    let idEst = undefined;
    // Primero buscar el objeto 'estudiante' (antiguo)
    const estudianteData = localStorage.getItem("estudiante");
    if (estudianteData) {
      const { id, id_estudiante } = JSON.parse(estudianteData);
      idEst = id_estudiante || id;
    } else {
      // Si no existe, buscar la clave 'id_estudiante' (nuevo login)
      idEst = localStorage.getItem("id_estudiante");
    }
    if (!idEst) return;

    setLoading(true);
    fetch(
      `https://microservice-docente.onrender.com/apidocentes/v1/matricula/listar/estudiante?id_estudiante=${idEst}`
    )
      .then((res) => res.json())
      .then((data) => setMatriculas(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  // Filtrado por progreso (cuando la API lo soporte)
  const cursosFiltrados = Array.isArray(matriculas) ? matriculas : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 min-h-[60vh] relative">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-gray-900">
          Mi Aprendizaje
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Continúa tu viaje de aprendizaje en redes Cisco
        </p>
      </header>

      {/* Filtros (puedes adaptar si tienes progreso) */}
      {/* ...existing code... */}

      {/* Cursos Filtrados */}
      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Todos los Cursos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative min-h-[200px]">
          {(!loading && cursosFiltrados.length === 0) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-60 z-0">
              <span className="text-3xl mb-2">📚</span>
              <span className="text-lg text-gray-400 font-medium">
                No estás inscrito a ningún curso
              </span>
            </div>
          )}
          {cursosFiltrados.map((mat) => (
            <div key={mat.id} className="block group transform transition-transform hover:-translate-y-1 z-10">
              <Link href={`/learning/viewer/${mat.id_materia}`} passHref legacyBehavior>
                <a className="block focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg">
                  <CourseCard
                    id={String(mat.id_materia)}
                    title={mat.nombre_materia || `Materia ${mat.id_materia}`}
                    description={mat.modulos?.modulos?.[0]?.desciption || ""}
                    progress={0}
                    duration={""}
                    instructor={""}
                  />
                </a>
              </Link>
              {/* Mostrar módulos y contenidos */}
              {mat.modulos?.modulos && mat.modulos.modulos.length > 0 && (
                <div className="mt-2 ml-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 mb-1">
                    Módulos:
                  </div>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {mat.modulos.modulos.map((mod, idx) => {
                      // Buscar el id_modulo del primer contenido, si existe
                      const idModulo = mod.contenido && mod.contenido.length > 0 ? mod.contenido[0].id_modulo : idx;
                      return (
                        <li key={idModulo} className="mb-1">
                          <span
                            className="font-semibold cursor-pointer hover:underline text-purple-700"
                            onClick={() => router.push(`/learning/viewer/${mat.id_materia}/${idModulo}`)}
                          >
                            {mod.title}
                          </span>
                          {mod.contenido && mod.contenido.length > 0 && (
                            <ul className="ml-4 list-square text-xs text-gray-600">
                              {mod.contenido.map((cont) => (
                                <li key={cont._id || cont.id_contenido}>
                                  <span
                                    className="font-medium cursor-pointer hover:underline text-blue-700"
                                    onClick={() => router.push(`/learning/viewer/${mat.id_materia}/${idModulo}/${cont.id_contenido}`)}
                                    title="Ir al compilador de este contenido"
                                  >
                                    {cont.title}
                                  </span> - {cont.type}
                                  {cont.content?.description && (
                                    <span className="ml-1 text-gray-700">: {cont.content.description}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
