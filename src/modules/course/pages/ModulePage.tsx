"use client";
import React from "react";
import VideoPlayer from "../components/VideoPlayer";
import NextModuleButton from "../components/NextModuleButton";
import PreviousModuleButton from "../components/PreviousModuleButton";

interface ModuleProps {
  module: {
    id: number;
    title: string;  // cambiado de titulo a title
    contenido: string;
    video: string;
    path: string;
  };
}

export default function ModulePage({ module }: ModuleProps) {
  if (!module) {
    return <div>Cargando...</div>;
  }  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
      
      <div className="aspect-video w-full">
        {module.video && <VideoPlayer videoUrl={module.video} />}
      </div>      <div className="prose max-w-none mb-8">
        <p className="text-gray-700">{module.contenido}</p>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
        <div className="flex-1">
          <PreviousModuleButton />
        </div>
        <div className="flex-1 text-right">
          <NextModuleButton />
        </div>
      </div>
    </div>
  );
}