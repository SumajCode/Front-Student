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
  thumbnail: string;
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
    <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Miniatura del curso */}
      <div className="relative w-48 flex-shrink-0">
        <Link href={`/mis-cursos/${id}`}>
          <div className="w-full h-full aspect-[4/3] relative overflow-hidden">
            {/* Fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800"></div>
            
            {/* Icono del curso */}
            <div className="absolute inset-0 flex items-center justify-center">
              {title.toLowerCase().includes('react') && (
                <div className="relative w-16 h-16">
                  <Image 
                    src="/course-thumbnails/react-next.svg" 
                    alt="React"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              {title.toLowerCase().includes('python') && (
                <div className="relative w-16 h-16">
                  <Image 
                    src="/course-thumbnails/python.svg" 
                    alt="Python"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
              {(title.toLowerCase().includes('typescript') || title.toLowerCase().includes('javascript')) && (
                <div className="relative w-16 h-16">
                  <Image 
                    src="/course-thumbnails/javascript.svg" 
                    alt="JavaScript"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          </div>
        </Link>
        <CourseDropdownMenu courseId={id}  rating={rating} totalRatings={totalRatings} />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1">
          <Link href={`/mis-cursos/${id}`} className="group">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 line-clamp-2">
              {title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
          <p className="text-gray-500 text-sm">{instructor}</p>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <Link href={`/mis-cursos/${id}`} className="flex-1">
            <Button variant="secondary" className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700">
              Empieza a aprender
            </Button>
          </Link>
          <span className="text-sm text-gray-500">{duration}</span>
        </div>

        {progress > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{progress}% completado</span>
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </div>
    </div>
  );
}
