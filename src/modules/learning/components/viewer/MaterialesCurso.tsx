"use client";

import React, { useState, useEffect } from "react";
import { materialesService } from "@/lib/materiales-service";
import { MaterialCursoDto } from "@/lib/api-config";
import { Download, FileText, Video, ImageIcon, Package, Paperclip, Loader2 } from "lucide-react";
import { Button } from "@/ui/button";

interface MaterialesCursoProps {
  cursoId: string;
}

export default function MaterialesCurso({ cursoId }: MaterialesCursoProps) {
  const [materiales, setMateriales] = useState<MaterialCursoDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    const cargarMateriales = async () => {
      try {
        const materialesData = await materialesService.obtenerMateriales(cursoId);
        setMateriales(materialesData);
      } catch (error) {
        console.error('Error al cargar materiales:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarMateriales();
  }, [cursoId]);

  const obtenerIconoTipo = (tipo: MaterialCursoDto['tipo']) => {
    switch (tipo) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'documento':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'zip':
        return <Package className="h-5 w-5 text-purple-600" />;
      case 'imagen':
        return <ImageIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <Paperclip className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleDescargarMaterial = async (material: MaterialCursoDto) => {
    setDownloadingId(material.id);
    try {
      await materialesService.descargarMaterial(material.url, material.nombre);
    } catch (error) {
      console.error('Error al descargar material:', error);
      alert('Error al descargar el material');
    } finally {
      setDownloadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
          <span className="ml-2 text-gray-600">Cargando materiales...</span>
        </div>
      </div>
    );
  }

  if (materiales.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin materiales disponibles</h3>
          <p className="text-gray-600">No hay recursos adicionales para este curso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Package className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Materiales del Curso</h3>
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
          {materiales.length}
        </span>
      </div>

      <div className="space-y-3">
        {materiales.map((material) => (
          <div 
            key={material.id} 
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors duration-200"
          >
            <div className="flex items-center gap-3 flex-1">
              {obtenerIconoTipo(material.tipo)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{material.nombre}</h4>
                {material.descripcion && (
                  <p className="text-sm text-gray-600 truncate">{material.descripcion}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                  <span>Tamaño: {materialesService.formatearTamaño(material.tamaño)}</span>
                  <span>Tipo: {material.tipo.toUpperCase()}</span>
                  <span>Subido: {new Date(material.fechaSubida).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleDescargarMaterial(material)}
              disabled={downloadingId === material.id}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 text-sm"
            >
              {downloadingId === material.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Descargando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* Botón para descargar todos los recursos */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Button
          onClick={() => materialesService.descargarRecursos(cursoId)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Package className="h-4 w-4 mr-2" />
          Descargar todos los recursos (ZIP)
        </Button>
      </div>
    </div>
  );
}
