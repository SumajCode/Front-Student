import { CourseContent } from "@/modules/course/components/mis-cursos/course-content";
import { CourseInfo } from "@/modules/course/components/mis-cursos/course-info";

import { Hero } from "@/modules/course/components/mis-cursos/hero";

import React from "react";

export default function page() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2">
          <Hero />
        </div>
        <div className="lg:col-span-1">
          <CourseContent />
        </div>
      </div>
      <CourseInfo />
    </div>
  );
}
