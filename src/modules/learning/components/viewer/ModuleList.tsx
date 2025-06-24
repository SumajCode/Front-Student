"use client";
import React from "react";
import { useCourseNavigation } from "../../hooks/useCourseNavigation";
import Link from "next/link";

export function ModuleList() {
  const { modules, currentModuleId } = useCourseNavigation();

  return (
    <div className="py-2">
      {modules.map((module, index) => (
        <Link key={module.id} href={`/learning/viewer/${module.id}`}>
          <div
            className={`flex items-center p-4 transition-colors cursor-pointer ${
              currentModuleId === module.id
                ? "bg-white/10"
                : "hover:bg-white/5"
            }`}
          >
            {/* Círculo con número */}
            <div className="mr-3 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-base font-medium
                ${
                  currentModuleId === module.id
                    ? "bg-white text-purple-600"
                    : "bg-white/20 text-white"
                }`}
              >
                {index + 1}
              </div>
            </div>

            {/* Contenido del módulo */}
            <div className="min-w-0 flex-1">
              <h3 className="text-white text-base font-medium truncate">
                {module.title}
              </h3>
              {/* Solo mostrar si hay duración o número de recursos */}
              {(module.duration || module.resources) && (
                <div className="flex items-center mt-1 space-x-4">
                  {module.duration && (
                    <p className="text-xs text-white/60">
                      {typeof module.duration === "number"
                        ? `${module.duration} min`
                        : module.duration}
                    </p>
                  )}
                  {module.resources && (
                    <button className="text-xs text-white/60 hover:text-white/80">
                      Recursos
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Flecha o indicador de desplegable si se necesita */}
            {module.hasSubItems && (
              <div className="ml-3">
                <svg
                  className="w-5 h-5 text-white/60"
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
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
