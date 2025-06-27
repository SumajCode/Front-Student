import React from "react";
import { ModuleViewerClient } from "./ModuleViewerClient";

interface Props {
  params: {
    moduleId: string;
  };
}

export default function ModuleViewerPage({ params }: Props) {
  // Convertimos el ID del módulo a número
  const moduleId = parseInt(params.moduleId);

  // Pasar el moduleId real sin forzar rango
  return <ModuleViewerClient moduleId={moduleId} />;
}