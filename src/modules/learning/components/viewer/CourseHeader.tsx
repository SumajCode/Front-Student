"use client";
import React, { useState } from "react";
import { Progress } from "@/ui/progress";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";

export function CourseHeader() {
  const [completed, setCompleted] = useState(false);
  const { currentModule } = useCourseNavigation();

  const markAsCompleted = () => {
    setCompleted(true);
    alert("✅ Módulo completado exitosamente");
  };

  return (    
    <header className="flex items-center justify-end gap-4">
      <div className="flex items-center gap-4">
        <div className="w-48">
          <Progress value={75} />
          <p className="text-sm text-gray-600 mt-1">75% completado</p>
        </div>
        {currentModule && !completed && (
          <button
            onClick={markAsCompleted}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Marcar como completado
          </button>
        )}
      </div>
    </header>
  );
}
