"use client";
import React from "react";
import HeaderCourse from "./components/HeaderCourse";
import SidebarModuleList from "./components/SidebarModuleList";
import NextModuleButton from "./components/NextModuleButton";
import PreviousModuleButton from "./components/PreviousModuleButton";
import { useRouter } from "next/navigation";
import { useCourseNavigation } from "./hooks/useCourseNavigation";

export default function CourseLayout({ children }: { children?: React.ReactNode }) {  const router = useRouter();
  const { currentModuleId } = useCourseNavigation();
  const esUltimoModulo = currentModuleId === 4;
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[320px] bg-white border-r border-gray-200 overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">Contenido del curso</h2>
        </div>
        <div className="px-4 py-4">
          <SidebarModuleList />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-8 py-4">
          <HeaderCourse />
        </div>        {/* Sección del contenido dinámico del módulo */}
        <div className="flex-1 bg-white">
          {children}
        </div>        {/* Botones de navegación */}
        <div className="px-8 py-4 border-t bg-white flex justify-between items-center">
          <div className="flex space-x-4">
            <PreviousModuleButton />
            {!esUltimoModulo && <NextModuleButton />}
          </div>
          {esUltimoModulo && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded"
              onClick={() => router.push("/homepage")}
            >
              Finalizar Curso ✅
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
