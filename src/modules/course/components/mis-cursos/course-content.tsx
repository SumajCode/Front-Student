"use client";

import { useState } from "react";
import { ChevronDown, FileText, CheckCircle, Download, Link as LinkIcon, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseData } from "../../hooks/use-course-data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function CourseContent() {
  const { sections } = useCourseData();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-800">
        <h2 className="text-xl font-bold text-white mb-1">Contenido del curso</h2>
        <p className="text-purple-200 text-sm">8 secciones • 24 lecciones • 3h 45min</p>
      </div>

      <div className="divide-y">
        {sections.map((section: {
          title: string;
          completed: number;
          total: number;
          duration: number;
          lessons: {
            id?: number;
            completed: boolean;
            type: string;
            number: number;
            title: string;
            duration: number;
            hasResources: boolean;
            resources?: {
              title: string;
              type: "download" | "link" | "code";
              url: string;
            }[];
          }[];
        }, index: number) => (
          <div key={index} className="bg-white">
            <div
              className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleSection(index)}
            >
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {section.completed} de {section.total} completados • {section.duration} min
                    </p>
                  </div>
                </div>
              </div>
              <div className={`transform transition-transform duration-200 ${
                expandedSections.includes(index) ? 'rotate-180' : ''
              }`}>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {expandedSections.includes(index) && (
              <div className="space-y-1 px-4 pb-4">
                {section.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                      activeLessonId === lesson.id
                        ? 'bg-purple-50 text-purple-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div 
                      className="flex-1 flex items-center gap-3 cursor-pointer"
                      onClick={() => setActiveLessonId(lesson.id ?? null)}
                    >
                      <div className="flex-shrink-0">
                        {lesson.completed ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center">
                            <FileText className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {lesson.title}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{lesson.duration} min</span>
                        </div>
                      </div>
                    </div>
                    {lesson.hasResources && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-shrink-0 h-8 gap-1.5 bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                          >
                            <FileText className="h-4 w-4" />
                            <span>Recursos</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0" align="end">
                          <div className="p-4 bg-purple-50 border-b">
                            <h4 className="font-medium text-purple-900">Recursos de la lección</h4>
                            <p className="text-sm text-purple-600">Material complementario</p>
                          </div>
                          <div className="p-2">
                            {lesson.resources?.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-50 text-sm text-gray-700 hover:text-purple-700 transition-colors"
                              >
                                {resource.type === "download" && <Download className="h-4 w-4" />}
                                {resource.type === "link" && <LinkIcon className="h-4 w-4" />}
                                {resource.type === "code" && <FileJson className="h-4 w-4" />}
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
