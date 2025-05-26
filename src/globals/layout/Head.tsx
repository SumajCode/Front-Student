"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import Image from "next/image";

const LEARNING_COURSES = [
  {
    id: "1",
    title: "Curso de Tailwind CSS - Desde cero hasta...",
    thumbnail: "/course-thumbnails/react-next.svg",
    action: "Empieza a aprender",
  },
  {
    id: "2",
    title: "Curso React y Next.js: Aprende Frontend y Backend FullStack",
    thumbnail: "/course-thumbnails/react-next.svg",
    action: "Empieza a aprender",
  },
  {
    id: "3",
    title: "Git GitHub Actions, Buenas Prácticas de Integración Continua",
    thumbnail: "/course-thumbnails/github.svg",
    action: "Empieza a aprender",
  },
  {
    id: "4",
    title: "UX: leyes y fundamentos explicados con ejemplos prácticos",
    thumbnail: "/course-thumbnails/react-next.svg",
    action: "Empieza a aprender",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-white z-50 text-black">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              className="text-purple-600"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2Z"
                fill="currentColor"
              />
              <path
                d="M22 16C22 19.314 19.314 22 16 22C12.686 22 10 19.314 10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16Z"
                fill="white"
              />
            </svg>
            <span className="ml-3 font-bold text-2xl">SumajCode</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="lg"
              className="text-base font-medium hover:text-purple-600 hover:bg-purple-50"
            >
              Explorar
            </Button>
          </Link>

          <div className="relative">
            <HoverCard openDelay={0} closeDelay={150}>
              <HoverCardTrigger asChild>
                <Link href="/mi-aprendizaje">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-base font-medium hover:text-purple-600 hover:bg-purple-50"
                  >
                    Mi aprendizaje
                  </Button>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                side="bottom"
                className="w-[400px] p-0"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      24 min visualizados
                    </span>
                  </div>
                  <Link href="/mi-aprendizaje">
                    <span className="text-sm text-purple-600 hover:text-purple-700">
                      Ver toda la actividad
                    </span>
                  </Link>
                </div>
                <div className="py-2">
                  {LEARNING_COURSES.map((course) => (
                    <Link
                      key={course.id}
                      href={`/mis-cursos/${course.id}`}
                      className="flex items-center gap-3 w-full p-3 hover:bg-gray-50"
                    >
                      <div className="relative w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {course.title}
                        </h4>
                        <p className="text-sm text-purple-600">
                          {course.action}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <Link href="/mi-aprendizaje" className="w-full">
                    <Button
                      variant="secondary"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Ir a Mi aprendizaje
                    </Button>
                  </Link>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 hover:text-purple-600 hover:bg-purple-50"
          >
            <Bell className="h-6 w-6" />
          </Button>

          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white text-base font-medium">
            GO
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="py-2 px-3 hover:bg-gray-100 rounded-md">
                Explorar
              </Link>
              <Link
                href="/mis-cursos"
                className="py-2 px-3 hover:bg-gray-100 rounded-md"
              >
                Mi aprendizaje
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
