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
  level?: string;
  technologies?: string[];
}

export default function CourseCardExplore({
  id,
  title,
  description,
  duration,
  instructor,
  level = "Principiante",
  technologies = [],
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

        {/* Tecnologías del curso */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Detalles del curso */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>{level}</span>
          </div>
          <span>•</span>
          <span>{duration}</span>
        </div>

        {/* Botón de inscripción */}
        <div className="pt-2">
          <Link href={`/course/${id}`}>
            <Button 
              className="w-full bg-purple-600 text-white hover:bg-purple-700 
                transition-all duration-200 font-medium"
            >
              Comenzar curso
            </Button>
          </Link>
        </div>

        {/* Etiqueta de nivel */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            bg-purple-100 text-purple-800">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
}
