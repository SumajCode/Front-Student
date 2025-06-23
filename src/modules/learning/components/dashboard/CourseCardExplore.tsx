"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui/button";

interface CourseCardExploreProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  level: string;
  studentsCount: number;
}

export default function CourseCardExplore({
  id,
  title,
  description,
  duration,
  instructor,
  level,
  studentsCount,
}: CourseCardExploreProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Miniatura del curso con gradiente */}
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-purple-600"></div>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {title.toLowerCase().includes('python') && (
            <Image 
              src="/course-thumbnails/python.svg" 
              alt="Python"
              width={100}
              height={100}
              className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
            />
          )}
          {title.toLowerCase().includes('react') && (
            <Image 
              src="/course-thumbnails/react-next.svg" 
              alt="React"
              width={100}
              height={100}
              className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
            />
          )}
          {title.toLowerCase().includes('typescript') && (
            <Image 
              src="/course-thumbnails/typescript.svg" 
              alt="TypeScript"
              width={100}
              height={100}
              className="transform transition-all duration-300 group-hover:scale-110 drop-shadow-xl"
            />
          )}
        </div>
        
        {/* Etiquetas nivel y duración */}
        <div className="absolute bottom-2 left-2 right-2 flex gap-2">
          <div className="text-xs text-white/90 bg-black/30 rounded px-2 py-1 backdrop-blur-sm">
            {level}
          </div>
          <div className="text-xs text-white/90 bg-black/30 rounded px-2 py-1 backdrop-blur-sm">
            {duration}
          </div>
        </div>
      </div>

      {/* Contenido del curso */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <Link href={`/learning/viewer/${id}`} className="block">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 
              transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-500">{instructor}</p>
        </div>

        {/* Detalles adicionales */}
        <div className="flex items-center justify-between text-sm pt-2">
          <span className="text-gray-600">
            {studentsCount.toLocaleString()} estudiantes
          </span>
        </div>

        {/* Botón de acción */}
        <Link href={`/learning/viewer/${id}`}>
          <Button 
            className="w-full bg-purple-600 text-white hover:bg-purple-700 
              transition-colors duration-200 text-sm h-9"
          >
            Ver detalles del curso
          </Button>
        </Link>
      </div>
    </div>
  );
}
