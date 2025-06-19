"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Info, 
  GraduationCap, 
  BookOpen,
  FileJson,
  Share2
} from "lucide-react";

interface CourseDropdownMenuProps {
  courseId: string;
  hasResources?: boolean;
  hasCertificate?: boolean;
}

export default function CourseDropdownMenu({ 
  hasResources = true,
  hasCertificate = true 
}: CourseDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="secondary" 
          size="icon"
          className="h-8 w-8 bg-white/90 hover:bg-white shadow-sm hover:shadow-md
            transition-all duration-200 hover:text-purple-600"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[280px] p-2"
        sideOffset={4}
      >
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Code2 className="w-4 h-4 text-purple-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Ver código fuente</span>
            <span className="text-xs text-gray-500">Accede al repositorio del proyecto</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Documentación</span>
            <span className="text-xs text-gray-500">Guías y recursos adicionales</span>
          </div>
        </DropdownMenuItem>

        {hasResources && (
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <FileJson className="w-4 h-4 text-purple-600" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Recursos del curso</span>
              <span className="text-xs text-gray-500">Archivos y ejemplos de código</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {hasCertificate && (
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Certificado</span>
              <span className="text-xs text-gray-500">Disponible al completar el curso</span>
            </div>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Share2 className="w-4 h-4 text-purple-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Compartir curso</span>
            <span className="text-xs text-gray-500">Invita a otros a aprender</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}