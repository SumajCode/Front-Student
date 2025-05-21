"use client";
import { useCourseNavigation } from "../hooks/useCourseNavigation";

export default function PreviousModuleButton() {
  const { navigateToPreviousModule, currentModuleId } = useCourseNavigation();

  // Solo mostrar el botón si no estamos en el primer módulo
  if (currentModuleId <= 1) {
    return null;
  }

  return (
    <button
      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded transition duration-300 mr-4"
      onClick={navigateToPreviousModule}
    >
      ← Módulo anterior
    </button>
  );
}
