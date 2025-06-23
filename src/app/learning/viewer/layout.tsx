"use client";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function CourseViewerLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

