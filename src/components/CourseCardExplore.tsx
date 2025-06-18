"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

interface CourseCardExploreProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  instructor: string;
  rating?: number;
  totalRatings?: number;
  students?: number;
  level?: string;
}

export default function CourseCardExplore({
  id,
  title,
  description,
  duration,
  instructor,
  rating,
  totalRatings,
  students,
  level = "Principiante",
}: CourseCardExploreProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Miniatura del curso con gradiente */}
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-700"></div>
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
      </div>

      {/* Contenido del curso */}
      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <Link href={`/curso/${id}`} className="block">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 
              transition-colors duration-200 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">{instructor}</span>
            <span>•</span>
            <span>{level}</span>
          </div>
        </div>

        {/* Estadísticas del curso */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium">{rating || 4.5}</span>
            <span className="text-gray-500">({totalRatings || 0} valoraciones)</span>
          </div>
          <span>•</span>
          <span>{students || 0} estudiantes</span>
          <span>•</span>
          <span>{duration}</span>
        </div>

        {/* Botón de inscripción */}
        <div className="pt-2">
          <Link href={`/curso/${id}`}>
            <Button 
              className="w-full bg-purple-600 text-white hover:bg-purple-700 
                transition-all duration-200 font-medium"
            >
              Inscríbete ahora
            </Button>
          </Link>
        </div>

        {/* Etiqueta de popularidad */}
        {students && students > 1000 && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Popular
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
