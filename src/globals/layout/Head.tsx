"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-white z-50 text-black">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
            <span className="ml-2 font-bold text-xl">SumajCode</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost" className="ml-2 hidden md:flex">
              Explorar
            </Button>
          </Link>
          <Link href="/mis-cursos">
            <Button variant="ghost" size="sm">
              Mi aprendizaje
            </Button>
          </Link>

          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-sm">
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
