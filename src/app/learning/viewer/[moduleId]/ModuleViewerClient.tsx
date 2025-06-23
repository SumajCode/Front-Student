"use client";

import React from "react";
import { CourseViewer } from "@/modules/learning/components/viewer/CourseViewer";
import { CourseProvider } from "@/modules/learning/context/CourseContext";

interface ModuleViewerClientProps {
  moduleId: number;
}

export function ModuleViewerClient({ moduleId }: ModuleViewerClientProps) {
  if (isNaN(moduleId)) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">ID de módulo inválido</p>
      </div>
    );
  }

  return (
    <CourseProvider initialModuleId={moduleId}>
      <CourseViewer />
    </CourseProvider>
  );
}
