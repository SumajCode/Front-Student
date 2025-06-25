"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { MoreVertical, Download, FileText, Award, Loader2 } from 'lucide-react';
import { materialesService } from '@/lib/materiales-service';
import { ProgramaCursoDto } from '@/lib/api-config';
import ProgramaCursoModal from './ProgramaCursoModal';

interface CourseDropdownMenuProps {
  courseId: string;
  hasResources?: boolean;
  hasCertificate?: boolean;
}

export default function CourseDropdownMenu({
  courseId,
  hasResources = false,
  hasCertificate = false,
}: CourseDropdownMenuProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoadingProgram, setIsLoadingProgram] = useState(false);
  const [isDownloadingCertificate, setIsDownloadingCertificate] = useState(false);
  const [programa, setPrograma] = useState<ProgramaCursoDto | null>(null);
  const [showProgramModal, setShowProgramModal] = useState(false);

  const showToast = (title: string, description: string) => {
    // Usando alert por ahora, el sistema de toast original ya existe
    alert(`${title}: ${description}`);
  };

  const handleDescargarRecursos = async () => {
    if (!hasResources) return;
    
    setIsDownloading(true);
    try {
      const blob = await materialesService.descargarRecursos(courseId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `recursos-curso-${courseId}.zip`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      showToast("✅ Descarga iniciada", "Los recursos del curso se están descargando.");
    } catch (error) {
      showToast("❌ Error de descarga", "No se pudieron descargar los recursos del curso.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleVerPrograma = async () => {
    setIsLoadingProgram(true);
    try {
      const programaData = await materialesService.obtenerPrograma(courseId);
      setPrograma(programaData);
      setShowProgramModal(true);
    } catch (error) {
      showToast("❌ Error", "No se pudo cargar el programa del curso.");
    } finally {
      setIsLoadingProgram(false);
    }
  };

  const handleDescargarCertificado = async () => {
    if (!hasCertificate) return;
    
    setIsDownloadingCertificate(true);
    try {
      const blob = await materialesService.obtenerCertificado(courseId);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificado-curso-${courseId}.pdf`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      
      showToast("🏆 Certificado descargado", "Tu certificado se ha descargado exitosamente.");
    } catch (error) {
      showToast("❌ Error de descarga", "No se pudo descargar el certificado.");
    } finally {
      setIsDownloadingCertificate(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 text-white hover:bg-white/20 transition-colors duration-200"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg">
          {hasResources && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-purple-50 transition-colors duration-200 py-3"
              onClick={handleDescargarRecursos}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4 text-green-600" />
              )}
              <span className="font-medium">
                {isDownloading ? 'Descargando...' : 'Descargar recursos'}
              </span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-purple-50 transition-colors duration-200 py-3"
            onClick={handleVerPrograma}
            disabled={isLoadingProgram}
          >
            {isLoadingProgram ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileText className="mr-2 h-4 w-4 text-blue-600" />
            )}
            <span className="font-medium">
              {isLoadingProgram ? 'Cargando...' : 'Ver programa'}
            </span>
          </DropdownMenuItem>

          {hasCertificate && (
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-purple-50 transition-colors duration-200 py-3"
              onClick={handleDescargarCertificado}
              disabled={isDownloadingCertificate}
            >
              {isDownloadingCertificate ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Award className="mr-2 h-4 w-4 text-yellow-600" />
              )}
              <span className="font-medium">
                {isDownloadingCertificate ? 'Descargando...' : 'Ver certificado'}
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal del programa del curso */}
      <ProgramaCursoModal
        programa={programa}
        isOpen={showProgramModal}
        onClose={() => setShowProgramModal(false)}
      />
    </>
  );
}
