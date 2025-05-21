"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseData } from "../../hooks/use-course-data";

export function CourseContent() {
  const { sections } = useCourseData();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Contenido del curso</h2>

      <div className="space-y-2">
        {sections.map(
          (
            section: {
              title: string;
              completed: number;
              total: number;
              duration: number;
              lessons: {
                completed: boolean;
                type: string;
                number: number;
                title: string;
                duration: number;
                hasResources: boolean;
              }[];
            },
            index: number
          ) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
                onClick={() => toggleSection(index)}
              >
                <div>
                  <h3 className="font-medium">
                    Sección {index + 1}: {section.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {section.completed}/{section.total} | {section.duration} min
                  </p>
                </div>
                {expandedSections.includes(index) ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>

              {expandedSections.includes(index) && (
                <div className="p-4 space-y-3 border-t">
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-start gap-3">
                      <div className="mt-1">
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 border rounded flex items-center justify-center">
                            {lesson.type === "video" && (
                              <FileText className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {lesson.number}. {lesson.title}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{lesson.duration} min</span>
                          {lesson.hasResources && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2 h-6 text-xs"
                            >
                              Recursos
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
