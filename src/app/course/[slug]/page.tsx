"use client";
import React from "react";
import CourseLayout from "@/modules/course/layout";
import ModulePage from "@/modules/course/pages/ModulePage";
import { useCourseNavigation } from "@/modules/course/hooks/useCourseNavigation";

export default function CourseModulePage() {
  const { currentModule } = useCourseNavigation();

  if (!currentModule) {
    return <div>Cargando...</div>;
  }

  return (
    <CourseLayout>
      <ModulePage module={currentModule} />
    </CourseLayout>
  );
}
