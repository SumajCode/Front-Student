"use client";

import React, { useState } from "react";
import { ModuleList } from "./ModuleList";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";
import VideoPlayer from "./VideoPlayer";
import { CourseOverview } from "./CourseOverview";
import { CodeCompiler } from "./CodeCompiler";

interface CourseViewerProps {
  initialDescription?: string;
  initialTitle?: string;
}

export function CourseViewer({ initialTitle, initialDescription }: CourseViewerProps) {
  const { currentModule, modules, courseName } = useCourseNavigation();
  const [activeTab, setActiveTab] = useState<'video' | 'compilador'>('video');

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra de pestañas mejorada */}
        <div className="flex w-full bg-white shadow-sm border-b border-gray-200">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-300 relative group ${
              activeTab === 'video'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Video
            </div>
            {activeTab === 'video' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full transform transition-all duration-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('compilador')}
            className={`flex-1 py-4 px-6 text-center text-sm font-medium transition-all duration-300 relative group ${
              activeTab === 'compilador'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Compilador
            </div>
            {activeTab === 'compilador' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full transform transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Área de contenido mejorada */}
        <div className="flex-1 overflow-hidden">
          <div className={`h-full transition-all duration-500 transform ${
            activeTab === 'video' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 absolute'
          }`}>
            {activeTab === 'video' && currentModule ? (
              <div className="h-full bg-white relative group p-6 overflow-y-auto">
                {/* Si hay videoUrl, mostrar el video */}
                {currentModule.videoUrl ? (
                  <div className="w-full h-96 mb-6">
                    <VideoPlayer videoUrl={currentModule.videoUrl} />
                  </div>
                ) : null}
                {/* Mostrar título y descripción del módulo */}
                <h2 className="text-2xl font-bold mb-2 text-purple-700">{currentModule.title}</h2>
                <p className="text-gray-700 mb-4">{(currentModule as any).desciption || currentModule.description || ""}</p>
                {/* Mostrar contenidos reales si existen */}
                {Array.isArray(currentModule.contenido) && currentModule.contenido.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-purple-600">Contenidos del módulo:</h3>
                    <ul className="space-y-2">
                      {currentModule.contenido.map((cont: any) => (
                        <li key={cont._id || cont.id_contenido} className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                          <div className="font-medium text-purple-800">{cont.title} <span className="text-xs text-purple-400">({cont.type})</span></div>
                          {cont.content?.description && (
                            <div className="text-gray-700 text-sm mt-1">{cont.content.description}</div>
                          )}
                          {cont.files && cont.files.length > 0 && (
                            <div className="text-xs text-purple-500 mt-1">Archivos: {cont.files.join(", ")}</div>
                          )}
                          {cont.points && (
                            <div className="text-xs text-emerald-600 mt-1">Puntaje: {cont.points}</div>
                          )}
                          {cont.time_deliver && (
                            <div className="text-xs text-blue-600 mt-1">Entrega: {new Date(cont.time_deliver).toLocaleString()}</div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : activeTab === 'video' ? (
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-center text-white">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Selecciona un módulo</h3>
                  <p className="text-gray-400">Elige un módulo del panel derecho para comenzar a ver el contenido</p>
                </div>
              </div>
            ) : null}
          </div>
          
          <div className={`h-full transition-all duration-500 transform ${
            activeTab === 'compilador' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 absolute'
          }`}>
            {activeTab === 'compilador' && (
              <div className="h-full bg-gray-50">
                <CodeCompiler />
              </div>
            )}
          </div>
          
          {/* Estado inicial cuando no hay pestaña activa */}
          {!activeTab && (
            <div className="h-full">
              <CourseOverview 
                title={initialTitle || courseName || "Bienvenido al Curso"}
                description={initialDescription || "Selecciona un módulo para comenzar tu aprendizaje."}
              />
            </div>
          )}
        </div>
      </div>

      {/* Panel derecho - Lista de módulos mejorado */}
      <div className="w-96 min-w-[384px] bg-gradient-to-b from-purple-600 via-purple-700 to-purple-800 flex flex-col shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-purple-700 to-purple-600 border-b border-purple-500/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">Contenido del curso</h2>
              <p className="text-purple-200 text-sm">
                {modules.length} módulos disponibles
              </p>
            </div>
          </div>
          
          {/* Barra de progreso del curso */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-purple-200 mb-1">
              <span>Progreso del curso</span>
              <span>0/{modules.length}</span>
            </div>
            <div className="w-full bg-purple-800/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-sm">
          <ModuleList />
        </div>
        
        {/* Footer del panel */}
        <div className="p-4 bg-purple-800/50 border-t border-purple-500/30">
          <div className="flex items-center justify-between text-purple-200 text-xs">
            <span>© 2025 SumajCode</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>Calidad premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
