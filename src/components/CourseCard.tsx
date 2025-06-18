"use client";

import Link from "next/link";
import Image from "next/image";
import CourseDropdownMenu from "./CourseDropdownMenu";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: string;
  instructor: string;
  rating?: number;
  totalRatings?: number;
}

export default function CourseCard({
  id,
  title,
  description,
  progress,
  duration,
  instructor,
  rating,
  totalRatings,
}: CourseCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Miniatura del curso con gradiente */}
      <div className="relative h-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-purple-600"></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {title.toLowerCase().includes('python') && (
            <Image 
              src="/course-thumbnails/python.svg" 
              alt="Python"
              width={80}
              height={80}
              className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
            />
          )}
          {title.toLowerCase().includes('react') && (
              <Image 
                src="/course-thumbnails/react-next.svg" 
                alt="React"
                width={80}
                height={80}
                className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
              />
            )}
            {title.toLowerCase().includes('typescript') && (
              <Image 
                src="/course-thumbnails/typescript.svg" 
                alt="TypeScript"
                width={80}
                height={80}
                className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
              />
            )}
        </div>
        
        {/* Etiqueta de último acceso */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-xs text-white/90 bg-black/30 rounded px-2 py-1 backdrop-blur-sm">
            Último acceso: hace 2 días
          </div>
        </div>
      </div>

      {/* Contenido del curso */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/mis-cursos/${id}`} className="block">
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 
              transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500">{instructor}</p>
        </div>

        {/* Barra de progreso y detalles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-purple-600 font-medium">{progress}% completado</span>
            <span className="text-xs text-gray-500">Quedan {duration}</span>
          </div>
          <Progress 
            value={progress} 
            className="h-2 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-purple-500"
          />
        </div>

        {/* Detalles del progreso */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>{Math.round(progress / 100 * 24)} de 24 lecciones</span>
          <span>{Math.round(progress / 100 * 180)} min completados</span>
        </div>

        {/* Botón de acción */}
        <Link href={`/mis-cursos/${id}`}>
          <Button 
            className="w-full bg-white text-purple-600 border border-purple-200 hover:bg-purple-50 
              hover:border-purple-300 transition-all duration-200 text-sm h-9"
          >
            {progress === 0 ? 'Comenzar curso' : 
             progress === 100 ? 'Repasar curso' : 'Continuar aprendiendo'}
          </Button>
        </Link>

        {/* Menú de opciones */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <CourseDropdownMenu courseId={id} />
        </div>
      </div>
    </div>
  );
}
