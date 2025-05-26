import { CourseContent } from "@/modules/course/components/mis-cursos/course-content";
import { CourseInfo } from "@/modules/course/components/mis-cursos/course-info";

import { Hero } from "@/modules/course/components/mis-cursos/hero";

import React from "react";

export default function page() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Hero />
          <CourseInfo />
        </div>
        <div className="lg:col-span-1 lg:sticky lg:top-6 self-start">
          <CourseContent />
        </div>
      </div>
    </div>
  );
}
