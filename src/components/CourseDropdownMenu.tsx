"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Star, Info, GraduationCap, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CourseDropdownMenuProps {
  rating?: number;
  totalRatings?: number;
  price: string;
  courseId?: string;
}

export default function CourseDropdownMenu({ rating = 4.7, totalRatings = 1234, price, courseId }: CourseDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100">
          <Button 
            variant="secondary" 
            size="sm" 
            className="shadow-lg bg-white hover:bg-white/90 transition-all duration-300 transform translate-y-4 hover:translate-y-0"
          >
            Vista previa rápida
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="w-[320px] p-4 animate-in slide-in-from-top-1 duration-200"
        sideOffset={10}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500">({totalRatings} valoraciones)</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Última actualización: mayo 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-gray-500" />
            <span className="text-sm">Certificado al completar el curso</span>
          </div>
          <div className="pt-4 border-t flex items-center justify-between">
            <span className="font-bold text-xl">{price}</span>
            <Link href={courseId ? `/curso/${courseId}` : "#"}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                <ShoppingCart className="w-4 h-4" />
                Agregar al carrito
              </Button>
            </Link>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}