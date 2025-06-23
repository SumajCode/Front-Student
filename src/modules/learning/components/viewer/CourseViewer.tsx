"use client";

import React, { useState } from "react";
import { ModuleList } from "./ModuleList";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";
import VideoPlayer from "./VideoPlayer";
import { CourseOverview } from "./CourseOverview";

interface CourseViewerProps {
  initialDescription?: string;
  initialTitle?: string;
}

export function CourseViewer({ initialTitle, initialDescription }: CourseViewerProps) {
  const { currentModule, modules, courseName } = useCourseNavigation();
  const [activeTab, setActiveTab] = useState<'video' | 'compilador'>('video');

  return (
    <div className="flex h-screen bg-white">
      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra de pestañas */}
        <div className="flex w-full">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === 'video'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setActiveTab('compilador')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === 'compilador'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Compilador
          </button>
        </div>

        {/* Área de contenido */}
        <div className="flex-1">
          {activeTab === 'video' && currentModule ? (
            <div className="h-full">
              {/* Video player */}
              <div className="w-full bg-black aspect-video">
                {currentModule.videoUrl && (
                  <VideoPlayer videoUrl={currentModule.videoUrl} />
                )}
              </div>
            </div>
          ) : activeTab === 'compilador' ? (
            <div className="h-full bg-gray-50 p-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Compilador</h2>
                {/* Aquí iría el contenido del compilador */}
              </div>
            </div>
          ) : (
            <CourseOverview 
              title={initialTitle || courseName || "Bienvenido al Curso"}
              description={initialDescription || "Selecciona un módulo para comenzar tu aprendizaje."}
            />
          )}
        </div>
      </div>

      {/* Panel derecho - Lista de módulos */}
      <div className="w-96 min-w-[384px] bg-purple-600 flex flex-col">
        <div className="p-6 bg-purple-700">
          <h2 className="text-white text-xl font-medium">Contenido del curso</h2>
          <p className="text-white/80 text-sm mt-1">
            {modules.length} módulos
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ModuleList />
        </div>
      </div>
    </div>
  );
}
