"use client";
import { useCourseNavigation } from "../hooks/useCourseNavigation";

export default function NextModuleButton() {
  const { navigateToNextModule } = useCourseNavigation();

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
      onClick={navigateToNextModule}
    >
      Continuar curso →
    </button>
  );
}
