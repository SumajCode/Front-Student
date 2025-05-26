"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 bg-white z-50 text-black">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="SumajCode" width={32} height={32} />
          <span className="text-xl font-bold">SumajCode</span>
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
