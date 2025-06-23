import React from "react";

export function CourseInfo() {
  return (
    <div className="bg-white border-t mt-6 py-6">
      <div className=" mx-auto px-4">
        <div className="mt-6 border-t pt-4">
          <div className="flex space-x-4 border-b">
            <h5 className="px-4 py-2 border-b-2 border-black font-medium">
              Descripción general
            </h5>
          </div>
          <p>
            Esta es una descripción general del curso. Aquí puedes encontrar
            información sobre los temas que se abordarán, los objetivos del
            curso y otros detalles relevantes.
          </p>
        </div>
      </div>
    </div>
  );
}
