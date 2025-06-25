"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { ProgramaCursoDto } from "@/lib/api-config";
import { Clock, CheckCircle, PlayCircle, FileText, Users, Target } from "lucide-react";

interface ProgramaCursoModalProps {
  programa: ProgramaCursoDto | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramaCursoModal({ programa, isOpen, onClose }: ProgramaCursoModalProps) {
  if (!programa) return null;

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'teorico':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'practico':
        return <PlayCircle className="h-4 w-4 text-green-600" />;
      case 'laboratorio':
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'evaluacion':
        return <Target className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
            📋 Programa del Curso
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header del curso */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{programa.titulo}</h2>
            <p className="text-gray-700 mb-4">{programa.descripcion}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Duración:</span>
                <span>{programa.duracionTotal}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Temas:</span>
                <span>{programa.temario.length} módulos</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="font-medium">Modalidad:</span>
                <span>En línea</span>
              </div>
            </div>
          </div>

          {/* Objetivos */}
          {programa.objetivos && programa.objetivos.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Objetivos del Curso
              </h3>
              <ul className="space-y-2">
                {programa.objetivos.map((objetivo, _index) => (
                  <li key={_index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-gray-700">{objetivo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prerrequisitos */}
          {programa.prerrequisitos && programa.prerrequisitos.length > 0 && (
            <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-600" />
                Prerrequisitos
              </h3>
              <ul className="space-y-2">
                {programa.prerrequisitos.map((prereq, _index) => (
                  <li key={_index} className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-gray-700">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dirigido a */}
          {programa.dirigidoA && programa.dirigidoA.length > 0 && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Dirigido a
              </h3>
              <ul className="space-y-2">
                {programa.dirigidoA.map((publico, _index) => (
                  <li key={_index} className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">{publico}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Temario */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Temario Detallado
            </h3>
            
            <div className="space-y-4">
              {programa.temario.map((tema, _index) => (
                <div key={tema.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-bold">
                        {tema.numero}
                      </span>
                      {tema.titulo}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {tema.duracion}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{tema.descripcion}</p>
                  {/* Subtemas */}
                  {tema.subTemas && tema.subTemas.length > 0 && (
                    <div className="ml-4 space-y-2">
                      {tema.subTemas.map((subTema, _subIndex) => (
                        <div key={subTema.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {getTipoIcon(subTema.tipo)}
                            <span className="text-sm font-medium text-gray-800">{subTema.titulo}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            {subTema.duracion}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
