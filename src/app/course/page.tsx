"use client";
import React from "react";
import CourseLayout from "@/modules/course/layout";
import CourseDetailPage from "@/modules/course/pages/CourseDetailPage";

export default function CoursePage() {
  return (
    <CourseLayout>
      <CourseDetailPage />
    </CourseLayout>
  );
}
