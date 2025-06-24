"use client";
import React from "react";
import Image from "next/image";
import { 
  Card,
  CardMedia,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover-card";
import { Button } from "@/ui/button";
import { JoinCourseModal } from "./JoinCourseModal";
import type { CursoResumenDto } from "@/lib/api-config";

type CourseCardProps = CursoResumenDto & {
  className?: string;
  showJoinButton?: boolean;
};

export function CourseCard({
  id,
  titulo,
  descripcion,
  progreso = 0,
  miniatura,
  duracion,
  instructor,
  cantidadModulos,
  className,
  showJoinButton = false
}: CourseCardProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);
  
  const handleJoinCourse = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsJoinModalOpen(true);
  };

  return (
    <>
      <Card className={`h-full flex flex-col bg-white hover:shadow-lg transition-all duration-300 ${className || ''}`}>
        <CardMedia className="relative h-40 sm:h-48 overflow-hidden">
          {miniatura ? (
            <Image
              src={miniatura}
              alt={titulo}
              fill
              className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
              <span className="text-3xl text-white font-bold">{titulo.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 rounded-lg bg-purple-600">
              {showJoinButton ? "Unirse al curso" : "Ver curso"}
            </span>
          </div>
        </CardMedia>
        
        <CardHeader className="p-4 sm:p-6">
          <HoverCard>
            <HoverCardTrigger asChild>
              <CardTitle className="text-lg sm:text-xl font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                {titulo}
              </CardTitle>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{titulo}</h4>
                <p className="text-sm text-gray-600">{descripcion}</p>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>{cantidadModulos} módulos</span>
                  <span>•</span>
                  <span>{duracion}</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardHeader>

        <CardContent className="flex-grow p-4 sm:p-6 space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{descripcion}</p>
          {showJoinButton ? (
            <Button 
              onClick={handleJoinCourse}
              className="w-full"
              variant="outline"
            >
              Unirse al Curso
            </Button>
          ) : progreso > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{progreso}% completado</span>
                {duracion && <span className="text-purple-600">{duracion}</span>}
              </div>
              <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300"
                  style={{ width: `${progreso}%` }}
                />
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="border-t bg-gray-50/50 p-4">
          <div className="w-full flex justify-between items-center text-sm">
            <div className="text-gray-600">
              {instructor && (
                <span className="flex items-center gap-1">
                  Por {instructor}
                </span>
              )}
            </div>
            {cantidadModulos && (
              <span className="text-purple-600">
                {cantidadModulos} módulos
              </span>
            )}
          </div>
        </CardFooter>
      </Card>

      <JoinCourseModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        courseId={id}
        courseTitle={titulo}
        onJoinSuccess={() => {
          window.location.href = "/learning/dashboard";
        }}
      />
    </>
  );
}
