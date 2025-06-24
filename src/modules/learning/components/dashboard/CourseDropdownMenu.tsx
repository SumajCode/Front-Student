"use client";

import React from "react";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { MoreVertical, Download, FileText, Award } from 'lucide-react';

interface CourseDropdownMenuProps {
  courseId: string;
  hasResources?: boolean;
  hasCertificate?: boolean;
}

export default function CourseDropdownMenu({
  hasResources = false,
  hasCertificate = false,
}: Omit<CourseDropdownMenuProps, 'courseId'>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-white hover:bg-white/20"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {hasResources && (
          <DropdownMenuItem className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" />
            <span>Descargar recursos</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem className="cursor-pointer">
          <FileText className="mr-2 h-4 w-4" />
          <span>Ver programa</span>
        </DropdownMenuItem>

        {hasCertificate && (
          <DropdownMenuItem className="cursor-pointer">
            <Award className="mr-2 h-4 w-4" />
            <span>Ver certificado</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
