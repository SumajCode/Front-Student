"use client";
import React from "react";
import { CourseDashboard } from "@/modules/learning/components/dashboard/CourseDashboard";
import type { CursoResumenDto } from "@/lib/api-config";

export default function DashboardPage() {
  // Datos de ejemplo mientras no hay conexión completa al backend
  const courses: CursoResumenDto[] = [];

  return (
    <div className="min-h-screen bg-gray-50 py-16 mt-16">
      <CourseDashboard courses={courses} />
    </div>
  );
}
