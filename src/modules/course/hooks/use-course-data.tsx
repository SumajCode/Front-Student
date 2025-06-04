"use client";

import { useState, useEffect } from "react";
import { courseData, Section, Lesson, LessonType } from "../data/course-data";

export function useCourseData() {
  const [sections, setSections] = useState<Section[]>(courseData.sections);
  const [isLoading, setIsLoading] = useState(false);

  // Simular carga de datos
  useEffect(() => {
    setIsLoading(true);
    // Simular una llamada a API
    setTimeout(() => {
      setSections(courseData.sections);
      setIsLoading(false);
    }, 500);
  }, []);

  const markLessonAsCompleted = (sectionIndex: number, lessonIndex: number) => {
    setSections((prev) => {
      const newSections = [...prev];
      newSections[sectionIndex].lessons[lessonIndex].completed = true;

      // Actualizar contador de completados
      const completedCount = newSections[sectionIndex].lessons.filter(
        (l) => l.completed
      ).length;
      newSections[sectionIndex].completed = completedCount;

      return newSections;
    });
  };

  return {
    sections,
    isLoading,
    markLessonAsCompleted,
  };
}
