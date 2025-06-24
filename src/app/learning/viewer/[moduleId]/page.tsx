import React from "react";
import { ModuleViewerClient } from "./ModuleViewerClient";

interface Props {
  params: {
    moduleId: string;
  };
}

// Comentado temporalmente hasta tener la API lista
// import { CursosService } from "@/modules/learning/services/cursosService";
// const cursosService = new CursosService();

export default function ModuleViewerPage({ params }: Props) {
  // Convertimos el ID del módulo a número
  const moduleId = parseInt(params.moduleId);
  
  // Validamos que el ID sea un número válido entre 1 y 4 (número de módulos de ejemplo)
  const validModuleId = !isNaN(moduleId) && moduleId > 0 && moduleId <= 4 
    ? moduleId 
    : 1;

  return <ModuleViewerClient moduleId={validModuleId} />;
}