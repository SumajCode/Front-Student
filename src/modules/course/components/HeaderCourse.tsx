"use client";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { useCourseNavigation } from "../hooks/useCourseNavigation";

export default function HeaderCourse() {
  const [completed, setCompleted] = useState(false);
  const { currentModule, currentModuleId } = useCourseNavigation();
  const isLastModule = currentModuleId === 4; // El último módulo tiene ID 4

  const marcarComoCompletado = () => {
    setCompleted(true);
    alert("✅ Curso completado con éxito");
  };

  return (    
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {currentModule?.title || "Cargando..."}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-medium">Instructor:</span>
          <span>Kevin Verduguez</span>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mx-1"></div>
          <span>Actualizado recientemente</span>
        </div>
        <div className="mt-3">
          <ProgressBar progress={45} />
        </div>
      </div>      <div className="mt-2 md:mt-0">
        {isLastModule && (
          !completed ? (
            <button
              onClick={marcarComoCompletado}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            >
              Marcar como completado ✅
            </button>
          ) : (
            <span className="text-green-600 font-semibold">Módulo completado ✔️</span>
          )
        )}
      </div>
    </header>
  );
}
