"use client";
import React from "react";
import { CourseProvider } from "@/modules/learning/context/CourseContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function CourseViewerLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <CourseProvider initialModuleId={1}>
        {children}
      </CourseProvider>
    </div>
  );
}

