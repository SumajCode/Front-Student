'use client';
import React from "react";
import { useState } from "react";

type CourseProps = {
 
  title: string;
  lesson: string;
  duration: string;
  videoUrl: string;
};

export default function CourseCard({ title, lesson, duration, videoUrl }: CourseProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white shadow rounded-lg p-6 relative">
      <div className="flex items-center space-x-4">
        
        <div className="flex-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600">{lesson}</p>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-xl px-2 hover:text-blue-500"
        >
          ⋮
        </button>
      </div>

      {/* Video */}
      <div className="mt-4">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-64 rounded"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>

      {/* Menú contextual */}
      {open && (
        <div className="absolute right-6 top-20 bg-white border rounded shadow p-2 w-48 z-10">
          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Recomendar
          </button>
          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Compartir 
          </button>
          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Añadir a ver despues
          </button>
        </div>
      )}
    </section>
  );
}
