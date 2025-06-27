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
    let idEst = undefined;
    const estudianteData = localStorage.getItem("estudiante");
    if (estudianteData) {
      const { id, id_estudiante } = JSON.parse(estudianteData);
      idEst = id_estudiante || id;
    } else {
      idEst = localStorage.getItem("id_estudiante");
    }
    if (!idEst) {
      setError("No se encontró ID de estudiante");
      setLoading(false);
      return;
    }
    // Consumir la API de matrículas para verificar inscripción
    fetch(
      `https://microservice-docente.onrender.com/apidocentes/v1/matricula/listar/estudiante?id_estudiante=${idEst}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Buscar la matrícula de la materia seleccionada (comparación robusta)
        const matricula = (data.data || []).find(
          (m: any) => Number(m.id_materia) === Number(moduleId)
        );
        if (!matricula) {
          setError(`No estás inscrito en este curso (id_materia: ${moduleId})`);
          setLoading(false);
          return;
        }
        setCourseName(matricula.nombre_materia || "Curso");
        // Ahora sí, buscar los módulos reales del curso
        fetch(
          "https://microservice-content.onrender.com/apicontenido/v1/modulo/listar?todo=true"
        )
          .then((res) => res.json())
          .then((modData) => {
            const allModules = Array.isArray(modData.data) ? modData.data : [];
            // Filtrar módulos por id_materia
            const filteredModules = allModules
              .filter((mod: any) => Number(mod.id_materia) === Number(moduleId))
              .map((mod: any, idx: number) => ({
                ...mod,
                id: mod._id || mod.id_modulo || String(idx + 1),
                id_modulo: mod._id || mod.id_modulo || String(idx + 1),
                id_materia: mod.id_materia || moduleId, // <-- Asegura que cada módulo tenga id_materia
                title: mod.title || mod.nombre || `Módulo ${idx + 1}`,
                description: mod.desciption || mod.descripcion || "",
              }));
            if (filteredModules.length === 0) {
              setError("No se encontraron módulos para este curso");
            } else {
              setModules(filteredModules);
              // Selección de módulo activo por URL o primero
              if (typeof window !== "undefined") {
                const urlParts = window.location.pathname.split("/");
                const lastPart = urlParts[urlParts.length - 1];
                if (
                  filteredModules.some(
                    (m: any) => String(m.id_modulo) === lastPart
                  )
                ) {
                  setActiveModuleId(lastPart);
                } else {
                  setActiveModuleId(filteredModules[0]?.id_modulo);
                }
              } else {
                setActiveModuleId(filteredModules[0]?.id_modulo);
              }
            }
          })
          .catch(() => setError("Error al cargar los módulos"))
          .finally(() => setLoading(false));
      })
      .catch(() => {
        setError("Error al cargar la matrícula");
        setLoading(false);
      });
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
