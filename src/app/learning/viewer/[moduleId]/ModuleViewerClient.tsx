"use client";

import React, { useEffect, useState } from "react";
import { CourseViewer } from "@/modules/learning/components/viewer/CourseViewer";
import { CourseProvider } from "@/modules/learning/context/CourseContext";

interface ModuleViewerClientProps {
  moduleId: number; // Este es el id de la materia
}

export function ModuleViewerClient({ moduleId }: ModuleViewerClientProps) {
  const [modules, setModules] = useState<any[]>([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeModuleId, setActiveModuleId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setLoading(true);
    // Buscar matrícula del estudiante en localStorage
    const estudianteData = localStorage.getItem("estudiante");
    if (!estudianteData) {
      setError("No se encontró información del estudiante");
      setLoading(false);
      return;
    }
    const { id, id_estudiante } = JSON.parse(estudianteData);
    const idEst = id_estudiante || id;
    if (!idEst) {
      setError("No se encontró ID de estudiante");
      setLoading(false);
      return;
    }
    // Consumir la API de matrículas para obtener módulos de la materia
    fetch(
      `https://microservice-docente.onrender.com/apidocentes/v1/matricula/listar/estudiante?id_estudiante=${idEst}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Buscar la matrícula de la materia seleccionada
        const matricula = (data.data || []).find(
          (m: any) => m.id_materia === moduleId
        );
        if (matricula && matricula.modulos && matricula.modulos.modulos) {
          // Normalizar módulos: asegurar que cada uno tenga un 'id_modulo' real
          const normalizedModules = matricula.modulos.modulos.map((mod: any) => ({
            ...mod,
            id: mod.id_modulo || mod._id || mod.title, // id principal para navegación
            id_modulo: mod.id_modulo || mod._id || mod.title,
          }));
          setModules(normalizedModules);
          setCourseName(matricula.nombre_materia || "Curso");
          // Si hay un parámetro de módulo en la URL, seleccionarlo como activo
          if (typeof window !== "undefined") {
            const urlParts = window.location.pathname.split("/");
            const lastPart = urlParts[urlParts.length - 1];
            // Si el último segmento es un id_modulo válido, seleccionarlo
            if (
              normalizedModules.some(
                (m: any) => String(m.id_modulo) === lastPart
              )
            ) {
              setActiveModuleId(lastPart);
            } else {
              setActiveModuleId(normalizedModules[0]?.id_modulo);
            }
          } else {
            setActiveModuleId(normalizedModules[0]?.id_modulo);
          }
        } else {
          setError("No se encontraron módulos para este curso");
        }
      })
      .catch(() => setError("Error al cargar los módulos"))
      .finally(() => setLoading(false));
  }, [moduleId]);

  if (loading)
    return <div className="p-8 text-center">Cargando módulos...</div>;
  if (error)
    return <div className="p-8 text-center text-red-600">{error}</div>;

  // Buscar el índice del módulo activo
  const initialModuleIndex = modules.findIndex(
    (m) => String(m.id_modulo) === String(activeModuleId)
  );
  const initialModuleId =
    modules[initialModuleIndex]?.id_modulo || modules[0]?.id_modulo;

  return (
    <CourseProvider
      initialModuleId={initialModuleId}
      modules={modules}
      courseName={courseName}
    >
      <CourseViewer />
    </CourseProvider>
  );
}
