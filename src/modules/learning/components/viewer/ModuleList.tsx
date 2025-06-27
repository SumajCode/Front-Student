"use client";
import React from "react";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";

export function ModuleList() {
  const { modules, currentModuleId, navigateToModule } = useCourseNavigation();

  return (
    <div className="py-3">
      {modules.map((module, index) => {
        const idModulo = String(module.id_modulo || module.id);
        return (
          <div
            key={idModulo}
            onClick={() => navigateToModule(idModulo)}
            className={`flex items-center p-4 mx-3 mb-2 rounded-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
              currentModuleId === idModulo
                ? "bg-white/20 backdrop-blur-sm shadow-lg border border-white/30"
                : "hover:bg-white/10 hover:backdrop-blur-sm"
            }`}
          >
            {/* Círculo con número mejorado */}
            <div className="mr-4 flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-lg
                ${
                  currentModuleId === idModulo
                    ? "bg-white text-purple-600 shadow-white/20"
                    : "bg-gradient-to-br from-purple-500 to-purple-700 text-white hover:from-purple-400 hover:to-purple-600"
                }`}
              >
                {index + 1}
              </div>
            </div>

            {/* Contenido del módulo mejorado */}
            <div className="min-w-0 flex-1">
              <h3
                className={`text-base font-semibold truncate transition-colors duration-300 ${
                  currentModuleId === idModulo ? "text-white" : "text-white/90"
                }`}
              >
                {module.title}
              </h3>
              {/* Mostrar contenidos reales si existen */}
              {Array.isArray(module.contenido) && module.contenido.length > 0 && (
                <ul className="mt-2 ml-2 text-xs text-purple-100 space-y-1">
                  {module.contenido.map((cont: any) => (
                    <li
                      key={cont._id || cont.id_contenido}
                      className="flex flex-col gap-0.5"
                    >
                      <span className="font-medium">{cont.title}</span>
                      <span className="italic text-purple-200">{cont.type}</span>
                      {cont.content?.description && (
                        <span className="text-purple-300">{cont.content.description}</span>
                      )}
                      {cont.files && cont.files.length > 0 && (
                        <span className="text-purple-300">Archivos: {cont.files.join(", ")}</span>
                      )}
                      {/* Detalles de reglas, puntos, estado, funciones e imports con estilo consistente */}
                      <div className="ml-2 mt-1 rounded bg-purple-900/30 px-2 py-1 text-[11px] text-purple-100/90 border border-purple-700/30 flex flex-col gap-0.5">
                        {(cont.content?.points !== undefined) && (
                          <div><span className="font-semibold text-emerald-300">● Puntos:</span> <span className="text-purple-100">{cont.content.points}</span></div>
                        )}
                        {cont.content?.status && (
                          <div><span className="font-semibold text-blue-300">● Estado:</span> <span className="text-purple-100">{cont.content.status}</span></div>
                        )}
                        {cont.content?.rules?.functions?.functionNames && cont.content.rules.functions.functionNames.length > 0 && (
                          <div><span className="font-semibold text-fuchsia-300">● Funciones requeridas:</span> <span className="text-purple-100">{cont.content.rules.functions.functionNames.join(", ")}</span></div>
                        )}
                        {cont.content?.rules?.imports && cont.content.rules.imports.length > 0 && (
                          <div><span className="font-semibold text-yellow-300">● Imports requeridos:</span> <span className="text-purple-100">{cont.content.rules.imports.join(", ")}</span></div>
                        )}
                        {!(cont.content?.points !== undefined || cont.content?.status || (cont.content?.rules?.functions?.functionNames && cont.content.rules.functions.functionNames.length > 0) || (cont.content?.rules?.imports && cont.content.rules.imports.length > 0)) && (
                          <div className="italic text-purple-300 flex items-center gap-1"><span className="text-lg">🛈</span>Este contenido no tiene reglas de compilación asociadas</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {/* Información adicional */}
              {(module.duration || module.resources) && (
                <div className="flex items-center mt-2 space-x-3">
                  {module.duration && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-purple-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs text-purple-200 font-medium">
                        {typeof module.duration === "number"
                          ? `${module.duration} min`
                          : module.duration}
                      </span>
                    </div>
                  )}
                  {module.resources && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 text-purple-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <button className="text-xs text-purple-200 hover:text-white transition-colors duration-200 font-medium">
                        Recursos
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Estado de progreso */}
              {currentModuleId === idModulo && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-full bg-white/20 rounded-full h-1">
                    <div
                      className="bg-green-400 h-1 rounded-full transition-all duration-500"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <span className="text-xs text-green-300 font-medium">0%</span>
                </div>
              )}
            </div>

            {/* Indicadores de estado */}
            <div className="ml-3 flex flex-col items-center gap-1">
              {/* Flecha o indicador de desplegable */}
              {module.hasSubItems && (
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    currentModuleId === idModulo
                      ? "text-white rotate-180"
                      : "text-white/60"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}

              {/* Indicador de módulo actual */}
              {currentModuleId === idModulo && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
